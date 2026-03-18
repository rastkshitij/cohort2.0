const userModel = require('../Model/user.model')
const bcrypt =  require('bcryptjs')
const jwt =  require('jsonwebtoken')
const blacklistModel = require('../Model/blacklist.model')
const redis = require('../config/cache')
async function registerController(req , res) {
    const {username , email , password } = req.body
    const iSUserallreadyexist = await userModel.findOne({
        $or:[
            {email} ,
            {username}
        ]
    })
    if(iSUserallreadyexist){
        return res.status(400).json({
            message :  "User already exist with same username or email already exist "
        })
    }
    const hash =  await bcrypt.hash(password , 10)
  const user = await userModel.create({
        username , email , password :hash
    })
 const token =  jwt.sign({
    id:  user._id ,
    username : user.username
 } , process.env.JWT_SECRET ,{
    expiresIn : "3d"
 } )
  res.cookie("Token" , token)
 return res.status(201).json({
    messgae :  "User registered succesfully"
     , user
 })
}
async function logInController(req, res) {
console.log("BODY:", req.body)
    const { email, username, password } = req.body

    const query = email ? { email } : { username }

    const user = await userModel.findOne(query).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    res.cookie("Token", token, {
        httpOnly: true
    })

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}

 async function getmeController(req, res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message :  "User Fetched successfully"
        ,user
    })
 }


async function logout(req , res){
const token = req.cookies.Token
res.clearCookie("Token")
 redis.set(token , Date.now().toString() , "Ex", 60 * 60)

res.status(200).json({
    message : "logout successfully"
})



}


module.exports = {registerController , logInController , getmeController ,logout}