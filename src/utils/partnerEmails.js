/**
 * List of verified partner company email addresses.
 * Only listings created by or associated with these email addresses
 * will receive the "✓ Partner" badge on the platform.
 */
export const partnerEmails = [
  "sales@zanzipalms.com",
  "info@zanzipalms.com"
  // Add other partner emails here
];

/**
 * Helper function to check if an advertisement belongs to a partner company.
 * Matches against the listing's contact Email or the user's creator Email (userEmail).
 * 
 * @param {Object} ad - The advertisement object from Firestore
 * @returns {boolean} - True if the ad is from a verified partner
 */
export function isPartnerAd(ad) {
  if (!ad) return false;
  
  const email = (ad.Email || ad.email || ad.userEmail || "").toLowerCase().trim();
  
  return partnerEmails.some(
    (partnerEmail) => partnerEmail.toLowerCase().trim() === email
  );
}
