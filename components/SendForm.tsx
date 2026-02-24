'use client';

import { useState, useEffect } from 'react';
import { sendMessage, MessageRecord } from '@/services/api';
import { validateFormInputs, detectContactType } from '@/utils/validation';

type ContactType = 'email' | 'mobile' | null;
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SendForm() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderOrganization, setSenderOrganization] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [responseData, setResponseData] = useState<MessageRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [detectedType, setDetectedType] = useState<ContactType>(null);

  // Live contact type detection
  useEffect(() => {
    if (contact.trim() === '') {
      setDetectedType(null);
    } else {
      setDetectedType(detectContactType(contact));
    }
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    setErrorMsg('');
    setResponseData(null);

    // Client-side validation
    const errors = validateFormInputs(contact, message, senderName, senderEmail);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setStatus('loading');

    try {
      const result = await sendMessage({
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        senderPhone: senderPhone.trim() || undefined,
        senderOrganization: senderOrganization.trim() || undefined,
        receiverName: receiverName.trim() || undefined,
        contact: contact.trim(),
        subject: subject.trim() || undefined,
        message: message.trim(),
      });

      if (result.success && result.data) {
        setStatus('success');
        setResponseData(result.data);
        setSenderName('');
        setSenderEmail('');
        setSenderPhone('');
        setSenderOrganization('');
        setReceiverName('');
        setContact('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'Failed to send message. Please try again.');
        if (result.data) setResponseData(result.data);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error: Could not reach the server. Please check your connection.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setResponseData(null);
    setErrorMsg('');
    setValidationErrors([]);
  };

  return (
    <div className="send-form-wrapper">
      <div className="send-form-card">
        {/* Header */}
        <div className="form-header">
          <div className="form-icon-wrap">
            <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div>
            <h2 className="form-title">Send a Message</h2>
            <p className="form-subtitle">Email or SMS — we'll detect it automatically</p>
          </div>
        </div>

        {/* Success State */}
        {status === 'success' && responseData && (
          <div className="result-card result-success">
            <div className="result-icon">✅</div>
            <div className="result-content">
              <h3 className="result-title">Message Sent Successfully!</h3>
              <div className="result-meta">
                <span className="meta-badge badge-type">
                  {responseData.contactType === 'email' ? '📧 Email' : '📱 SMS'}
                </span>
                <span className={`meta-badge ${responseData.status === 'sent' ? 'badge-sent' : 'badge-failed'}`}>
                  {responseData.status.toUpperCase()}
                </span>
              </div>
              <p className="result-contact">To: <strong>{responseData.contact}</strong></p>
              <p className="result-id">ID: <code>{responseData._id}</code></p>
            </div>
            <button onClick={resetForm} className="btn-secondary">Send Another</button>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="result-card result-error">
            <div className="result-icon">❌</div>
            <div className="result-content">
              <h3 className="result-title">Delivery Failed</h3>
              <p className="result-error-msg">{errorMsg}</p>
              {responseData && (
                <p className="result-id">Logged with ID: <code>{responseData._id}</code></p>
              )}
            </div>
            <button onClick={resetForm} className="btn-secondary">Try Again</button>
          </div>
        )}

        {/* Form */}
        {(status === 'idle' || status === 'loading') && (
          <form onSubmit={handleSubmit} className="send-form" noValidate>
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="validation-errors">
                {validationErrors.map((err, i) => (
                  <p key={i} className="validation-error-item">⚠️ {err}</p>
                ))}
              </div>
            )}

            {/* Sender Name (required) */}
            <div className="field-group">
              <label htmlFor="senderName" className="field-label">
                Your Name <span className="required-star">*</span>
              </label>
              <input
                id="senderName"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="John Doe"
                className="field-input"
                disabled={status === 'loading'}
                autoComplete="name"
              />
            </div>

            {/* Sender Email (required) */}
            <div className="field-group">
              <label htmlFor="senderEmail" className="field-label">
                Your Email <span className="required-star">*</span>
              </label>
              <input
                id="senderEmail"
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="you@example.com"
                className="field-input"
                disabled={status === 'loading'}
                autoComplete="email"
              />
            </div>

            {/* Sender Phone (optional) */}
            <div className="field-group">
              <label htmlFor="senderPhone" className="field-label">
                Your Phone <span className="optional-tag">(optional)</span>
              </label>
              <input
                id="senderPhone"
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="+919876543210"
                className="field-input"
                disabled={status === 'loading'}
                autoComplete="tel"
              />
            </div>

            {/* Sender Organization (optional) */}
            <div className="field-group">
              <label htmlFor="senderOrganization" className="field-label">
                Organization <span className="optional-tag">(optional)</span>
              </label>
              <input
                id="senderOrganization"
                type="text"
                value={senderOrganization}
                onChange={(e) => setSenderOrganization(e.target.value)}
                placeholder="Company / Organization"
                className="field-input"
                disabled={status === 'loading'}
                autoComplete="organization"
              />
            </div>

            {/* Receiver Name (optional) */}
            <div className="field-group">
              <label htmlFor="receiverName" className="field-label">
                Recipient Name <span className="optional-tag">(optional)</span>
              </label>
              <input
                id="receiverName"
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                placeholder="Jane Smith"
                className="field-input"
                disabled={status === 'loading'}
              />
            </div>

            {/* Contact Field (required) */}
            <div className="field-group">
              <label htmlFor="contact" className="field-label">
                Recipient Contact <span className="required-star">*</span>
                {detectedType && (
                  <span className={`type-badge ${detectedType === 'email' ? 'type-email' : 'type-sms'}`}>
                    {detectedType === 'email' ? '📧 Email detected' : '📱 SMS detected'}
                  </span>
                )}
              </label>
              <div className="field-input-wrap">
                <div className="field-prefix-icon">
                  {detectedType === 'email' ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ) : detectedType === 'mobile' ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                    </svg>
                  )}
                </div>
                <input
                  id="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="user@example.com or +919876543210"
                  className="field-input"
                  disabled={status === 'loading'}
                  autoComplete="off"
                />
              </div>
              <p className="field-hint">Enter an email address for Email, or phone number for SMS</p>
            </div>

            {/* Subject Field (optional) */}
            <div className="field-group">
              <label htmlFor="subject" className="field-label">
                Subject <span className="optional-tag">(optional)</span>
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Message from Communication Service"
                className="field-input"
                disabled={status === 'loading'}
              />
            </div>

            {/* Message Field (required) */}
            <div className="field-group">
              <label htmlFor="message" className="field-label">
                Message <span className="required-star">*</span>
                <span className="char-count">{message.length} chars</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="field-textarea"
                rows={5}
                disabled={status === 'loading'}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`btn-primary ${status === 'loading' ? 'btn-loading' : ''}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="spinner" />
                  Sending{detectedType === 'email' ? ' Email' : detectedType === 'mobile' ? ' SMS' : ''}...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Send {detectedType === 'email' ? 'Email' : detectedType === 'mobile' ? 'SMS' : 'Message'}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
