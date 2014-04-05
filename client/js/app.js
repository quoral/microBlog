define([
    'angular',
    'directives',
    'controllers',
    'angularRoute',
  ], function(angular, directives, controllers){
    'use strict';

    return angular.module('microBlog', [
      'ngRoute',
      'microBlog.controllers',
    ]);
});
