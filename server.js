'use strict';



var config = require('./server/config/config');
var app = require('./server/config/bootstrap')();


app.listen(config.port);
console.log('Express app started on port ' + config.port);

exports = module.exports = app;
