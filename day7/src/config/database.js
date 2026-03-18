const  mongoose = require('mongoose');
function connecttodb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to database')
    })
}
module.exports = connecttodb