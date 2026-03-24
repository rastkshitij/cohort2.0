import nodeMialer from "nodemailer";
import dotenv from "dotenv";


const transporter = nodeMialer.createTransport({
  service: "gmail",
  auth: {
    type : "OAuth2",
      user: process.env.google_user,
  clientId: process.env.google_client_id,
  clientSecret: process.env.google_client_secret,
  refreshToken: process.env.google_refresh_token,
  }
})
  

export async function sendEmail({to , subject  , html , text}){
    const mailOptions = {
        from : process.env.google_user,
        to, 
        subject,
        text,
        html
    };
   const details= await transporter.sendMail(mailOptions);
   console.log("Email send:" ,details)
}   

