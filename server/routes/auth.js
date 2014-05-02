'use strict';
var auth = require('./middlewares/auth');

module.exports = function(app, passport){
    
    app.get('/rest/auth/facebook', passport.authenticate('facebook'));

    app.get('/rest/auth/facebook/callback',
            passport.authenticate('facebook', { successRedirect: '/',
                                                failureRedirect: '/login' }
                                 )
           );

    app.get('/rest/auth/twitter', passport.authenticate('twitter'));

    app.get('/rest/auth/twitter/callback',
            passport.authenticate('twitter', { successRedirect: '/',
                                                failureRedirect: '/login' }
                                 )
           );

    
    app.get('/rest/auth/thisUser', auth.requiresLogin, function(req, res){
        res.send(req.user.dataValues);
    });
    app.put('/rest/auth/thisUser', auth.requiresLogin, function(req, res){
        var User = app.get('models').User;
        User.find(req.user.dataValues.id)
            .success(function(user){
                user.updateAttributes({
                    username: req.body.username,
                    name: req.body.name
                })
                    .success(function(newUser){
                        res.send(JSON.stringify(newUser));
                    })
                    .error(function(){
                        res.send(500);
                    });
            })
            .error(function(err){
                console.log('Failed /rest/posts delete with', err);
                res.status(500).send();
            });
    });
    
    app.get('/rest/auth/logout', auth.requiresLogin, function(req, res){
        req.logout();
        res.send(200);
    });
};
