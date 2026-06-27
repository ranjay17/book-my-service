import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, text) => {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM,
      subject,
      text,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.error("SendGrid error:", err.response?.body || err.message);
    throw err;
  }
};

export default sendMail;
