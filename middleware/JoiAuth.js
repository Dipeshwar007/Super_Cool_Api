const userValidation = (schema) =>{
    return (req,res,next)=>{
        const { error, value } = schema.validate(req.body,{abortEarly:false,stripUnknown:true});
        if(error){
            let errors = error.details.map(validationErr=>{
                let refinedMessage = validationErr.message.replaceAll('\"',"")
                return {
                    params: validationErr.context.key,
                    message: refinedMessage
                }
            })
            return res.send({msg:"Bad Request",errors})
        }else{
            next();
        }
    }
}

module.exports = userValidation