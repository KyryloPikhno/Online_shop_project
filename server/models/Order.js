const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const orderSchema = new Schema({
    _user: { type: ObjectId, ref: "User" },
    orderDate: {type: String, required: true, default: ''},
    _listDevise:{type: Array, ref: "Devise" },
    amount:{type: Number },
    totalCost: {type: String, required: true, trim: true, lowercase: true, unique: true},
    address: {type: String, required: true},
    orderStatus: { type: Boolean, default: 'false' }
}, {
    timestamps: true
});

module.exports = model('Order', orderSchema);