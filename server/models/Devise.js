const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;

const deviseSchema = new Schema({
    name: {type: String, required: true, default: 'Devise', trim: true},
    price: {type: Number, required: true,trim: true,maxlength: 32},
    _category: {type: ObjectId, ref: "Category", require: true},
    _brand: {type: String},
    quantity: {type: Number},
    img: { data: Buffer, contentType: String},
}, {
    timestamps: true
});

module.exports = model('Devise', deviseSchema);