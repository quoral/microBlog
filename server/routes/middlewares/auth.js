'use strict';
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    return next();
};

exports.requiresPosting = function(req, res, next) {
    if(!req.user.isPoster){
        return res.send(401, 'User is not authorized to post');
    }
    return next();
};
