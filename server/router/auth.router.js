const router = require("express").Router()
const User = require("../dataBase/User")


router.post('/register', async (req, res) => {

    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try {
        // const savedUser = await newUser.create()
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json(e)
    }
});

module.exports = router;
