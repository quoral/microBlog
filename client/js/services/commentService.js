define([], function(){
    'use strict';
    return  ['$http', function($http){
        return {
            get: function(postId, commentId){
                return $http.get('rest/posts/'+postId+'/comments/'+commentId);
            },
            getAll: function(postId){
                return $http.get('rest/posts/'+postId+'/comments');
            },
            post: function(postId, postData){
                return $http.post('rest/posts/'+postId+'/comments',postData);
            },
            delete: function(postId, commentId){
                return $http.delete('rest/posts/'+postId+'/comments/'+commentId);
            },
            put: function(id, post){
                return post;
            },
        };
    }];
});