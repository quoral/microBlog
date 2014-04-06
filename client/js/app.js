define([
    'angular',
    'services',
    'directives',
    'controllers',
    'angularRoute',
  ], function(angular, services, directives, controllers){
    'use strict';
    return angular.module('microBlog', [
      'ngRoute',
      'microBlog.controllers',
      'microBlog.services',
      'microBlog.directives'
    ]);
});
