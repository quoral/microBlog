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
                templateUrl: 'client/partials/menu-template.html'
            };
        }])
        .directive('mbMenuItem', ['$location', function($location) {
            return function(scope, element, attrs){
                    if(attrs.href === $location.path()){
                        element.addClass('active');
                    }
                };
        }])
        .directive('mbPost', [function(){
            return {
                templateUrl: 'client/partials/post-template.html',
                scope: {
                    post: '&mbPost',
                    removePost: '&removePost',
                    editable: '&editable'
                }
            };

        }]);

});
