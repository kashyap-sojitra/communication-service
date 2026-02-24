/**
 * Detects whether the contact is an email or mobile number.
 * @param {string} contact - Email address or phone number
 * @returns {'email' | 'mobile' | null}
 */
const detectContactType = (contact) => {
  if (!contact || typeof contact !== 'string') return null;

  const trimmed = contact.trim();

  // Email detection: must contain @
  if (trimmed.includes('@')) {
    return 'email';
  }

  // Mobile detection: digits only (with optional leading + for country code)
  const mobileRegex = /^\+?[0-9]{10,15}$/;
  if (mobileRegex.test(trimmed)) {
    return 'mobile';
  }

  return null;
};

module.exports = detectContactType;
