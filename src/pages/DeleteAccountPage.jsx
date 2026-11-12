import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Copy,
  Check,
  Clock,
  FileText,
  UserX,
  ExternalLink,
  ShieldCheck,
  Trash2,
  Lock
} from 'lucide-react';
import { SEO } from '../seo.jsx';
import '../styles/deleteAccount.css';

const OFFICIAL_EMAIL = 'jnconsultancy26@gmail.com';
const PRIMARY_PHONE = '9384611201';
const ALT_PHONE = '8695556550';
const OFFICE_ADDRESS = 'Shop No-9, C-Block, 5Star Complex, Opposite New Bus Stand, Perambalur - 621212, Tamil Nadu, India.';

const EMAIL_SUBJECT = 'MWAY Account Deletion Request';

const EMAIL_BODY_TEMPLATE = `Hello MWAY Support Team,

I am requesting the permanent deletion of my MWAY account and associated personal data.

Account Information:
- Full Name: [Enter your full name]
- Registered Mobile Number: [Enter your 10-digit registered mobile number]
- Registered Email Address: [Enter your email if linked]
- App Type: [MWAY Customer App / MWAY-D Driver App]
- Reason for Deletion (Optional): [Brief reason if any]

I understand that once verified, my account credentials, profile details, and active sessions will be permanently removed.

Thank you.`;

export function DeleteAccountPage() {
  const [copied, setCopied] = useState(false);

  const mailtoUrl = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY_TEMPLATE)}`;

  const handleCopyTemplate = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL_BODY_TEMPLATE);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = EMAIL_BODY_TEMPLATE;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="deleteAccountPage">
      <SEO
        title="Delete Account & Data Removal Request | MWAY"
        description="Official procedure to request deletion of your MWAY Customer or Driver Partner account and associated personal data. Learn about our verification steps and data retention policies."
        canonical="https://www.mwayjnconsultancy.in/delete-account"
      />

      {/* Hero Header */}
      <section className="deleteHero">
        <div className="wrap">
          <nav className="deleteBreadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span>Delete Account</span>
          </nav>

          <div className="deleteHeroEyebrow">
            <ShieldAlert size={14} aria-hidden="true" />
            <span>Account Safety & Data Privacy</span>
          </div>

          <h1 className="deleteHeroTitle">
            Delete Your <span>MWAY Account</span> & Associated Data
          </h1>

          <p className="deleteHeroLead">
            We value your privacy and autonomy over your personal information. If you wish
            to close your account and permanently remove your data from the MWAY Customer
            or MWAY-D Driver platform, please follow our official verification procedure.
          </p>

          <div className="deleteHeroActions">
            <Link to="/" className="btn-back-home">
              <ArrowLeft size={16} aria-hidden="true" />
              Return to MWAY Homepage
            </Link>
          </div>
        </div>
      </section>

      {/* Main Body Wrap */}
      <div className="wrap">
        {/* Three Core Guarantees Cards */}
        <div className="deleteHighlightsGrid">
          <div className="highlightCard">
            <div className="highlightIconWrap blue">
              <ShieldCheck size={24} aria-hidden="true" />
            </div>
            <h3>Identity Protection</h3>
            <p>
              To protect your account from malicious or accidental deletion, all requests
              undergo strict verification with the registered account owner.
            </p>
          </div>

          <div className="highlightCard">
            <div className="highlightIconWrap amber">
              <UserX size={24} aria-hidden="true" />
            </div>
            <h3>Permanent Profile Removal</h3>
            <p>
              Once confirmed, your login credentials, personal profile, device tokens,
              and active sessions are irreversibly deleted from our systems.
            </p>
          </div>

          <div className="highlightCard">
            <div className="highlightIconWrap emerald">
              <Lock size={24} aria-hidden="true" />
            </div>
            <h3>Statutory Compliance</h3>
            <p>
              Completed financial and safety audit records are preserved strictly as
              required by applicable Indian taxation and transport laws.
            </p>
          </div>
        </div>

        {/* Section 1: How to Request Deletion */}
        <section className="deleteContentCard">
          <h2>
            <FileText size={22} aria-hidden="true" />
            How to Request Account Deletion
          </h2>
          <p className="deleteSectionIntro">
            To ensure complete security and prevent unauthorized account closures, MWAY
            processes deletion requests through our verified support desk. Follow the
            step-by-step instructions below:
          </p>

          <div className="stepsTimeline">
            <div className="stepItem">
              <div className="stepBadge">1</div>
              <div className="stepBody">
                <h4>Submit Your Request via Official Email</h4>
                <p>
                  Send an email from your registered email address to our official contact
                  desk at <b>{OFFICIAL_EMAIL}</b> with the subject line <b>"MWAY Account Deletion Request"</b>.
                </p>
              </div>
            </div>

            <div className="stepItem">
              <div className="stepBadge">2</div>
              <div className="stepBody">
                <h4>Provide Required Account Identification</h4>
                <p>To locate your specific account, please include the following details in your email:</p>
                <ul>
                  <li><b>Full Registered Name:</b> As displayed on your MWAY profile.</li>
                  <li><b>Registered Mobile Number:</b> The 10-digit mobile number used to sign in via OTP.</li>
                  <li><b>App Platform:</b> Specify whether you use the <i>MWAY Customer App</i> or <i>MWAY-D Driver App</i>.</li>
                  <li><b>Reason for Deletion (Optional):</b> Any feedback to help us improve our services.</li>
                </ul>
              </div>
            </div>

            <div className="stepItem">
              <div className="stepBadge">3</div>
              <div className="stepBody">
                <h4>Identity Verification</h4>
                <p>
                  Because MWAY accounts are linked to mobile phone numbers and may hold active booking
                  or transaction histories, our support team will verify your ownership of the account.
                  We may send a one-time verification confirmation via SMS or contact you at the
                  registered number to confirm the request.
                </p>
              </div>
            </div>

            <div className="stepItem">
              <div className="stepBadge">4</div>
              <div className="stepBody">
                <h4>Deactivation & Scheduled Data Removal</h4>
                <p>
                  Upon successful identity verification, your account will be immediately deactivated
                  so no further logins or bookings can occur. Your personal profile and authentication
                  credentials will be queued for permanent deletion in accordance with our data policy.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Email Action Box */}
          <div className="deletionActionBox">
            <div className="deletionActionBoxHeader">
              <Mail size={22} color="#0866F5" aria-hidden="true" />
              <h3>Official Deletion Request Desk</h3>
            </div>
            <p style={{ margin: '0 0 14px', fontSize: '14.5px', color: '#334155' }}>
              You can initiate your request immediately by clicking the button below or by copying the
              pre-formatted template into your preferred email client:
            </p>

            <div className="officialEmailPill">
              <Mail size={16} aria-hidden="true" />
              <span>{OFFICIAL_EMAIL}</span>
            </div>

            <div className="deletionButtonRow">
              <a href={mailtoUrl} className="btn-send-email">
                <Mail size={16} aria-hidden="true" />
                Launch Email Client with Pre-filled Template
              </a>

              <button
                type="button"
                onClick={handleCopyTemplate}
                className={`btn-copy-template ${copied ? 'copied' : ''}`}
                aria-label="Copy account deletion email template"
              >
                {copied ? (
                  <>
                    <Check size={16} aria-hidden="true" />
                    Template Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy size={16} aria-hidden="true" />
                    Copy Email Request Template
                  </>
                )}
              </button>
            </div>

            <div className="emailTemplatePreview" aria-label="Email template text">
              {EMAIL_BODY_TEMPLATE}
            </div>
          </div>
        </section>

        {/* Section 2: Data Scope - Deleted vs Retained */}
        <section className="deleteContentCard">
          <h2>
            <Trash2 size={22} aria-hidden="true" />
            Data Deletion Scope & Retention Policy
          </h2>
          <p className="deleteSectionIntro">
            In compliance with applicable data protection regulations and Indian financial laws,
            the following breakdown details what data is erased and what must be legally retained:
          </p>

          <div className="dataScopeGrid">
            {/* Box 1: What is Deleted */}
            <div className="dataScopeBox deleted">
              <div className="dataScopeBoxHeader">
                <Trash2 size={20} color="#BE123C" aria-hidden="true" />
                <h3>What Will Be Permanently Deleted</h3>
              </div>
              <ul>
                <li>
                  <b>Personal Profile Data:</b> Your full name, profile photo, and registered email address.
                </li>
                <li>
                  <b>Authentication & Session Identifiers:</b> Firebase Authentication records, user IDs, active session tokens, and passwords.
                </li>
                <li>
                  <b>Device & Notification Tokens:</b> Firebase Cloud Messaging (FCM) device push tokens.
                </li>
                <li>
                  <b>App Preferences & Saved Places:</b> Saved home, work, and favorite route locations.
                </li>
                <li>
                  <b>Driver Documentation Drafts:</b> Incomplete driver registration files and photos (for driver applicants).
                </li>
              </ul>
            </div>

            {/* Box 2: What is Retained */}
            <div className="dataScopeBox retained">
              <div className="dataScopeBoxHeader">
                <ShieldCheck size={20} color="#15803D" aria-hidden="true" />
                <h3>What May Be Retained (Legal & Regulatory)</h3>
              </div>
              <ul>
                <li>
                  <b>Financial & Payment Records:</b> Transaction references, payment receipts, GST invoices, and settlement records processed via Razorpay are retained strictly to comply with Indian accounting and tax statutes.
                </li>
                <li>
                  <b>Completed Trip Safety History:</b> Basic logs of fulfilled bookings (timestamps, pickup/drop coordinates, driver allocation) are archived for fraud prevention, insurance claims, and passenger safety dispute resolution.
                </li>
                <li>
                  <b>Regulatory Compliance:</b> Records required to adhere to government, police, or judicial directives under applicable laws of India.
                </li>
              </ul>
            </div>
          </div>

          <div className="policyNoticeBox">
            <AlertTriangle size={20} aria-hidden="true" />
            <div>
              <h4>Important Note on Retention Periods</h4>
              <p>
                Retained records are isolated in encrypted archives accessible only to authorized compliance officers.
                Once the statutory retention period mandated by Indian tax and transport authorities expires, all archived
                records are securely and permanently purged.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Verification & Processing Timelines */}
        <section className="deleteContentCard">
          <h2>
            <Clock size={22} aria-hidden="true" />
            Verification Process & Processing Time
          </h2>

          <div style={{ fontSize: '15px', color: 'var(--slate-body)', lineHeight: '1.65' }}>
            <p>
              <b>Why Verification Is Required:</b> To safeguard your account from unauthorized deletion attempts,
              our team verifies every deletion request against the registered mobile number on file. We will never
              delete an account based solely on an unverified third-party message.
            </p>

            <p>
              <b>Processing Timelines:</b> Deletion requests are reviewed and processed manually by our support staff
              during standard office working hours (Monday through Saturday, 9:30 AM – 6:30 PM IST, excluding public holidays).
            </p>

            <p>
              Once your identity is confirmed, your account will be immediately deactivated to restrict access, and
              permanent data purging will proceed in accordance with our system maintenance schedule. If any active
              trips or pending payment reconciliations exist, deletion will be concluded as soon as those transactions
              are settled.
            </p>
          </div>
        </section>

        {/* Section 4: MWAY Contact & Support Details */}
        <section className="deleteContentCard">
          <h2>
            <Phone size={22} aria-hidden="true" />
            MWAY Support & Office Contact Details
          </h2>
          <p className="deleteSectionIntro">
            If you have questions about our data practices or need assistance with your deletion request,
            please reach out directly to JN Consultancy Services:
          </p>

          <div className="supportOfficeGrid">
            <div className="officeContactItem">
              <Mail size={20} aria-hidden="true" />
              <div>
                <b>Official Email Desk</b>
                <a href={`mailto:${OFFICIAL_EMAIL}`}>{OFFICIAL_EMAIL}</a>
              </div>
            </div>

            <div className="officeContactItem">
              <Phone size={20} aria-hidden="true" />
              <div>
                <b>Primary Phone Support</b>
                <a href={`tel:${PRIMARY_PHONE}`}>+91 {PRIMARY_PHONE}</a>
              </div>
            </div>

            <div className="officeContactItem">
              <Phone size={20} aria-hidden="true" />
              <div>
                <b>Alternative Phone</b>
                <a href={`tel:${ALT_PHONE}`}>+91 {ALT_PHONE}</a>
              </div>
            </div>

            <div className="officeContactItem">
              <MapPin size={20} aria-hidden="true" />
              <div>
                <b>Registered Office</b>
                <p>{OFFICE_ADDRESS}</p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="deletePageBottomNav">
            <Link to="/">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to MWAY Home
            </Link>
            <p className="lastReviewedDate">
              Official Policy Reviewed: November 2026 • JN Consultancy Services
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
export default DeleteAccountPage;

