define([
    'angular',
    'services',
    'directives',
    'controllers',
    'config',
    'angularMarkdownDirective',
    'angularRoute',
], function(angular, services, directives, controllers, config, angularMarkdownDirective, angularRoute){
    'use strict';
    var app = angular.module('microBlog', [
        'ngRoute',
        'microBlog.controllers',
        'microBlog.services',
        'microBlog.directives',
        'btford.markdown'
    ]);
    app.config(['$httpProvider',function($httpProvider) {
        angular.forEach(config.interceptors, function(interceptor){
            $httpProvider.interceptors.push(interceptor);
        });
    }]);
    app.run(['$rootScope', '$location', '$route', 'authService',function ($rootScope, $location, $route,authService ) {
        var redirectIfNotAuthenticated = function(roleRequired){
            if(roleRequired){
                authService.getUserInfo(true)
                    .then(function(){
                        if(!authService.roleIsAuthenticated(authService.currentUser.role, roleRequired)){
                            $location.path('/');
                        }
                    },function(){
                        // This callback is needed since the callback above is not run on 4xx status codes.
                        if(!authService.roleIsAuthenticated(authService.currentUser.role, roleRequired)){
                            $location.path('/');
                        }
                    });
            }
        };
        $rootScope.$watch(function () {
                return authService.currentUser;
            },
            function(newVal, oldVal) {
                if($route.current && $route.current.$$route){

                    var role = $route.current.$$route.requiresUserRole;
                    redirectIfNotAuthenticated(role);
                }
            },
            true);


        $rootScope.$on('$routeChangeStart', function (event, current, previous) {
            if(!current.$$route){
                return;
            }
            var role = current.$$route.requiresUserRole;
            redirectIfNotAuthenticated(role);
        });

    }]);
    return app;
});
