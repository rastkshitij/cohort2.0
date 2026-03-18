const mongoose = require('mongoose') ;
const postSchema = new mongoose.Schema({
    caption:{
        type :String,
        default : "",
    },
    imgUrl :{
        type : String,
        required : [true , "ImageURL is required for creating a post"]
    },
    user : {
        ref : "User" ,
        type : mongoose.Schema.Types.ObjectId ,
        required : [true  ,"User id is reuired for creating a post"]
    }
})

const postModel = mongoose.model ("posts" , postSchema);
module.exports = postModel