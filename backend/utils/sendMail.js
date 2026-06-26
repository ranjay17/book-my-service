import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("EMAIL:", process.env.EMAIL);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "PASS FOUND" : "PASS MISSING",
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendMail = async (to, subject, text) => {
  try {
    console.log("EMAIL:", process.env.EMAIL);
    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS ? "PASS FOUND" : "PASS MISSING",
    );

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