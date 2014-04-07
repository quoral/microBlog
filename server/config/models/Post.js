'use strict';

module.exports = function(sequelize, DataTypes){
  var Post = sequelize.define('Post', {
    text: DataTypes.STRING
  }, {

  });
  return Post;
};
