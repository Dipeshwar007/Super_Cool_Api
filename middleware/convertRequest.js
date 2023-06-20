module.exports.convertRequest = (req,res,next) => {
    function changerequest(field){
        if(req[field]){
            let temp = {}
            let temp_arr = Object.entries(req[field])
    
            temp_arr.forEach(element => {
                if(element[0].endsWith("[]")){
                    temp[element[0].slice(0,-2)] = Array.isArray(element[1]) ? element[1] : [element[1]]
                }else{
                    temp[element[0]] = element[1]
                }
            })
            req[field] = temp
        }
    }

    changerequest("body")
    changerequest("files")

    next()
}

