const blacklistModel = require('../Model/blacklist.model');
const userModel = require('../Model/user.model')
const jwt = require('jsonwebtoken');
const redis = require('../config/cache')
async function authUser (req , res , next) {
    const token =  req.cookies.Token ; 
    if(!token){
        return res.status(404).json({
            message : "Token not Found"
        })
    }
    const isTokenBlaclisted = await redis.get(token )
    if(isTokenBlaclisted){
        res.status(401).json({
            message :  "Invalid token"
        })
    }
    //isline ko acche se samajhan h kyuki jaise jab token expire kar jata h toh decoded ke under value nahi aat pati h toh isliye hum try aur catch ke use karte h
    try{
const decoded = jwt.verify(
    token , process.env.JWT_SECRET
)
req.user =decoded;
next()
    }
    catch (err){
        return res.status(401).json({
            message :  "Invalid token"
        })
    }

}
module.exports ={ authUser }