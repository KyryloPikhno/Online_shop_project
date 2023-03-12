const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const userSchema = new Schema({
        name: {type: String, required: true, trim: true, maxlength: 32},
        email: {type: String, required: true, trim: true, lowercase: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type:Boolean, default: false},
    }, {
        timestamps: true
    })
;

module.exports = model('User', userSchema);
