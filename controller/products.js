// Import database model for products
const Products = require("../Modal/Products")


const getAllProducts = async (req,res,next)=>{
    try{
        let products = await Products.find()
        if(products.length == 0){
            return res.send({msg: "No data Found"})
        }
        return res.send({data:products})
    }catch(err){
        next(err)
    }
}

const addProduct = async (req,res,next) => {
    try{
        await Products.create({...req.body,seller_id: req.user._id})
        return res.send("Product Inserted")
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

const updateProduct = async (req,res,next) => {
    try{
        let product = await Products.findByIdAndUpdate (req.params.id ,{ ...req.body})
        return res.send(product)
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

const deleteProduct = async (req,res,next) => {
    try{
        await Products.findByIdAndRemove(req.params.id)
        return res.send({msg:"Data Deleted Succesfully"})
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
}