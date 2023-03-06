const {model, Schema} = require("mongoose");

const colorSchema = new Schema({
        name: {type: String, trim: true, require: true, maxlength: 12, unique:true}
    },
    { timestamps: true }
);

module.exports = model("Color", colorSchema);