'use strict';

var userRoles = require('../../config/config').userRoles;

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    return next();
};

exports.requiresRole = function(role){
    return function(req, res, next){
        if(role === userRoles.admin &&
           userRoles.admin === req.user.role){
            return next();
        }
        else if(role === userRoles.poster &&
                (req.user.role === userRoles.admin || req.user.role === userRoles.poster))
            return next();
        else if(role === userRoles.user &&
                (req.user.role === userRoles.admin || req.user.role === userRoles.poster || req.user.role === userRoles.user)){
            return next();
        }
        return res.send(403, 'User is not allowed');
    };
};
