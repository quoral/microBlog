define([], function(){
    'use strict';
    return ['$scope', 'authService', '$window', function($scope, authService, $window){
        $scope.currentUser = null;
        $scope.updateInfo = function updateInfo(){
            authService.getUserInfo()
                .success(function(data, status){
                    console.log(data);
                    $scope.currentUser = data;
                });
        };
        $scope.logout = function logout(){
            authService.logout()
                .success(function(data, status){
                    $scope.currentUser = null;
                });
        };
        $scope.updateInfo();
        $scope.$apply();
    }];
});
