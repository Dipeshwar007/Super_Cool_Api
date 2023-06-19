// main packedges
const express = require("express");


// third-party packedges
require('dotenv').config()

// router packedges
const homeRouter = require("./routes/home");
const todo_Router = require("./routes/todos");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");

// Middleware
const { checkLogin } = require("./middleware/auth");


const app = express();

// database connection
require("./config/database")

app.use(express.json())

// home 
app.use("/",homeRouter)

// todos api page
app.use("/api",todo_Router)
app.use("/api",todo_Router)

// users API login and signup
app.use("/api",userRouter)

// Products create and request API
app.use("/api",productRouter)

// unkonown route request page
app.use((req,res)=>{
    res.status(404).send({msg:"Resource Not Found"})
})

// Server error
app.use((err,req,res,next)=>{
    let status = 500
    let msg = "Server Error"
    return res.status(status).send({
        msg:msg
    })
})

app.listen(process.env.PORT || 8000,()=>{
    console.log("server is running")
})
// module.exports = app;