'use strict';

var express = require('express');

module.exports = function(){
   var app = express();
   require('./express')(app);
   return app;
 };
