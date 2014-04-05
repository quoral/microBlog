'use strict';

exports.render = function(req, res){
  res.render('index', {
    message: 'wat'
  });
};
