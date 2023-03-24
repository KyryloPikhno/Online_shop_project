const {model, Schema} = require("mongoose");

const brandSchema = new Schema({
        name: {type: String, trim: true, require: true, maxlength: 32, unique: true}
    },
    {timestamps: true}
);

brandSchema.pre('save', function(next) {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    next();
});

module.exports = model("Brand", brandSchema);