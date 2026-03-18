 const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
 
 async function registerCOntroller (req , res){
  const {email , username , password , bio , profileImage} = req.body
//   const isUserExistByEmail = await userModel.findOne({ email})
//   if(isUserExistByEmail){
//     return res.status(409).json(
//         {
//             message :  "User already exist with same email"
//         }
//     )
//   }
//   const isUserExistByUserName =  await userModel.findOne({username})
//   if(isUserExistByUserName){
//     return res.status(409).json(
//         {
//             message :  "User already exist with same username"
//         }
//     )
//   }
  const isUserAlreadyexist = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })
if(isUserAlreadyexist) {
    return res.status(409).json(
        {
             message:
        "User already exist. " +
        (isUserAlreadyexist.email === email
          ? "Email already exist"
          : "Username already exist")
        }
    )
}
const hash =  await bcrypt.hash(password ,10)
const user = await userModel.create({
    username , email , bio , profileImage , password : hash
})
const token = jwt.sign({
    //userunique hon chan
    id: user._id 
} , process.env.JWT_SECRET , {expiresIn : "2d"})
res.cookie("tokens" , token)
res.status(201).json({
    user : {
        email : user.email ,
        username :  user.username ,
        bio : user.bio ,
        profileImage : user.profile_image
    }
})
}
async function loginController (req , res){
    const {username , email , password} = req.body
    const user = await userModel.findOne({
        $or : [{
            username : username
        } ,
        {
            email : email
        }
    ]
    }).select("password")
    if(!user) {
        return res.status(404).json({
            message : "User not found"
        })
    }
     const isPasswordValid = await bcrypt.compare(password , user.password)
    if(!isPasswordValid){
        return  res.status(401).json({
            message :  "Password invalid"
        })
    }
    const token = jwt.sign(
        {
            id:user._id
            , username : user.username

        } ,process.env.JWT_SECRET , {expiresIn : "2d"}
    )
    res.cookie('tokens' , token)
    res.status(200).json({
        message : "User loggedIn succefully"
        , user :{
          username :  user.username,
            email :user.email,
            bio : user.bio ,
            profileImage:user.profile_image
        }
    })
}

async function getMeController(req , res) {
    const userId =  req.user.id
    const user = await userModel.findById(userId)
    res.status(200).json({
        user:  {
            username : user.username ,
            email :  user.email ,
            bio : user.bio
            ,profileImage : user.profile_image
        }
    })
}
module.exports = {
    registerCOntroller ,
    loginController,
    getMeController
}