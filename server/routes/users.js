'use strict';
var auth = require('./middlewares/auth');
var userRoles = require('../config/config').userRoles;
module.exports = function(app, passport){
    var User = app.get('models').User;
    var Post = app.get('models').Post;
    var routeUtils = require('./utilities/routeUtils.js')(app);

    app.get('/rest/users', function(req, res){
        var getAllUsers = routeUtils.findAll(User, {}, {include:[Post]});
        getAllUsers(req, res);
    });
    
    app.get('/rest/users/:id', function(req, res){
        var getUser = routeUtils.find(User, {
            where: {
                id: req.params.id
            }
        }, {});
        getUser(req, res);
    });

    app.del('/rest/users/:id', [auth.requiresLogin, auth.requiresRole(userRoles.admin)], function(req, res){
        var deleteUser = routeUtils.del(User, {
            where: {
                id: req.params.id
            }
        }, [function(){return true;}], 'user:removed');
        deleteUser(req, res);
    });

    app.put('/rest/users/:id', [auth.requiresLogin, auth.requiresRole(userRoles.admin)], function(req, res){
        var userPut = routeUtils.put(User, {
            where: {
                id: req.params.id
            }
        }, function(req){
            return {
                username: req.body.username,
                name: req.body.name,
                role: req.body.role
            };
        }, {}, [function(){return true;}], 'user:modified');
        userPut(req,res);
    });

};
