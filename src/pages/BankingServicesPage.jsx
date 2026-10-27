import React, { useState } from 'react';
import {
  Sprout,
  Building2,
  Settings,
  Store,
  FileText,
  Coins,
  GraduationCap,
  Hammer,
  Home,
  Paintbrush,
  User,
  Car,
  Building,
  Bike,
  Landmark,
  CreditCard,
  Globe,
  Heart,
  ShieldCheck,
  Users,
  TrendingUp,
  PiggyBank,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import BankIllustration from '../components/BankIllustration';
import QuickEnquiryPanel from '../components/QuickEnquiryPanel';
import LoanCalculator from '../components/LoanCalculator';

// 16 Exact Loan Categories in 4x4 Grid Order
const LOANS_DATA = [
  // Row 1
  {
    id: 'agriculture-loan',
    name: 'Agriculture Loan',
    desc: 'Finance for farming and agriculture needs',
    icon: Sprout,
    tone: 'green',
  },
  {
    id: 'business-loan',
    name: 'Business Loan',
    desc: 'Grow and expand your business',
    icon: Building2,
    tone: 'blue',
  },
  {
    id: 'machinery-loan',
    name: 'Machinery / Equipment Loan',
    desc: 'Finance for machinery and equipment purchase',
    icon: Settings,
    tone: 'purple',
  },
  {
    id: 'msme-loan',
    name: 'MSME Loan',
    desc: 'Special loans for MSMEs and small businesses',
    icon: Store,
    tone: 'red',
  },
  // Row 2
  {
    id: 'project-loan',
    name: 'Project Loan',
    desc: 'Finance for new projects',
    icon: FileText,
    tone: 'orange',
  },
  {
    id: 'working-capital-loan',
    name: 'Working Capital Loan',
    desc: 'Manage your day to day business operations',
    icon: Coins,
    tone: 'teal',
  },
  {
    id: 'education-loan',
    name: 'Education Loan',
    desc: 'Finance for higher education in India and abroad',
    icon: GraduationCap,
    tone: 'blue',
  },
  {
    id: 'gold-loan',
    name: 'Gold Loan',
    desc: 'Get instant funds against your gold',
    icon: Coins,
    tone: 'gold',
  },
  // Row 3
  {
    id: 'home-construction-loan',
    name: 'Home Construction Loan',
    desc: 'Build your dream home',
    icon: Hammer,
    tone: 'red',
  },
  {
    id: 'home-loan',
    name: 'Home Loan',
    desc: 'Buy your dream home',
    icon: Home,
    tone: 'blue',
  },
  {
    id: 'home-renovation-loan',
    name: 'Home Renovation Loan',
    desc: 'Renovate and upgrade your home',
    icon: Paintbrush,
    tone: 'purple',
  },
  {
    id: 'personal-loan',
    name: 'Personal Loan',
    desc: 'Meet your personal financial needs',
    icon: User,
    tone: 'green',
  },
  // Row 4
  {
    id: 'car-loan',
    name: 'Car Loan',
    desc: 'Drive your dream car',
    icon: Car,
    tone: 'blue',
  },
  {
    id: 'commercial-loan',
    name: 'Commercial Loan',
    desc: 'Finance for commercial properties',
    icon: Building,
    tone: 'red',
  },
  {
    id: 'two-wheeler-loan',
    name: 'Two-Wheeler Loan',
    desc: 'Get easy finance for your bike or scooter',
    icon: Bike,
    tone: 'orange',
  },
  {
    id: 'lap-loan',
    name: 'LAP (Loan Against Property)',
    desc: 'Get funds against your property',
    icon: Landmark,
    tone: 'purple',
  },
];

// Cards Section: 2 options
const CARDS_DATA = [
  {
    id: 'credit-cards',
    name: 'Credit Cards',
    desc: 'Best offers and rewards',
    icon: CreditCard,
    tone: 'blue',
  },
  {
    id: 'forex-cards',
    name: 'Forex Cards',
    desc: 'Global access for your travels',
    icon: Globe,
    tone: 'purple',
  },
];

// Insurance Section: 4 options
const INSURANCE_DATA = [
  {
    id: 'health-insurance',
    name: 'Health Insurance',
    desc: 'Secure your health',
    icon: Heart,
    tone: 'red',
  },
  {
    id: 'life-insurance',
    name: 'Life Insurance',
    desc: 'Secure your family',
    icon: ShieldCheck,
    tone: 'blue',
  },
  {
    id: 'term-insurance',
    name: 'Term Insurance',
    desc: 'High coverage at low cost',
    icon: Users,
    tone: 'purple',
  },
  {
    id: 'vehicle-insurance',
    name: 'Vehicle Insurance',
    desc: 'Keep your vehicle safe',
    icon: Car,
    tone: 'orange',
  },
];

// Investments Section: 3 options
const INVESTMENTS_DATA = [
  {
    id: 'fixed-deposit',
    name: 'Fixed Deposit',
    desc: 'Safe and steady returns',
    icon: PiggyBank,
    tone: 'gold',
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    desc: 'Invest for your goals',
    icon: TrendingUp,
    tone: 'green',
  },
  {
    id: 'bonds',
    name: 'Bonds',
    desc: 'Stable income options',
    icon: FileText,
    tone: 'purple',
  },
];

export default function BankingServicesPage() {
  const [selectedService, setSelectedService] = useState('');

  const handleCardClick = (serviceName) => {
    setSelectedService(serviceName);
    // Smooth scroll to quick enquiry panel on desktop & mobile
    const panel = document.getElementById('quick-enquiry');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="banking-page-container">
      {/* 1. Page Header Banner */}
      <header className="banking-page-hero">
        <div className="wrap banking-hero-grid">
          <div className="banking-hero-copy">
            <h1 className="banking-hero-title">
              Banking <span className="highlight-blue">Services</span>
            </h1>
            <p className="banking-hero-subtitle">
              All your financial needs in one place. Explore loans, cards, insurance and investment options from trusted banking partners.
            </p>
          </div>
          <div className="banking-hero-art" aria-hidden="true">
            <BankIllustration />
          </div>
        </div>
      </header>

      {/* Main Content Layout: Left Services Column + Right Quick Enquiry Column */}
      <main className="wrap banking-main-layout">
        <div className="banking-content-grid">
          {/* Left Column: All Financial Services Sections */}
          <div className="banking-services-column">
            {/* 2. LOANS SECTION */}
            <section className="banking-section-block" aria-labelledby="sec-loans-title">
              <div className="section-header">
                <div className="header-badge rupee-badge" aria-hidden="true">
                  <span>₹</span>
                </div>
                <div>
                  <h2 id="sec-loans-title" className="section-title">
                    Loans
                  </h2>
                  <p className="section-subtitle">
                    Choose the right loan for your needs from top banks and financial partners.
                  </p>
                </div>
              </div>

              {/* 4x4 Grid for 16 Loans */}
              <div className="loans-grid-4x4">
                {LOANS_DATA.map((loan) => {
                  const IconComponent = loan.icon;
                  const isSelected = selectedService === loan.name;
                  return (
                    <button
                      key={loan.id}
                      type="button"
                      className={`service-card loan-card tone-${loan.tone} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleCardClick(loan.name)}
                      aria-label={`Enquire about ${loan.name}`}
                    >
                      <div className="card-top-row">
                        <div className={`card-icon-wrapper tone-${loan.tone}`} aria-hidden="true">
                          <IconComponent size={20} />
                        </div>
                        <ChevronRight size={16} className="card-chevron" aria-hidden="true" />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{loan.name}</h3>
                        <p className="card-desc">{loan.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 3. CARDS SECTION */}
            <section className="banking-section-block" aria-labelledby="sec-cards-title">
              <div className="section-header">
                <div className="header-badge purple-badge" aria-hidden="true">
                  <CreditCard size={20} color="#ffffff" />
                </div>
                <div>
                  <h2 id="sec-cards-title" className="section-title">
                    Cards
                  </h2>
                  <p className="section-subtitle">
                    Exclusive card options with great benefits and global access.
                  </p>
                </div>
              </div>

              <div className="cards-grid-2col">
                {CARDS_DATA.map((card) => {
                  const IconComponent = card.icon;
                  const isSelected = selectedService === card.name;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      className={`service-card wide-card tone-${card.tone} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleCardClick(card.name)}
                      aria-label={`Enquire about ${card.name}`}
                    >
                      <div className="card-top-row">
                        <div className={`card-icon-wrapper tone-${card.tone}`} aria-hidden="true">
                          <IconComponent size={20} />
                        </div>
                        <ChevronRight size={16} className="card-chevron" aria-hidden="true" />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{card.name}</h3>
                        <p className="card-desc">{card.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 4. INSURANCE SECTION */}
            <section className="banking-section-block" aria-labelledby="sec-insurance-title">
              <div className="section-header">
                <div className="header-badge teal-badge" aria-hidden="true">
                  <ShieldCheck size={20} color="#ffffff" />
                </div>
                <div>
                  <h2 id="sec-insurance-title" className="section-title">
                    Insurance
                  </h2>
                  <p className="section-subtitle">
                    Protect what matters most with the right insurance plans.
                  </p>
                </div>
              </div>

              <div className="insurance-grid-4col">
                {INSURANCE_DATA.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = selectedService === item.name;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`service-card insurance-card tone-${item.tone} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleCardClick(item.name)}
                      aria-label={`Enquire about ${item.name}`}
                    >
                      <div className="card-top-row">
                        <div className={`card-icon-wrapper tone-${item.tone}`} aria-hidden="true">
                          <IconComponent size={20} />
                        </div>
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{item.name}</h3>
                        <p className="card-desc">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 5. INVESTMENTS SECTION */}
            <section className="banking-section-block" aria-labelledby="sec-investments-title">
              <div className="section-header">
                <div className="header-badge orange-badge" aria-hidden="true">
                  <TrendingUp size={20} color="#ffffff" />
                </div>
                <div>
                  <h2 id="sec-investments-title" className="section-title">
                    Investments
                  </h2>
                  <p className="section-subtitle">
                    Grow your wealth with secure and smart investment options.
                  </p>
                </div>
              </div>

              <div className="investments-grid-3col">
                {INVESTMENTS_DATA.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = selectedService === item.name;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`service-card investment-card tone-${item.tone} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleCardClick(item.name)}
                      aria-label={`Enquire about ${item.name}`}
                    >
                      <div className="card-top-row">
                        <div className={`card-icon-wrapper tone-${item.tone}`} aria-hidden="true">
                          <IconComponent size={20} />
                        </div>
                        <ChevronRight size={16} className="card-chevron" aria-hidden="true" />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{item.name}</h3>
                        <p className="card-desc">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Quick Enquiry Panel */}
          <aside className="banking-sidebar-column">
            <QuickEnquiryPanel
              selectedService={selectedService}
              onServiceSelect={setSelectedService}
            />
          </aside>
        </div>

        {/* 7, 8, 9. LOAN CALCULATOR (Same page, at bottom) */}
        <div className="banking-calculator-wrapper">
          <LoanCalculator />
        </div>
      </main>
    </div>
  );
}
