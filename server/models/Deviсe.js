const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const deviceSchema = new Schema({
    name: {type: String, required: true, default: 'Devise', trim: true},
    price: {type: Number, required: true, default: 0},
    category: {type: ObjectId, required: true, ref: "Category"},
    brand: {type: String, default: ''},
    description: {type: String, default: ''},
    images: [{type: String}],
}, {
    timestamps: true
});

module.exports = model('Device', deviceSchema);