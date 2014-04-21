define([
    'angular',
    'services/postService',
    'services/authService'
], function(angular, postService, authService){
    'use strict';
    var services = angular.module('microBlog.services', []);
    services.service('authService', authService);
    services.service('postService', postService);
    
    return services;
});
