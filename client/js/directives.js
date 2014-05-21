define(['angular', 'services', 'directives/mbPosts', 'directives/mbPost'], function(angular, services, mbPosts, mbPost) {
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
        .directive('mbRequiredRole', ['authService', function(authService){
            return {
                restrict: 'A',
                scope: {
                    'requiredRole': '@role',
                    'requiredUserId': '&userId'
                },
                link: function(scope, element, attrs){
                    scope.$watch(function () {
                            return authService.currentUser;
                        },
                        function(newVal, oldVal) {
                            reEvaluateShow();
                        },
                        true);
                    scope.$watch(function () {
                            return scope.requiredUserId();
                        },
                        function(newVal, oldVal) {
                            reEvaluateShow();
                        },
                        true);
                    function reEvaluateShow(){
                        var isValidUserId, isValidRole;
                        if(authService.currentUser){
                            isValidRole = authService.roleIsAuthenticated(authService.currentUser.role, scope.requiredRole);
                        }
                        if(scope.requiredUserId() && authService.currentUser){
                            isValidUserId = authService.currentUser.id === scope.requiredUserId();
                        }
                        var expr = isValidRole === true || isValidUserId === true;
                        if(expr){
                            element.show();
                        }
                        else{
                            element.hide();
                        }
                    }
                }
            };
        }])
        .directive('mbPosts', mbPosts)
        .directive('mbPost', mbPost);

});
