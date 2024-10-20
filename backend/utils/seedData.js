const mongoose = require("mongoose")
const { faker } = require("@faker-js/faker")
const { User, Brand, Color, Category, Device, Order } = require("../models")

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/online_shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Database connected!")
  } catch (error) {
    console.error("Database connection error:", error.message)
  }
}

const seedData = async () => {
  try {
    await User.deleteMany()
    await Brand.deleteMany()
    await Color.deleteMany()
    await Category.deleteMany()
    await Device.deleteMany()
    await Order.deleteMany()

    const brands = []
    for (let i = 0; i < 5; i++) {
      const brand = await Brand.create({ name: faker.company.name() })
      brands.push(brand)
    }

    const colors = []
    for (let i = 0; i < 5; i++) {
      const color = await Color.create({ name: faker.color.human() })
      colors.push(color)
    }

    const categories = []
    for (let i = 0; i < 5; i++) {
      const category = await Category.create({ name: faker.commerce.department() })
      categories.push(category)
    }

    const devices = []
    for (let i = 0; i < 10; i++) {
      const device = await Device.create({
        name: faker.commerce.productName(),
        price: 100,
        category: categories[Math.floor(Math.random() * categories.length)]._id,
        brand: brands[Math.floor(Math.random() * brands.length)]._id,
        description: faker.lorem.sentence(),
        countInStock: 10,
        rating: 5,
        color: colors[Math.floor(Math.random() * colors.length)]._id,
        images: [""],
      })
      devices.push(device)
    }

    const users = []
    for (let i = 0; i < 5; i++) {
      const user = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.datatype.boolean(),
      })
      users.push(user)
    }

    const orders = []
    for (let i = 0; i < 5; i++) {
      const order = await Order.create({
        user: users[Math.floor(Math.random() * users.length)]._id,
        deviceList: [devices[Math.floor(Math.random() * devices.length)]._id],
        totalPrice: parseFloat(faker.commerce.price()),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        zip: faker.address.zipCode(),
        country: faker.address.country(),
        cardNumber: faker.finance.creditCardNumber(),
        cardDateMonth: faker.date.month(),
        cardDateYear: faker.date.past().getFullYear(),
        orderStatus: faker.datatype.boolean(),
      })
      orders.push(order)
    }

    console.log("Data seeded successfully!")
  } catch (error) {
    console.error("Error seeding data:", error.message)
  } finally {
    mongoose.connection.close()
  }
}

const start = async () => {
  await connection()
  await seedData()
}

start()
