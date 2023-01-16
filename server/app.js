const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {userRouter, authRouter, deviceRouter} = require("./routes");
const{config} = require("./configs")

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictPopulate", false);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/devices', deviceRouter);

app.get('/', (req, res) => {
    res.json('WELCOME')
});

app.listen(config.PORT, async () => {
    try {
        await mongoose.set('strictQuery', false)
        await mongoose.connect(`mongodb://localhost:27017/${config.DB_NAME}`);
        console.log(`Server listen ${config.PORT}`);
    } catch (e) {
        console.log(e)
    }
});
