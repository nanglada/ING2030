
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const modelRouter = require("./router");
const Buyer  = require("../users/Buyer");

class Restaurant extends Model { }

Restaurant.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quality: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    speed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgs: {
        type: DataTypes.JSON,
        allowNull: false
    },
    checkList: {
        type: DataTypes.JSON,
        allowNull: false
    },
}, { sequelize, modelName: "restaurant" });

Buyer.hasMany(Restaurant, {
    foreignKey: { allowNull: false }
});
Restaurant.belongsTo(Buyer, {
    onDelete: "CASCADE",
    foreignKey: { allowNull: false}
});

const router = modelRouter(Restaurant, "El restaurant"); 

router.get("/owned-by-user/:id", async (req, res) => {
    let rest = await Restaurant.findAll({
        where: {
            BuyerId: req.params.id, 
        }
    }); 
    console.log("REST", rest);
    res.send(rest);
});

router.get("/:id/reviews", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
        return res.status(404).send("El restaurant no existe");
    }
    const reviews = await restaurant.getReviews();
    res.send(reviews);
});

router.get("/:id/items", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
        return res.status(404).send("El restaurant no existe");
    }
    const menuItems = await restaurant.getItems();
    res.send(menuItems);
}); 

module.exports = {
    router,
    Restaurant
}; 