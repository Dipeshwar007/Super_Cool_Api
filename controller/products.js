// core module
const path = require("path")
const fs = require("fs")

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
    let images = []
    /*
        req.files.images?.forEach(async img => {
            Note:- Async and await doesnot work inside forEach loop       
        });
    */
    for (let index = 0; index < req.files.images?.length; index++) {
        let img = req.files.images[index]
        let file_name = Date.now() + "-" + Math.round(Math.random()*1E9) + path.extname(img.name)
        try{
            await img.mv(path.resolve(__dirname ,"../Public/Products/" ,file_name))
            images.push(file_name)
        }catch(err){
        }
    }

    try{
        let data = await Products.create({...req.body,images,seller_id: req.user._id})
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

const updateProduct = async (req,res,next) => {
    // find data of the product to edit 
    let product_data = await Products.findById(req.params.id)

    // extract images array from product to edit
    let old_images = product_data.images

    // get the image that is not remove and should be kept as it is from pu request as a string in a array
    let send_old_images = req.body.images

    let images = []

    if(send_old_images){
        // check if the image that should be kept is already inside product images and which is not inside array should be deleted
        old_images.forEach(img=>{
            if(send_old_images.includes(img)){
                images.push(img)
            }else{
                fs.unlinkSync(path.resolve("Public/Products/",img)) 
            }
        })
    }else{
        images = [...old_images]
    }

    try{
        for (let index = 0; index < req.files?.images.length; index++) {
            let img = req.files.images[index]
            let file_name = Date.now() + "-" + Math.round(Math.random()*1E9) + path.extname(img.name)
            try{
                await img.mv(path.resolve(__dirname ,"../Public/Products/" ,file_name))
                images.push(file_name)
            }catch(err){
            
            }
        }
        let product = await Products.findByIdAndUpdate (req.params.id ,{ ...req.body,images},{new:true})
        return res.send(product)
    }catch(err){
        console.log(err)
        next(err)
    }
}

const deleteProduct = async (req,res,next) => {
    try{
        let product = await Products.findById(req.params.id)
        if(product){
            product.images?.forEach(img=>{
                fs.unlinkSync(path.resolve("Public/Products/",img))
            })
        }
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