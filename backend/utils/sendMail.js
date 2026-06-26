import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

// Brevo setup
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendMail = async (to, subject, text) => {
  try {
    const response = await apiInstance.sendTransacEmail({
      sender: {
        email: "noreply@bookmyservice.com",
        name: "BookMyService",
      },
      to: [{ email: to }], 
      subject,
      textContent: text,
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};

export default sendMail;
