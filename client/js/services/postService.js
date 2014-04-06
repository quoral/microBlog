define([''], function(){
  'use strict';
    return [function(){
      var posts = [];
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
          post.id = posts.push(post)-1;
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
