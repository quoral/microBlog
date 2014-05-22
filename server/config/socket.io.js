var io = require('socket.io');
module.exports = function(http) {
    'use strict';
    var socketIo = io.listen(http);
    socketIo.on('connection', function(socket) {
        socket.join(socket.id);
        socket.emit('server_socket_id', {socketId: socket.id});
    });
    return socketIo;
};