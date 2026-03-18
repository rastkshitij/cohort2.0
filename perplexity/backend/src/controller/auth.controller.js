import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/email.service.js";
export const register = async (req, res) => {

    const { username, email, password } = req.body;

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
    await sendEmail({
      to : email,
      subject : "Welcome to Perplexity",
      text : `Hi ${username},\n\nThank you for registering!`,
      html : `<h1>Welcome to Perplexity</h1><p>Hi ${username},</p><p>Thank you for registering!</p>`
    });


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