'use strict';

function securityCheck(functions, entity){
    for (var i = 0; i < functions.length; i++){
        if(functions[i](entity) === true){
            return true;
        }
    }
    return false;
}
module.exports = function(app) {
    var io = app.get('socket.io');
    return {
        put: function (Entity, searchObj, updateFunction, options, securityFunctions, eventName) {
            return function (req, res) {
                var socketId = req.headers.socketid;
                Entity.find(searchObj)
                    .then(function (singleEntity) {
                        if (singleEntity === null) {
                            res.status(404).send();
                        }
                        else {
                            if (securityFunctions && !securityCheck(securityFunctions, singleEntity)) {
                                return res.status(403);
                            }
                            return singleEntity.updateAttributes(updateFunction(req));
                        }
                    })
                    .then(function (singleEntity) {
                        return Entity.find(singleEntity.dataValues.id, options);
                    })
                    .then(function (singleEntity) {
                        var payload = singleEntity.toJSON();
                        if(socketId && eventName !== undefined){
                            var socket = io.sockets.in(socketId).sockets[socketId];
                            socket.broadcast.emit(eventName, payload);
                        }
                        res.status(200).send(JSON.stringify(singleEntity));
                    });
            };
        },
        findAll: function(Entity, searchObj, options){
            return function(req, res){
                Entity.all(options)
                    .success(function(entities){
                        res.send(JSON.stringify(entities));
                    })
                    .error(function(err){
                        console.error('Failed general getAll with', err);
                        res.status(500).send();
                    });
            };
        },
        del: function(Entity, searchObj, securityFunctions, eventName){
            var id;
            return function(req, res){
                var socketId = req.headers.socketid;
                Entity.find(searchObj)
                    .then(function(singleEntity){
                        if(singleEntity === null){
                            res.status(404).send();
                            return false;
                        }
                        else{
                            if(securityFunctions && !securityCheck(securityFunctions, singleEntity)){
                                return res.status(403);
                            }
                            id = singleEntity.dataValues.id;
                            return singleEntity.destroy();
                        }
                    })
                    .then(function(){
                        if(socketId && eventName !== undefined){
                            var socket = io.sockets.in(socketId).sockets[socketId];
                            socket.broadcast.emit(eventName, id);
                            console.log('SOCKET wat');
                        }
                        res.status(204).send();
                    },function(err){
                        console.log('Failed general delete with', err);
                        res.status(500).send();
                    });
            };
        },
        find: function(Entity, searchObj, options, securityFunctions) {
            return function (req, res) {
                Entity.find(searchObj, options)
                    .success(function (singleEntity) {
                        if (singleEntity === null) {
                            res.status(404).send();
                        }
                        else {
                            if (securityFunctions && !securityCheck(securityFunctions, singleEntity)) {
                                return res.status(403);
                            }
                            res.send(JSON.stringify(singleEntity));
                        }
                    })
                    .error(function (err) {
                        console.log('Failed general get with', err);
                        res.status(500).send();
                    });
            };
        }
    };
};