const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
}, {
    timestamps: true,
});


module.exports = model('User', userSchema);