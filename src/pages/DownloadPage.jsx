import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Car,
  GraduationCap,
  Building2,
  Briefcase,
  CreditCard,
  Headphones,
  Sparkles,
  Download,
  Share2,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import mwayLogo from '../assets/mway-logo.png';
import { APP_CONFIG, getPlayStoreUrl, isAppPublished } from '../appConfig.js';
import { SEO } from '../seo.jsx';

/**
 * Official Google Play Store Vector Icon
 */
function GooglePlayIcon({ disabled = false, size = 26 }) {
  if (disabled) {
    return (
      <svg
        viewBox="0 0 512 512"
        width={size}
        height={size}
        className="googlePlaySvg disabled"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M47.8 15.1c-4.4 4.8-7 12.3-7 21.6v438.6c0 9.3 2.6 16.8 7 21.6l1.2 1.1 245.7-245.7v-5.8L49 14l-1.2 1.1z"
        />
        <path
          fill="currentColor"
          d="M376.5 321.2l-81.8-81.8v-5.8l81.8-81.8 1.9 1.1 96.9 55.1c27.7 15.7 27.7 41.5 0 57.2l-96.9 55.1-1.9 1.1z"
        />
        <path
          fill="currentColor"
          d="M294.7 245.4L47.8 497c8 8.5 21.2 9.5 36.1 1.1l294.5-167.3-83.7-85.4z"
        />
        <path
          fill="currentColor"
          d="M294.7 266.6l83.7-85.4L83.9 13.9C69 5.5 55.8 6.5 47.8 15l246.9 251.6z"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className="googlePlaySvg"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M47.8 15.1c-4.4 4.8-7 12.3-7 21.6v438.6c0 9.3 2.6 16.8 7 21.6l1.2 1.1 245.7-245.7v-5.8L49 14l-1.2 1.1z"
      />
      <path
        fill="#FBBC04"
        d="M376.5 321.2l-81.8-81.8v-5.8l81.8-81.8 1.9 1.1 96.9 55.1c27.7 15.7 27.7 41.5 0 57.2l-96.9 55.1-1.9 1.1z"
      />
      <path
        fill="#EA4335"
        d="M294.7 245.4L47.8 497c8 8.5 21.2 9.5 36.1 1.1l294.5-167.3-83.7-85.4z"
      />
      <path
        fill="#34A853"
        d="M294.7 266.6l83.7-85.4L83.9 13.9C69 5.5 55.8 6.5 47.8 15l246.9 251.6z"
      />
    </svg>
  );
}

export function DownloadPage() {
  const [playStoreUrl, setPlayStoreUrl] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const url = getPlayStoreUrl();
    setPlayStoreUrl(url);
    setIsPublished(Boolean(url));
  }, []);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is unavailable
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mwayjnconsultancy.in/' },
          { '@type': 'ListItem', position: 2, name: 'Download App', item: 'https://www.mwayjnconsultancy.in/download' }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: APP_CONFIG.appName,
        operatingSystem: 'ANDROID',
        applicationCategory: 'TravelApplication',
        description:
          'Official MWAY mobile application for outstation cabs, savari rides, return empty travel, and comprehensive consultation services in Perambalur.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR'
        },
        publisher: {
          '@type': 'Organization',
          name: APP_CONFIG.companyName,
          url: 'https://www.mwayjnconsultancy.in/'
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Download MWAY App | Official Mobile App - JN Consultancy Services"
        description="Download the official MWAY mobile app by JN Consultancy Services. Book outstation cabs, savari rides, track trips live, and access education, property & banking services in Perambalur."
        canonical="https://www.mwayjnconsultancy.in/download"
        schema={schema}
      />

      <div className="downloadPageRoot">
        {/* Top Hero Section */}
        <section className="downloadHeroSection">
          <div className="wrap downloadHeroWrap">
            {/* Logo Badge */}
            <div className="downloadHeroLogoContainer">
              <div className="downloadHeroLogoGlow" />
              <img
                src={mwayLogo}
                alt="MWAY Official App Logo"
                className="downloadHeroLogo"
                width={140}
                height={120}
                loading="eager"
              />
            </div>

            {/* App Identification */}
            <div className="downloadHeroHeader">
              <span className="downloadEyebrow">
                <Sparkles size={14} className="eyebrowIcon" />
                OFFICIAL MOBILE APPLICATION
              </span>
              <h1 className="downloadMainHeading">
                MWAY
                <span className="downloadSubHeadingTagline">
                  {APP_CONFIG.tagline}
                </span>
              </h1>
              <p className="downloadLeadIntro">
                The all-in-one mobile platform by <strong>{APP_CONFIG.companyName}</strong>. 
                Connecting Perambalur and Tamil Nadu with verified cab travel, live trip tracking, 
                and direct consultation for education, property, overseas careers, and banking loans.
              </p>
            </div>

            {/* Central Download Card */}
            <div className="downloadActionCard">
              <div className="downloadCardInner">
                {/* Status Pill */}
                <div className="downloadStatusRow">
                  {isPublished ? (
                    <span className="downloadStatusBadge live">
                      <span className="statusDot live" />
                      AVAILABLE ON GOOGLE PLAY
                    </span>
                  ) : (
                    <span className="downloadStatusBadge comingSoon">
                      <Clock size={13} className="statusClock" />
                      COMING SOON TO GOOGLE PLAY
                    </span>
                  )}
                  <span className="downloadPlatformTag">Android OS</span>
                </div>

                {/* Primary Action Button */}
                <div className="downloadButtonContainer">
                  {isPublished && playStoreUrl ? (
                    <a
                      href={playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="googlePlayActionBtn active"
                      aria-label="Download MWAY on Google Play Store"
                    >
                      <GooglePlayIcon disabled={false} size={28} />
                      <div className="googlePlayBtnText">
                        <span className="btnSubText">GET IT ON</span>
                        <span className="btnMainText">Google Play</span>
                      </div>
                      <ArrowRight size={18} className="btnArrow" />
                    </a>
                  ) : (
                    <div
                      className="googlePlayActionBtn disabled"
                      role="button"
                      tabIndex={-1}
                      aria-disabled="true"
                      title="The MWAY app is currently in pre-release and awaiting Google Play Store approval."
                    >
                      <GooglePlayIcon disabled={true} size={28} />
                      <div className="googlePlayBtnText">
                        <span className="btnSubText">COMING SOON ON</span>
                        <span className="btnMainText">Google Play</span>
                      </div>
                      <Clock size={16} className="btnClock" />
                    </div>
                  )}
                </div>

                {/* Status Explanation Callout */}
                {isPublished ? (
                  <div className="downloadNoticeBox live">
                    <CheckCircle2 size={16} className="noticeIcon live" />
                    <p>
                      Official release ready. Tap the Google Play button above to download 
                      and install the verified MWAY app directly from Google.
                    </p>
                  </div>
                ) : (
                  <div className="downloadNoticeBox comingSoon">
                    <ShieldCheck size={18} className="noticeIcon comingSoon" />
                    <div className="noticeText">
                      <strong>Pre-Release Verification Notice</strong>
                      <p>
                        The MWAY mobile app is currently undergoing official verification on the Google Play Store. 
                        This permanent link (<code>mwayjnconsultancy.in/download</code>) printed on our brochures 
                        and QR codes will activate automatically the moment the app is live.
                      </p>
                    </div>
                  </div>
                )}

                {/* Permanent Brochure Guarantee */}
                <div className="downloadPermanentGuarantee">
                  <div className="guaranteeItem">
                    <span className="guaranteeLabel">Permanent URL</span>
                    <span className="guaranteeValue">https://mwayjnconsultancy.in/download</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="copyUrlBtn"
                    title="Copy permanent download URL"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* App Specs Footer */}
                <div className="downloadSpecsGrid">
                  <div className="specCol">
                    <span className="specTitle">Compatibility</span>
                    <span className="specDesc">{APP_CONFIG.minAndroidVersion}</span>
                  </div>
                  <div className="specCol">
                    <span className="specTitle">Version</span>
                    <span className="specDesc">{APP_CONFIG.currentVersion} (Official)</span>
                  </div>
                  <div className="specCol">
                    <span className="specTitle">Cost</span>
                    <span className="specDesc">Free Download</span>
                  </div>
                  <div className="specCol">
                    <span className="specTitle">Security</span>
                    <span className="specDesc">100% Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Do in MWAY Section */}
        <section className="downloadFeaturesSection">
          <div className="wrap">
            <div className="sectionHeader textCenter">
              <span className="eyebrow">FEATURES & CAPABILITIES</span>
              <h2>What You Can Do with <em>MWAY</em></h2>
              <p className="sectionSub">
                Designed specifically for our customers in Perambalur, Trichy, and across Tamil Nadu.
              </p>
            </div>

            <div className="downloadFeaturesGrid">
              <div className="featureCard">
                <div className="featureIconBox">
                  <Car size={24} />
                </div>
                <h3>Outstation Cabs & Travels</h3>
                <p>
                  Book one-way drops, round trips, holiday tour packages, and airport transfers 
                  to Trichy and Chennai with transparent, confirmed fares.
                </p>
              </div>

              <div className="featureCard">
                <div className="featureIconBox">
                  <Smartphone size={24} />
                </div>
                <h3>Savari & Return-Empty Routes</h3>
                <p>
                  Save significantly on intercity journeys by booking return-empty vehicle routes 
                  with verified local drivers.
                </p>
              </div>

              <div className="featureCard">
                <div className="featureIconBox">
                  <ShieldCheck size={24} />
                </div>
                <h3>Live Trip GPS Tracking</h3>
                <p>
                  Track your vehicle’s live coordinates, estimated arrival time, and share 
                  real-time trip links with your family for peace of mind.
                </p>
              </div>

              <div className="featureCard">
                <div className="featureIconBox">
                  <CreditCard size={24} />
                </div>
                <h3>Secure Razorpay Payments</h3>
                <p>
                  Pay booking advances safely using UPI, Net Banking, or Cards, with remaining 
                  balances settled upon trip completion.
                </p>
              </div>

              <div className="featureCard">
                <div className="featureIconBox">
                  <GraduationCap size={24} />
                </div>
                <h3>Admission & College Guidance</h3>
                <p>
                  Direct access to JN Education counsellors for Tamil Nadu Engineering (TNEA), 
                  Medical, Arts & Science, and Abroad University admissions.
                </p>
              </div>

              <div className="featureCard">
                <div className="featureIconBox">
                  <Building2 size={24} />
                </div>
                <h3>Property, Jobs & Banking</h3>
                <p>
                  Browse verified DTCP plots, explore overseas job vacancies, and calculate loan 
                  eligibility with our trusted in-house advisors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brochure Reader & Support Contact Section */}
        <section className="downloadSupportSection">
          <div className="wrap downloadSupportWrap">
            <div className="downloadSupportCard">
              <div className="supportContent">
                <div className="supportBadge">
                  <Headphones size={15} />
                  DIRECT ASSISTANCE
                </div>
                <h3>Scanning from a Printed Brochure?</h3>
                <p>
                  If you received our printed brochure or need help with a travel booking, college 
                  admission, or property enquiry right now, our team is available to assist you directly.
                </p>
                <div className="supportContactButtons">
                  <a href={`tel:${APP_CONFIG.contactPhone.replace(/\s+/g, '')}`} className="btn primary">
                    Call {APP_CONFIG.contactPhone}
                  </a>
                  <Link to="/contact" className="btn secondary">
                    Send an Enquiry <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="supportMeta">
                <div className="metaRow">
                  <span className="metaLabel">Support Desk:</span>
                  <a href={`mailto:${APP_CONFIG.contactEmail}`}>{APP_CONFIG.contactEmail}</a>
                </div>
                <div className="metaRow">
                  <span className="metaLabel">Head Office:</span>
                  <span>JN Consultancy Services, Perambalur, Tamil Nadu</span>
                </div>
                <div className="metaRow">
                  <span className="metaLabel">Privacy & Terms:</span>
                  <div className="metaLinks">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <span>•</span>
                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

