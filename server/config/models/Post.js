'use strict';

module.exports = function(sequelize, DataTypes){
    var Post = sequelize.define('Post', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    }, {

    });
    Post.sync();
    return Post;
};
