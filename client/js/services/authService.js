define([''], function(){
    'use strict';
    return ['$http', '$location','userRoles', function($http, $location, userRoles){
        var currentUserPromise;
        var service = {
            currentUser: {},
            getUserInfo: function(forceReload){
                if(forceReload === true || !currentUserPromise){
                    currentUserPromise = $http.get('/rest/auth/thisUser')
                        .then(function(data, status){
                            service.currentUser = data.data;
                        });
                }
                return currentUserPromise;
            },
            editUserInfo: function(postData){
                return $http.put('/rest/auth/thisUser', postData)
                    .then(function(data, status){
                        service.currentUser = data.data;
                    });
            },
            logout: function(){
                var promise = $http.get('/rest/auth/logout');
                promise.then(function(data){
                    service.currentUser = {};
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
