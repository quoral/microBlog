'use strict';
module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isPoster: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        provider:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        providerId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    }, {
        
    });
    return User;

};
