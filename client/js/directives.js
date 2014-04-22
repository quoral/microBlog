define(['angular', 'services'], function(angular, services) {
    'use strict';

    /* Directives */
    angular.module('microBlog.directives', ['microBlog.services'])
        .directive('loginButtons', [function() {
            return {
                restrict: 'E',
                templateUrl: 'client/partials/login-buttons-template.html',
                controller: ['$scope', '$window', function($scope, $window){
                    $scope.login = function(provider){
                        $window.location.href = '/rest/auth/' + provider;
                    };
                }]
            };
        }]);
});
