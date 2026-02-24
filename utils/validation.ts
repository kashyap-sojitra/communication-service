/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate mobile number (10–15 digits, optional leading +)
 */
export const isValidMobile = (mobile: string): boolean => {
  const mobileRegex = /^\+?[0-9]{10,15}$/;
  return mobileRegex.test(mobile.trim());
};

/**
 * Detect whether a contact string is email or mobile
 */
export const detectContactType = (contact: string): 'email' | 'mobile' | null => {
  if (!contact || contact.trim() === '') return null;
  const trimmed = contact.trim();
  if (trimmed.includes('@')) return 'email';
  const mobileRegex = /^\+?[0-9]{10,15}$/;
  if (mobileRegex.test(trimmed)) return 'mobile';
  return null;
};

/**
 * Full validation: returns list of error strings (empty = valid)
 */
export const validateFormInputs = (
  contact: string,
  message: string,
  senderName?: string,
  senderEmail?: string
): string[] => {
  const errors: string[] = [];

  // Sender validation
  if (!senderName || senderName.trim() === '') {
    errors.push('Sender name is required.');
  }

  if (!senderEmail || senderEmail.trim() === '') {
    errors.push('Sender email is required.');
  } else if (!isValidEmail(senderEmail)) {
    errors.push('Please enter a valid sender email address.');
  }

  // Recipient validation
  if (!contact || contact.trim() === '') {
    errors.push('Contact (email or phone number) is required.');
  } else {
    const type = detectContactType(contact);
    if (type === 'email' && !isValidEmail(contact)) {
      errors.push('Please enter a valid email address.');
    } else if (type === 'mobile' && !isValidMobile(contact)) {
      errors.push('Phone number must be 10–15 digits (optionally starting with +).');
    } else if (type === null) {
      errors.push('Enter a valid email address or phone number (10–15 digits).');
    }
  }

  if (!message || message.trim() === '') {
    errors.push('Message content is required.');
  }

  return errors;
};
