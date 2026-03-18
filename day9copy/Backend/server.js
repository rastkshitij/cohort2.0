require('dotenv').config();
const app = require('./src/app')
const connectTodb = require('./src/config/database')
connectTodb()
app.listen(2000 , ()=>{
    console.log("Server running at port2000")
})