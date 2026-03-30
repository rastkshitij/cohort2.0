import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/email.service.js";
export const register = async (req, res) => {
 console.log("REGISTER API HIT");
    const { username, email, password } = req.body;
 console.log("BODY:", req.body);
console.log("EMAIL:", email);
console.log("USERNAME:", username);

    // check existing user
    const existingUser = await UserModel.findOne({  $or: [{ email }, { username }]});

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        err : "User with this email or username already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const emailVerificationToken  =  jwt.sign({ email :  user.email,}, process.env.JWT_SECRET, { expiresIn: "1h" });
    await sendEmail({
      to : email,
      subject : "Welcome to Perplexity",
      html : `<h1>Welcome to Perplexity</h1>
      <p>Hi ${username},</p>
      <p>Thank you for registering on our platform. Please verify your email by clicking the link below:</p>
      <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
      `
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  let decoded;
  try { 
  decoded = jwt.verify(token , process.env.JWT_SECRET)

  }
    catch (err) { 
      return res.status(400).json({
        message : "Invalid or expired token",
        success : false,  
        err : err.message
      })
    }
  const user = await UserModel.findOne({ email : decoded.email});
  if(!user){
    return res.status(400).json({
      message : "Invalid token",
      success : false,
      err :  "User not Found"
    })
   
  }
   user.verified = true;
    await user.save();
    const html = `<h1>Email verified successfully</h1>
      <p>Your email has been verified  . you can now log in to your account.<p>`
    res.send(html)
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user =  await UserModel.findOne({ email });
  if(!user){
    return res.status(400).json({
      message : "Invalid email or password",
      success : false,
      err : "User not found"
    })
  }
  const isPasswordMatch = await bcrypt.compare(password , user.password);
  if(!isPasswordMatch){
    return res.status(400).json({
      message : "Invalid email or password",
      success : false,
      err : "Incorrect password"
    })
  }
  if(!user.verified){
    return res.status(400).json({
      message : "Email not verified",
      success : false,
      err : "Please verify your email before logging in"
    })
  }
  const token = jwt.sign({ id : user._id, email : user.email}, process.env.JWT_SECRET, { expiresIn: "7d" });
res.cookie("token", token, {
  httpOnly: true,
  secure: false, // true in production (HTTPS)
  sameSite: "lax"
})
  res.status(200).json({
    message : "Login successful",
    success : true,
    token,
    user : {
      id : user._id,
      username : user.username,
      email : user.email
    }
  })
}

export const getMe = async (req, res) => {
  const userId  = req.user.id;
  const user = await UserModel.findById(userId).select("-password");
  if(!user){
    return res.status(404).json({
      message : "User not found",
      success : false,
      err : "No user found with this id"
    })
  }
  res.status(200).json({
    message : "User details fetched successfully",
    success : true,
    user
  })
}