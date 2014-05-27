define(['angular', 'semanticUi','services', 'directives/mbPosts', 'directives/mbPost', 'directives/mbComment', 'directives/mbRequiredRole', 'directives/mbModal'], function(angular, semantic, services, mbPosts, mbPost, mbComment, mbRequiredRole, mbModal) {
    'use strict';

    //Stolen from angular
    function toBoolean(value) {
        if (value && value.length !== 0) {
            var v = ('' + value).toLowerCase();
            value = !(v === 'f' || v === '0' || v === 'false' || v === 'no' || v === 'n' || v === '[]');
        } else {
            value = false;
        }
        return value;
    }
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
        .directive('mbModal', mbModal)
        .directive('mbRequiredRole', mbRequiredRole)
        .directive('mbPosts', mbPosts)
        .directive('mbPost', mbPost)
        .directive('mbComment', mbComment);
});
