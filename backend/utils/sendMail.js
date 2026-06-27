import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  pool: true, // helps in production stability
  maxConnections: 1,
  rateLimit: true,
});

const sendMail = async (to, subject, text) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return reject(error);
      }
      console.log("Email sent:", info.response);
      resolve(info);
    });
  });
};

export default sendMail;
