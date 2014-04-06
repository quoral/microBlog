define([
    'angular',
    'services/postService'
  ], function(angular, postService){
    'use strict';
    var services = angular.module('microBlog.services', []);
    services.service('postService', postService);
    
    return services;
  });
