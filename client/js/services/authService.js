define([''], function(){
    'use strict';
    return ['$http', function($http){
        return {
            getUserInfo: function(){
                return $http.get('/rest/auth/isAuthenticated');
            },
            logout: function(){
                return $http.get('(rest/auth/logout');
            },
            login: function(){
                return $http.get('/rest/login');
            }
        };
    }];
});
