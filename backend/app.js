const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()
const swaggerSetup = require("./swagger")

const {
  userRouter,
  authRouter,
  deviceRouter,
  categoryRouter,
  orderRouter,
  brandRouter,
  colorRouter,
} = require("./routes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "uploads")))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

mongoose.set("strictPopulate", false)

const connection = async () => {
  let dbCon = false

  while (!dbCon) {
    try {
      console.log("Connecting to database...")
      await mongoose.connect(process.env.DB_URL)
      dbCon = true
      console.log("Database available!!!")
    } catch (e) {
      console.error("Database unavailable, wait 5 seconds", e.message)
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }
}

swaggerSetup(app)
app.use("/auth", authRouter)
app.use("/devices", deviceRouter)
app.use("/users", userRouter)
app.use("/categories", categoryRouter)
app.use("/brands", brandRouter)
app.use("/colors", colorRouter)
app.use("/order", orderRouter)

app.get("/", (req, res) => {
  res.json("WELCOME")
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Unknown error",
    status: err.status || 500,
  })
})

const start = async () => {
  try {
    await connection()
    await app.listen(3000, () => {
      console.log(`Server listening on port 3000`)
    })
  } catch (e) {
    console.error("Failed to start the server:", e.message)
  }
}

start()
