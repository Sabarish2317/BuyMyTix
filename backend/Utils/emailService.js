const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, otp) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "OTP for password reset",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8" /><style>/* your styles here */</style></head>
        <body>
          <div class="container">
            <div class="header"><h1>Forgot Your Password?</h1></div>
            <p>Use the OTP below to reset your password:</p>
            <div class="otp-box">${otp}</div>
            <p>This OTP will expire in <strong>10 minutes</strong>.</p>
          </div>
        </body>
        </html>`,
    });
  } catch (error) {
    console.error("Resend error:", error);
    throw new Error("Error sending email");
  }
};

module.exports = sendEmail;
