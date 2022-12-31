const { Schema, model } = require('mongoose');


const orderSchema = new Schema({
    _user_id: {type: String, required: true},
    products: [
        {
            productId: {type: Number},
            quantity: {type: Number, default: 1}
        }
    ],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, default: "pending"}
}, {
    timestamps: true,
});


module.exports = model('Order', orderSchema);