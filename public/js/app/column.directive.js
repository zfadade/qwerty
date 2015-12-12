(function() {
    'use strict';
    angular
        .module('columnsApp')
        .directive('column', column);

    function column() {
        var directive = {
            restrict: 'E',
            templateUrl: 'html/column.directive.html',
            transclude: true
        };

        return directive;
    }
}());
