'use strict';

var auth = require('./middlewares/auth');
var userRoles = require('../config/config').userRoles;
module.exports = function(app, passport){
    var Post = app.get('models').Post;
    var User = app.get('models').User;
    var Comment = app.get('models').Comment;

    app.post('/rest/posts/:id/comments', [auth.requiresLogin, auth.requiresRole(userRoles.user)], function(req, res, next){
        var foundPost = false;
        Post.find(req.params.id)
            .then(function(post){
                if(post){
                    foundPost = post;
                    var comment = Comment.build(req.body);
                    return comment.save();
                }
                else{
                    res.status(404).send();
                }
            })
            .then(function(savedComment){
                return savedComment.setUser(req.user);
            })
            .then(function(savedComment){
                return savedComment.setPost(foundPost);
            })
            .success(function(newComment){
                res.send(JSON.stringify(newComment));
            })
            .error(function(err){
                console.log('Failed /rest/posts/:id/comments post with', err);
                res.status(500).send();
            });
    });

    app.get('/rest/posts/:id/comments', function(req, res){
        Comment.all({include: [User, Post]})
            .success(function(posts){
                res.send(JSON.stringify(posts));
            })
            .error(function(err){
                console.log('Failed /rest/posts get with', err);
                res.status(500).send();
            });
    });

    app.get('/rest/posts/:postId/comments/:commentId', function(req, res){
        var commentId = req.params.id;
        Comment.find(commentId, {include: [User, Post]})
            .success(function(singleComment){
                if(singleComment === null){
                    res.status(404).send();
                }
                else{
                    res.send(JSON.stringify(singleComment));
                }
            })
            .error(function(err){
                console.log('Failed /rest/posts post with', err);
                res.status(500).send();
            });
    });

    app.del('/rest/posts/:postId/comments/:id', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res, next){
        Comment.find(req.params.id)
            .then(function(singleComment){
                if(singleComment === null) {
                    res.status(404).send();
                }
                else{
                    return singleComment.destroy();
                }
            })
            .success(function(singlePost){
                res.status(200).send();
            })
            .error(function(err){
                console.error('Failed /rest/posts delete with', err);
                res.status(500).send();
            });
    });


};
