(function() {
    'use strict';
    angular
        .module('form')
        .directive('cityDropdown', cityDropdown);

    cityDropdown.$inject = ["$timeout", "cityService"];

    function cityDropdown($timeout, cityService) {
        var directive = {
            restrict: 'E',
            link: link,
            templateUrl: 'html/city-dropdown.directive.html',
            scope: {
                ngModel: '='
            },
            transclude: true
        };

        return directive;

        function link(scope, element, attributes) {
            scope.model = attributes.ngModel;
            scope.cities = [];

            //console.log(scope.model);

            var select$ = element.find('select');
            cityService.getCities().then(function (cities) {
                scope.cities = cities;
            });

            scope.$watch("cities", function (cities) {
                if (cities.length) {
                    $timeout(function () {
                        var selectpicker$ = element.find('select').selectpicker();
                        element.find('select').on("change", function(e) {
                            var location = $(e.target).find("option:selected").scope().location;

                            if (typeof scope.ngModel === "undefined") {
                                scope.ngModel = {};
                            }
                            scope.ngModel.city = location.city;
                            scope.ngModel.codes = location.codes;

                            if("position" in location) {
                                scope.ngModel.position = {};
                                scope.ngModel.position.lat = location.position.lat;
                                scope.ngModel.position.lng = location.position.lng;
                                scope.$parent.form.updateDestinationMap();
                            }
                        });
                    }, 150);
                }
            });
        }
    }
}());
