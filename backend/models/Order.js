const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const orderSchema = new Schema({
    user: {type: ObjectId, ref: "User", require: true},
    deviceList: [{type: ObjectId, ref: 'DeviceList', require: true}],
    totalPrice: {type: Number},
    phone: {type: String},
    address: {type: String},
    city: {type: String},
    zip: {type: Number},
    country: {type: String},
    cardNumber: {type: Number},
    cardDateMonth: {type: Number},
    cardDateYear: {type: Number},
    orderStatus: {type: Boolean, default: 'false', require: true},
}, {
    timestamps: true
});

module.exports = model('Order', orderSchema);