const jwt = require('jsonwebtoken')
async function Identifyuser(req , res, next ) {
    const token = req.cookies.tokens
   if(!token){
      return res.status(401).json({
         message : "Unauthorizec access"
      })
   }
   let decoded =  null
   try{
      decoded =jwt.verify(token , process.env.JWT_SECRET)
   }
   catch(err){
      return res.status(401).json({
         message : "Invalid Token"
      })
   } 
   req.user = decoded
   next()
}

   module.exports = Identifyuser