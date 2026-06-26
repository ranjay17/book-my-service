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
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (to, subject, text) => {
  try {
    console.log("📧 Sending mail...");
    console.log("EMAIL:", process.env.EMAIL);
    console.log("PASS EXISTS:", !!process.env.EMAIL_PASS);

    const info = await transporter.sendMail({
      from: `"Book My Service" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Mail Error:", error.message);
  }
};

export default sendMail;
