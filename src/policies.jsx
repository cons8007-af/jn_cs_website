// The six footer pages.
//
// WHAT IS STATED HERE WAS CHECKED AGAINST THE ACTUAL SYSTEM, not drafted
// from a template. The data listed in the Privacy Policy is the data the
// backend schema really stores (users, customers, bookings, payments,
// driver_locations). Payments are described as Razorpay because Razorpay is
// the integration that exists. Nothing claims a security guarantee, a refund
// percentage, a processing time or a deletion capability that the code does
// not support.
//
// Anything that needs a human decision rather than a reading of the code is
// marked with <NeedsConfirmation>, visibly, so it cannot be mistaken for
// settled policy. Those are the items to take to the business before this
// site is published.

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, AlertTriangle } from 'lucide-react';
import { SEO } from './seo.jsx';

export const CONTACT = {
  phone: '9677796891',
  altPhone: '8695556550',
  email: 'jnconsultancy26@gmail.com',
  office:
    'Shop No-9, C-Block, 5Star Complex, Opposite New Bus Stand, Perambalur.'
};

const UPDATED = 'This page was last reviewed on 10 October 2026.';

function PolicyPage({ eyebrow, title, intro, seoTitle, seoDesc, canonical, children }) {
  return (
    <>
      <SEO title={seoTitle} description={seoDesc} canonical={canonical} />
      <section className="pageHero">
        <div className="wrap">
          <div className="pageHeroEyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          {intro && <p className="pageHeroText">{intro}</p>}
        </div>
      </section>
      <section className="section wrap">
        <div className="policy">
          {children}
          <p className="policyUpdated">{UPDATED}</p>
        </div>
      </section>
    </>
  );
}

/** A visible flag for anything the business must decide, not the code. */
function NeedsConfirmation({ children }) {
  return (
    <div className="needsConfirm" role="note">
      <AlertTriangle aria-hidden="true" />
      <div>
        <b>Requires business confirmation before publishing</b>
        <p>{children}</p>
      </div>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="policyContact">
      <a href={'tel:' + CONTACT.phone}>
        <Phone aria-hidden="true" /> {CONTACT.phone}
      </a>
      <a href={'tel:' + CONTACT.altPhone}>
        <Phone aria-hidden="true" /> {CONTACT.altPhone}
      </a>
      <a href={'mailto:' + CONTACT.email}>
        <Mail aria-hidden="true" /> {CONTACT.email}
      </a>
      <p>
        <MapPin aria-hidden="true" /> {CONTACT.office}
      </p>
    </div>
  );
}

// ===========================================================================
export function PrivacyPolicy() {
  return (
    <PolicyPage
      eyebrow="PRIVACY POLICY"
      title={
        <>
          How we handle <em>your information.</em>
        </>
      }
      intro="This policy covers the JN Consultancy Services website and the MWAY mobile app."
      seoTitle="Privacy Policy | JN Consultancy Services & MWAY App"
      seoDesc="Read how JN Consultancy Services and MWAY mobile app collect, use, and protect your personal information in compliance with privacy standards."
      canonical="https://www.mwayjnconsultancy.in/privacy-policy"
    >
      <h2>Who we are</h2>
      <p>
        JN Consultancy Services, Perambalur, operates this website and the MWAY
        mobile app. You can reach us using the details at the end of this page.
      </p>

      <h2>What we collect</h2>
      <p>The MWAY app and our services store the following:</p>
      <ul>
        <li>
          <b>Your mobile number.</b> Required to create an account — it is how
          an account is identified.
        </li>
        <li>
          <b>Your name and email address</b>, where you provide them.
        </li>
        <li>
          <b>A sign-in identifier and a notification token</b>, so we can keep
          you signed in and send you booking updates.
        </li>
        <li>
          <b>Booking details.</b> Pickup and drop locations including map
          coordinates, dates and times, number of seats, and the agreed fare.
        </li>
        <li>
          <b>Payment records.</b> The amount, the method, and the reference
          returned by our payment provider.
        </li>
        <li>
          <b>Driver location, for drivers only</b>, while a driver is sharing
          their position so a customer can follow a trip in progress.
        </li>
      </ul>

      <h2>Why we collect it</h2>
      <p>
        To create and operate your account, to arrange and complete the service
        you asked for, to take and reconcile payment, to let you follow a trip
        you have booked, and to contact you about that booking.
      </p>

      <h2>Enquiries from this website</h2>
      <p>
        The enquiry form on our contact page and the application form on our
        careers page do not submit anything to this website, and nothing you
        type into them is stored here. They take your details and compose them
        as an email to our office address, which you then send from your own
        email application. If you would rather not use them, call or email us
        directly using the details at the end of this page.
      </p>

      <h2>Payments</h2>
      <p>
        Online payments are processed by <b>Razorpay</b>. Card and UPI details
        are entered with the payment provider, not with us, and we do not store
        them. We keep the amount, the method and the provider's reference so a
        payment can be matched to a booking.
      </p>

      <h2>Sharing</h2>
      <p>
        To complete a booking we share what the service needs — for travel, the
        driver assigned to your trip sees your name, contact number and your
        pickup and drop points. We also use service providers for payments
        (Razorpay), and for hosting, notifications and app infrastructure
        (Google Firebase). We do not sell your personal information.
      </p>

      <h2>Keeping your information</h2>
      <p>
        We keep booking and payment records for as long as we need them to run
        the service and to meet accounting and legal obligations.
      </p>
      <NeedsConfirmation>
        The exact retention period for booking and payment records has not been
        set. A specific period should be agreed and stated here, and it must
        align with the statutory retention required for financial records.
      </NeedsConfirmation>

      <h2>Your choices</h2>
      <p>
        You can ask us for a copy of the information we hold about you, ask us
        to correct it, or ask us to delete your account — see{' '}
        <Link to="/account-deletion">Account and Data Deletion</Link>.
      </p>

      <h2>Children</h2>
      <p>
        MWAY is not intended for use by children. Accounts should be created by
        adults.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes we will update this page and the review date
        below.
      </p>

      <h2>Contact</h2>
      <ContactBlock />
    </PolicyPage>
  );
}

// ===========================================================================
export function TermsAndConditions() {
  return (
    <PolicyPage
      eyebrow="TERMS AND CONDITIONS"
      title={
        <>
          The terms you agree to by <em>using our services.</em>
        </>
      }
      intro="These terms apply to this website and to the MWAY mobile app."
      seoTitle="Terms and Conditions | JN Consultancy Services"
      seoDesc="Official terms of use and service agreement for JN Consultancy Services and the MWAY mobility platform in Perambalur."
      canonical="https://www.mwayjnconsultancy.in/terms-and-conditions"
    >
      <h2>Agreement</h2>
      <p>
        By using this website or the MWAY app you agree to these terms. If you
        do not agree, please do not use them.
      </p>

      <h2>What we do</h2>
      <p>
        JN Consultancy Services arranges and coordinates services including
        travel, admission guidance, real estate assistance, overseas job
        guidance, banking support, automobile assistance and IT solutions. For
        several of these we act as a coordinator between you and a provider —
        for travel, the driver who carries out your trip.
      </p>

      <h2>Your account</h2>
      <p>
        You are responsible for the accuracy of the details you give us and for
        keeping access to your registered mobile number secure. Bookings made
        from your account are treated as made by you.
      </p>

      <h2>Bookings and fares</h2>
      <ul>
        <li>
          A booking is confirmed only when the app or our team confirms it, and
          where payment is required, when that payment is confirmed.
        </li>
        <li>
          For driver-quoted journeys the fare is set by the driver for your
          specific booking and shown to you before you pay.
        </li>
        <li>
          Where a booking takes an advance, the remaining balance is due on
          completion of the service.
        </li>
      </ul>

      <h2>Your responsibilities</h2>
      <p>
        Be present at the agreed place and time, give accurate pickup and drop
        information, and treat drivers and staff with respect. Do not use our
        services for anything unlawful.
      </p>

      <h2>Cancellation</h2>
      <p>
        See the{' '}
        <Link to="/refund-cancellation-policy">
          Refund and Cancellation Policy
        </Link>
        .
      </p>

      <h2>Limits</h2>
      <p>
        We work to arrange services reliably, but we do not control traffic,
        weather, third-party availability or circumstances beyond our
        reasonable control.
      </p>
      <NeedsConfirmation>
        Limitation of liability, indemnity, governing law and the jurisdiction
        for disputes are not stated here. These are legal positions for the
        business and its advisor to decide, and should be added before this
        site is published.
      </NeedsConfirmation>

      <h2>Contact</h2>
      <ContactBlock />
    </PolicyPage>
  );
}

// ===========================================================================
export function RefundCancellationPolicy() {
  return (
    <PolicyPage
      eyebrow="REFUND AND CANCELLATION"
      title={
        <>
          Cancelling a booking and <em>getting money back.</em>
        </>
      }
      intro="How cancellations and refunds work for bookings made through MWAY."
      seoTitle="Refund & Cancellation Policy | JN Consultancy Services"
      seoDesc="Understand trip cancellations, booking modifications, refund calculations, and payment reversal timelines with JN Consultancy Services."
      canonical="https://www.mwayjnconsultancy.in/refund-cancellation-policy"
    >
      <h2>Cancelling a booking</h2>
      <p>
        You can cancel a booking from the MWAY app, or by contacting us using
        the details below. A booking that has already been completed cannot be
        cancelled.
      </p>

      <h2>If the driver or provider cancels</h2>
      <p>
        If your booking is cancelled by the driver or by us, any advance you
        have paid is refunded.
      </p>

      <h2>How a refund is returned</h2>
      <p>
        A refund is returned to the original payment method through our payment
        provider, Razorpay. The time it takes to appear on your statement is
        determined by your bank or card issuer.
      </p>

      <h2>Amounts</h2>
      <p>
        The refundable amount is calculated by our system from the advance
        actually received against your booking. The figure that applies to your
        cancellation is the one shown to you at the time you cancel.
      </p>
      <NeedsConfirmation>
        The cancellation charge — whether any part of an advance is retained,
        and whether that varies with how close to departure the cancellation
        is — is configurable in the system and is not fixed here. The business
        must confirm the percentages and any time tiers, and the agreed figures
        must then be stated on this page. No amount or timeline is quoted until
        that is settled.
      </NeedsConfirmation>

      <h2>Questions about a refund</h2>
      <p>
        Contact us with your booking reference and we will check its status.
      </p>
      <ContactBlock />
    </PolicyPage>
  );
}

// ===========================================================================
export function ContactUsPage() {
  return (
    <PolicyPage
      eyebrow="CONTACT US"
      title={
        <>
          Reach <em>our team.</em>
        </>
      }
      intro="For questions about our services, the MWAY app, a booking, or a refund."
      seoTitle="Contact Us | JN Consultancy Services Perambalur"
      seoDesc="Get in touch with JN Consultancy Services in Perambalur. Office address: 5Star Complex, Opposite New Bus Stand. Call 9677796891."
      canonical="https://www.mwayjnconsultancy.in/contact"
    >
      <h2>JN Consultancy Services</h2>
      <ContactBlock />

      <h2>What to include</h2>
      <p>
        If your question is about a booking, please have your registered mobile
        number and the booking reference to hand — it lets us find your booking
        straight away.
      </p>

      <h2>Enquiry form</h2>
      <p>
        Our <Link to="/contact">enquiry page</Link> lets you choose the service
        you need and how you would like us to reply, then prepares your details
        as an email to the address above for you to send. It does not store
        your enquiry on this website, so the quickest route is still a call.
      </p>
      <NeedsConfirmation>
        The business has confirmed that support is staffed during working
        hours rather than around the clock, and the site no longer claims
        otherwise. What those hours actually are &mdash; the days, the times,
        and how public holidays are handled &mdash; has not been supplied, so
        nothing specific is published here. The hours and, if the business
        wants to commit to one, a target response time should be agreed and
        stated on this page.
      </NeedsConfirmation>
    </PolicyPage>
  );
}

// ===========================================================================
export function AccountDeletion() {
  return (
    <PolicyPage
      eyebrow="ACCOUNT AND DATA DELETION"
      title={
        <>
          Deleting your account and <em>your data.</em>
        </>
      }
      intro="How to ask for your MWAY account and associated data to be removed."
      seoTitle="Account & Data Deletion Request | MWAY Mobile App"
      seoDesc="Official procedure to submit an account deletion and data removal request for the MWAY mobile application by JN Consultancy Services."
      canonical="https://www.mwayjnconsultancy.in/account-deletion"
    >
      <h2>How to request deletion</h2>
      <p>
        There is currently no in-app button that deletes an account. To have
        your account and data removed, send us a request:
      </p>
      <ul>
        <li>
          Email <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a> from the
          address on your account, or call us on the numbers below.
        </li>
        <li>
          Use the subject line <b>Account deletion request</b>.
        </li>
        <li>
          Include the <b>mobile number registered to your MWAY account</b>, so
          we can identify it.
        </li>
      </ul>
      <p>
        We will verify that the request comes from the account holder before
        acting on it.
      </p>

      <h2>What gets deleted</h2>
      <p>
        Your profile details — your name, email address and the notification
        token used to send you updates — are removed, and your account can no
        longer be used to sign in.
      </p>

      <h2>What we have to keep</h2>
      <p>
        Records of completed bookings and the payments against them are
        retained. We are required to keep financial records, and a payment
        record cannot be removed without breaking the accounting it belongs to.
        Those records are kept for that purpose only.
      </p>

      <NeedsConfirmation>
        Two things are not settled. First, the backend has no account-deletion
        endpoint today, so requests are handled manually — building one, and
        deciding exactly which records it clears, is outstanding engineering
        work. Second, the time within which a verified request will be
        completed has not been agreed; no timeframe is promised on this page
        until it is.
      </NeedsConfirmation>

      <h2>Contact</h2>
      <ContactBlock />
    </PolicyPage>
  );
}

// ===========================================================================
// Driver Partner Legal Policies (MWAY-D)
// ===========================================================================

export function DriverTermsPolicy() {
  return (
    <PolicyPage
      eyebrow="MWAY-D PARTNER AGREEMENT"
      title={
        <>
          Driver Partner <em>Terms & Conditions.</em>
        </>
      }
      intro="These commercial partner terms govern your use of the MWAY-D driver application and transportation dispatch services provided by JN Consultancy Services."
      seoTitle="Driver Partner Terms & Conditions | MWAY-D Platform"
      seoDesc="Commercial partner terms, vehicle requirements, dispatch rules, and code of conduct for registered driver partners on the MWAY-D mobility network."
      canonical="https://www.mwayjnconsultancy.in/driver-terms"
    >
      <h2>1. Independent Partner Relationship</h2>
      <p>
        By registering on the MWAY-D driver application, you acknowledge and agree
        that your relationship with JN Consultancy Services is that of an independent
        commercial contractor and not an employee, agent, joint venturer, or partner.
        You retain the freedom to choose your operating hours, accept or decline
        booking requests, subject to platform reliability and fair-use thresholds.
      </p>

      <h2>2. Driver Eligibility & Documentation</h2>
      <p>
        To operate as an active partner on MWAY-D, you must possess and maintain valid
        government-issued transport documentation:
      </p>
      <ul>
        <li>Valid Indian Commercial Driving License (DL) with transport endorsements.</li>
        <li>Vehicle Registration Certificate (RC) for all registered vehicles.</li>
        <li>Commercial Vehicle Insurance covering third-party and passenger liabilities.</li>
        <li>Vehicle Fitness Certificate (FC) and Pollution Under Control (PUC) certificate.</li>
        <li>Commercial Tourist/Taxi Permit as required by regional transport authorities.</li>
      </ul>

      <h2>3. Background Location & Telemetry</h2>
      <p>
        Because real-time dispatch, route navigation, and passenger safety are fundamental
        to transportation services, the MWAY-D app collects your device's precise GPS
        location in both the foreground and background while you are marked "Online" or
        executing an active trip. Location collection ceases the moment you toggle to "Offline".
      </p>

      <h2>4. Trip Execution & Pickup OTP Verification</h2>
      <p>
        You must never commence a trip without physically meeting the passenger and successfully
        entering the 4-digit pickup OTP provided by the passenger. Safe driving, adherence to
        permitted routes, and respect for passenger safety are mandatory.
      </p>

      <h2>5. Fares, Commission & Payout Settlements</h2>
      <p>
        Trip fares are calculated based on transparent distance and vehicle category rates.
        Platform commission is deducted, and net earnings are settled to your linked Bank Account
        (NEFT/IMPS) or verified UPI ID via Razorpay and authorized banking channels. You remain
        responsible for personal direct income tax compliance.
      </p>

      <h2>6. Zero Tolerance Policy</h2>
      <p>
        JN Consultancy Services strictly prohibits driving under the influence of alcohol
        or narcotics, passenger harassment, unauthorized fare surcharges, and reckless driving.
        Violations result in immediate permanent account termination.
      </p>

      <h2>Contact</h2>
      <ContactBlock />
    </PolicyPage>
  );
}

export function DriverPrivacyPolicy() {
  return (
    <PolicyPage
      eyebrow="MWAY-D PRIVACY POLICY"
      title={
        <>
          Driver Privacy & <em>Data Protection.</em>
        </>
      }
      intro="How JN Consultancy Services collects, uses, and safeguards partner driver information and telemetry on the MWAY-D platform."
      seoTitle="Driver Partner Privacy Policy | MWAY-D Platform"
      seoDesc="Learn how driver documents, vehicle records, and GPS location telemetry are collected and protected on the MWAY-D driver application."
      canonical="https://www.mwayjnconsultancy.in/driver-privacy"
    >
      <h2>1. Information We Collect</h2>
      <p>We collect and store driver information essential for transport operations:</p>
      <ul>
        <li><b>Identity & Contact:</b> Full name, mobile number, operating city, and profile photo.</li>
        <li><b>Transport Documentation:</b> Scans of Driving License, RC, Insurance, and Permits.</li>
        <li><b>Payout Credentials:</b> Bank account numbers, IFSC codes, account holder names, or UPI IDs.</li>
        <li><b>Vehicle Details:</b> Registration numbers, make, model, and category.</li>
      </ul>

      <h2>2. Location Telemetry (Foreground & Background)</h2>
      <p>
        Precise GPS location is collected while you are Online to calculate nearby dispatch
        requests, estimate passenger arrival times (ETA), navigate active trips, and ensure safety.
        We never sell driver location data to third-party advertising brokers.
      </p>

      <h2>3. Information Shared with Passengers</h2>
      <p>
        During an assigned trip, passengers see your first name, vehicle details, registration
        number, real-time map location, and contact button. Passengers never see your bank details,
        Aadhaar number, or residential address.
      </p>

      <h2>4. Banking Security</h2>
      <p>
        Payout credentials are transmitted encrypted via TLS protocols and processed securely
        via Reserve Bank of India (RBI) authorized payment partners including Razorpay.
      </p>

      <h2>Contact</h2>
      <ContactBlock />
    </PolicyPage>
  );
}

