require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')

const authRouter = require('./router/auth.router');
const userRouter = require('./router/user.router');


const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json('WELCOME')
});

app.listen(PORT, async () => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
        console.log(`Server start on ${PORT}`)
    } catch (e) {
        console.log(e)
    }
});
