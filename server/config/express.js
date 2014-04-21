'use strict';

var express = require('express'),
    appPath = process.cwd(),
    consolidate = require('consolidate'),
    fs = require('fs'),
    config  = require('./config');

module.exports = function(app, db, passport){
    app.set('showStackError', true);

    app.locals.pretty = true;

    app.locals.cache = 'memory';
    app.engine('html', consolidate[config.templateEngine]);
    app.set('view engine', 'html');
    console.log(config.root);
    app.set('views', config.root + '/server/views');
    //Singleton for models
    app.set('models', db.models);
    app.configure(function(){
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.session({ secret: 'SECRET' }));
        app.use(express.cookieParser());

        app.use(passport.initialize());
        app.use(passport.session());
        


        // app.use(expressValidator());
        // app.use(express.methodOverride());

        app.use('/client', express.static(config.root + '/client'));
        
        var routePath = appPath + '/server/routes';
        fs.readdirSync(routePath).forEach(function(file){
            var newPath = routePath + '/' + file;
            var stat = fs.statSync(newPath);
            if(stat.isFile() && file !== 'index.js'){
                console.log('Loaded file', newPath);
                require(newPath)(app, passport);
            }
        });

        app.use(app.router);
        //This is a catch-all for the SPA
        require(routePath+'/index')(app);
    });//End of configuration
    return app;
};
