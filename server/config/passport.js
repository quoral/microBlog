var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    credentials = require('./credentials');

module.exports = function(db){
    'use strict';
    var User = db.models.User;
    passport.use(
        new FacebookStrategy(credentials.facebook,
                             function(accessToken, refreshToken, profile, done){
                                 var searchObj = {
                                     username: profile.id,
                                     provider: profile.provider,
                                     providerId: profile.id,
                                     name: profile.displayName,
                                 };
                                 User.findOrCreate(searchObj)
                                     .success(function(user, created){
                                         done(null, user);
                                     })
                                     .error(function(err){
                                         done(err);
                                     });
                             })
    );

    passport.use(
        new TwitterStrategy(credentials.twitter,
                             function(accessToken, refreshToken, profile, done){
                                 var searchObj = {
                                     username: profile.id,
                                     provider: profile.provider,
                                     providerId: profile.id,
                                     name: profile.displayName,
                                 };
                                 User.findOrCreate(searchObj)
                                     .success(function(user, created){
                                         done(null, user);
                                     })
                                     .error(function(err){
                                         done(err);
                                     });
                             })
    );


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.find(id)
            .success(function(user){
                done(null, user);
            })
            .error(function(err){
                done(err, null);
            });
    });

    return passport;
};
