const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP configuration is missing in environment variables");
}

const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"Resume Builder" <${process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        }
        const info = await transport.sendMail(mailOptions);
        console.log(info);
        return info;
    } catch (error) {
        console.log("Error sending email link", error);
        throw new Error(error?.message || "Link could not be send! Try again later");
    }
}

module.exports = { sendEmail }