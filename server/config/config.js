'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 8081,
    templateEngine: 'swig',
    userRoles: {
        admin: 'ADMIN',
        poster: 'POSTER',
        user: 'USER'
    },
    db: {
        dbName: 'microblog',
        username: 'root',
        password: 'passwd',
        dialect: 'sqlite',
        storage: 'db.sqlite',
        port: 3306
    }
};
