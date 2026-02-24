const nodemailer = require('nodemailer');

/**
 * Sends a richly formatted HTML email including full sender & receiver details.
 *
 * @param {string} to           - Recipient email address
 * @param {string} message      - Message body text
 * @param {object} sender       - { name, email, phone, organization }
 * @param {object} receiver     - { name, contact }
 * @param {string} subject      - Email subject line
 */
const sendEmail = async (to, message, sender = {}, receiver = {}, subject = 'Message from Communication Service') => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const senderDisplay = sender.name
      ? `"${sender.name}" <${process.env.EMAIL_USER}>`
      : `"Communication Service" <${process.env.EMAIL_USER}>`;

    const receiverDisplay = receiver.name ? receiver.name : '';

    const greeting = receiverDisplay ? `Hi ${receiverDisplay},` : 'Hi,';
    const senderName = sender.name || 'Communication Service';

    // Plain text only — simple and professional
    const text = `${greeting}\n\n${message}\n\nBest regards,\n${senderName}`;

    const mailOptions = {
      from: senderDisplay,
      to,
      subject,
      text,
      replyTo: sender.email || process.env.EMAIL_USER,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to} — MessageId: ${info.messageId}`);
    return { success: true, info: { messageId: info.messageId } };
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
