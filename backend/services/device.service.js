const { Device } = require("../models")

module.exports = {
  findByParams: (filter = {}) => {
    return Device.find(filter).populate("category").populate("brand").populate("color")
  },

  findOneByParams: (filter = {}) => {
    return Device.findOne(filter).populate("category").populate("brand").populate("color")
  },

  create: (deviceInfo) => {
    return Device.create(deviceInfo)
  },

  addImages: (deviceId, images) => {
    return Device.findOneAndUpdate({ _id: deviceId }, { $push: { images } }, { new: true })
  },

  deleteImage: (deviceId, fileName) => {
    return Device.findOneAndUpdate(
      { _id: deviceId },
      { $pull: { images: fileName } },
      { new: true },
    )
  },

  updateOne: (deviceId, newInfo) => {
    return Device.findByIdAndUpdate(deviceId, newInfo, { new: true })
  },

  deleteOne: (deviceId) => {
    return Device.deleteOne({ _id: deviceId })
  },
}
