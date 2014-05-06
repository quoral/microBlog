define([], function(){
    'use strict';
    return ['$scope', 'authService', 'userRoles','$window', function($scope, authService, userRoles,$window){
        $scope.logout = function logout(){
            authService.logout();
        };
        $scope.$watch(function () {
            return authService.currentUser;
        },                       
                      function(newVal, oldVal) {
                          $scope.currentUser = authService.currentUser;
                      }, 
                      true);
        authService.getUserInfo();
        $scope.roleIsAuthenticated = authService.roleIsAuthenticated;
        $scope.roles = userRoles;
        $scope.$apply();
    }];
});
