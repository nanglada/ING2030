const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const modelRouter = require("./router");

const { Restaurant } = require("./restaurant");

class Item extends Model {

}

Item.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgs: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, { sequelize, modelName: "item" });

Item.belongsTo(Restaurant, {
    onDelete: "CASCADE",
    foreignKey: { allowNull: false }
});
Restaurant.hasMany(Item, {
    foreignKey: { allowNull: false }
});


module.exports = {
    router: modelRouter(Item, "El ítem de menú"),
    Restaurant
}; 