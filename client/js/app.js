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
    app.run(['$rootScope', '$location', 'authService',function ($rootScope, $location, authService ) {
        $rootScope.$on('$routeChangeStart', function (event, current, previous) {
            if(!current.$$route){
                return;
            }
            var role = current.$$route.requiresUserRole;
            if(role){
                authService.getUserInfo(true)
                    .then(function(){
                        if(!authService.roleIsAuthenticated(authService.currentUser.role, role)){
                            $location.path('/');
                        }
                    });
            }
        });
    }]);
    return app;
});
