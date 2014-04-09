'use strict';

var express = require('express'),
    config = require('./server/config/config');



var app = express();


var db = require('./server/config/sequelize');


db.sequelize.complete(function(err){
  if(!!err){
    console.log('Unable to connect to the db:', err);
  } else{
    require('./server/config/express')(app, db);
    app.listen(config.port);
    console.log('Server started on port', config.port);
  }
});


exports = module.exports = app;
