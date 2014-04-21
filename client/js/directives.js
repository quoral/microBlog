define(['angular', 'services'], function(angular, services) {
    'use strict';

    /* Directives */
    angular.module('microBlog.directives', ['microBlog.services'])
        .directive('post', [function() {
            return function(scope, elm, attrs) {
                elm.text('wat');
            };
        }]);
});
