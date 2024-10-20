const { Schema, model } = require("mongoose")
const { ObjectId } = Schema

const deviceSchema = new Schema(
  {
    name: { type: String, required: true, default: "Devise", trim: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: ObjectId, required: true, ref: "Category" },
    brand: { type: ObjectId, required: true, ref: "Brand" },
    description: { type: String, default: "" },
    countInStock: { type: Number, required: true, min: 0, max: 100 },
    rating: { type: Number, default: 0 },
    color: { type: ObjectId, required: true, ref: "Color" },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  },
)

deviceSchema.pre("save", function (next) {
  this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
  next()
})

module.exports = model("Device", deviceSchema)
