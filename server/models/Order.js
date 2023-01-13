const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const orderSchema = new Schema({
    _user_id: { type: ObjectId, ref: "User" },
    orderDate: {type: String, default: ''},
    _listDevise:{type: Array, ref: "Devise" },
    amount:{type: Number },
    totalCost: {type: String, trim: true, lowercase: true, unique: true},
    address: {type: String},
    orderStatus: { type: Boolean, default: 'false' }
}, {
    timestamps: true
});

module.exports = model('Order', orderSchema);