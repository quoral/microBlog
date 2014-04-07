define([''], function(){
  'use strict';
    return [function(){
      var posts = [];
      var nextId = 0;
      return {
        get: function(id){
          return posts[id];
        },
        getAll: function(){
          return posts;
        },
        post: function(postData){
          var post = {};
          post.text = postData.text;
          posts.push(post);
          post.id = nextId++;
          return post;
        },
        delete: function(id){
          var index = -1;
          for(var i = 0; i < posts.length; i++){
            if(posts[i].id === id){
              index = i;
              break;
            }
          }
          if(index === -1){
            return false;
          }
          posts.splice(index, 1);
          return true;
        },
        put: function(id, post){
          return post;
        },
      };
    }];
  });
