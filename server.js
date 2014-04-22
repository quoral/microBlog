'use strict';

var express = require('express'),
    config = require('./server/config/config');



var app = express();


var db = require('./server/config/sequelize');


db.sequelize.complete(function(err){
  if(!!err){
    console.log('Unable to connect to the db:', err);
  } else{
    var passport = require('./server/config/passport')(db);
    require('./server/config/express')(app, db, passport);
    app.listen(config.port, '127.0.0.1');
    console.log('Server started on port', config.port);
  }
});


exports = module.exports = app;
