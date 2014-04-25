define([], function(){
    'use strict';
    return ['$scope', 'userService', function($scope, userService){
        $scope.users = [];

        $scope.updateUsers = function(){
            userService.getAll()
                .success(function(data, status){
                    $scope.users = data;
                })
                .error(function(data, status){
                    console.log('Failed getting users', status);
                });
        };

        $scope.updateUsers();
        $scope.$apply();
    }];
});
