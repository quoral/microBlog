'use strict';
var auth = require('./middlewares/auth');
var userRoles = require('../config/config').userRoles;
var routeUtils = require('./utilities/routeUtils.js');
module.exports = function(app, passport){
    var User = app.get('models').User;
    var Post = app.get('models').Post;
    app.get('/rest/users', function(req, res){
        User.all({include:[Post]})
            .success(function(users){
                res.send(JSON.stringify(users));
            })
            .error(function(err){
                console.log('Failed /rest/posts get with', err);
                res.status(500).send();
            });
    });
    
    app.get('/rest/users/:id', function(req, res){
        User.find(req.params.id, {include:[Post]})
            .success(function(singleUser){
                if(singleUser === null){
                    res.status(404).send();
                    return;
                }
                res.send(JSON.stringify(singleUser));
            })
            .error(function(err){
                console.log('Failed /rest/posts post with', err);
                res.status(500).send();
            });
    });

    app.del('/rest/users/:id', [auth.requiresLogin, auth.requiresRole(userRoles.admin)], function(req, res){
        User.find(req.params.id)
            .then(function(singleUser){
                if(singleUser === null){
                    res.status(404).send();
                    return false;
                }
                else{
                    return singleUser.destroy();
                }
            })
            .then(function(){
                res.status(200).send();
            },function(err){
                console.log('Failed /rest/posts delete with', err);
                res.status(500).send();
            });
    });

    app.put('/rest/users/:id', [auth.requiresLogin, auth.requiresRole(userRoles.admin)], function(req, res){
        var userPut = routeUtils.put(User, req.params.id, function(req){
            return {
                username: req.body.username,
                name: req.body.name,
                role: req.body.role
            };
        }, {include:[Post]});
        userPut(req,res);
    });

};
