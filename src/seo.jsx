import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_ORIGIN = 'https://www.mwayjnconsultancy.in';
const DEFAULT_IMAGE = `${DEFAULT_ORIGIN}/mway-logo-512.png`;

function setMetaTag(attrName, attrValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonicalTag(url) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function setJsonLdScript(schemaObject) {
  const SCRIPT_ID = 'route-jsonld-schema';
  let element = document.getElementById(SCRIPT_ID);
  if (!schemaObject) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('script');
    element.id = SCRIPT_ID;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(schemaObject);
}

export function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  schema = null
}) {
  const location = useLocation();
  const canonicalUrl = canonical || `${DEFAULT_ORIGIN}${location.pathname}`;

  useEffect(() => {
    // 1. Page Title
    if (title) {
      document.title = title;
    }

    // 2. Meta Description
    if (description) {
      setMetaTag('name', 'description', description);
    }

    // 3. Robots
    const robotsContent = noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('name', 'robots', robotsContent);

    // 4. Canonical URL
    setCanonicalTag(canonicalUrl);

    // 5. Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', 'JN Consultancy Services');
    setMetaTag('property', 'og:locale', 'en_IN');

    // 6. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:url', canonicalUrl);

    // 7. Structured Data JSON-LD
    setJsonLdScript(schema);

    return () => {
      // Clean up dynamic schema when leaving route
      setJsonLdScript(null);
    };
  }, [title, description, canonicalUrl, image, type, noindex, schema]);

  return null;
}
