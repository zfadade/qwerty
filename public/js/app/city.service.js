(function() {
    'use strict';
    angular
        .module('form')
        .factory("cityService", cityService);

    cityService.$inject = ['$http', '$log', '$cacheFactory', '$q'];

    function cityService($http, $log, $cacheFactory, $q) {

        var cache = $cacheFactory('cities');

        return {
            getCities: getCities
        };

        function getCities(callback) {
            var cachedCities = cache.get("cities");

            // Return cached cities in promise
            if (cachedCities) {
                return $q(function (resolve, reject) {
                    resolve(cachedCities);
                });
            }

            // Return server cities in promise
            return $http.get("/getCities")
                .then(getDataComplete)
                .catch(getDataFailed);

            function getDataComplete(response) {
                // $log.info(response.data);
                cache.put("cities", response.data);
                return response.data;
            }

            function getDataFailed(error) {
                $log.error("Error contacting server for cities request", + error.data);
            }
        }
    }
}());
