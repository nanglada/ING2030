const express = require("express");
const router = express.Router();
const multer = require("multer");
const img = multer({ dest: "img" });



module.exports = { router };



