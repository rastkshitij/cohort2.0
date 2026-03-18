const mongoose = require("mongoose");
const noteschema = mongoose.Schema({
    title :String,
    discription :String
})

const noteModel =mongoose.model("notes" , noteschema)
module.exports = noteModel