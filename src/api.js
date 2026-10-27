/**
 * Banking & Website API Client
 * Connects directly to the Cons Backend enquiry endpoint.
 */

const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    // In local dev, proxy via Vite or call local backend directly
    return 'http://localhost:3000';
  }
  // Production Railway backend URL
  return 'https://consbackend-production.up.railway.app';
};

export async function submitEnquiry(payload) {
  const base = getApiBase();
  const url = `${base}/api/enquiries`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message =
        (data && (data.message || data.error)) ||
        `Request failed with status ${res.status}. Please try again.`;
      const err = new Error(message);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    // Handle offline / network disconnect
    if (!navigator.onLine) {
      throw new Error('You appear to be offline. Please check your internet connection and try again.');
    }
    throw err;
  }
}
