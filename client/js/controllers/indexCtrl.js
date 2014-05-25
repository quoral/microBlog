define([], function(){
    'use strict';
    return ['$scope', 'postService', function($scope, postService){
        postService.getAll();

        //This is needed since the controller is loaded asynchroneusly.
        //We thus 'miss' Angular's call to $apply when the controller is loaded.
        $scope.$apply();
    }];
});
