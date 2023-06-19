// import default packedge
const express = require("express")
const productRouter = express.Router()

// Import controllers
const { getAllProducts, addProduct } = require("../controller/products")

// Middleware
const Validation = require("../middleware/JoiAuth")

// Schema for product
const { productSchema } = require("../validationSchema/productSchema")



productRouter.get("/product", getAllProducts)
productRouter.post("/product", Validation(productSchema), addProduct)


module.exports = productRouter