import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async(to, subject, text) =>{
    try {
        await transporter.sendMail({
          from: process.env.EMAIL,
          to,
          subject,
          text,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log(error);
    }
}

export default sendMail;