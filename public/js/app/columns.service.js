(function() {
    'use strict';
    angular
        .module('columnsApp')
        .factory("dataservice", dataservice);

    dataservice.$inject = ['$http', '$log'];

    function dataservice($http, $log) {
        return {
            getData: getData,
            permute: permute
        };

        function getData(numberOfAdultTravelers, flight) {

            flight.url = "/getBestFlight?" + "departureAirport=" + flight.departureAirport +
            "&arrivalAirport=" + flight.arrivalAirport +
            "&departureDate=" + flight.departureDate.toISOString().slice(0,10) +
            "&numberOfAdultTravelers=" + numberOfAdultTravelers;

            return $http.get(flight.url)
                .then(getDataComplete)
                .catch(getDataFailed);

            function getDataComplete(response) {
                return response.data;
            }

            function getDataFailed(error) {
                $log.error("Error contacting server for data request", + error.data);
            }
        }

        /**
         Function permute(nodes)

         Returns list of all possible permutations.
         The first aiport in the input list is the Home airport.
         Possible permutations will go from Home to Home.
         A city may have more than one airport.

         input data =
             [ // list of airports
                 { // First entry in the list is always home. There's only one home.
                     codes: ["HHH"], // list of 3-letter airport code(s)
                     city: "City Home",
                     departureDate=YYYY-MM-DD // date
                 },
                 {
                     codes: ["AAA", "AA2"],
                     city: "City A",
                     stayDuration: N // days
                 }, ..
             ]

         output data =
             [ // list of all possible permutations
                 [ // list of flights
                     { // leg 1
                         departureAirport: "HHH" // departure airport code = home
                         arrivalAirport: "AAA" // arrival airport code
                         departureDate=YYYY-MM-DD
                     },
                     :
                     { // last leg back home
                         departureAirport: "CCC" // departure airport code
                         arrivalAirport: "HHH" // arrival airport code = home
                         departureDate=YYYY-MM-DD
                     }
                 ], ..
             ]
         */
        function permute(airports) {
            var perms = [],
                home = airports.splice(0, 1)[0];

            function rpermute(cities) {
                var i, l, subcities, city, perms = [], perms1;
                if (cities.length === 0) return [];
                if (cities.length == 1) {
                    perms1 = [];
                    city = cities[0];
                    city.codes.forEach(function (code) {
                        perms1.push({
                            code: code,
                            city: city.city,
                            stayDuration: city.stayDuration
                        });
                    });
                    return perms1;
                }
                for (i = 0, l = cities.length; i < l; i++) {
                    subcities = cities.slice();
                    city = subcities.splice(i, 1)[0];
                    rpermute(subcities).forEach(function (e) {
                        city.codes.forEach(function (code) {
                            perms.push([{
                                code: code,
                                city: city.city,
                                stayDuration: city.stayDuration
                            }].concat(e));
                        });
                    });
                }
                return perms;
            }

            function legs(perms) {
                var all_flights = [];

                function addDays(date, days) {
                    return new Date(date.getTime() + 864e5 * days);
                }

                perms.forEach(function (perm) {
                    var flights = [],
                        departure_airport, departure_date;
                    perm.forEach(function (airport, i) {
                        if (i === 0) {
                            departure_airport = airport.code;
                            departure_date = new Date(airport.departureDate);
                            return;
                        }
                        flights.push({
                            departureAirport: departure_airport,
                            arrivalAirport: airport.code,
                            departureDate: departure_date
                        });
                        departure_airport = airport.code;
                        departure_date = addDays(departure_date, airport.stayDuration);
                    });
                    all_flights.push(flights);
                });
                return all_flights;
            }

            home.codes.forEach(function (code) {
                var h2 = {
                    code: code,
                    city: home.city,
                    departureDate: home.departureDate
                };
                rpermute(airports).forEach(function (e) { perms.push([h2].concat(e).concat([h2])); });
            });

            return legs(perms);
        }
    }
}());
