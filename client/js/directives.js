define(['angular', 'services', 'directives/mbPosts', 'directives/mbPost', 'directives/mbComment', 'directives/mbRequiredRole'], function(angular, services, mbPosts, mbPost, mbComment, mbRequiredRole) {
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
        .directive('mbRequiredRole', mbRequiredRole)
        .directive('mbPosts', mbPosts)
        .directive('mbPost', mbPost)
        .directive('mbComment', mbComment);
});
