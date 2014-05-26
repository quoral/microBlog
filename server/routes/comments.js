'use strict';

var auth = require('./middlewares/auth');
var userRoles = require('../config/config').userRoles;
module.exports = function(app, passport){
    var Post = app.get('models').Post;
    var User = app.get('models').User;
    var Comment = app.get('models').Comment;
    var routeUtils = require('./utilities/routeUtils')(app);
    var io = app.get('socket.io');

    app.post('/rest/posts/:id/comments', [auth.requiresLogin, auth.requiresRole(userRoles.user)], function(req, res, next){
        var foundPost = false;
        var socketId = req.headers.socketid;
        console.log(req.params.id);
        Post.find(req.params.id)
            .then(function(post){
                if(post){
                    foundPost = post;
                    var comment = Comment.build(req.body);
                    return comment.save();
                }
                else{
                    console.log('wat');
                    res.status(404).send();
                }
            })
            .then(function(savedComment){
                return savedComment.setUser(req.user);
            })
            .then(function(savedComment){
                return savedComment.setPost(foundPost);
            })
            .then(function(newComment){
                var payload = newComment.toJSON();
                if(socketId){
                    var socket = io.sockets.in(socketId).sockets[socketId];
                    socket.broadcast.emit('comment:created', payload);
                }
                res.send(JSON.stringify(payload));
            },function(err){
                console.log('Failed /rest/posts/:id/comments post with', err);
                res.status(500).send();
            });
    });

    app.get('/rest/posts/:id/comments', function(req, res){
        var getAllComments = routeUtils.findAll(Comment, {
            where: {
                postId: req.params.id
            }
        }, {include: [User, Post]});
        getAllComments(req, res);
    });

    app.get('/rest/posts/:postId/comments/:commentId', function(req, res){
        var getComment = routeUtils.find(Comment,
            {
                where: {
                    id: req.params.commentId,
                    postId: req.params.postId
                }
            },{include: [User, Post]}
        );
        getComment(req, res);
    });

    app.del('/rest/posts/:postId/comments/:id', [auth.requiresLogin, auth.requiresRole(userRoles.user)], function(req, res, next){
        var deleteComment = routeUtils.del(Comment, {
            where: {
                id: req.params.id,
                postId: req.params.postId
            }
        },[function(entity){return entity.UserId === req.user.id;},
            function(entity){return req.user.role === 'ADMIN';}
        ], 'comment:removed');
        deleteComment(req, res);
    });

    app.put('/rest/posts/:postId/comments/:commentId', [auth.requiresLogin, auth.requiresRole(userRoles.user)], function(req, res){
        var commentPut = routeUtils.put(Comment, {
            where: {
                postId: req.params.postId,
                id: req.params.commentId
            }
        }, function(req){
            return {
                text: req.body.text
            };
        }, {},
            [function(entity){return entity.UserId === req.user.id;},
            function(entity){return req.user.role === 'ADMIN';}
        ],'comment:modified');
        commentPut(req, res);
    });

};
