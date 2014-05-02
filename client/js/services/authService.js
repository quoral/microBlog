define([''], function(){
    'use strict';
    return ['$http', function($http){
        return {
            getUserInfo: function(){
                return $http.get('/rest/auth/thisUser');
            },
            logout: function(){
                return $http.get('/rest/auth/logout');
            },
            roleIsAuthenticated: function(role, requiresRole){
                if('ADMIN' === requiresRole &&
                   'ADMIN' === role){
                    return true;
                }
                else if('POSTER' === requiresRole &&
                        ('ADMIN' === role || 'POSTER' === role))
                    return true;
                else if('USER' === requiresRole &&
                        ('ADMIN' === role || 'POSTER' === role || 'USER' === role)){
                    return true;
                }
                else{
                    return false;
                }
            },
            roles: {
                admin: 'ADMIN',
                poster: 'POSTER',
                user: 'USER'
            }
        };
    }];
});
