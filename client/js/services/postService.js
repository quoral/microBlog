define([''], function(){
    'use strict';
    return ['$http', function($http){
        var getAllPromise;
        var service =  {
            posts: [],
            get: function(id){
                return $http.get('rest/posts/'+id);
            },
            getAll: function(forceReload){
                if(forceReload === true || !getAllPromise){
                    getAllPromise = $http.get('rest/posts')
                        .then(function(data, status){
                            service.posts = data.data;
                        });
                }
                return getAllPromise;
            },
            post: function(postData){
                return $http.post('rest/posts',postData)
                    .then(function(data, status){
                        service.posts.push(data);
                    });
            },
            delete: function(id){
                return $http.delete('rest/posts/'+id)
                    .then(function(data, status){
                        for(var i = 0; i < service.posts.length; i++){
                            if(service.posts[i].id === id){
                                service.posts.splice(i,1);
                                break;
                            }
                        }
                    });
            },
            put: function(id, post){
                return post;
            }
        };
        return service;
    }];
});
