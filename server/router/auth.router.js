const router = require("express").Router();
const CryptoJS = require("crypto-js");

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

    const password = hashPassword.toString(CryptoJS.enc.Utf8);

    password !== req.body.password && res.status((401).json('Wrong credentials'))

    res.status(200).json(user)
}catch (e){
    res.status(500).json(e)
}
});


module.exports = router;
