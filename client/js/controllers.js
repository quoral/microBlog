define(['angular'], function(angular){
    'use strict';
    return angular.module('microBlog.controllers', [])
        .controller('MainCtrl', ['$scope', '$injector', function($scope, $injector){
            require(['controllers/mainCtrl'], function(IndexCtrl){
                $injector.invoke(IndexCtrl, this, {'$scope': $scope});
            });
        }])
        .controller('IndexCtrl', ['$scope', '$injector', function($scope, $injector){
            require(['controllers/indexCtrl'], function(IndexCtrl){
                $injector.invoke(IndexCtrl, this, {'$scope': $scope});
            });
        }]);
});
