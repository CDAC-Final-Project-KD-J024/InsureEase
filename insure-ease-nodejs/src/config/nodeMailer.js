const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
// config/nodeMailer.js
dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace this with your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email app password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html = '') => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

module.exports = sendEmail;
