(function() {
    'use strict';
    angular
        .module('columnsApp')
        .controller('ColumnsController', ColumnsController);

    ColumnsController.$inject = ['$scope', '$log', '$interval', 'dataservice', 'cityService'];

    function ColumnsController($scope, $log, $interval, dataservice, cityService) {
        var ROW_HEIGHT = 80;
        var vm = this;
        var resultColors = [ 'rgba(38, 196, 236, 0.15)', 'rgba(38, 196, 236, 0.09)', 'rgba(38, 196, 236, 0.04)'];
        var defaultResultColor = '#ffffff';
        var logoStash = [
            'AirCanada',
            'AirFrance',
            'AirTransat',
            'AlaskaAirlines',
            'AmericanAirlines',
            'BritishAirways',
            'Delta',
            'FrontierAirlines',
            'GreatLakesAirlines',
            'JetBlueAirways',
            'Lufthansa',
            'Other',
            'PorterAirlines',
            'SpiritAirlines',
            'Swiss',
            'United',
            'VirginAmerica',
            'WestJet'
        ];

        var rowsByIndex = [];
        vm.rows = [];

        vm.updateRows = updateRows;
        vm.promptPrice = promptPrice;
        vm.searchOffers = searchOffers;
        vm.completedRequests = 0;
        vm.totalRequests = 0;
        vm.percentComplete = 0;

        function updateRows() {
            // Make a copy of the rows and sort by price
            var displayRows = vm.rows.slice();
            displayRows.sort(function (rowA, rowB) {
                return rowA.grandTotalPrice / (rowA.completedRequests + 1) - rowB.grandTotalPrice / (rowB.completedRequests + 1);
            });

            var nbErrorRows = 0;
            for (var i = 0; i < displayRows.length; i++) {
                var targetRow = vm.rows[displayRows[i].index];
                if (!targetRow.error) {
                    var adjustedI = i - nbErrorRows;
                    targetRow.style.top = adjustedI * ROW_HEIGHT + "px";
                    targetRow.style.opacity = 1;
                    targetRow.style.backgroundColor = adjustedI > resultColors.length ? defaultResultColor : resultColors[adjustedI];
                } else {
                    $log.info("error");
                    targetRow.style.top = 0;
                    targetRow.style.opacity = 0;
                    targetRow.style.display = "none";
                    nbErrorRows++;
                }
            }

            document.getElementById("column-container").style.height = (vm.rows.length - nbErrorRows) * ROW_HEIGHT + 10 + "px";
        }

        function promptPrice(row) {
            var newPrice = parseFloat(prompt("Enter new price")) || row.grandTotalPrice;
            row.grandTotalPrice = typeof newPrice.toFixed === "function" ? newPrice.toFixed(2) : row.grandTotalPrice;
            updateRows();
        }

        function searchOffers(numberOfAdultTravelers, destinations) {
            var width = destinations.length * 300 + 300;
            $(".progress").fadeIn();

            vm.rows = dataservice.permute(destinations);

            _calculateTotalRequests();

            vm.rows.forEach(function (row, index){
                row.grandTotalPrice = 0;
                row.index = index;
                row.style = {
                    opacity: 0,
                    top: "0px",
                    width: width + "px"
                };
                row.completedRequests = 0;

                row.forEach(function (flight){
                   dataservice.getData(numberOfAdultTravelers, flight).then(function (data) {
                       vm.completedRequests++;
                       vm.percentComplete = vm.completedRequests / vm.totalRequests * 100;

                       if (typeof data === "undefined" || "error" in data) {
                           if ("error" in data) {
                               $log.info("API Error: " + data.error);
                           }
                           flight.error = true;
                           row.error = true;
                           updateRows();
                       } else {
                           flight.response = data;
                           if (logoStash.indexOf(data.airlineLogo) == -1) {
                               flight.response.airlineLogo = 'Other';
                           }

                           var startTime = new Date(data.segments[0].departureTime);
                           var endTime = new Date(data.segments[data.segments.length - 1].arrivalTime);
                           var duration = moment.duration(endTime.getTime() - startTime.getTime());
                           flight.response.duration = duration.hours() + "h" + duration.minutes() + "m";

                           flight.stops = 0;
                           flight.segmentText = "direct flight";
                           if (data.segments && data.segments.length > 1) {
                               flight.stops = data.segments.length - 1;
                               flight.segmentText = flight.stops + " stop" + (flight.stops == 1 ? "" : "s") + ":\n";
                               data.segments.forEach(function (segment) {
                                   flight.segmentText += segment.departureAirportLocation + " (" + segment.departureAirportCode + ") ➞ " + segment.arrivalAirportLocation + " (" + segment.arrivalAirportCode + ")\n";
                               });
                           }

                           row.grandTotalPrice += data.totalPrice;
                           row.completedRequests++;
                           updateRows();
                       }

                       if (vm.percentComplete === 100) {
                           _completeSearch();
                       }
                   });
                });
            });
        }

        function _calculateTotalRequests() {
            vm.totalRequests = 0;
            vm.completedRequests = 0;
            vm.percentComplete = 0;
            vm.rows.forEach(function (row) {
                row.forEach(function () {
                    vm.totalRequests++;
                });
            });
        }

        function _completeSearch() {
            $(".progress").delay(2000).fadeOut();

            // Make a copy of the rows and sort by price
            var theOneRowWeWant, minPrice = 90071992547;
            vm.rows.forEach(function (row) {
                if (!("error" in row) && row.grandTotalPrice < minPrice) {
                    minPrice = row.grandTotalPrice;
                    theOneRowWeWant = row;
                }
            });

            if (typeof theOneRowWeWant !== "undefined") {
                cityService.getCities().then(function (cities) {
                    var positions = [];
                    theOneRowWeWant.forEach(function (flight) {
                        cities.forEach(function (city) {
                            if (city.codes.indexOf(flight.departureAirport) !== -1) {
                                positions.push({
                                    lat: parseFloat(city.position.lat),
                                    lng: parseFloat(city.position.lng)
                                });
                            }
                        });
                    });
                    $scope.$$childHead.form.drawItinerary(positions);
                });
            }
        }
    }
}());
