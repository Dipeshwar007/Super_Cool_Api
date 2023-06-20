// Import database model for products
const Order = require("../Modal/Order")
const Products = require("../Modal/Products")



const getOrder = async (req,res,next) => {
    try{
        let orders = await Order.find({created_by:req.user._id})
        if(orders.length == 0){
            return res.send({msg: "No order Found"})
        }
        return res.send({data:orders})
    }catch(err){
        next(err)
    }
}

const addOrder = async (req,res,next) => {
    let order_products = req.body.products

    let products = []

    for (let index = 0; index < order_products?.length; index++) {
        let product = await Products.findById(order_products[index].product_id)
        products.push({
            title: product.title,
            quantity: order_products[index].quantity,
            price: product.price,
            product_id : product._id
        })
    }


    try{
        let data = await Order.create({products,created_by: req.user._id})
        return res.send(data)
    }catch(err){
        const message = []
        if (err.name == 'ValidationError') {
            for (field in err.errors) {
                let fieldMessage = err.errors[field].message
                let fieldName = err.errors[field].path
                message.push({[fieldName]:fieldMessage})
            }
            return res.status(400).send({msg:"Database Error",error:{message}})
        }
        next(err)
    }
}

module.exports = {
    addOrder,
    getOrder
}