define([], function(){
    'use strict';
    return ['$scope', 'userService', function($scope, userService){
        $scope.users = [];
        userService.getAll();

        $scope.removeUser = function(id) {
            userService.delete(id);
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
