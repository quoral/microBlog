define(['angular', 'services'], function(angular, services) {
    'use strict';

    /* Directives */
    angular.module('microBlog.directives', ['microBlog.services'])
        .directive('mbLoginButtons', [function() {
            return {
                restrict: 'E',
                templateUrl: 'client/partials/login-buttons-template.html',
                controller: ['$scope', '$window', function($scope, $window){
                    $scope.login = function(provider){
                        $window.location.href = '/rest/auth/' + provider;
                    };
                }]
            };
        }])
        .directive('mbMenu', [function(){
            return {
                restrict: 'E',
                templateUrl: 'client/partials/menu-template.html',
                controller: ['$scope', '$location', function($scope, $location){
                    $scope.isActive = function(path){
                        return path === $scope.currentLocation;
                    };

                    $scope.currentLocation = $location.path();
                    
                }]
            };
        }]);
});
