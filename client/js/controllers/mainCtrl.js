define([], function(){
    'use strict';
    return ['$scope', 'authService', '$window', function($scope, authService, $window){
        $scope.updateInfo = function updateInfo(){
            authService.getUserInfo()
                .success(function(data, status){
                    $scope.currentUser = data;
                });
        };
        $scope.logout = function logout(){
            authService.logout()
                .success(function(data, status){
                    $scope.currentUser = null;
                });
        };
        $scope.roleIsAuthenticated = authService.roleIsAuthenticated;
        $scope.roles = authService.roles;
        $scope.updateInfo();
        $scope.$apply();
    }];
});
