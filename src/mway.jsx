// MWAY — the app, presented with its own logo and nothing invented.
//
// The logo file in src/assets/mway-logo.png is the supplied original, copied
// byte for byte. It is never recoloured, cropped, outlined, shadowed or laid
// under a gradient: it carries its own blue-to-cyan gradient and white
// ribbon, and anything placed over it fights that. The <img> keeps its
// natural 916x784 aspect through `height:auto` and a contain fit, so no
// stylesheet can squash it.
//
// Everything written about the app here is taken from the MWAY codebase in
// this workspace (the Flutter app whose MaterialApp title is literally
// 'MWAY') and from the service list this site already publishes. There are no
// invented features, screenshots, ratings, store listings or download links.

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import mwayLogo from './assets/mway-logo.png';
import { SEO } from './seo.jsx';

export const MWAY_TAGLINE = 'My Way. My Growth. My Journey.';

/**
 * The official mark. `size` drives the box it sits in; the image keeps its
 * own proportions inside it.
 */
export function MwayLogo({ size = 96, className = '' }) {
  return (
    <img
      src={mwayLogo}
      alt="MWAY app logo"
      className={'mwayLogo ' + className}
      width={size}
      height={Math.round(size / 1.1684)}
      style={{ width: size, height: 'auto' }}
      loading="lazy"
      decoding="async"
    />
  );
}

/** Logo above the wordmark and tagline, with clear space between them. */
export function MwayLockup({ size = 108, center = false }) {
  return (
    <div className={'mwayLockup' + (center ? ' center' : '')}>
      <MwayLogo size={size} />
      <div className="mwayWord">
        <b>MWAY</b>
        <span>{MWAY_TAGLINE}</span>
      </div>
    </div>
  );
}

// What the app genuinely does, mirroring the services this site already
// lists and the categories the app itself implements.
const MWAY_POINTS = [
  'Book travel — pickup and drop, savari-based trips, tourist packages and shared return routes.',
  'Follow a confirmed booking through to completion, with the driver and vehicle shown.',
  'Reach the same JN Consultancy Services teams for admission, property, banking and more.'
];

/** The homepage block. */
export function MwaySection() {
  return (
    <section className="section mwaySection" id="mway">
      <div className="wrap mwayGrid">
        <div className="mwayCopy">
          <div className="eyebrow">OUR MOBILE APP</div>
          <h2>
            JN services, in your pocket with <em>MWAY.</em>
          </h2>
          <p className="mwayLead">
            MWAY is the JN Consultancy Services mobile app. It brings the same
            services you see on this site into one place on your phone.
          </p>
          <ul className="mwayPoints">
            {MWAY_POINTS.map((p) => (
              <li key={p}>
                <CheckCircle2 aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mwayActions">
            <Link className="btn primary" to="/mway-app">
              View MWAY App Information <ArrowRight size={16} />
            </Link>
            <Link className="btn ghost" to="/contact">
              Talk to our team
            </Link>
          </div>
          {/* No store badges: the app is not published to a store we can
              link to, and a dead badge is worse than none. */}
        </div>

        <div className="mwayStage" aria-hidden="false">
          <div className="mwayCard">
            <MwayLogo size={190} />
            <div className="mwayCardText">
              <b>MWAY</b>
              <span>{MWAY_TAGLINE}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** /mway-app — the dedicated information page. */
export function MwayAppPage() {
  const mwaySchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mwayjnconsultancy.in/' },
      { '@type': 'ListItem', position: 2, name: 'MWAY Mobile App', item: 'https://www.mwayjnconsultancy.in/mway-app' }
    ]
  };

  return (
    <>
      <SEO
        title="MWAY Mobile App | Travel Booking & Multiservice App by JN Consultancy"
        description="Discover the MWAY mobile app by JN Consultancy Services. Book outstation cabs, savari rides, track trips live, and access all consultation services on your phone."
        canonical="https://www.mwayjnconsultancy.in/mway-app"
        schema={mwaySchema}
      />
      <section className="pageHero mwayHero">
        <div className="wrap mwayHeroInner">
          <MwayLogo size={128} />
          <div>
            <div className="eyebrow">MWAY APP</div>
            <h1>
              MWAY
              <em>{MWAY_TAGLINE}</em>
            </h1>
            <p>
              The official mobile app of JN Consultancy Services, Perambalur.
            </p>
          </div>
        </div>
      </section>

      <section className="section wrap mwayInfo">
        <div className="mwayInfoMain">
          <h2>What MWAY is for</h2>
          <p>
            MWAY puts the services JN Consultancy Services already provides —
            travel booking first among them — into a single app. You create an
            account with your mobile number, choose the service you need, and
            follow the request through to completion.
          </p>

          <h3>What you can do today</h3>
          <ul className="mwayList">
            <li>
              <b>Book travel.</b> Pickup and drop, savari-based trips, tourist
              packages, day-based hire, airport drops, and budget seats on
              return-empty routes.
            </li>
            <li>
              <b>See the real price before you commit.</b> For driver-quoted
              journeys the driver names the fare for your booking, and you
              confirm it before anything is charged.
            </li>
            <li>
              <b>Pay securely.</b> Payments are handled by Razorpay. Where a
              booking takes an advance, the balance is settled on completion.
            </li>
            <li>
              <b>Track a confirmed trip.</b> Once a driver has started your
              journey you can follow its progress in the app.
            </li>
            <li>
              <b>Keep your booking history.</b> Past and upcoming bookings stay
              in one list with their current status.
            </li>
          </ul>

          <h3>Getting the app</h3>
          <p>
            MWAY is distributed directly by JN Consultancy Services.{' '}
            <Link to="/contact">Contact our team</Link> and we will tell you
            how to install the current version for your device.
          </p>

          <h3>Your data and your account</h3>
          <p>
            See the <Link to="/privacy-policy">Privacy Policy</Link> for what
            the app stores and why, and{' '}
            <Link to="/account-deletion">Account and Data Deletion</Link> for
            how to ask for your account and data to be removed.
          </p>
        </div>

        <aside className="mwayAside">
          <div className="mwayAsideCard">
            <MwayLockup size={92} />
            <Link className="btn primary full" to="/contact">
              Contact us about MWAY <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
