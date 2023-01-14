const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const orderSchema = new Schema({
    _user_id: { type: ObjectId, ref: "User"},
    orderDate: {type: String, default: ''},
    _listDevise: [
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        Devise: {
            type: ObjectId,
            ref: "Devise",
            required: true,
        },
    }],
    amount:{type: Number },
    // totalCost: {type: String, trim: true, lowercase: true, unique: true},
    address: {type: String},
    orderStatus: { type: Boolean, default: 'false' }
}, {
    timestamps: true
});

module.exports = model('Order', orderSchema);