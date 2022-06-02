const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const { STRING, FLOAT } = DataTypes;
const Buyer = require("../users/Buyer");
const { Restaurant } = require("./restaurant");


class Review extends Model { }
Review.init({
    score: { type: FLOAT, allowNull: false },
    title: { type: STRING, allowNull: false },
    text: { type: STRING, allowNull: false },
}, { sequelize, modelName: "review" });

Buyer.hasMany(Review, {
    foreignKey: { allowNull: false }
});
Review.belongsTo(Buyer, {
    onDelete: "CASCADE",
    foreignKey: { allowNull: false }
});

Restaurant.hasMany(Review, {
    foreignKey: { allowNull: false }
});
Review.belongsTo(Restaurant, {
    onDelete: "CASCADE",
    foreignKey: { allowNull: false }
});


module.exports = Review; 