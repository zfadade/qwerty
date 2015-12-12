(function() {
    'use strict';
    angular
        .module('columnsApp')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', '$log', '$interval', 'dataservice'];

    function FormController($scope, $log, $interval, dataservice) {
        var vm = this;

        vm.submit = submit;
        vm.addDestination = addDestination;
        vm.deleteRow = deleteRow;
        vm.initMap = initMap;
        vm.updateDestinationMap = updateDestinationMap;
        vm.drawItinerary = drawItinerary;

        vm.markers = [];

        vm.numberOfAdultTravelers = 1;
        vm.startDestination = {
            codes: [],
            city: "",
            departureDate: ""
        };
        vm.destinations = [new Destination()];
        vm.flightPath = [];

        vm.styleMap = {height: "350px"};

        function initMap() {
           vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 1,
                center: {lat: 0, lng: 0},
                mapTypeId: google.maps.MapTypeId.TERRAIN
            });
        }

        function updateDestinationMap() {
            deleteMarkers();
            var destinations = getAllDestinations();
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < destinations.length; i++) {
                if ("position" in destinations[i]) {
                    console.log(destinations[i]);
                    vm.markers.push(new google.maps.Marker({
                        position: destinations[i].position,
                        map: vm.map,
                        label: destinations[i].city,
                        title: destinations[i].city
                    }));

                    vm.markers[vm.markers.length - 1].setMap(vm.map);
                    bounds.extend(vm.markers[vm.markers.length - 1].getPosition());
                }
            }
            if (vm.markers.length > 1)
                vm.map.fitBounds(bounds);
        }

        function drawItinerary(positions) {
            deleteMarkers();
            var bounds = new google.maps.LatLngBounds();
            positions.forEach(function (position, index) {
                vm.markers.push(new google.maps.Marker({
                    position: position,
                    map: vm.map,
                    label: (index + 1) + ""
                }));
                vm.markers[vm.markers.length - 1].setMap(vm.map);
                bounds.extend(vm.markers[vm.markers.length - 1].getPosition());
            });

            var lineSymbol = { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW };

            var paths = [];

            positions.push(positions[0]);

            for (var i = 1; i < positions.length; i++) {
                paths.push([positions[i - 1], positions[i]]);
            }

            paths.forEach(function (path, index) {
                vm.flightPath.push(new google.maps.Polyline({
                    path: path,
                    icons: [{
                        icon: lineSymbol,
                        offset: '100%'
                    }],
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                }));
                vm.flightPath[vm.flightPath.length - 1].setMap(vm.map);
            });

            vm.map.fitBounds(bounds);
        }

        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
            setMapOnAll(null);
            vm.markers = [];
            vm.flightPath = [];
        }

        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            for (var i = 0; i < vm.markers.length; i++) {
                vm.markers[i].setMap(map);
            }
            for (i = 0; i < vm.flightPath.length; i++) {
                vm.flightPath[i].setMap(map);
            }
        }

        function submit() {
            var permuterInfo = getAllDestinations();
            $scope.$parent.columns.searchOffers(vm.numberOfAdultTravelers, permuterInfo);
        }

        function getAllDestinations() {
            return [vm.startDestination].concat(vm.destinations);
        }

        function addDestination() {
            vm.destinations.push(new Destination());
            updateDestinationMap();
        }

        function deleteRow(index) {
            if (vm.destinations.length > 1) {
                vm.destinations.splice(index, 1);
                updateDestinationMap();
            }
        }

        function Destination() {
            this.codes = [];
            this.city = "";
            this.stayDuration = 0;
        }
    }
}());
