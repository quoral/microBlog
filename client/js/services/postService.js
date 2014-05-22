define([''], function(){
    'use strict';
    return ['$http', function($http){
        var getAllPromise;

        function findIndexById(list, id) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === id) {
                    return i;
                }
            }
        }

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
                        data.data.comments = [];
                        service.posts.push(data.data);
                    });
            },
            delete: function(id){
                return $http.delete('rest/posts/'+id)
                    .then(function(data, status){
                        var index = findIndexById(service.posts, data.data.id);
                        service.posts.splice(index, 1);
                    });
            },
            put: function(id, post) {
                return $http.put('rest/posts/' + id, post)
                    .then(function (data, status) {
                        var index = findIndexById(service.posts, data.data.id);
                        service.posts[index] = data.data;
                    });
            },
            comment: {
                get: function(postId, commentId){
                    return $http.get('rest/posts/'+postId+'/comments/'+commentId)
                        .then(function(data, status){
                            var postIndex = findIndexById(service.posts, data.data.PostId);
                            var commentIndex = findIndexById(service.posts[postIndex].comments, data.data.id);
                            service.posts[postIndex].comments[commentIndex] = data.data;
                        });
                },
                getAll: function(postId){
                    return $http.get('rest/posts/'+postId+'/comments')
                        .then(function(data, status){
                            var postIndex = findIndexById(service.posts, data.data.PostId);
                            service.posts[postIndex].comments = data.data;
                        });
                },
                post: function(postId, postData){
                    return $http.post('rest/posts/'+postId+'/comments',postData)
                        .then(function(data, status){
                            var postIndex = findIndexById(service.posts, data.data.PostId);
                            service.posts[postIndex].comments.push(data.data);
                        });
                },
                delete: function(postId, commentId){
                    return $http.delete('rest/posts/'+postId+'/comments/'+commentId)
                        .then(function(data, status){
                            var postIndex = findIndexById(service.posts, postId);
                            var commentIndex = findIndexById(service.posts[postIndex].comments, commentId);
                            service.posts[postIndex].comments.splice(commentIndex, 1);
                        });
                },
                put: function(id, post){
                    return null;
                }
            }
        };
        return service;
    }];
});
