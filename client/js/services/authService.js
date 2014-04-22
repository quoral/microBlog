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
        };
    }];
});
