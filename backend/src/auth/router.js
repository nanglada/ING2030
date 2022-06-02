const express = require('express');
const router = express.Router();

// Este router va a ser montado sobre rutas de '/api/auth'

router.post('/signup', (req, res) => {
    console.log("Registered successfully!");
});

router.post('/signin', (req, res) => {
    console.log("Returning token, user info and authoritie.");
});



module.exports = router;