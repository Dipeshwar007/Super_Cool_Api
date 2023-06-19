const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  title: {
    type : String,
    required: true
  },
  price:{
    type:Number,
    min:0,
    default: 0
  },
  description:{
    type: String,
  },
  images:{
    type: [String]
  },
  categories:{
    type: [String]
  },
  brand:{
    type: [String]
  },
  seller_id:{
    type: ObjectId,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model("Product",ProductSchema)
