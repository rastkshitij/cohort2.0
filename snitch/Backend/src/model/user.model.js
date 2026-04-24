import  mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({ 
    email : {type : String , required : true , unique   : true},
    contact : {type: String , required : true} ,
    password :  {type: String , required : true ,  select: false  } ,
    fullname : {type : String , required : true} ,
    role: {
        type: String ,
        enum : ["buyer" , "seller" , "admin"] ,
        default : "buyer"
    }
});
userSchema.pre('save', async function(){
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

const userModel =  mongoose.model("User" , userSchema);

export default userModel;