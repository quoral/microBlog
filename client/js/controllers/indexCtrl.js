define([], function(){
  'use strict';
  return ['$scope', 'postService', function($scope, postService){
    $scope.hi = 'wat';
    $scope.posts = postService.getAll();
    $scope.addPost = function(postText){
      postService.post({text:postText});
      return '';
    };
    $scope.removePost = function(id){
      postService.delete(id);
    };
    //This is needed since the controller is loaded asynchroneusly.
    //We thus 'miss' Angular's call to $apply when the controller is loaded.
    $scope.$apply();
  }];
});
