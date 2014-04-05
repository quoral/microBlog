'use strict';

var express = require('express'),
    appPath = process.cwd(),
    consolidate = require('consolidate'),
    config  = require('./config');

module.exports = function(app){
  app.set('showStackError', true);

  app.locals.pretty = true;

  app.locals.cache = 'memory';
  app.engine('html', consolidate[config.templateEngine]);
  app.set('view engine', 'html');
  console.log(config.root);
  app.set('views', config.root + '/server/views');

  app.configure(function(){

    app.use('/client', express.static(config.root + '/client'));
    var routes_path = appPath + '/server/routes';
    app.use(app.router);
    //This is a catch-all for the SPA
    require(routes_path+'/index')(app);
  });





};
