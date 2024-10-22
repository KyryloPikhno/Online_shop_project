const { Schema, model } = require("mongoose")
const { ObjectId } = Schema

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *         - brand
 *         - color
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the device
 *           example: "iPhone 13"
 *         price:
 *           type: number
 *           description: The price of the device
 *           example: 999.99
 *         category:
 *           type: string
 *           description: The ID of the category
 *         brand:
 *           type: string
 *           description: The ID of the brand
 *         description:
 *           type: string
 *           description: The device description
 *           example: "Latest model of iPhone"
 *         countInStock:
 *           type: number
 *           description: Count of items in stock
 *           example: 50
 *         rating:
 *           type: number
 *           description: Device rating
 *           example: 4.5
 *         color:
 *           type: string
 *           description: The ID of the color
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs
 */
const deviceSchema = new Schema(
  {
    name: { type: String, required: true, default: "Device", trim: true },
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
