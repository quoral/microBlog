define(['socket.io'], function(io){
    'use strict';

    return [function(){
        var socket = io.connect('http://localhost:8081');
        return socket;
    }];

});