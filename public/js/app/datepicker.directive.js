(function() {
    'use strict';
    angular
        .module('form')
        .directive('datePicker', datepickerBuilder);

    function datepickerBuilder() {
        var directive = {
            restrict: 'E',
            transclude: true,
            replace: true,
            link: watchModel,
            templateUrl: 'html/datepicker.directive.html'
        };

        return directive;
    }

    function watchModel (scope, element, attrs) {
        var now = new Date();
        element.find('input').datetimepicker({ minDate: now, defaultDate: now, pickTime: false, format: "YYYY-MM-DD" });
    }
}());
