const { model, Schema } = require("mongoose")

const colorSchema = new Schema(
  {
    name: { type: String, trim: true, require: true, maxlength: 12, unique: true },
  },
  { timestamps: true },
)

colorSchema.pre("save", function (next) {
  this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
  next()
})

module.exports = model("Color", colorSchema)
