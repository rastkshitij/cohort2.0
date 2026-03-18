const mongoose = require('mongoose')
const blacklistschema =  new mongoose.Schema({
    token : {
        type: String,
        required :[true ,"Token is required"] ,

    }
} , {timestamps :true})
const blacklistModel =  mongoose.model('blacklist' ,  blacklistschema);
module.exports =  blacklistModel