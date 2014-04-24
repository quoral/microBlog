'use strict';

module.exports = function(sequelize, DataTypes){
    var Post = sequelize.define('Post', {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        header: {
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
    return Post;
};
