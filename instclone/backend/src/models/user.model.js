const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        unique : [true , "User with same username already exist "] ,
        require : [true  ,  "Username is required"]
    },
    email : {
        type:  String ,
        unique : [true , "User already exist with same email address"] ,
         required : [true , "Email address is required for creating an account"]
    } ,
    password : {
        type : String ,
        required : [true , "Password is required"]
        ,select : false
    } ,
    bio :  String ,
    profile_image :  {
        type :String ,
        default : "https://ik.imagekit.io/hkjqq30hf/purepng.com-user-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596134a4bio.png"
    },
    
})
const userModel = mongoose.model("User" ,  userSchema)
module.exports = userModel