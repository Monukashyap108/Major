import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    //    port : 465,
    //    secure : true,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
})

export default transporter;

export const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        text,
    })
}