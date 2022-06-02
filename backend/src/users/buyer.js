require('dotenv').config();
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const { STRING } = DataTypes;


class Buyer extends Model { }

Buyer.init({
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
    role: {
        type: STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, modelName: "buyer"
});


module.exports = Buyer; 