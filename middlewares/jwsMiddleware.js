const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwtMiddleware");
    
//logic autherise user
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);
    if(token){
        //verify
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
            console.log(jwtResponse);
            req.userId = jwtResponse.userId
            next()
        }catch(err){
            res.status(401).json("Authorization failed... Please Login!!!")
        }
    }else{
        res.status(404).json("Authorization failed... Token is missing!!!")
    }
}

module.exports = jwtMiddleware