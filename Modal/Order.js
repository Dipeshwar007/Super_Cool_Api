const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/*
    {
        products: [
            {title: watch, quantity: 10, price: 100, status :pending}, 
            {title: mouse, quantity: 10, price: 1000, status: shipped}, 
            {title: mouse, quantity: 10, price: 1000, status:reject},
        ],
        created_by: ObjectId()
    }
*/

const OrderSchema = new Schema({
    products: [
        {
            title:{
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                min: 0,
                required: true
            },
            price:{
                type: Number,
                min: 0,
                required: true
            },
            status:{
                type: String,
                enum:["PENDING","SHIPPED","REJECTED"],
                set: function(value){
                    return value.toUpperCase() 
                },
                default: "PENDING"
            },
            product_id: {
                type: ObjectId,
                ref: "Product", 
                required: true
            }
        }
    ],
    created_by: {
        type: ObjectId,
        ref: "User",
        required: true
    }
});


module.exports = mongoose.model("Order",OrderSchema)
