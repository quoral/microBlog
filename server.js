'use strict';

var express = require('express'),
    config = require('./server/config/config');



var app = express();

require('./server/config/express')(app);

var db = require('./server/config/sequelize');

db.sequelize.complete(function(err){
  if(!!err){
    console.log('Unable to connect to the db:', err);
  } else{
    app.listen(config.port);
    console.log('Server started on port', config.port);
  }
});


exports = module.exports = app;
