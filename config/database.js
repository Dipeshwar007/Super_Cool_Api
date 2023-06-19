const db  = require("mongoose")



// Local Database
/* 
db.connect("mongodb://127.0.0.1:27017/warehouse").then(()=>{
    console.log("Database connected ...")
}).catch((err)=>{
    console.log(`Database Not connected :- ${err}`)
})
*/



// Mongodb Atlas

db.connect("mongodb+srv://tunashah10:va5sW8EQewxMeX4q@warehouse.3zcxr4f.mongodb.net/test").then(()=>{
    console.log("Database connected ...")
}).catch((err)=>{
    console.log(`Database Not connected :- ${err}`)
})
