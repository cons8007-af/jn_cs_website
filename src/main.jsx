import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Routes, Route, useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  ArrowRight, BriefcaseBusiness, Building2, CarFront, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, Clock, GraduationCap, Headphones, Landmark,
  Laptop, Mail, MapPin, Menu, MessageCircle, MonitorCog, Phone,
  Plane, Send, ShieldCheck, Users, X, HelpCircle
} from 'lucide-react';

import logo from './assets/jn-logo.jpeg';
import symbol from './assets/jn-symbol.jpeg';
import mwayLogo from './assets/mway-logo.png';
import corporateWaveBg from './assets/corporate-wave-bg.jpg';
import autoImg from './assets/service-automobile.jpg';
import travelsImg from './assets/service-travels.jpg';
import admissionImg from './assets/service-admission.jpg';
import bankingImg from './assets/service-banking.jpg';
import realestateImg from './assets/service-realestate.jpg';
import itsolutionsImg from './assets/service-itsolutions.jpg';
import jobsImg from './assets/service-jobs.png';

import { MwaySection, MwayAppPage, MwayLogo, MWAY_TAGLINE } from './mway.jsx';
import {
  PrivacyPolicy, TermsAndConditions, RefundCancellationPolicy,
  ContactUsPage, AccountDeletion, DriverTermsPolicy, DriverPrivacyPolicy
} from './policies.jsx';
import { LiveTrackingWebPage } from './track.jsx';
import { EnquiryForm, ApplicationForm } from './enquiry.jsx';
import { SEO } from './seo.jsx';
import { VERIFIED_SERVICES, ALL_VERIFIED_SERVICES } from './serviceData.js';
import BankingServicesPage from './pages/BankingServicesPage.jsx';
import './styles.css';
import './styles/banking.css';

const phone = '9677796891';
const altPhone = '8695556550';
const email = 'jnconsultancy26@gmail.com';
const office = 'Shop No-9, C-Block, 5Star Complex, Opposite New Bus Stand, Perambalur.';

const POSITIONS = [
  'Telecalling Executive',
  'Social Media Influencer',
  'Software Developer Intern'
];

// The 7 verified services with rich vertical data
export const CAROUSEL_SERVICES = VERIFIED_SERVICES;
export const ALL_SERVICES = ALL_VERIFIED_SERVICES;

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Trusted & Reliable',
    desc: '100% genuine services and transparent process.',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706'
  },
  {
    icon: Clock,
    title: 'Fast & Convenient',
    desc: 'Save time with our hassle-free support.',
    badgeBg: '#EFF6FF',
    badgeColor: '#0866F5'
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    desc: 'Professional team to help you at every step.',
    badgeBg: '#ECFDF5',
    badgeColor: '#059669'
  },
  {
    icon: Headphones,
    title: 'Support During Business Hours',
    desc: "We're here to help during our working hours.",
    badgeBg: '#FAF5FF',
    badgeColor: '#7C3AED'
  }
];

/**
 * 3. Page 1 — Floating Glass Navbar
 */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServicesClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/services');
    }
  };

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setOpen(false);
  };

  const isHome = location.pathname === '/';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav">
        <Link to="/" className="brand" onClick={handleHomeClick}>
          <img src={logo} alt="JN Consultancy Services Logo" width={40} height={40} />
          <div className="brandText">
            <b>JN</b>
            <small>CONSULTANCY SERVICES</small>
          </div>
        </Link>

        <button
          className="hamb"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={open ? 'open' : ''} aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            onClick={handleHomeClick}
            className={({ isActive }) => (isActive && isHome ? 'active' : '')}
          >
            Home
          </NavLink>
          <a
            href="#services"
            onClick={handleServicesClick}
            className={location.pathname === '/services' ? 'active' : ''}
          >
            Services
          </a>
          <NavLink to="/careers" onClick={() => setOpen(false)}>
            Careers
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <Link className="getStartedBtn" to="/contact" onClick={() => setOpen(false)}>
            <span>Get Started</span>
            <ArrowRight size={16} className="btnArrow" />
          </Link>

          <div className="navMobileContact">
            <a href={`tel:${phone}`}><Phone size={14} /> {phone}</a>
            <a href={`mailto:${email}`}><Mail size={14} /> {email}</a>
          </div>
        </nav>

        <div className="headContact">
          <a href={`tel:${phone}`} aria-label={`Call us at ${phone}`}>
            <Phone size={14} /> {phone}
          </a>
          <a href={`mailto:${email}`} aria-label={`Email us at ${email}`}>
            <Mail size={14} /> {email}
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * 3. Page 1 — Hero Section
 */
function Hero() {
  const scrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" style={{ backgroundImage: `url(${corporateWaveBg})` }}>
      <div className="heroOverlay" />
      <div className="wrap heroGrid">
        {/* Left Column */}
        <div className="heroCopy">
          <div className="heroMwayLogoWrap">
            <img
              src={mwayLogo}
              alt="MWAY App - Mobility and Multi-Service Platform by JN Consultancy"
              className="heroMwayLogo"
              width={190}
              height={162}
              fetchPriority="high"
              decoding="async"
            />
            <div className="heroLogoGlow" />
          </div>

          <div className="heroTagline">My Way. My Growth. My Journey.</div>
          <h1>
            One Stop Solution<br />
            for <em>All Your Needs</em>
          </h1>
          <p>
            JN Consultancy Services provides trusted, professional and complete
            solutions for individuals, families and businesses in Perambalur and across Tamil Nadu.
          </p>

          <div className="heroActions">
            <a href="#services" onClick={scrollToServices} className="btn-hero-primary">
              Explore Services <ArrowRight size={17} />
            </a>
            <Link to="/contact" className="btn-hero-secondary">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Column: Glass Feature Panel */}
        <div className="heroFeatureWrap">
          <div className="heroFeaturePanel">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div className="featureRow" key={b.title}>
                  <div className="featureBadge" style={{ backgroundColor: b.badgeBg, color: b.badgeColor }}>
                    <Icon size={20} />
                  </div>
                  <div className="featureContent">
                    <b>{b.title}</b>
                    <p>{b.desc}</p>
                  </div>
                  <div className="featureArrow">
                    <ChevronRight size={18} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Transition Indicator */}
      <div className="heroScrollIndicator">
        <a href="#services" onClick={scrollToServices} className="scrollMouse" aria-label="Scroll down to services">
          <div className="mouseShape">
            <span className="mouseWheel" />
          </div>
          <span className="scrollText">Scroll Down</span>
          <ChevronDown size={14} className="scrollArrowIcon" />
        </a>
      </div>
    </section>
  );
}

/**
 * 4. Page 2 / Services Section — 3D Animated Service Carousel & Pills
 */
function ServiceCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const total = CAROUSEL_SERVICES.length;
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic animation with pause on hover/interaction & reduced motion check
  useEffect(() => {
    if (isPaused) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX.current;
    if (delta > 40) {
      prevSlide();
    } else if (delta < -40) {
      nextSlide();
    }
  };

  return (
    <section id="services" className="servicesSection">
      <div className="wrap">
        {/* Section Heading */}
        <div className="servicesHeader">
          <div className="servicesEyebrow">O U R &nbsp; S E R V I C E S</div>
          <h2>
            Explore <em>Our Services</em>
          </h2>
          <p className="servicesSubtitle">
            Complete solutions for your dreams, growth and future – all in one place.
          </p>
          <div className="servicesPillDivider" />
        </div>

        {/* 3D Animated Carousel Stage */}
        <div
          className="carouselContainer"
          ref={carouselRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="3D Service Image Carousel"
        >
          {/* Controls: Left & Right Arrows */}
          <button
            className="carouselNavBtn prev"
            onClick={prevSlide}
            aria-label="Previous service slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="carouselNavBtn next"
            onClick={nextSlide}
            aria-label="Next service slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Track */}
          <div className="carouselTrack">
            {CAROUSEL_SERVICES.map((item, idx) => {
              let offset = idx - activeIdx;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`carouselCard ${isCenter ? 'active' : ''} offset-${offset}`}
                  style={{
                    '--offset': offset,
                    '--abs-offset': absOffset
                  }}
                  onClick={() => {
                    if (isCenter) {
                      navigate(`/services/${item.id}`);
                    } else {
                      setActiveIdx(idx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.title} - ${isCenter ? 'Click to view details' : 'Click to bring to center'}`}
                >
                  <div className="cardImageWrapper">
                    <img
                      src={item.image}
                      alt={`${item.title} Services in Perambalur - JN Consultancy`}
                      width={896}
                      height={1200}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="cardGlassOverlay">
                      <div className="cardBadge">
                        <Icon size={16} />
                        <span>{item.title}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.tagline}</p>
                    </div>
                  </div>
                  <div className="cardFloorReflection" />
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="carouselDots" role="tablist" aria-label="Carousel pagination dots">
            {CAROUSEL_SERVICES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Switch to slide ${i + 1}: ${s.title}`}
                className={`dot ${i === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>
        </div>

        {/* 4.D: Six Clickable Service Buttons Underneath */}
        <div className="servicePillsGrid" aria-label="Quick Service Navigation">
          {CAROUSEL_SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === activeIdx;
            return (
              <Link
                to={`/services/${s.id}`}
                key={s.id}
                className={`servicePillBtn ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveIdx(i)}
                aria-label={`View ${s.title} services`}
              >
                <span
                  className="pillIconBadge"
                  style={{ backgroundColor: s.iconBg, color: s.iconColor }}
                >
                  <Icon size={20} />
                </span>
                <span className="pillTitle">{s.title}</span>
                <span className="pillArrowCircle">
                  <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 5. Additional Homepage Content — Why Choose Us
 */
function WhyChooseUs() {
  return (
    <section className="whySection">
      <div className="wrap whyGrid">
        <div className="whyCopy">
          <div className="whyEyebrow">WHY CHOOSE US</div>
          <h2>
            Built on trust, delivered with <em>excellence.</em>
          </h2>
          <p>
            Multiple service categories, one professional point of contact. Get verified
            information, transparent guidance, and dedicated support every step of the way.
          </p>
          <Link className="btn-hero-primary" to="/contact">
            Talk to Our Team <ArrowRight size={16} />
          </Link>
        </div>

        <div className="whyCardsGrid">
          <div className="whyCard">
            <div className="whyCardIcon" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <ShieldCheck size={22} />
            </div>
            <b>Trusted & Reliable</b>
            <p>100% genuine services with transparent process and honest guidance.</p>
          </div>
          <div className="whyCard">
            <div className="whyCardIcon" style={{ backgroundColor: '#EFF6FF', color: '#0866F5' }}>
              <Clock size={22} />
            </div>
            <b>Fast & Convenient</b>
            <p>Save valuable time with swift processing and hassle-free support.</p>
          </div>
          <div className="whyCard">
            <div className="whyCardIcon" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
              <Users size={22} />
            </div>
            <b>Expert Guidance</b>
            <p>Knowledgeable specialists providing step-by-step assistance for your needs.</p>
          </div>
          <div className="whyCard">
            <div className="whyCardIcon" style={{ backgroundColor: '#FAF5FF', color: '#7C3AED' }}>
              <Headphones size={22} />
            </div>
            <b>Business Hours Support</b>
            <p>Prompt, dedicated communication throughout working hours whenever you need us.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Service Grid Card for /services page
 */
function ServiceCard({ s }) {
  const Icon = s.icon;
  return (
    <Link className="serviceGridCard" to={`/services/${s.id}`}>
      <div className="cardIconBadge" style={{ backgroundColor: s.iconBg || '#EAF5FF', color: s.iconColor || '#0866F5' }}>
        <Icon size={24} />
      </div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      <b>
        Learn more <ArrowRight size={15} />
      </b>
    </Link>
  );
}

/**
 * Main Home Page
 */
/**
 * Main Home Page
 */
function Home() {
  return (
    <>
      <SEO
        title="JN Consultancy Services | Travels, Admissions, Property, Jobs, Banking & IT in Perambalur"
        description="JN Consultancy Services in Perambalur offers trusted outstation travels, college admission guidance, verified land & property, overseas jobs, pre-owned cars, banking loans, and IT solutions."
        canonical="https://www.mwayjnconsultancy.in/"
      />
      <Hero />
      <ServiceCarousel />
      <WhyChooseUs />
      
      {/* Ready to find solution CTA */}
      <section className="enquiryBannerSection">
        <div className="wrap">
          <div className="enquiryBannerCard">
            <div className="bannerText">
              <div className="bannerEyebrow">READY WHEN YOU ARE</div>
              <h2>Let's find the right solution for you.</h2>
              <p>Tell us what you need and our professional team in Perambalur will guide you promptly.</p>
            </div>
            <Link className="btn-banner-cta" to="/contact">
              Start an Enquiry <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* MWAY Mobile App Section */}
      <MwaySection />
    </>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="pageHero">
      <div className="wrap">
        <div className="pageHeroEyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {text && <p className="pageHeroText">{text}</p>}
      </div>
    </section>
  );
}

function ServicesPage() {
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mwayjnconsultancy.in/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.mwayjnconsultancy.in/services' }
        ]
      },
      {
        '@type': 'ItemList',
        name: 'JN Consultancy Services Verticals',
        description: 'Verified professional service categories offered by JN Consultancy Services in Perambalur.',
        itemListElement: ALL_SERVICES.map((s, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: s.title,
          url: `https://www.mwayjnconsultancy.in/services/${s.id}`
        }))
      }
    ]
  };

  return (
    <>
      <SEO
        title="Our Services | Complete Life & Business Solutions - JN Consultancy Services"
        description="Explore all verified services by JN Consultancy Services in Perambalur: Travels, Admission guidance, Land & Property, Overseas Jobs, Pre-Owned Cars, Banking loans, and IT solutions."
        canonical="https://www.mwayjnconsultancy.in/services"
        schema={servicesSchema}
      />
      <PageHero
        eyebrow="OUR SERVICES"
        title={<>Solutions for <em>real-world needs.</em></>}
        text="Explore all JN Consultancy Services verticals and select the tailored assistance you need in Perambalur and across Tamil Nadu."
      />
      <section className="section wrap">
        <div className="servicesCatalogGrid">
          {ALL_SERVICES.map((s) => (
            <ServiceCard s={s} key={s.id} />
          ))}
        </div>
      </section>
    </>
  );
}

function Detail() {
  const { id } = useParams();
  const s = ALL_SERVICES.find((x) => x.id === id || x.aliases?.includes(id));

  if (!s) {
    return (
      <>
        <SEO
          title="Service Not Found | JN Consultancy Services"
          description="The requested service was not found on JN Consultancy Services."
          noindex={true}
        />
        <PageHero
          eyebrow="404"
          title={<>Service <em>not found.</em></>}
          text="Please select one of our verified services."
        />
      </>
    );
  }

  // Enforce single canonical URL if accessed via an alias route
  if (s.id !== id) {
    return <Navigate to={`/services/${s.id}`} replace />;
  }

  const Icon = s.icon;
  const canonicalUrl = `https://www.mwayjnconsultancy.in/services/${s.id}`;

  const detailSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mwayjnconsultancy.in/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.mwayjnconsultancy.in/services' },
          { '@type': 'ListItem', position: 3, name: s.title, item: canonicalUrl }
        ]
      },
      {
        '@type': 'Service',
        name: `${s.title} Services`,
        serviceType: s.tagline,
        description: s.shortDesc || s.desc,
        provider: {
          '@type': 'ProfessionalService',
          name: 'JN Consultancy Services',
          url: 'https://www.mwayjnconsultancy.in/',
          telephone: `+91-${phone}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Shop No-9, C-Block, 5Star Complex, Opposite New Bus Stand',
            addressLocality: 'Perambalur',
            addressRegion: 'Tamil Nadu',
            postalCode: '621212',
            addressCountry: 'IN'
          }
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Perambalur' },
          { '@type': 'AdministrativeArea', name: 'Tamil Nadu' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: (s.faqs || []).map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a
          }
        }))
      }
    ]
  };

  const points = [
    'Professional requirement assessment and guidance',
    'Requirement-based personalized support',
    'Clear and transparent communication',
    'End-to-end application & coordination assistance',
    'Direct team communication and updates',
    'Post-service follow-up and verification'
  ];

  if (s.id === 'banking') {
    return (
      <>
        <SEO
          title={s.metaTitle || 'Banking DSA Loans, Credit Cards & Financial Assistance | JN Consultancy Perambalur'}
          description={s.metaDescription || 'All your financial needs in one place. Explore 16 loan options, cards, insurance, investments and calculate instant loan EMIs with MWAY / JN Consultancy Services.'}
          canonical={canonicalUrl}
          schema={detailSchema}
        />
        <BankingServicesPage />
      </>
    );
  }

  return (
    <>
      <SEO
        title={s.metaTitle || `${s.title} Services in Perambalur | JN Consultancy`}
        description={s.metaDescription || s.shortDesc || s.desc}
        canonical={canonicalUrl}
        schema={detailSchema}
      />
      <section className="pageHero">
        <div className="wrap">
          <nav className="breadcrumbNav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/services">Services</Link>
            <span className="sep">/</span>
            <span className="current" aria-current="page">{s.title}</span>
          </nav>
          <div className="pageHeroEyebrow">{s.title.toUpperCase()}</div>
          <h1>{s.h1Title || `${s.title} made simpler.`}</h1>
          <p className="pageHeroText">{s.tagline || s.desc}</p>
        </div>
      </section>

      <section className="section wrap">
        <div className="detailLayout">
          <div className="detailMain">
            {s.image && (
              <div className="detailCoverImage">
                <img
                  src={s.image}
                  alt={`${s.title} Services in Perambalur - JN Consultancy Services`}
                  width={896}
                  height={1200}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            )}
            <div className="detailHeadingGroup">
              <div className="detailIconBadge" style={{ backgroundColor: s.iconBg || '#EAF5FF', color: s.iconColor || '#0866F5' }}>
                <Icon size={28} />
              </div>
              <div>
                <h2>Comprehensive {s.title} Support in Perambalur</h2>
                <p>{s.tagline || s.desc}</p>
              </div>
            </div>

            <div className="detailBodyText">
              <p>
                {s.leadText || 'Our experienced team understands your specific requirements, guides you through every step, and manages all documentation and coordination smoothly.'}
              </p>
            </div>

            {/* Local Hub Box */}
            <div className="localPresenceBox">
              <MapPin size={22} />
              <div>
                <b>Local Service Hub in Perambalur</b>
                <p>
                  Available at our registered office: {office} Serving clients across Perambalur, Ariyalur, Trichy, and Tamil Nadu.
                </p>
              </div>
            </div>

            {/* Deliverables Grid */}
            {s.offerings && s.offerings.length > 0 && (
              <>
                <h3 className="detailSectionTitle">Key Offerings &amp; Deliverables</h3>
                <div className="serviceOfferingsGrid">
                  {s.offerings.map((off) => (
                    <div key={off.title} className="offeringCard">
                      <h3>{off.title}</h3>
                      <p>{off.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Workflow Process */}
            {s.process && s.process.length > 0 && (
              <>
                <h3 className="detailSectionTitle">How Our Process Works</h3>
                <div className="workflowSteps">
                  {s.process.map((step) => (
                    <div key={step.step} className="workflowStepCard">
                      <div className="stepNum">{step.step}</div>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Checklist Commitments */}
            <h3 className="detailSectionTitle">Our Service Commitments</h3>
            <div className="detailPoints">
              {points.map((x) => (
                <div key={x} className="pointItem">
                  <CheckCircle2 size={18} color="#0866F5" />
                  <span>{x}</span>
                </div>
              ))}
            </div>

            {/* FAQs */}
            {s.faqs && s.faqs.length > 0 && (
              <>
                <h3 className="detailSectionTitle">Frequently Asked Questions</h3>
                <div className="serviceFaqList">
                  {s.faqs.map((faq) => (
                    <div key={faq.q} className="serviceFaqItem">
                      <h3>{faq.q}</h3>
                      <p>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="detailActionArea">
              <Link className="btn-hero-primary" to="/contact">
                Enquire about {s.title} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <aside className="detailAside">
            <h3>Need Assistance?</h3>
            <p>Speak directly with our service specialists in Perambalur for complete guidance.</p>
            <div className="asideContactList">
              <a href={`tel:${phone}`}>
                <Phone size={16} /> {phone}
              </a>
              <a href={`tel:${altPhone}`}>
                <Phone size={16} /> {altPhone}
              </a>
              <a href={`mailto:${email}`}>
                <Mail size={16} /> {email}
              </a>
            </div>
            <Link className="btn-aside-cta" to="/contact">
              Send an Enquiry
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function Careers() {
  const careersSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mwayjnconsultancy.in/' },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://www.mwayjnconsultancy.in/careers' }
    ]
  };

  return (
    <>
      <SEO
        title="Careers at JN Consultancy Services | Job Openings in Perambalur"
        description="Join JN Consultancy Services in Perambalur. Current job openings for Telecalling Executives, Social Media Influencers, and Software Developer Interns. Apply online today."
        canonical="https://www.mwayjnconsultancy.in/careers"
        schema={careersSchema}
      />
      <PageHero
        eyebrow="JOIN OUR TEAM"
        title={<>Build your career with <em>JN in Perambalur.</em></>}
        text="We are looking for motivated candidates across telecalling, social media engagement, and modern software development."
      />
      <section className="section wrap formGrid">
        <div className="careersList">
          <h2>Current Opportunities</h2>
          {POSITIONS.map((x, i) => (
            <div className="jobCard" key={x}>
              <div className="jobIconWrap">
                <BriefcaseBusiness size={22} color="#0866F5" />
              </div>
              <div>
                <h3>{x}</h3>
                <p>
                  {i === 0
                    ? 'Customer communication, requirement gathering, follow-ups, and service coordination.'
                    : i === 1
                    ? 'Content creation, social media engagement, audience interaction, and brand promotion.'
                    : 'Building modern web applications, native mobile apps, dashboards, and digital solutions.'}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ApplicationForm positions={POSITIONS} />
      </section>
    </>
  );
}

function Contact() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mwayjnconsultancy.in/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.mwayjnconsultancy.in/contact' }
    ]
  };

  return (
    <>
      <SEO
        title="Contact JN Consultancy Services | Office Location & Phone in Perambalur"
        description="Get in touch with JN Consultancy Services. Office: Shop No-9, C-Block, 5Star Complex, Opposite New Bus Stand, Perambalur. Call +91 96777 96891 or email jnconsultancy26@gmail.com."
        canonical="https://www.mwayjnconsultancy.in/contact"
        schema={contactSchema}
      />
      <PageHero
        eyebrow="CONTACT US"
        title={<>Let's talk about <em>what you need.</em></>}
        text="Visit our office in Perambalur, send an online enquiry, or connect directly with our support team."
      />
      <section className="section wrap contactGrid">
        <div className="contactCards">
          <div className="contactCard">
            <div className="contactIconCircle">
              <Phone size={22} color="#0866F5" />
            </div>
            <div>
              <small>Call us directly</small>
              <a href={`tel:${phone}`}>{phone}</a>
              <a href={`tel:${altPhone}`}>{altPhone}</a>
            </div>
          </div>
          <div className="contactCard">
            <div className="contactIconCircle">
              <Mail size={22} color="#0866F5" />
            </div>
            <div>
              <small>Email our desk</small>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
          <div className="contactCard">
            <div className="contactIconCircle">
              <MapPin size={22} color="#0866F5" />
            </div>
            <div>
              <small>Visit our office</small>
              <p>{office}</p>
            </div>
          </div>
        </div>
        <EnquiryForm services={ALL_SERVICES} />
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footerGrid">
        <div className="footerAbout">
          <div className="footerBrandHeader">
            <img src={logo} className="footlogo" alt="JN Consultancy Services Logo" width={44} height={44} loading="lazy" decoding="async" />
            <div>
              <b>JN</b>
              <small>CONSULTANCY SERVICES</small>
            </div>
          </div>
          <p>One trusted destination for multiple life and business solutions in Perambalur.</p>
          <div className="footMway">
            <MwayLogo size={52} />
            <div>
              <b>MWAY</b>
              <span>{MWAY_TAGLINE}</span>
            </div>
          </div>
        </div>

        <div>
          <h4>Services</h4>
          <div className="footerServicesList">
            {ALL_SERVICES.map((s) => (
              <Link key={s.id} to={`/services/${s.id}`}>
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4>Direct Contact</h4>
          <div className="footerContactList">
            <a href={`tel:${phone}`}><Phone size={14} /> {phone}</a>
            <a href={`tel:${altPhone}`}><Phone size={14} /> {altPhone}</a>
            <a href={`mailto:${email}`}><Mail size={14} /> {email}</a>
          </div>
        </div>

        <div>
          <h4>Registered Office</h4>
          <p className="officeAddress">
            <MapPin size={16} /> {office}
          </p>
          <Link className="footerCtaBtn" to="/contact">
            Send an Enquiry <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="wrap footLegal">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-and-conditions">Terms and Conditions</Link>
        <Link to="/refund-cancellation-policy">Refund & Cancellation</Link>
        <Link to="/driver-terms">Driver Partner Terms</Link>
        <Link to="/driver-privacy">Driver Privacy Policy</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/account-deletion">Account Deletion</Link>
        <Link to="/mway-app">MWAY App Info</Link>
      </div>

      <div className="wrap copy">
        © {new Date().getFullYear()} JN Consultancy Services. All rights reserved.
      </div>
    </footer>
  );
}

function Chat() {
  const [open, setOpen] = useState(false);
  return (
    <div className="chat">
      <div className={`chatbox ${open ? 'show' : ''}`} role="dialog" aria-label="Customer support chat">
        <div className="chatHead">
          <b>JN Support Desk</b>
          <button onClick={() => setOpen(false)} aria-label="Close chat">
            <X size={17} />
          </button>
        </div>
        <div className="chatBody">
          <p>Hi 👋 Welcome to JN Consultancy Services!</p>
          <p>How can our team help you today?</p>
          <p className="chatServicesNote">
            Ask about Travels, Admission, Land & Property, Jobs, Cars, Banking, or IT Software & Solutions.
          </p>
          <Link to="/contact" onClick={() => setOpen(false)} className="chatConnectBtn">
            Connect with our team <ArrowRight size={14} />
          </Link>
        </div>
        <div className="chatFoot">Direct Call Support: {phone}</div>
      </div>
      <button
        className="chatFab"
        onClick={() => setOpen(!open)}
        aria-label="Toggle customer chat support"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          {/* Primary Canonical Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<Detail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mway-app" element={<MwayAppPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicy />} />
          <Route path="/driver-terms" element={<DriverTermsPolicy />} />
          <Route path="/driver-privacy" element={<DriverPrivacyPolicy />} />
          <Route path="/account-deletion" element={<AccountDeletion />} />

          {/* Canonical 301 Redirects for Alias & Duplicate URLs */}
          <Route path="/banking" element={<Navigate to="/services/banking" replace />} />
          <Route path="/loan-calculator" element={<Navigate to="/services/banking" replace />} />
          <Route path="/services/real-estate" element={<Navigate to="/services/land-property" replace />} />
          <Route path="/services/foreign-jobs" element={<Navigate to="/services/jobs" replace />} />
          <Route path="/services/automobile" element={<Navigate to="/services/cars" replace />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="/terms-of-service" element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="/terms-conditions" element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="/terms%20and%20conditions" element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="/terms and conditions" element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="/refund" element={<Navigate to="/refund-cancellation-policy" replace />} />
          <Route path="/refund-policy" element={<Navigate to="/refund-cancellation-policy" replace />} />
          <Route path="/cancellation-policy" element={<Navigate to="/refund-cancellation-policy" replace />} />
          <Route path="/refund%20cancellation%20policy" element={<Navigate to="/refund-cancellation-policy" replace />} />
          <Route path="/refund cancellation policy" element={<Navigate to="/refund-cancellation-policy" replace />} />
          <Route path="/driver-terms-and-conditions" element={<Navigate to="/driver-terms" replace />} />
          <Route path="/driver-privacy-policy" element={<Navigate to="/driver-privacy" replace />} />
          <Route path="/driver-refund-policy" element={<Navigate to="/refund-cancellation-policy" replace />} />
          <Route path="/driver-cancellation-policy" element={<Navigate to="/refund-cancellation-policy" replace />} />

          {/* Public Live Tracking (Transactional Utility - Noindexed) */}
          <Route path="/track" element={<LiveTrackingWebPage />} />
          <Route path="/track/:token" element={<LiveTrackingWebPage />} />

          {/* 404 Error Route */}
          <Route
            path="*"
            element={
              <>
                <SEO
                  title="Page Not Found (404) | JN Consultancy Services"
                  description="The page you are looking for does not exist on JN Consultancy Services."
                  noindex={true}
                />
                <PageHero
                  eyebrow="404"
                  title={<>Page <em>not found.</em></>}
                  text="The page you're looking for doesn't exist. Please check the URL or return to our homepage."
                />
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Chat />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
