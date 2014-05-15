'use strict';
exports.put = function(Entity, entityId, updateFunction, options){
    return function(req, res){
        Entity.find(entityId)
            .then(function(singleEntity){
                if(singleEntity === null){
                    res.status(404).send();
                }
                else{
                    return singleEntity.updateAttributes(updateFunction(req));
                }
            })
            .then(function(singleEntity){
                return Entity.find(options, singleEntity.dataValues.id);
            })
            .then(function(singleEntity){
                res.status(200).send(JSON.stringify(singleEntity));
            });
    };
};