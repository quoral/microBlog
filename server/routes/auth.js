'use strict';
module.exports = function(app, passport){
    
    app.get('/rest/auth/facebook', passport.authenticate('facebook'));

    app.get('/rest/auth/facebook/callback',
            passport.authenticate('facebook', { successRedirect: '/',
                                                failureRedirect: '/login' }
                                 )
           );

};
