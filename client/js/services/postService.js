define([''], function(){
    'use strict';
    return ['$http', function($http){
        return {
            get: function(id){
                return $http.get('rest/posts/'+id);
            },
            getAll: function(){
                return $http.get('rest/posts');
            },
            post: function(postData){
                return $http.post('rest/posts',postData);
            },
            delete: function(id){
                return $http.delete('rest/posts/'+id);
            },
            put: function(id, post){
                return post;
            },
        };
    }];
});
