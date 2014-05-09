define([''], function(){
    'use strict';
    return ['$http', function($http){
        var getAllPromise;
        var service =  {
            users: [],
            get: function(id){
                return $http.get('rest/users/'+id);
            },
            getAll: function(forceReload){
                if(forceReload === true || !getAllPromise){
                    getAllPromise = $http.get('rest/users')
                        .then(function(data, status){
                            service.users = data.data;
                        });
                }
                return getAllPromise;

            },
            delete: function(id){
                return $http.delete('rest/users/'+id)
                    .then(function(data, status){g
                        for(var i = 0; i < service.users.length; i++){
                            if(service.users[i].id === id){
                                service.users.splice(i,1);
                                break;
                            }
                        }
                    });
            },
            put: function(id, postData){
                return $http.put('rest/users/'+id, postData)
                    .then(function(data, status){
                        for(var i = 0; i < service.users.length; i++){
                            if(service.users[i].id === id){
                                service.users[i] = data.data;
                                break;
                            }
                        }
                    });
            }
        };
        return service;
    }];
});
