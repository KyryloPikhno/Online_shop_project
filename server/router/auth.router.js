const router = require("express").Router();
const crypto = require("crypto-js");

const User = require("../dataBase/User");
require('dotenv').config();


router.post('/register', async (req, res) => {
    try {
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password: crypto.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_WORD).toString(),
    })
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json(e)
    }
});

router.post('/login', async (req, res) => {


});


module.exports = router;
