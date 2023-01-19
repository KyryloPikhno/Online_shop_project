const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const deviceSchema = new Schema({
    _user: {type: ObjectId, ref: "User"},
    name: {type: String, required: true, default: 'Devise', trim: true},
    price: {type: Number, required: true, trim: true, maxlength: 32},
    category: {type: String},
    brand: {type: String},
    description: {type: String},
    images: [{type: String}],
}, {
    timestamps: true
});

module.exports = model('Device', deviceSchema);