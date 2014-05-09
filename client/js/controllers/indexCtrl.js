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
                .success(function(data, status){
                    //Add the post to the correct position
                    $scope.posts.push(data);
                    $scope.clearForm();
                })
                .error(function(data, status){
                    console.log('Failed adding post', status);
                });
        };


        $scope.updatePosts = function(){
            postService.getAll()
                .success(function(data, status){
                    $scope.posts = data;
                    console.log(data);
                })
                .error(function(data, status){
                    console.log('Failed to update posts', status);
                });
        };

        $scope.removePost = function(id){
            console.log('REMOVING');
            console.log(id);
            postService.delete(id)
                .success(function(data, status){
                    console.log('Succedded in removing post');
                    for(var i = 0; i < $scope.posts.length; i++){
                        if($scope.posts[i].id === id){
                            $scope.posts.splice(i,1);
                            console.log('Found post, removing');
                            break;
                        }
                    }
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
