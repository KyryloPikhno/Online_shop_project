const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const orderSchema = new Schema({
    user: {type: ObjectId, ref: "User"},
    dateOrdered: {type: Date, default: Date.now},
    deviceList: [{type: ObjectId, ref: 'DeviceList', require: true}],
    phone: {type: String, required: true},
    address: {type: String},
    city: {type: String, required: true,},
    zip: {type: String, required: true,},
    country: {type: String, required: true,},
    totalPrice: {type: Number},
    orderStatus: {type: Boolean, required: true, default: 'false'}
}, {
    timestamps: true
});

module.exports = model('Order', orderSchema);