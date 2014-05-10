define(['angular'], function(angular){
    'use strict';
    return ['$scope', 'userService', function($scope, userService){
        $scope.users = [];
        userService.getAll();

        $scope.removeUser = function(id) {
            userService.delete(id);
        };

        $scope.editUser = function(id, user){
            var userObj = angular.copy(user);
            console.log(userObj);
            userService.put(id, userObj);
        };

        $scope.$watch(function () {
                return userService.users;
            },
            function(newVal, oldVal) {
                $scope.users = userService.users;
            },
            true);

        $scope.$apply();
    }];
});
