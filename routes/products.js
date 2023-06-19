// import default packedge
const express = require("express")
const productRouter = express.Router()

// Import controllers
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require("../controller/products")

// Middleware
const Validation = require("../middleware/JoiAuth")
const { checkLogin, isSeller, isBelongTo } = require("../middleware/auth")

// Schema for product
const { productSchema } = require("../validationSchema/productSchema")



productRouter.get("/product", getAllProducts)
productRouter.post("/product", Validation(productSchema), checkLogin, isSeller, addProduct)
productRouter.put("/product/:id", checkLogin, isSeller, isBelongTo, updateProduct)
productRouter.delete("/product/:id", checkLogin, isSeller, isBelongTo, deleteProduct)


module.exports = productRouter