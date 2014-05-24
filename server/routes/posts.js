'use strict';

var auth = require('./middlewares/auth');
var userRoles = require('../config/config').userRoles;

module.exports = function(app, passport){
    var Post = app.get('models').Post;
    var User = app.get('models').User;
    var Comment = app.get('models').Comment;
    var routeUtils = require('./utilities/routeUtils')(app);
    var io = app.get('socket.io');

    app.post('/rest/posts', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res){
        var post = Post.build(req.body);
        var socketId = req.headers.socketid;

        post.save()
            .error(function(err){
                console.log('Failed /rest/posts post with', err);
                res.status(500).send();
            })
            .success(function(newPost){
                newPost.setUser(req.user).success(function(){

                    var payload = newPost.toJSON();
                    res.send(JSON.stringify(payload));
                    if(socketId){
                        var socket = io.sockets.in(socketId).sockets[socketId];
                        socket.broadcast.emit('post:created', payload);
                    }
                });

            });
    });

    app.get('/rest/posts', function(req, res){
        var getAllPosts = routeUtils.findAll(Post, {}, {include: [User, Comment]});
        getAllPosts(req,res);
    });

    app.get('/rest/posts/:id', function(req, res){
        var getPost = routeUtils.find(Post, {
            where: {
                id: req.params.id
            }
        }, {include: [User, Comment]});
        getPost(req, res);
    });

    app.del('/rest/posts/:id', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res){
        var deletePost = routeUtils.del(Post, {
            where: {
                id: req.params.id
            }
        },[function(entity){return entity.UserId === req.user.id;},
           function(entity){return req.user.role === 'ADMIN';}
        ], 'post:removed');
        deletePost(req, res);
    });

    app.put('/rest/posts/:id', [auth.requiresLogin, auth.requiresRole(userRoles.poster)], function(req, res){
        var postPut = routeUtils.put(Post, {
                where: {
                    id: req.params.id
                }
            },
            function(req){
                return {
                    text: req.body.text,
                    header: req.body.header
                };
            },{include:[User, Comment]},
            [function(entity){return entity.UserId === req.user.id;},
             function(entity){return req.user.role === 'ADMIN';}
            ], 'post:modified');
        postPut(req,res);
    });




};
