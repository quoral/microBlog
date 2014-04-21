var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    basicCredentials = require('./config');

module.exports = function(db){
    'use strict';
    passport.use(
        new FacebookStrategy({
            
        },
                             function(accessToken, refreshToken, profile, done){
                             })
    );
    return passport;
};
