const cookieParser = require('cookie-parser');
const express = require('express');
const authRouter =  require('../src/Routes/auth.routes')
const songRouter =  require("./Routes/songs.routes")
const cors  = require('cors')
const app = express()
app.use(cors({
    origin: "http://localhost:5173"
, credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRouter)
app.use('/api/songs' , songRouter)
module.exports = app