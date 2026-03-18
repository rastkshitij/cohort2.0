const express = require('express') ;
const authrouter = express.Router();
const userModel = require('../Model/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

authrouter.post('/register' ,async (req , res)=>{
const {email  , name  , password } = req.body
const isUserexist =  await userModel.findOne({ email })
if(isUserexist){
    return res.status(409).json({
        message : "User already exist"
    })
    }
    const user = await userModel.create({
        name , email , password: crypto.createHash('sha256').update(password).digest("hex")
    })
    const token = jwt.sign({ id : user._id , 

    } , process.env.JWT_SECRET , {expiresIn : '5h'})
res.cookie('token' , token)
res.status(201).json({
    message : "User Created Sucessfully" ,
    user : {
        name : user.name ,
        email : user.email ,
        password : user.password
    }
})


})

authrouter.get ('/getme' , async (req , res)=>{
    const token  = req.cookies.token
   const decode = jwt.verify(token , process.env.JWT_SECRET)
 const user = await userModel.findById(decode.id)
 res.json({
    name : user.name,
    email :  user.email
 })
})
authrouter.post('/login' , async (req ,res)=>{
    const {email , password} = req.body;
    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(404).json({
            message : "User Not found"
        })
    }
    const  hash = crypto.createHash('sha256').update(password).digest('hex')
    const ispassword  = hash ===user.password ;
    if(!ispassword){
        return  res.status(401).json({
            message : "Invalid Password"
        })
    }
    const token = jwt.sign({
        id :user._id , 
    } , process.env.JWT_SECRET ,{expiresIn : "1h"})
    res.cookie("token" , token)
    res.json({
        message :"User logges in succesfully" ,
        user : {
            name : user.name ,
            email : user.email 
        }
    })
})

module.exports = authrouter