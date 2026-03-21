const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : String ,
    email : {
        type: String ,
        unique : [true , "User exists wirh same email"] ,
        required : [true,  "Email is required"]
    } ,
    password :  String
})
const userModel = mongoose.model("users" , userSchema)
module.exports = userModel