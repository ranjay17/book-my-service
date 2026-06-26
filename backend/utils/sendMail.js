import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

// Brevo setup
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendMail = async (to, subject, text) => {
  try {
    console.log("📧 Sending email to:", to);

    const response = await tranEmailApi.sendTransacEmail({
      sender: {
        email: "no-reply@brevo.com",
        name: "BookMyService",
      },
      to: [{ email: to }],
      subject,
      textContent: text,
      replyTo: { email: "lbrainbow000@gmail.com" },
    });

    console.log("Email sent successfully:", response.messageId);

    return response;
  } catch (error) {
    console.log("MAIL ERROR:", error.response?.text || error.message);
  }
};

export default sendMail;
