var io = require('socket.io');
module.exports = function(http) {
    'use strict';

    return io.listen(http);
};