import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToDB =  async()=>{mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('DB Error:', err);
    process.exit(1);
  });}


  export default connectToDB