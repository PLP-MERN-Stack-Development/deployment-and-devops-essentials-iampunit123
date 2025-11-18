import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `SafariVista <${process.env.EMAIL_FROM}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw new Error('Email could not be sent');
  }
};

export const sendWelcomeEmail = async (user) => {
  const message = `
    Welcome to SafariVista, ${user.name}!
    
    We're excited to have you on board. Get ready for unforgettable adventures in the wild.
    
    Best regards,
    The SafariVista Team
  `;

  await sendEmail({
    email: user.email,
    subject: 'Welcome to SafariVista!',
    message,
  });
};

export const sendBookingConfirmation = async (booking, user) => {
  const message = `
    Dear ${user.name},
    
    Your booking for "${booking.tour.name}" has been confirmed!
    
    Booking Details:
    - Tour: ${booking.tour.name}
    - Start Date: ${booking.startDate.toDateString()}
    - Participants: ${booking.participants.adults} adults, ${booking.participants.children} children
    - Total Amount: $${booking.totalAmount}
    
    We look forward to welcoming you on this amazing adventure!
    
    Best regards,
    SafariVista Team
  `;

  await sendEmail({
    email: user.email,
    subject: `Booking Confirmation - ${booking.tour.name}`,
    message,
  });
};

export default sendEmail;