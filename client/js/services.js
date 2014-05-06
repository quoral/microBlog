define([
    'angular',
    'services/postService',
    'services/authService',
    'services/userService'
], function(angular, postService, authService, userService){
    'use strict';
    var services = angular.module('microBlog.services', []);
    services.factory('authService', authService);
    services.factory('postService', postService);
    services.factory('userService', userService);
    services.constant('userRoles', {
        admin: 'ADMIN',
        poster: 'POSTER',
        user: 'USER'
    });
            
    
    return services;
});
