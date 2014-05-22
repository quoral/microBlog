define([
    'angular',
    'services/postService',
    'services/authService',
    'services/userService',
    'services/socketIo'
], function(angular, postService, authService, userService, socketIo){
    'use strict';
    var services = angular.module('microBlog.services', []);
    services.factory('authService', authService);
    services.factory('postService', postService);
    services.factory('userService', userService);
    services.factory('SocketIo', socketIo);
    services.constant('userRoles', {
        admin: 'ADMIN',
        poster: 'POSTER',
        user: 'USER'
    });
            
    
    return services;
});
