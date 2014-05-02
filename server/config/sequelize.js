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
module.exports.models.User.hasMany(module.exports.models.Post, {as: 'Posts'});
if(!sequelize.sync()){
    console.log('Sequelize could not sync :(');
}
module.exports.sequelize = sequelize.authenticate();
