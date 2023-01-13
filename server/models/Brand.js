const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
        name: {type: String, trim: true, require: true, maxlength: 32, unique: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Brand", brandSchema);