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
        // fetch if user is inside database usiong email
        let user = await Users.findOne({email:req.body.email})

        if(user){ 
            // if user exist

            // password is being checked by bcrypt
            let passwordMatch = await bcrypt.compare(req.body.password, user.password)

            if(passwordMatch){

                // when password matched
                let withoutPassword = {...user.toObject()}
                delete withoutPassword.password // passwor delete from object

                // checking user status
                let userStatus = withoutPassword.status

                if(userStatus){
                    // if user status is true
                    delete withoutPassword.status // stauts deleted for safety

                    return res.send({userData:withoutPassword})
                }
                return res.send({msg: "User Not verified"})
            }
            return res.send({msg: "Password not matched"})
        }
        return res.status(401).send({msg: "User not exist"})
    }catch(err){
        return res.status(400).send({msg:err.message})
    }
}

module.exports = {
    signup,
    login
}