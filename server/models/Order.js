const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const orderSchema = new Schema({
    user: {type: ObjectId, ref: "User"},
    dateOrdered: {type: Date, default: Date.now},
    deviceList: [{type: ObjectId, ref: 'DeviceList', require: true}],
    phone: {type: String},
    address: {type: String},
    city: {type: String},
    zip: {type: String},
    country: {type: String},
    totalPrice: {type: Number},
    orderStatus: {type: Boolean, required: true, default: 'false'}
}, {
    timestamps: true
});

module.exports = model('Order', orderSchema);