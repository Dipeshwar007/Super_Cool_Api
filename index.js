const express = require("express");
const todo_Router = require("./routes/todos");
const homeRouter = require("./routes/home");
const { checkLogin } = require("./middleware/auth");
const userRouter = require("./routes/users");

const app = express();
// require("./config/database")

app.use(express.json())

app.use("/",homeRouter)
app.use("/api",todo_Router)
app.use("/api",checkLogin , todo_Router)
app.use("/api",userRouter)

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