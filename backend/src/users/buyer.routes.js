require('dotenv').config();
// TODO: 
//  - change password
const express = require("express");
const bcrypt = require("bcrypt");
const Buyer = require("./buyer");
const Seller = require("./seller");
const jwt = require('jsonwebtoken');
const sequelize = require("sequelize");
const router = express.Router();

router.get("/all", async (req, res) => {
    res.json(
        await Buyer.findAll({
            attributes: { exclude: ['password'] }
        })
    );
});

router.get("/me", async (req, res) => {
    console.log(req.headers);
    let token = req.headers["x-access-token"];
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const buyer = await Buyer.findByPk(decoded.id);
        delete buyer.password;
        res.json(buyer);
    } catch (e) {
        console.log(e);
        res.status(401).send("Unauthorized");
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    let user = await Buyer.findByPk(id);
    if (user) {
        delete user.password;
        res.json(user);
    } else {
        res.json(null);
    }
});


// TODO: 
//  - password hashing
router.post("/", async (req, res) => {
    const body = req.body;
    const buyer = await Buyer.build(body);
    const salt = await bcrypt.genSalt(10);
    buyer.password = await bcrypt.hash(buyer.password, salt);
    try {
        let existentUser = await Buyer.findOne({
            where: {
                name: body.name
            }
        });
        let existentMail = await Buyer.findOne({
            where: {
                email: body.email
            }
        });
        if (existentUser) {
            res.status(400).send({
                message: "Nombre de usuario ya ha sido utilizado."
            });
        } else if (existentMail) {
            res.status(400).send({
                message: "Email ya ha sido utilizado."
            });
        }
        else {
            let token = jwt.sign({ id: buyer.id }, process.env.SECRET_KEY, { expiresIn: "1800s" });
            buyer.save().then((doc) => {
                res.status(201).send({
                    buyer: doc, accessToken: token
                });
            });
        }
    }
    catch (e) {
        if (e instanceof sequelize.ValidationError) {
            res.status(400).send({ error: "El correo electrónico no es válido." });
        }
        console.log(e);
        res.json({ error: e });
    }
});


// TODO: 
//  - permissions
router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let user = await Buyer.findByPk(id);
    if (user) {
        await user.destroy();
        res.json({ "success": true });
    } else {
        res.json({
            "sucess": false,
            "error": "El usuario no fue encontrado."
        });
    }
});


router.post("/login", async (req, res) => {
    const body = req.body;
    const user = await Buyer.findOne({
        where: {
            email: body.email
        }
    });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            delete user.password;
            let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1800s" });
            res.status(200).json({
                message: "Valid password",
                accessToken: token,
                user: user
            });
            console.log("Inicio de sesión exitoso");
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
});

module.exports = router;