const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
  title: {
    type : String,
    required: true
  },
  status: Boolean
});


module.exports = mongoose.model("ToDo",TodoSchema)
