const { Schema, model } = require('mongoose');


const cartSchema = new Schema({
    _user_id: {type: String, required: true},
    products: [
        {
            productId: {type: Number},
            quantity: {type: Number, default: 1}
        }
    ],
}, {
    timestamps: true,
});


module.exports = model('Cart', cartSchema);