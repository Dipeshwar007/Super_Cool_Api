// third-party packedge
const Joi = require('joi');


const OrderProductSchema = {
    quantity : Joi.number().min(1).required(),

    product_id: Joi.string().hex().length(24).required()

} 
const orderSchema = Joi.object({
    products: Joi.array().min(1).items(Joi.object(OrderProductSchema).required()).required()
})

module.exports = {
    orderSchema
}