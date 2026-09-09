const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendVerificationEmail(to, token) {
  const verificationUrl = `${process.env.APP_URL}/api/auth/verifikasi-email?token=${token}`;
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Verifikasi Email - ChillStream",
    html: `<p>Klik link berikut untuk verifikasi akun kamu:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p>`,
  });
}

module.exports = {
  sendVerificationEmail,
};