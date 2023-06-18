// import main packedge
const Users = require("../Modal/Users")

// import third-party packedge
const bcrypt = require('bcrypt');

async function signup(req,res){
    try{
        let hashed_pwd = await bcrypt.hash(req.body.password,10)
        await Users.create({...req.body,password:hashed_pwd})
        return res.send("user Created")
    }catch(err){
        // console.log(err)
        const message = []
        if (err.name == 'ValidationError') {
            for (field in err.errors) {
                let fieldMessage = err.errors[field].message
                let fieldName = err.errors[field].path
                message.push({[fieldName]:fieldMessage})
            }
        }
        return res.status(400).send({msg:"Database Error",error:{message}})
    }
    
}

async function login(req,res){
    try{
        // throw new Error('BROKEN')
        return res.send("user authenticsted")
    }catch(err){
        return res.status(400).send({msg:err.message})
    }
}

module.exports = {
    signup,
    login
}