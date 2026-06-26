import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, text) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log("Email sent:", data);
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};

export default sendMail;
