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
      const brand = await Brand.create({ name: faker.company.name().slice(0, 32) })
      brands.push(brand)
    }

    if (brands.length === 0) {
      throw new Error("Failed to seed brands.")
    }

    const colors = new Set()
    while (colors.size < 5) {
      colors.add(faker.color.human())
    }

    const colorsDocs = []
    for (let colorName of colors) {
      try {
        const color = await Color.create({ name: colorName })
        colorsDocs.push(color)
      } catch (err) {
        if (err.code === 11000) {
          const uniqueColor = await Color.create({
            name: `${colorName}-${Math.floor(Math.random() * 1000)}`,
          })
          colorsDocs.push(uniqueColor)
        } else {
          throw err
        }
      }
    }

    if (colorsDocs.length === 0) {
      throw new Error("Failed to seed colors.")
    }

    const categories = new Set()
    while (categories.size < 5) {
      categories.add(faker.commerce.department())
    }

    const categoryDocs = []
    for (let categoryName of categories) {
      try {
        const category = await Category.create({ name: categoryName })
        categoryDocs.push(category)
      } catch (err) {
        if (err.code === 11000) {
          const uniqueCategory = await Category.create({
            name: `${categoryName}-${Math.floor(Math.random() * 1000)}`,
          })
          categoryDocs.push(uniqueCategory)
        } else {
          throw err
        }
      }
    }

    if (categoryDocs.length === 0) {
      throw new Error("Failed to seed categories.")
    }

    const devices = []
    for (let i = 0; i < 10; i++) {
      const randomCategoryIndex = Math.floor(Math.random() * categoryDocs.length)
      const randomBrandIndex = Math.floor(Math.random() * brands.length)
      const randomColorIndex = Math.floor(Math.random() * colorsDocs.length)

      if (
        categoryDocs[randomCategoryIndex] &&
        brands[randomBrandIndex] &&
        colorsDocs[randomColorIndex]
      ) {
        const device = await Device.create({
          name: faker.commerce.productName(),
          price: 100,
          category: categoryDocs[randomCategoryIndex]._id,
          brand: brands[randomBrandIndex]._id,
          description: faker.lorem.sentence(),
          countInStock: 10,
          rating: 5,
          color: colorsDocs[randomColorIndex]._id,
          images: [""],
        })
        devices.push(device)
      } else {
        console.error("One of the required arrays is empty. Cannot create device.")
      }
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
