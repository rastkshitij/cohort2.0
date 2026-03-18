const express = require('express');
const userModel = require('../Model/user.model');
const jwt = require("jsonwebtoken")
const authRouter = express.Router();
const crpto =  require("crypto");

authRouter.post('/register', async (req, res) => {
    const { email, name, password } = req.body;
    const isUserAlreadyExist  =  await userModel.findOne({email}) 
    if(isUserAlreadyExist) {
        return res.status(400).json({
            message : "User already exist with same email"
        })
    }
const hash = crpto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({
        email,
        password: hash,
        name
    });

const token =jwt.sign({
    id:  user._id ,
    email :  user.email
} , process.env.JWT_SECRET
)
res.cookie("jwt_token" ,  token)

    res.status(201).json({
        message: "User registered",
        user ,
        token
    });
});

authRouter.post("/protected" ,(req , res)=>{
    console.log(req.cookies)
    res.status(200).json({
        message : "Protected"
    })
})
authRouter.post("/login" , async (req , res)=>{
    const {email  , password } = req.body 
    const user = await userModel.findOne({email})
    if(!user) {
        return res.status(404).json({
            message : "User not found with email address"
        })
    }
    const isPassword =  user.password === crpto.createHash("md5").update(password).digest("hex")
    if(!isPassword) {
        return res.status(401).json({
            message : "Invalid Password"
        })
    }
    const token =  jwt.sign({
        id :  user._id
    } , process.env.JWT_SECRET)
    res.status(200).json({
        messsage : "Userlogin" , 
        user , token
    })
})

module.exports = authRouter;
