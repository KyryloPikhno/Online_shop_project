const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const {userRouter, authRouter, deviceRouter, categoryRouter, orderRouter, brandRouter, colorRouter} = require("./routes");


const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

mongoose.set("strictPopulate", false);

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/category', categoryRouter);

app.use('/brand', brandRouter);

app.use('/color', colorRouter);

app.use('/devices', deviceRouter);

app.use('/order', orderRouter);

app.get('/', (req, res) => {
    res.json('WELCOME');
});

const start = async () => {
    try {
        let dbCon = false;

        while (!dbCon) {
            try {
                console.log('Connecting to database...');
                await mongoose.connect(process.env.MONGO_URI);
                dbCon = true;
                console.log('Database available!!!');
            } catch (e) {
                console.log('Database unavailable, wait 5 seconds');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        await app.listen(+process.env.PORT, process.env.HOST);
        console.log(`Server listen ${process.env.PORT}`);
    } catch (e) {
        console.log(e);
    }
};

start();