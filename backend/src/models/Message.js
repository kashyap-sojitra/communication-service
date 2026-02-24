const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    // ── Sender Details ──────────────────────────────
    senderName: {
      type: String,
      required: [true, 'Sender name is required'],
      trim: true,
    },
    senderEmail: {
      type: String,
      required: [true, 'Sender email is required'],
      trim: true,
      lowercase: true,
    },
    senderPhone: {
      type: String,
      trim: true,
      default: null,
    },
    senderOrganization: {
      type: String,
      trim: true,
      default: null,
    },

    // ── Receiver / Recipient Details ─────────────────
    receiverName: {
      type: String,
      trim: true,
      default: null,
    },
    contact: {
      type: String,
      required: [true, 'Recipient contact is required'],
      trim: true,
    },
    contactType: {
      type: String,
      enum: ['email', 'mobile'],
      required: true,
    },

    // ── Message ──────────────────────────────────────
    subject: {
      type: String,
      trim: true,
      default: 'Message from Communication Service',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },

    // ── Delivery ─────────────────────────────────────
    status: {
      type: String,
      enum: ['sent', 'failed'],
      default: 'failed',
    },
    errorDetails: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
