const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../dataBase/User");
require('dotenv').config();


router.post('/register', async (req, res) => {
    try {
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_WORD).toString(),
    })
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json(e)
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        !user && res.status(401).json('Wrong credentials')

        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_WORD);

        let originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status((401).json('Wrong credentials'))

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECTET, {expiresIn: '3d'});

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken})
    } catch (e) {
        res.status(500).json(e)
    }
});

 
module.exports = router;
