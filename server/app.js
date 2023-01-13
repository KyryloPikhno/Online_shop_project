const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const {userRouter} = require("./routes");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json('WELCOME')
});

app.listen(process.env.PORT, async () => {
    try {
        await mongoose.set('strictQuery', false)
        await mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`);
        console.log(`Server listen ${process.env.PORT}`);
    } catch (e) {
        console.log(e)
    }
});
