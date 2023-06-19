// third-party packedge
const Joi = require('joi');

const productSchema = Joi.object({
    title: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
 
    seller_id: Joi.object().required()
})

module.exports = {
    productSchema
}