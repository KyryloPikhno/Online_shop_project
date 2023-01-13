const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true, default: '', trim: true, maxlength: 32},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: String, enum: ['admin', 'user'], default: 'user'},
    history: {type: Array, default: []}
}, {
    timestamps: true
});

module.exports = model('User', userSchema);
