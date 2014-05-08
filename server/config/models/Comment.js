'use strict';

module.exports = function(sequelize, DataTypes){
    var Comment = sequelize.define('Comment', {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    }, {

    });
    return Comment;
};
