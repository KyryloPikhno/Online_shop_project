const {model, Schema} = require('mongoose');
const { ObjectId } = Schema;


const deviceListSchema = new Schema({
    quantity: {type: Number, required: true},
    device: {type: ObjectId, ref: 'Device'}
});

module.exports = model('DeviceList', deviceListSchema);
