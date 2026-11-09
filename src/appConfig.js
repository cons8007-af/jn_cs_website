/**
 * MWAY Official Application Distribution Configuration
 * 
 * Central configuration file for the MWAY mobile app distribution.
 * This file controls the official Google Play Store listing and download behavior
 * across the permanent /download landing page and printed brochure QR codes.
 * 
 * INSTRUCTIONS FOR DEPLOYMENT / RELEASE:
 * 1. While the app is in pre-release or review, leave `playStoreUrl` as '' (empty string) or null.
 *    The /download page will automatically show "Coming Soon" and keep the download button safely disabled.
 * 2. Once the app is officially approved and live on the Google Play Store, paste the official URL below:
 *    e.g. playStoreUrl: 'https://play.google.com/store/apps/details?id=com.cons.mway'
 * 3. Or pass it via the environment variable `VITE_PLAY_STORE_URL`.
 * 4. The /download page will instantly activate the "Get it on Google Play" button without any code refactoring.
 */

export const APP_CONFIG = {
  appName: 'MWAY',
  tagline: 'My Way. My Growth. My Journey.',
  companyName: 'JN Consultancy Services',
  officialWebsite: 'https://www.mwayjnconsultancy.in',
  primaryDomain: 'https://www.mwayjnconsultancy.in',
  downloadUrl: 'https://www.mwayjnconsultancy.in/download',

  /**
   * Official Google Play Store listing URL.
   * Default: '' (Pre-release / Review mode -> Shows "Coming Soon" and disabled button).
   * Official target once published: 'https://play.google.com/store/apps/details?id=com.cons.mway'
   */
  playStoreUrl: '',

  /**
   * Optional Apple App Store listing URL (for future iOS release).
   */
  appStoreUrl: '',

  /**
   * Release and specification details
   */
  currentVersion: '1.0.0',
  minAndroidVersion: 'Android 8.0 (Oreo) or higher',
  packageSize: '~25 MB',
  developerName: 'JN Consultancy Services',
  contactPhone: '+91 96777 96891',
  contactEmail: 'support@mwayjnconsultancy.in',
  officeLocation: 'Perambalur, Tamil Nadu, India'
};

/**
 * Returns the active, validated Google Play Store URL if configured.
 * Checks environment variable VITE_PLAY_STORE_URL first, then APP_CONFIG.playStoreUrl.
 * Returns null if unconfigured or invalid, ensuring users are never redirected to broken URLs.
 */
export function getPlayStoreUrl() {
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_PLAY_STORE_URL
    : null;

  const rawUrl = (envUrl || APP_CONFIG.playStoreUrl || '').trim();

  if (!rawUrl) {
    return null;
  }

  // Validate that it's a valid official Play Store URL
  try {
    const parsed = new URL(rawUrl);
    if (
      (parsed.hostname === 'play.google.com' && parsed.pathname.includes('/store/apps')) ||
      rawUrl.startsWith('market://details')
    ) {
      return rawUrl;
    }
  } catch {
    // Invalid URL format
    return null;
  }

  return null;
}

/**
 * Returns true if the official app is published and ready for public download.
 */
export function isAppPublished() {
  return Boolean(getPlayStoreUrl());
}

