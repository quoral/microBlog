'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 8081,
    templateEngine: 'swig',
    db: {
        dbName: 'microblog',
        username: 'root',
        password: 'passwd',
        dialect: 'mysql',
        port: 3306,
    },
};
