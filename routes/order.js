// import default packedge
const express = require("express")
const orderRouter = express.Router()

// Import controllers
const { addOrder, getOrder } = require("../controller/orders")

// Middleware
const Validation = require("../middleware/JoiAuth")
const { checkLogin, isBuyer } = require("../middleware/auth")

// Schema for product
const { orderSchema } = require("../validationSchema/orderSchema")



orderRouter.get("/order", checkLogin, isBuyer, getOrder)
orderRouter.post("/order", Validation(orderSchema), checkLogin, isBuyer, addOrder)
// orderRouter.put("/order/:id", checkLogin, isSeller, isBelongTo, updateProduct)
// orderRouter.delete("/order/:id", checkLogin, isSeller, isBelongTo, deleteProduct)


module.exports = orderRouter