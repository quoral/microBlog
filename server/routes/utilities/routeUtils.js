'use strict';
exports.put = function(Entity, searchObj, updateFunction, options){
    return function(req, res){
        Entity.find(searchObj)
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


exports.findAll = function(Entity, searchObj, options){
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
};

exports.del = function(Entity, searchObj){
    return function(req, res){
        Entity.find(searchObj)
            .then(function(singleEntity){
                if(singleEntity === null){
                    res.status(404).send();
                    return false;
                }
                else{
                    return singleEntity.destroy();
                }
            })
            .then(function(){
                res.status(200).send();
            },function(err){
                console.log('Failed general delete with', err);
                res.status(500).send();
            });
    };
};

exports.find = function(Entity, searchObj, options){
    return function(req, res){
        Entity.find(searchObj, options)
            .success(function(singleEntity){
                if(singleEntity === null){
                    res.status(404).send();
                }
                else{
                    res.send(JSON.stringify(singleEntity));
                }
            })
            .error(function(err){
                console.log('Failed general get with', err);
                res.status(500).send();
            });
    };
};