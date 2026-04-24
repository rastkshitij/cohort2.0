import usermodel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

 async function sendTokenResponse(user, req){
    `Generate JWT token and send response`
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: '48h',
    });
    return token;
 }


export const register = async (req, res) => {
    try {
        const { email, contact, password, fullname  , isSeller} = req.body;

        const existingUser = await usermodel.findOne({
            $or: [{ email }, { contact }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email or contact already exists" });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new usermodel({
            email,
            contact,
            password,
            fullname,
            role : isSeller ? 'seller' : 'buyer',
        });

        const savedUser = await newUser.save();

        const token = await sendTokenResponse(savedUser);
        const userResponse = savedUser.toObject();
delete userResponse.password;

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: userResponse,
        });

    } catch (error) {
        console.error(error); // 👈 ADD THIS (VERY IMPORTANT)
        res.status(500).json({ message: "Server error" });
    }
};