require('dotenv').config();
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const { STRING } = DataTypes;


class Seller extends Model { }

Seller.init({
    name: {
        type: STRING,
        allowNull: false,
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            is: /^\S+@\S+\.\S+$/
        }
    },
    region: {
        type: STRING,
        allowNull: false,
    },
    address: {
        type: STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, modelName: "seller"
});


module.exports = Seller; 