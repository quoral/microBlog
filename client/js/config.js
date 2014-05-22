define([], function(){
    'use strict';
    return {
        interceptors: [
            ['$rootScope', '$q', function ($rootScope, $q) {
                return {
                    responseError: function(rejection){
                        if(rejection.status === 401){
                            $rootScope.$broadcast('auth:adminRequired');
                        }
                        return $q.reject(rejection);
                    }
                };
            }],['SocketIo', function (socketIo) {
                var socketId = '';
                socketIo.on('server_socket_id', function(data){
                    socketId = data.socketId;
                });
                return {
                    request: function(config){
                        config.headers.socketId = socketId;
                        return config;
                    }
                };
            }],
        ]
    };
});
