const Message = require('../models/Message');
const detectContactType = require('../utils/detectContactType');
const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');

// ── Validators ──────────────────────────────────────────────────────────────

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const isValidMobile = (mobile) => /^\+?[0-9]{10,15}$/.test(mobile.trim());

const validateInput = (body) => {
  const errors = [];
  const { senderName, senderEmail, contact, message } = body;

  // Sender
  if (!senderName || senderName.trim() === '') {
    errors.push('Sender name is required.');
  }
  if (!senderEmail || senderEmail.trim() === '') {
    errors.push('Sender email is required.');
  } else if (!isValidEmail(senderEmail)) {
    errors.push('Sender email format is invalid.');
  }

  // Recipient
  if (!contact || contact.trim() === '') {
    errors.push('Recipient contact (email or mobile) is required.');
  } else {
    const type = detectContactType(contact.trim());
    if (type === 'email' && !isValidEmail(contact)) {
      errors.push('Recipient email format is invalid.');
    } else if (type === 'mobile' && !isValidMobile(contact)) {
      errors.push('Recipient mobile must be 10–15 digits.');
    } else if (!type) {
      errors.push('Recipient must be a valid email or mobile number (10–15 digits).');
    }
  }

  // Message
  if (!message || message.trim() === '') {
    errors.push('Message content is required.');
  }

  return errors;
};

// ── POST /api/send ───────────────────────────────────────────────────────────

const sendMessage = async (req, res, next) => {
  try {
    const {
      senderName,
      senderEmail,
      senderPhone,
      senderOrganization,
      receiverName,
      contact,
      subject,
      message,
    } = req.body;

    // Validation
    const errors = validateInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: errors.join(' ') });
    }

    const trimmedContact = contact.trim();
    const trimmedMessage = message.trim();
    const contactType = detectContactType(trimmedContact);

    const sender = {
      name: senderName.trim(),
      email: senderEmail.trim(),
      phone: senderPhone?.trim() || null,
      organization: senderOrganization?.trim() || null,
    };

    const receiver = {
      name: receiverName?.trim() || null,
      contact: trimmedContact,
    };

    const messageSubject = subject?.trim() || 'Message from Communication Service';

    // Send
    let result;
    if (contactType === 'email') {
      result = await sendEmail(receiver.contact, trimmedMessage, sender, receiver, messageSubject);
    } else {
      result = await sendSMS(receiver.contact, trimmedMessage, sender);
    }

    // Persist
    const saved = await Message.create({
      senderName: sender.name,
      senderEmail: sender.email,
      senderPhone: sender.phone,
      senderOrganization: sender.organization,
      receiverName: receiver.name,
      contact: trimmedContact,
      contactType,
      subject: messageSubject,
      message: trimmedMessage,
      status: result.success ? 'sent' : 'failed',
      errorDetails: result.success ? null : result.error,
    });

    if (!result.success) {
      return res.status(502).json({
        success: false,
        error: `Message could not be delivered: ${result.error}`,
        data: saved,
      });
    }

    return res.status(200).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/messages ────────────────────────────────────────────────────────

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getAllMessages };
