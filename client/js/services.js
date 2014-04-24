define([
    'angular',
    'services/postService',
    'services/authService',
    'services/userService'
], function(angular, postService, authService, userService){
    'use strict';
    var services = angular.module('microBlog.services', []);
    services.service('authService', authService);
    services.service('postService', postService);
    services.service('userService', userService);
    
    return services;
});
