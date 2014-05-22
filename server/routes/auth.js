'use strict';
var auth = require('./middlewares/auth');
module.exports = function(app, passport){

    var routeUtils = require('./utilities/routeUtils')(app);
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
        var userPut = routeUtils.put(User, {
            where: {
                id: req.user.dataValues.id
            }
        }, function(req){
            return {
                username: req.body.username,
                name: req.body.name
            };
        }, {});
        userPut(req,res);
    });
    
    app.get('/rest/auth/logout', auth.requiresLogin, function(req, res){
        req.logout();
        res.send(200);
    });
};
