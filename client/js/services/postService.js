define(['socket.io'], function(io){
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
            posts: {},
            get: function(id){
                return $http.get('rest/posts/'+id)
                    .then(function(data){
                        service.posts[data.data.id] = data.data;
                    });
            },
            getAll: function(forceReload){
                if(forceReload === true || !getAllPromise){
                    getAllPromise = $http.get('rest/posts')
                        .then(function(data, status){
                            data.data.forEach(function(post){
                                var comments = {};
                                post.comments.forEach(function(comment){
                                    comments[comment.id] = comment;
                                });
                                post.comments = comments;
                                service.posts[post.id] = post;
                            });
                        });
                }
                return getAllPromise;
            },
            post: function(postData){
                return $http.post('rest/posts',postData)
                    .then(function(data, status){
                        data.data.comments = [];
                        service.posts[data.data.id] = data.data;
                    });
            },
            delete: function(id){
                return $http.delete('rest/posts/'+id)
                    .then(function(data, status){
                        delete service.posts[id];
                    });
            },
            put: function(id, post) {
                return $http.put('rest/posts/' + id, post)
                    .then(function (data, status) {
                        service.posts[data.data.id] = data.data;
                    });
            },
            comment: {
                get: function(postId, commentId){
                    return $http.get('rest/posts/'+postId+'/comments/'+commentId)
                        .then(function(data, status){
                            var comment = data.data;
                            service.posts[comment.PostId].comments[comment.id] = comment;
                        });
                },
                getAll: function(postId){
                    return $http.get('rest/posts/'+postId+'/comments')
                        .then(function(data, status){
                            var comments = {};
                            data.data.forEach(function(comment){
                                comments[comment.id] = comment;
                            });
                            service.posts[postId].comments = comments;
                        });
                },
                post: function(postId, postData){
                    return $http.post('rest/posts/'+postId+'/comments',postData)
                        .then(function(data, status){
                            service.posts[data.data.PostId].comments[data.data.id] = data.data;
                        });
                },
                delete: function(postId, commentId){
                    return $http.delete('rest/posts/'+postId+'/comments/'+commentId)
                        .then(function(data, status){
                            delete service.posts[postId].comments[commentId];
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
