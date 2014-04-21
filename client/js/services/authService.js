define([''], function(){
    'use strict';
    return ['$http', '$cookieStore', function($http, $cookieStore){
        $http.defaults.headers.common.Authorization = 'Basic ' + $cookieStore.get('authdata');
        //This functionality is borrowed and changed from http://wemadeyoulook.at/en/blog/implementing-basic-http-authentication-http-requests-angular/
        return {
            setCredentials: function (username, password) {
                var encoded = btoa(username + ':' + password);
                $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                $cookieStore.put('authdata', encoded);
            },
            clearCredentials: function () {
                document.execCommand('ClearAuthenticationCache');
                $cookieStore.remove('authdata');
                $http.defaults.headers.common.Authorization = 'Basic ';
            }
        };
    }];
});
