import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email app password
    },
});

export const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Password Reset",
        text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    };

    return transporter.sendMail(mailOptions);
};
