// third-part packedge
const jwt = require("jsonwebtoken")

// Import database model for products
const Products = require("../Modal/Products")

function checkLogin(req,res,next){
    if(req.headers.authorization){
        try{
            let verified = jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SECRET_KEY)
            if(verified){
                req.user = verified
                return next()
            }
        }catch(err){

        }
    }
    return res.status(401).send({msg: "unauthorized"})
}
const isSeller = (req,res,next) => {
    if(req.user.role == "SELLER"){
        return next()
    }else{
        return res.status(403).send({msg: "Access Denied"})
    }
}
const isBuyer = (req,res,next) => {
    if(req.user.role == "BUYER"){
        return next()
    }else{
        return res.status(403).send({msg: "Access Denied"})
    }
}
const isBelongTo = async (req,res,next) => {
    try{
        let productData = await Products.findById(req.params.id)
        if(productData){
            productData = {...productData.toObject()}
            
            if(req.user._id == productData.seller_id){
                return next()
            }
        }
        return res.send({msg: "Product Not Found"})
    }catch(err){
        console.log(err)
    }
    return res.status(403).send({msg: "Access Denied"})
}

module.exports = {
    checkLogin,
    isSeller,
    isBuyer,
    isBelongTo
}