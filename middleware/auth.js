let logged_in = true;

function checkLogin(req,res,next){
    if(!logged_in){
        return res.status(401).send([{msg:"Unauthorised"}])
    }
    next()
}
module.exports ={
    checkLogin
}