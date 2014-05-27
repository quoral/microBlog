define(['socket.io'], function(io){
    'use strict';

    return ['$rootScope', '$location', function($rootScope, $location){
        var formatedConnectionUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();
        var socket = io.connect(formatedConnectionUrl);

        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }];

});