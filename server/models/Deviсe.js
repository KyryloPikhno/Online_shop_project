const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const deviceSchema = new Schema({
    name: {type: String, required: true, default: 'Devise', trim: true},
    price: {type: Number, required: true, trim: true, maxlength: 32},
    // _category: {type: ObjectId, ref: "Category"},
    // _brand: {type: String},
    // quantity: {type: Number},
    // img: {data: Buffer, contentType: String},
    // _user: {type: ObjectId, ref: "User"}
}, {
    timestamps: true
});

module.exports = model('Device', deviceSchema);