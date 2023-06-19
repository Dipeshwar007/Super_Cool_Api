const ToDo = require("../Modal/todo")

async function getTodos(req,res,next){
    try{
        let data = await ToDo.find({})
        // let data = 0
        if(!data){
            return res.send("Data not Found")
        }else{
            return res.send(data)
        }
    }catch(err){
        next(err)
    }
}


async function postTodos(req,res){
    try{
        await ToDo.create(req.body)
        return res.send("Data Inserted Succesfully")
    }catch(err){
        return res.status(400).send({msg:err.message})
    }
}


module.exports = {
    getTodos,
    postTodos
}