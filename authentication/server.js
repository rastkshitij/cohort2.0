const app = require('./src/app')
require("dotenv").config()

const connectTodb =  require('./src/config/database')
connectTodb()
app.listen(3000 , ()=>{
    console.log("Server running at port 3000")
})