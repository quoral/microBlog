define([], function(){
    'use strict';
    return ['$scope', 'authService', '$window', function($scope, authService, $window){
        $scope.updateInfo = function updateInfo(){
            authService.getUserInfo()
                .success(function(data, status){
                    console.log(data);
                    $scope.currentUser = data;
                });
        };
        $scope.updateInfo();
        $scope.login = function login(){
            $window.location.href = '/rest/auth/facebook';
        };
        $scope.logout = function(){
            authService.logout()
                .success(function(data, status){
                    $scope.currentUser = undefined;
                });
        };
        $scope.$on('auth:adminRequired', function(scope, message){
        });
        $scope.$apply();
    }];
});
