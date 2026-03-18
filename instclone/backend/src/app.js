const express = require('express') ;
const cookieParser = require('cookie-parser');
const cors =require('cors')
const app = express();
//require routes 
const authRouter = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes') 
const userRoutes =  require('./routes/user.routes')
//middleware
app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

//uses routes 
app.use('/api/auth' ,  authRouter)
app.use('/api/post' , postRoutes)
app.use('/api/user' , userRoutes)
module.exports = app