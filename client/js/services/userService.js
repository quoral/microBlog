define([''], function(){
    'use strict';
    return ['$http', function($http){
        return {
            get: function(id){
                return $http.get('rest/users/'+id);
            },
            getAll: function(){
                return $http.get('rest/users');
            },
            delete: function(id){
                return $http.delete('rest/posts/'+id);
            },
        };
    }];
});
