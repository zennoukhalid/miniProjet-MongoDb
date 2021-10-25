const jwt = require('jsonwebtoken')

module.exports.auth= (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    console.log("token-------->",token);
    jwt.verify(token,'SECRET_KEY', {
         expiresIn: 1500000000
      },(err,res)=>{
            if(err){
                return next(err);
            }
          req.user= res;
          next();
      })

   
  }