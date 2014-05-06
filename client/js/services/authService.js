define([''], function(){
    'use strict';
    return ['$http', '$location','userRoles', function($http, $location, userRoles){
        var service = {
            currentUser: {},
            getUserInfo: function(){
                var promise = $http.get('/rest/auth/thisUser');
                promise.then(function(data){
                    service.currentUser = data.data;
                    service.hasBeenLoaded = true;
                },function(err){
                    
                });
                return promise;
            },
            editUserInfo: function(postData){
                return $http.put('/rest/auth/thisUser', postData);
            },
            hasBeenLoaded: false,
            logout: function(){
                var promise = $http.get('/rest/auth/logout');
                promise.then(function(data){
                    service.currentUser = {};
                    $location.path('/');
                },function(err){
                    
                });
                return promise;

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
        };
        return service;
    }];
});
