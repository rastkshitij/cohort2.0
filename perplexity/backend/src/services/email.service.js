import nodeMialer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log("EMAIL:", process.env.google_user);
console.log("PASSWORD:", process.env.password);
console.log("USER:", process.env.google_user);
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
  

transporter.verify()
    .then(() => {
  console.log("Ready to send email");
}   
) 
.catch((err) => {
  console.log("Error with email transporter", err);
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

