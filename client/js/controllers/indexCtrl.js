define([], function(){
    'use strict';
    return ['$scope', 'postService', function($scope, postService){
        $scope.addPost = function(postText, postHeader){
            postService.post({text:postText, header: postHeader})
                .success(function(data, status){
                    //Add the post to the correct position
                    $scope.posts.push(data);
                })
                .error(function(data, status){
                    console.log('Failed adding post', status);
                });
            return '';
        };

        $scope.updatePosts = function(){
            postService.getAll()
                .success(function(data, status){
                    $scope.posts = data;
                })
                .error(function(data, status){
                    console.log('Failed to update posts', status);
                });
        };

        $scope.removePost = function(id){
            postService.delete(id)
                .success(function(data, status){
                    // This can give sync-issues later on.
                    // could be improved by using a periodic 
                    // polling in order to see if new items are added.
                    // Or simply by using the emitting functionality of websockets later on.
                    var index;
                    for(var i = 0; i < $scope.posts.length; i++){
                        if($scope.posts[i].id === id){
                            index = i;
                            break;
                        }
                    }
                    $scope.posts.splice(index,1);
                })
                .error(function(data, status){
                    console.log('Failed to remove post', status);
                });
        };

        //Get the posts.
        $scope.updatePosts();
        //This is needed since the controller is loaded asynchroneusly.
        //We thus 'miss' Angular's call to $apply when the controller is loaded.
        $scope.$apply();
    }];
});
