// core module
const path = require("path")
const fs = require("fs")

// Import database model for products
const Products = require("../Modal/Products")


const getAllProducts = async (req,res,next)=>{
    try{
        // Pagination
        let per_page = parseInt(req.query.per_page) || 25
        let page = parseInt(req.query.page) || 1

        // search by terms
        let search_term = req.query.search_term || ""

        // search by price
        let price_from = parseFloat(req.query.price_from) || 0
        let price_to = parseFloat(req.query.price_to) || 999999999

        // sort Data
        let sort_by = req.query.short_by || {title:1}

        switch (sort_by) {
            case "titleasc":
                sort_by = {title:1}
                break;
            case "titledesc":
                sort_by = {title:-1}
                break;
            case "priceasc":
                sort_by = {price:1}
                break;
            case "pricedesc":
                sort_by = {price:-1}
                break;
        
            default:
                sort_by = {title:1}
                break;
        }
        //let products = await Products.find({title: RegExp(search_term,"i")}).skip((page - 1) * per_page).limit(per_page)
        
        
        /* let products = await Products.find(
             {
                 $or :[
                     {title: RegExp(search_term,"i")},
                     {categories: RegExp(search_term,"i")},
                     {brand: RegExp(search_term,"i")}
                 ],
                 $and:[
                     {price: {$gte: price_from,$lte:price_to}}
                 ]
             }
         ).skip((page - 1) * per_page).limit(per_page)*/

        // filter using aggrigation -> finding data using many filter step by step
        let products = await Products.aggregate([
            {
                $match:{
                    $or :[
                        {title: RegExp(search_term,"i")},
                        {categories: RegExp(search_term,"i")},
                        {brand: RegExp(search_term,"i")}
                    ]
                }
            },
            {
                $match: {
                    price: {$gte: price_from , $lte:price_to}
                }
            },
            {
                $sort : sort_by
            },
            {
                $lookup:{
                    from:"users",
                    // localField: "seller_id",
                    let: { seller_id: '$seller_id' },
                    // foreignField: "_id",
                    pipeline: [
                        {
                          $match: {
                            $expr: { $eq: ['$_id', '$$seller_id'] }
                          }
                        },
                        {
                          $project: {
                            name: 1,
                            email: 1
                          }
                        }
                      ],
                    as: "seller_id"
                }
            },
            {
                $unwind: "$seller_id"
            },
            {
                $facet:{
                    meta_data:[{$count:"total"},{$addFields:{page,per_page}}],
                    products:[{$skip: ((page - 1) * per_page)},{$limit: per_page}]
                }
            },
            {
                $unwind: "$meta_data"
            },
            // {
            //     $skip: ((page - 1) * per_page)
            // },
            // {
            //     $limit: per_page
            // }
        ])

        if(products.length == 0){
            return res.send({msg: "No Product Found"})
        }
        return res.send({data:products})
    }catch(err){
        console.log(err)
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
    for (let index = 0; index < req.files?.images.length; index++) {
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