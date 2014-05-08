'use strict';

var Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path'),
    appPath = process.cwd(),
    db = require('./config').db;
var sequelize = new Sequelize(db.dbName, db.username, db.password, {
    dialect: db.dialect,
    port: db.port,
});


var modelsPath = appPath + '/server/config/models';
module.exports.models = {};
var walk = function(path){
    fs.readdirSync(path).forEach(function(file){
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if(stat.isFile()){
            var model = sequelize.import(newPath);
            module.exports.models[model.name] = model;
        }
    });
};
walk(modelsPath);

// Create assocations
module.exports.models.User.hasMany(module.exports.models.Post);
module.exports.models.Post.belongsTo(module.exports.models.User);

module.exports.models.User.hasMany(module.exports.models.Comment);
module.exports.models.Comment.belongsTo(module.exports.models.User);

module.exports.models.Post.hasMany(module.exports.models.Comment);
module.exports.models.Comment.belongsTo(module.exports.models.Post);


if(!sequelize.sync()){
    sequelize.sync({force:true});
    console.error('Sequelize could not sync, so I forced it :(');
}
module.exports.sequelize = sequelize.authenticate();
