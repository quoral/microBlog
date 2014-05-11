'use strict';

var auth = require('./middlewares/auth');
var userRoles = require('../config/config').userRoles;
module.exports = function(app, passport){
    var Post = app.get('models').Post;
    var User = app.get('models').User;
    var Comment = app.get('models').Comment;
    app.post('/rest/posts', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res, next){
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
        Post.all({include: [User]})
            .success(function(posts){
                res.send(JSON.stringify(posts));
            })
            .error(function(err){
                console.log('Failed /rest/posts get with', err);
                res.status(500).send();
            });
    });

    app.get('/rest/posts/:id', function(req, res){
        Post.find(req.params.id)
            .success(function(singlePost){
                if(singlePost === null){
                    res.status(404).send();
                }
                else{
                    res.send(JSON.stringify(singlePost));
                }
            })
            .error(function(err){
                console.log('Failed /rest/posts post with', err);
                res.status(500).send();
            });
    });

    app.del('/rest/posts/:id', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res, next){
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

    app.put('/rest/posts/:id', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res, next){
        Post.find(req.params.id)
            .then(function(singlePost){
                if(singlePost === null){
                    res.status(404).send();
                }
                else{
                    return singlePost.updateAttributes({
                        text: req.body.text,
                        header: req.body.header
                    });
                }
            })
            .then(function(singlePost){
                return Post.find({include:[User]}, singlePost.dataValues.id);
            })
            .then(function(singlePost){
                res.status(200).send(JSON.stringify(singlePost));
            });
    });




};
