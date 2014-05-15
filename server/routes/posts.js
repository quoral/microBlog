'use strict';

var auth = require('./middlewares/auth');
var userRoles = require('../config/config').userRoles;
var routeUtils = require('./utilities/routeUtils');

module.exports = function(app, passport){
    var Post = app.get('models').Post;
    var User = app.get('models').User;
    var Comment = app.get('models').Comment;
    app.post('/rest/posts', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res){
        var post = Post.build(req.body);
        console.log('Entered posting');
        post.save()
            .error(function(err){
                console.log('Failed /rest/posts post with', err);
                res.status(500).send();
            })
            .success(function(newPost){
                newPost.setUser(req.user).success(function(){
                    res.send(JSON.stringify(newPost));
                });

            });
    });

    app.get('/rest/posts', function(req, res){
        var getAllPosts = routeUtils.getAll(Post, {include: [User]});
        getAllPosts(req,res);
    });

    app.get('/rest/posts/:id', function(req, res){
        var getPost = routeUtils.get(Post, req.params.id, {include: [User]});
        getPost(req, res);
    });

    app.del('/rest/posts/:id', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res){
        Post.find(req.params.id)
            .then(function(singlePost){
                if(singlePost === null){
                    res.status(404).send();
                }
                else{
                    return singlePost.destroy();
                }
            })
            .then(function(){
                res.status(200).send();
            }, function(err){
                console.log('Failed /rest/posts delete with', err);
                res.status(500).send();
            });
    });

    app.put('/rest/posts/:id', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res){
        var postPut = routeUtils.put(Post, req.params.id, function(req){
            return {
                text: req.body.text,
                header: req.body.header
            };
        }, {include:[User]});
        postPut(req,res);
    });




};
