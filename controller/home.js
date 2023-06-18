function getHome(req,res,next){
    try{
        return res.send("<h1>My first api</h1>");
    }catch(err){
        next(err)
    }
}

module.exports = {
    getHome
}