define([], function(){
    'use strict';
    return ['$scope', function($scope){
        $scope.$on('auth:adminRequired', function(scope, message){
            console.log('Caught broadcast');
        });
        $scope.$apply();
    }];
});
