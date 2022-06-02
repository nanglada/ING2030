const express = require("express");
const path = require("path");
const buyer = require('./users/buyer.routes');
const seller = require('./users/seller.routes');
const restaurant = require('./models/restaurant');
const review = require("./models/review"); 
const sequelize = require("./database");
const menu = require("./models/menuItem");
const cors = require("cors");
const authRouter = require('./auth/router');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors()); 


app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));



app.use("/api/auth", authRouter);
app.use("/api/restaurant", restaurant.router);
app.use("/api/buyer", buyer);
app.use("/api/seller", seller);
app.use("/api/review", review.router);
app.use("/api/menu", menu.router);

app.get('*', (req, res) => res.sendFile(path.resolve('public/index.html')));

sequelize.sync(); 

app.listen(PORT, () => { });