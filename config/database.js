const db  = require("mongoose")


db.connect("mongodb://127.0.0.1:27017/warehouse").then(()=>{
    console.log("Database connected ...")
}).catch((err)=>{
    console.log(`Database Not connected :- ${err}`)
})
