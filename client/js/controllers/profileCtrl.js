define([], function(){
    'use strict';
    return ['$scope', 'authService', function($scope, authService){
        $scope.save = function(username, name){
            var data = {'username': username, 'name': name};
            authService.editUserInfo(data)
                .success(function(data, status){
                    console.log('Saved data');
                });
        };
        $scope.$apply();
    }];
});
