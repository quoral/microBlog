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
    
    app.get('/rest/auth/logout', auth.requiresLogin, function(req, res){
        req.logout();
        res.send(200);
    });
};
