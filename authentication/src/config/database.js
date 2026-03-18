const mongoose = require("mongoose")
function connectTodb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database")
    })
}

module.exports = connectTodb