const mongoose = require("mongoose")
function connectTodb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch((err)=>{
        console.log("Error detected" , err)
    })
}

module.exports = connectTodb