define([
    'angular',
    'services',
    'directives',
    'controllers',
    'config',
    'angularRoute',
], function(angular, services, directives, controllers, config, angularRoute){
    'use strict';
    var app = angular.module('microBlog', [
        'ngRoute',
        'microBlog.controllers',
        'microBlog.services',
        'microBlog.directives'
    ]);
    app.config(['$httpProvider',function($httpProvider) {
        angular.forEach(config.interceptors, function(interceptor){
            $httpProvider.interceptors.push(interceptor);
        });
    }]);
    return app;
});
