'use strict';
var auth = require('./middlewares/auth');
var userRoles = require('../config/config').userRoles;

module.exports = function(app, passport){
    var User = app.get('models').User;
    
    app.get('/rest/users', function(req, res){
        User.all()
            .success(function(users){
                res.send(JSON.stringify(users));
            })
            .error(function(err){
                console.log('Failed /rest/posts get with', err);
                res.status(500).send();
            });
    });
    
    app.get('/rest/users/:id', function(req, res){
        User.find(req.params.id)
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

    app.del('/rest/users/:id', [auth.requiresLogin, auth.requiresRole(userRoles.admin)], function(req, res, next){
        User.find(req.params.id)
            .success(function(singlePost){
                if(singlePost === null){
                    res.status(404).send();
                    return;
                }
                singlePost.destroy()
                    .success(function(){
                        res.status(200).send();
                    })
                    .error(function(){
                        console.log('Failed to remove', req.params.id);
                        res.status(500).send();
                    });
            })
            .error(function(err){
                console.log('Failed /rest/posts delete with', err);
                res.status(500).send();
            });
    });


};
