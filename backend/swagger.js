const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const { FRONTEND_URL } = require("./configs/config")

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Store API",
      version: "1.0.0",
      description: "API documentation for store management",
    },
    servers: [
      {
        url: FRONTEND_URL,
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
