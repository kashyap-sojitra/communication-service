const twilio = require('twilio');

/**
 * Sends an SMS using Twilio
 * @param {string} to - Recipient phone number (e.g., +919876543210)
 * @param {string} message - Message body
 * @returns {Promise<{success: boolean, info?: object, error?: string}>}
 */
const sendSMS = async (to, message) => {
  try {
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_TOKEN
    );

    // Ensure number is in E.164 format
    const formattedNumber = to.startsWith('+') ? to : `+${to}`;

    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: formattedNumber,
    });

    console.log(`✅ SMS sent to ${formattedNumber} — SID: ${response.sid}`);
    return { success: true, info: { sid: response.sid, status: response.status } };
  } catch (error) {
    console.error('❌ SMS send failed:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendSMS };
