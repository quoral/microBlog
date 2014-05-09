define([], function(){
    'use strict';
    return ['$scope', 'postService', function($scope, postService){
        $scope.clearForm = function(){
            $scope.postHeader = '';
            $scope.postText = '';
            $scope.postForm.$setPristine();
        };
        $scope.addPost = function(postText, postHeader){
            postService.post({text:postText, header: postHeader})
                .then(function(data, status){
                    $scope.clearForm();
                }, function(data, status){
                    console.log('Failed adding post', status);
                });
        };

        postService.getAll();

        //This is needed since the controller is loaded asynchroneusly.
        //We thus 'miss' Angular's call to $apply when the controller is loaded.
        $scope.$apply();
    }];
});
