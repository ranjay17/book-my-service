import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
  requireTLS: true,
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 60000,
  socketTimeout: 60000,
});

const sendMail = async (to, subject, text) => {
  try {
    await transporter.verify();
    console.log("SMTP Verified");

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};

export default sendMail;
