const { Order, DeviceList } = require("../models")
const { orderService } = require("../services")

module.exports = {
  getAll: async (req, res, next) => {
    try {
      res.status(200).json(req.orders)
    } catch (e) {
      next(e)
    }
  },

  getById: async (req, res, next) => {
    try {
      res.status(200).json(req.order)
    } catch (e) {
      next(e)
    }
  },

  create: async (req, res, next) => {
    try {
      res.status(200).json(req.order)
    } catch (e) {
      next(e)
    }
  },

  getCount: async (req, res, next) => {
    try {
      const orderCount = await orderService.getCount({})

      res.status(200).json(orderCount)
    } catch (e) {
      next(e)
    }
  },

  getUserOrders: async (req, res, next) => {
    try {
      res.status(200).json(req.userOrderList)
    } catch (e) {
      next(e)
    }
  },

  update: async (req, res, next) => {
    try {
      res.status(200).json(req.order)
    } catch (e) {
      next(e)
    }
  },

  delete: async (req, res, next) => {
    try {
      await Order.findByIdAndDelete(req.params.orderId).then(async (order) => {
        if (order) {
          order.deviceList.map(async (item) => {
            await DeviceList.findByIdAndRemove(item)
          })
          return res.status(204).json("The order is deleted!")
        } else {
          return res.status(404).json("Order not found!")
        }
      })
    } catch (e) {
      next(e)
    }
  },
}
