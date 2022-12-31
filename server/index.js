require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const userRouter = require('./router/user.router');


const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json('WELCOME')
});

app.listen(PORT, async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
        console.log(`Server start on ${PORT}`)
    } catch (e) {
        console.log(e)
    }
});
