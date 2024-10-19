const { Order, DeviceList, Device } = require("../models")
const { ApiError } = require("../errors")

module.exports = {
  findByParams: (filter = {}) => {
    return Order.find(filter)
      .populate("user", "name")
      .populate({
        path: "deviceList",
        populate: {
          path: "device",
          populate: "category",
        },
      })
      .sort({ createdAt: -1 })
  },

  findOneByParams: (filter = {}) => {
    const order = Order.findById(filter)
      .populate("user")
      .populate({
        path: "deviceList",
        populate: {
          path: "device",
          populate: "category",
        },
      })

    if (!order) {
      throw new ApiError("Order not found", 500)
    }

    return order
  },

  create: async (orderInfo) => {
    const devicesIds = await Promise.all(
      orderInfo.deviceList.map(async (orderItem) => {
        const res = await DeviceList.create({
          quantity: Number(orderItem.quantity),
          device: orderItem._id,
          price: Number(orderItem.price),
        })

        const device = await Device.findById({ _id: orderItem._id })
        const newCountInStock = (await device.countInStock) - orderItem.quantity

        if (newCountInStock < 0) {
          throw new ApiError(`The ${device.name} only ${device.countInStock} in stock`, 400)
        } else {
          await Device.findOneAndUpdate({ _id: orderItem._id }, { countInStock: newCountInStock })
        }

        return res._id
      }),
    )

    const totalPrices = await Promise.all(
      devicesIds.map(async (_id) => {
        const orderItem = await DeviceList.findById({ _id }).populate("device", "price")
        return (await orderItem.price) * orderItem.quantity
      }),
    )

    const totalPrice = await totalPrices.reduce((acc, item) => acc + item, 0)

    return await Order.create({
      user: orderInfo.user,
      totalPrice: totalPrice,
      orderStatus: false,
      deviceList: devicesIds,
    })
  },

  getCount: (filter = {}) => {
    const orderCount = Order.countDocuments({})

    if (!orderCount) {
      throw new ApiError("Unsuccessful", 500)
    }

    return orderCount
  },

  updateOne: (orderId, orderInfo) => {
    return Order.findOneAndUpdate(
      { _id: orderId },
      {
        country: orderInfo.country,
        city: orderInfo.city,
        zip: Number(orderInfo.zip),
        address: orderInfo.address,
        phone: orderInfo.phone,
        cardNumber: orderInfo.card,
        cardDateMonth: orderInfo.month,
        cardDateYear: orderInfo.year,
        orderStatus: !!orderInfo.card && !!orderInfo.month && !!orderInfo.year,
      },
      { new: true },
    )
  },

  deleteOne: (orderId) => {
    return Order.deleteOne({ _id: orderId })
  },
}
