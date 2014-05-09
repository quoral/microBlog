define([], function(){
    'use strict';
    return  [function(){
        return {
            templateUrl: 'client/partials/posts-template.html',
            controller: ['$scope', 'postService', 'authService', function($scope, postService, authService){
                $scope.posts = [];

                $scope.removePost = function(id){
                    postService.delete(id)
                        .then(function(data, status){
                            console.log('Succedded in removing post');
                        },function(data, status){
                            console.log('Failed to remove post', status);
                        });
                };

                $scope.$watch(function () {
                        return postService.posts;
                    },
                    function(newVal, oldVal) {
                        $scope.posts = postService.posts;
                    },
                    true);
                $scope.$watch(function () {
                        return authService.currentUser;
                    },
                    function(newVal, oldVal) {
                        $scope.currentUser = authService.currentUser;
                    },
                    true);
            }]
        };
    }];
});