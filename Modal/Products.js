const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type : String,
    required: true
  },
  email:{
    type: String,
    required: true,
    validate:{
        validator: async function(value){
            let exist = await mongoose.models.Users.findOne({email:value})
            if(exist){
                return false
            }
        },
        message: "Email already exist"
    }
  },
  password:{
    type: String,
    maxlength:255,
    required : true
  },
  role:{
    type: String,
    enum:["SELLER","BUYER"],
    set: function(value){
      return value.toUpperCase() 
    },
    default: "BUYER"
  },
  created:{
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model("Product",ProductSchema)
