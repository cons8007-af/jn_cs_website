import autoImg from './assets/service-automobile.jpg';
import travelsImg from './assets/service-travels.jpg';
import admissionImg from './assets/service-admission.jpg';
import bankingImg from './assets/service-banking.jpg';
import realestateImg from './assets/service-realestate.jpg';
import itsolutionsImg from './assets/service-itsolutions.jpg';
import jobsImg from './assets/service-jobs.png';
import {
  Plane, GraduationCap, Building2, BriefcaseBusiness,
  CarFront, Landmark, Laptop
} from 'lucide-react';

export const VERIFIED_SERVICES = [
  {
    id: 'travels',
    title: 'Travels',
    h1Title: 'Reliable Outstation Travels, Cab Services & Tour Packages in Perambalur',
    image: travelsImg,
    icon: Plane,
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
    tagline: 'Outstation Rides, Packages & Coach Bookings',
    shortDesc: 'Pickup & drop, savari-based travel, tourist packages, airport transfers and bus booking.',
    metaTitle: 'Outstation Cabs, Airport Transfers & Travel Packages | JN Travels Perambalur',
    metaDescription: 'Book reliable outstation cabs, round-trips, airport transfers to Trichy & Chennai, savari-based rides, and holiday tour packages in Perambalur with JN Travels & MWAY App.',
    leadText: 'JN Travels offers comfortable, punctual, and safe passenger transport solutions for individuals, families, and corporate groups. Based in Perambalur, we connect travellers seamlessly to Chennai, Tiruchirappalli, Coimbatore, Bangalore, and pilgrimage circuits across Tamil Nadu.',
    offerings: [
      {
        title: 'Outstation One-Way & Round Trips',
        desc: 'Dedicated point-to-point and round-trip cab bookings with transparent per-km billing and no hidden charges.'
      },
      {
        title: 'Airport Pickup & Drop Transfers',
        desc: 'Punctual 24/7 transfers to Tiruchirappalli International Airport (TRZ), Chennai (MAA), and Coimbatore (CJB).'
      },
      {
        title: 'Savari & Shared Return Travel',
        desc: 'Economical shared return cab options matching empty returning vehicles with passengers heading the same way.'
      },
      {
        title: 'Custom Tourist & Pilgrimage Packages',
        desc: 'Tailored holiday itineraries covering Velankanni, Kumbakonam temples, Thanjavur, Kodaikanal, and Ooty.'
      },
      {
        title: 'AC Cabs & Multi-Seater Coaches',
        desc: 'Fleet choices from compact hatchbacks and executive sedans to spacious SUVs and tempo travelers for family functions.'
      },
      {
        title: 'Live Trip Tracking via MWAY App',
        desc: 'Real-time GPS ride monitoring, transparent driver details, and safety confirmation for peace of mind.'
      }
    ],
    process: [
      { step: '1', title: 'Share Route & Requirements', desc: 'Tell us your pickup point, destination, date, and preferred vehicle size.' },
      { step: '2', title: 'Instant Transparent Quote', desc: 'Receive fair, upfront tariff details with tolls, driver batta, and vehicle options clearly specified.' },
      { step: '3', title: 'Driver & Vehicle Assigned', desc: 'Get verified driver contact details and vehicle registration ahead of time.' },
      { step: '4', title: 'Safe & Comfortable Journey', desc: 'Travel in clean, air-conditioned comfort with live tracking available through the MWAY app.' }
    ],
    faqs: [
      {
        q: 'Do you provide one-way outstation cab services from Perambalur?',
        a: 'Yes, JN Travels provides dedicated one-way outstation cab services from Perambalur to Chennai, Trichy, Coimbatore, Salem, Bangalore, and across Tamil Nadu.'
      },
      {
        q: 'How can passengers track the cab during their journey?',
        a: 'You can monitor your trip live through our MWAY mobile application or via a secure web tracking link shared directly with you and your family.'
      },
      {
        q: 'What types of vehicles are available for booking?',
        a: 'We offer air-conditioned hatchbacks, comfortable sedans (Dzire, Etios), premium SUVs (Innova, Ertiga), and tempo travelers for larger groups.'
      }
    ]
  },
  {
    id: 'admission',
    title: 'Admission',
    h1Title: 'Professional College Guidance & University Admission Counselling in Tamil Nadu',
    image: admissionImg,
    icon: GraduationCap,
    iconBg: '#DCFCE7',
    iconColor: '#059669',
    tagline: 'College Guidance & University Admissions',
    shortDesc: 'Tamil Nadu engineering, arts & science, medical, and abroad university admission guidance.',
    metaTitle: 'College Guidance & University Admission Counselling | JN Consultancy Perambalur',
    metaDescription: 'Expert admission guidance in Perambalur for Engineering (TNEA), Arts & Science, Medical (NEET), MBA/MCA, and Abroad Universities. Transparent, merit-focused career counselling.',
    leadText: 'Making the right higher education choice is a crucial milestone for every student. JN Consultancy provides ethical, transparent, and merit-focused educational counselling in Perambalur to help students and parents navigate college options, cut-off ranks, and official admission procedures.',
    offerings: [
      {
        title: 'Engineering College Guidance (TNEA)',
        desc: 'Strategic counselling for Anna University affiliated colleges and top autonomous engineering institutions across Tamil Nadu.'
      },
      {
        title: 'Arts, Science & Commerce Admissions',
        desc: 'Comprehensive guidance for reputed arts & science colleges, emerging specializations, and career pathways.'
      },
      {
        title: 'Medical & Allied Health Sciences',
        desc: 'Information support for NEET score analysis, MBBS, BDS, Nursing, Pharmacy, and Allied Health courses.'
      },
      {
        title: 'Post-Graduate Admissions (MBA, MCA, ME)',
        desc: 'Guidance for TANCET, MAT, and management quota applications in premier business schools and universities.'
      },
      {
        title: 'Overseas University Guidance',
        desc: 'Authentic guidance for study abroad options in the UK, Europe, Canada, and Asia with accredited universities.'
      },
      {
        title: 'Choice Filling & Documentation Support',
        desc: 'Step-by-step assistance with counselling registration, rank card analysis, choice-order optimization, and certificate verification.'
      }
    ],
    process: [
      { step: '1', title: 'Profile & Cut-off Evaluation', desc: 'We assess the student’s academic marks, entrance scores, preferred domain, and career goals.' },
      { step: '2', title: 'College & Course Shortlisting', desc: 'We curate a realistic, prioritized list of institutions based on past cut-offs and campus infrastructure.' },
      { step: '3', title: 'Application & Document Preparation', desc: 'Assistance in compiling required certificates, reservation documents, and completing online forms.' },
      { step: '4', title: 'Counselling & Admission Completion', desc: 'Guidance during choice filling rounds until the student successfully secures the provisional allotment.' }
    ],
    faqs: [
      {
        q: 'Do you help with official Tamil Nadu Engineering Admissions (TNEA) counselling?',
        a: 'Yes, we guide students through registration, certificate verification, and strategic choice-filling for TNEA government counselling.'
      },
      {
        q: 'Which documents should students bring for an admission consultation?',
        a: 'Students should bring their 10th and 12th mark sheets, transfer certificate, community certificate, entrance exam scorecards, and ID proofs.'
      },
      {
        q: 'Do you guide students for study abroad universities?',
        a: 'Yes, we provide guidance on recognized international universities, course eligibility, language requirements, and application documentation.'
      }
    ]
  },
  {
    id: 'land-property',
    aliases: ['real-estate'],
    title: 'Land & Property',
    h1Title: 'Verified Plots, Commercial Properties & Real Estate Services in Perambalur',
    image: realestateImg,
    icon: Building2,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    tagline: 'Verified Plots, Villas & Commercial Properties',
    shortDesc: 'Land, commercial property, residential plots, rentals, buying and selling assistance.',
    metaTitle: 'Verified Plots, Real Estate & Commercial Property in Perambalur | JN Consultancy',
    metaDescription: 'Find DTCP & RERA approved residential plots, agricultural land, commercial property, and rental spaces in Perambalur and nearby districts. Verified documents and honest pricing.',
    leadText: 'Real estate investment requires thorough legal scrutiny and market knowledge. JN Consultancy Services connects property buyers, sellers, and tenants with verified residential plots, commercial buildings, and agricultural lands in Perambalur, ensuring complete transparency and legal security.',
    offerings: [
      {
        title: 'DTCP & RERA Approved Residential Plots',
        desc: 'Carefully vetted house plots in emerging residential layouts across Perambalur town and peripheral development zones.'
      },
      {
        title: 'Commercial Properties & Retail Spaces',
        desc: 'High-visibility shops, commercial complexes, and office spaces available for purchase, lease, or rent.'
      },
      {
        title: 'Agricultural Lands & Farmland Properties',
        desc: 'Verified agricultural lands with clear title deeds, water source access, and survey boundary documentation.'
      },
      {
        title: 'Legal Document & Title Verification',
        desc: 'Assistance in reviewing parent deeds, Patta/Chitta, Encumbrance Certificates (EC), and municipal approvals.'
      },
      {
        title: 'Buyer & Seller Direct Coordination',
        desc: 'Transparent deal structuring without fabricated valuations or artificial price markups.'
      },
      {
        title: 'Sub-Registrar Registration Assistance',
        desc: 'Full coordination for sale agreement drafting, stamp duty payment, and deed registration at the Perambalur Sub-Registrar Office.'
      }
    ],
    process: [
      { step: '1', title: 'Consultation & Requirement Note', desc: 'Identify your property type, budget, location preferences, and intended use (investment, construction, or rental).' },
      { step: '2', title: 'Site Inspection & Shortlisting', desc: 'Direct physical site visits to shortlisted verified properties with full road access and utility verification.' },
      { step: '3', title: 'Due Diligence & Legal Check', desc: 'Verify parent documents, encumbrance history, and local government approvals.' },
      { step: '4', title: 'Drafting & Sub-Registrar Registration', desc: 'Prepare legal sale agreements and coordinate hassle-free registration at the Sub-Registrar Office.' }
    ],
    faqs: [
      {
        q: 'Are the residential plots you recommend legally approved?',
        a: 'Yes, we specialize in DTCP and RERA approved layouts, verifying mother deeds, patta, and encumbrance certificates prior to recommending them.'
      },
      {
        q: 'Do you help property owners sell or lease their property in Perambalur?',
        a: 'Yes, we assist verified property owners with genuine buyer matching, valuation assessment, and legal paperwork coordination.'
      },
      {
        q: 'Can you help with property registration at the Perambalur Sub-Registrar Office?',
        a: 'Yes, our team guides you through deed drafting, stamp duty calculations, token booking, and registration formalities.'
      }
    ]
  },
  {
    id: 'jobs',
    aliases: ['foreign-jobs'],
    title: 'Jobs',
    h1Title: 'Overseas Job Guidance & Career Placement Support in Perambalur',
    image: jobsImg,
    icon: BriefcaseBusiness,
    iconBg: '#FCE7F3',
    iconColor: '#DB2777',
    tagline: 'Overseas Employment & Career Opportunities',
    shortDesc: 'Guidance, documentation and verification support for overseas job opportunities.',
    metaTitle: 'Overseas Jobs & Career Guidance Services | JN Consultancy Perambalur',
    metaDescription: 'Genuine overseas job guidance, CV documentation, and career opportunities for Gulf countries, Southeast Asia, and Europe in Perambalur. Transparent verification support.',
    leadText: 'Securing an international career requires authentic information, correct documentation, and verified employer communication. JN Consultancy Services in Perambalur assists job seekers with professional profile preparation, visa documentation guidance, and genuine career guidance across international markets.',
    offerings: [
      {
        title: 'Overseas Opportunity Guidance',
        desc: 'Career matching for technical, engineering, healthcare, administrative, and skilled positions across Gulf countries, Singapore, Malaysia, and Europe.'
      },
      {
        title: 'International CV & Profile Revamp',
        desc: 'Structuring resumes to meet international ATS standards and highlighting industry-relevant certifications and competencies.'
      },
      {
        title: 'Document Attestation & Verification',
        desc: 'Guidance on HRD attestation, MEA apostille, and embassy verification for educational and professional certificates.'
      },
      {
        title: 'Interview & Communication Prep',
        desc: 'Pre-interview orientation, technical preparation tips, and professional communication guidance.'
      },
      {
        title: 'Visa Documentation Guidance',
        desc: 'Support with work visa requirements, medical fitness checks (GAMCA), and consular document formalities.'
      },
      {
        title: 'Ethical & Transparent Process',
        desc: 'Strict reliance on verified employer requirements without false promises, misleading guarantees, or hidden fees.'
      }
    ],
    process: [
      { step: '1', title: 'Profile & Experience Review', desc: 'Assess qualifications, professional experience, trade certifications, and language proficiency.' },
      { step: '2', title: 'Opportunity Matching', desc: 'Match profile against verified overseas employer demand letters and trade requirements.' },
      { step: '3', title: 'Document Attestation & Visa Filing', desc: 'Provide step-by-step guidance on certificate attestation, medical exams, and visa processing.' },
      { step: '4', title: 'Pre-Departure Briefing', desc: 'Comprehensive orientation regarding destination labour regulations, travel preparations, and onboarding.' }
    ],
    faqs: [
      {
        q: 'Which countries do you provide overseas job guidance for?',
        a: 'We guide candidates for opportunities across Gulf nations (UAE, Saudi Arabia, Qatar, Kuwait, Oman), Singapore, Malaysia, and European destinations.'
      },
      {
        q: 'Do you help with degree and certificate attestation?',
        a: 'Yes, we provide complete guidance on the state HRD, Ministry of External Affairs (MEA), and embassy attestation processes.'
      },
      {
        q: 'Do you guarantee an overseas job or visa?',
        a: 'No ethical consultancy guarantees employment. We provide professional profile preparation, authentic vacancy guidance, and complete legal documentation assistance.'
      }
    ]
  },
  {
    id: 'cars',
    aliases: ['automobile'],
    title: 'Cars',
    h1Title: 'Certified Pre-Owned Cars, Vehicle Inspection & Buyer Guidance in Perambalur',
    image: autoImg,
    icon: CarFront,
    iconBg: '#EFF6FF',
    iconColor: '#0866F5',
    tagline: 'Certified Pre-Owned & Vehicle Coordination',
    shortDesc: 'Used car search, buyer guidance, vehicle inspection and seller coordination.',
    metaTitle: 'Certified Pre-Owned Cars & Vehicle Buying Guidance | JN Automobiles Perambalur',
    metaDescription: 'Buy and sell inspected pre-owned cars in Perambalur. Multi-point vehicle evaluation, fair market pricing, RC transfer, and complete ownership transfer documentation.',
    leadText: 'Purchasing a pre-owned vehicle should give you confidence, not surprises. JN Consultancy Services helps buyers and sellers in Perambalur with thorough vehicle inspections, fair market valuations, and complete RTO paperwork coordination for seamless ownership transfers.',
    offerings: [
      {
        title: 'Inspected Pre-Owned Cars',
        desc: 'Curated inventory of verified used hatchbacks, sedans, and SUVs with clean history and genuine mileage.'
      },
      {
        title: 'Multi-Point Vehicle Inspection',
        desc: 'Comprehensive evaluation of engine performance, chassis integrity, suspension, gearbox, and electrical systems.'
      },
      {
        title: 'Accidental & flood Damage Check',
        desc: 'Careful inspection of structural pillars, apron panels, paint thickness, and flood damage indicators.'
      },
      {
        title: 'Direct Buyer-Seller Facilitation',
        desc: 'Transparent negotiation directly between genuine buyers and sellers with no artificial price inflation.'
      },
      {
        title: 'Perambalur RTO RC Transfer Support',
        desc: 'Preparation and filing of Form 29, Form 30, and ownership transfer documents at the Perambalur Regional Transport Office.'
      },
      {
        title: 'Insurance & Hypothecation Clearance',
        desc: 'Assistance in verifying vehicle insurance validity, NCB transfer, and bank loan NOC / hypothecation cancellation.'
      }
    ],
    process: [
      { step: '1', title: 'Vehicle & Budget Requirements', desc: 'Tell us your budget, preferred fuel type (petrol, diesel, CNG), body style, and transmission.' },
      { step: '2', title: 'Vehicle Shortlist & Test Drive', desc: 'Test drive thoroughly inspected cars with verified service history and clear documentation.' },
      { step: '3', title: 'Technical Scrutiny & Price Agreement', desc: 'Review mechanical inspection report, check RTO status online, and agree on a fair market price.' },
      { step: '4', title: 'RC Transfer & Delivery', desc: 'Execute legal transfer forms and submit ownership transfer paperwork at the local RTO.' }
    ],
    faqs: [
      {
        q: 'Do you inspect cars before helping a buyer purchase?',
        a: 'Yes, we perform a physical multi-point check covering engine health, chassis integrity, accident history, odometer authenticity, and electricals.'
      },
      {
        q: 'Can you help with RC transfer at the Perambalur RTO?',
        a: 'Yes, we prepare all necessary RTO transfer forms, coordinate with the seller for signatures, and assist with document submission at the RTO.'
      },
      {
        q: 'Can I sell my used car through JN Consultancy?',
        a: 'Yes, verified car owners in Perambalur can list their vehicles with us for direct matching with genuine local buyers.'
      }
    ]
  },
  {
    id: 'banking',
    title: 'Banking',
    h1Title: 'Banking Loan Facilitation (DSA) & Financial Guidance in Perambalur',
    image: bankingImg,
    icon: Landmark,
    iconBg: '#E0E7FF',
    iconColor: '#4F46E5',
    tagline: 'DSA Facilitation, Loans & Financial Guidance',
    shortDesc: 'Personal & business loans, credit cards, DSA facilitation and complete financial support.',
    metaTitle: 'Banking DSA Loans, Credit Cards & Financial Assistance | JN Consultancy Perambalur',
    metaDescription: 'Direct Selling Agent (DSA) loan facilitation in Perambalur: Personal loans, business loans, home loans, mortgage loans, and credit cards with competitive bank interest rates.',
    leadText: 'Securing the right credit facility at competitive interest rates can be tedious. As an authorized Direct Selling Agent (DSA) facilitator in Perambalur, JN Consultancy simplifies the loan application process for salaried employees, business proprietors, and farmers across leading banks and NBFCs.',
    offerings: [
      {
        title: 'Personal Loans for Salaried & Self-Employed',
        desc: 'Unsecured personal credit facilities for medical emergencies, weddings, home improvements, and education.'
      },
      {
        title: 'Business & MSME Working Capital Loans',
        desc: 'Collateral-free and secured business loans to expand working capital, purchase machinery, or manage cash flow.'
      },
      {
        title: 'Home Loans & Plot Purchase Loans',
        desc: 'Housing finance assistance for new home purchase, construction, plot purchase, and home improvement with top lenders.'
      },
      {
        title: 'Loan Against Property (Mortgage LAP)',
        desc: 'Long-term financing against residential or commercial properties at attractive interest rates.'
      },
      {
        title: 'Credit Card Application Facilitation',
        desc: 'Guidance in selecting lifestyle, reward, and cashback credit cards suited to your monthly spending patterns.'
      },
      {
        title: 'Credit Profile & Document Assistance',
        desc: 'CIBIL report analysis, document compilation (ITR, GST, banking), and direct liaising with bank loan processing officers.'
      }
    ],
    process: [
      { step: '1', title: 'Credit & Eligibility Assessment', desc: 'Assess your income, repayment capacity, existing obligations, and CIBIL score.' },
      { step: '2', title: 'Compare Bank Offers', desc: 'Evaluate interest rates, processing fees, and loan tenures across partner banks and NBFCs.' },
      { step: '3', title: 'Document Compilation', desc: 'Collate KYC documents, income proofs (salary slips, ITRs, GST returns), and bank statements.' },
      { step: '4', title: 'Sanction & Disbursement Tracking', desc: 'Track application progress with credit officers through to final sanction and account disbursement.' }
    ],
    faqs: [
      {
        q: 'Which banks and institutions do you facilitate loans with?',
        a: 'We work as a DSA facilitator with leading nationalized banks, top private sector banks, and RBI-registered NBFCs.'
      },
      {
        q: 'What minimum CIBIL score is required for personal or business loans?',
        a: 'A CIBIL credit score of 700 or above is generally preferred by most banks for faster sanction and competitive interest rates.'
      },
      {
        q: 'What documents are required for business loan applicants in Perambalur?',
        a: 'Business applicants typically need GST returns, 2 years of ITR with computation, 12 months’ bank statements, business registration proof, and KYC.'
      }
    ]
  },
  {
    id: 'it-solutions',
    title: 'IT Software & Solutions',
    h1Title: 'Custom Website Design, Mobile App Development & Enterprise IT Solutions in Perambalur',
    image: itsolutionsImg,
    icon: Laptop,
    iconBg: '#EDE9FE',
    iconColor: '#7C3AED',
    tagline: 'Custom Web, Mobile Apps & Enterprise Systems',
    shortDesc: 'Modern web platforms, native mobile apps, cloud security, dashboards and custom software.',
    metaTitle: 'Custom Web Design, Mobile App Development & IT Solutions | JN Consultancy Perambalur',
    metaDescription: 'Full-stack web development, custom software, native Android/iOS mobile apps, cloud hosting, and enterprise IT solutions for businesses in Perambalur and Tamil Nadu.',
    leadText: 'In a digital-first economy, robust software and an engaging online presence are essential. JN Consultancy Services delivers modern full-stack web platforms, mobile applications (like the MWAY travel ecosystem), custom business dashboards, and cloud solutions built for performance, security, and scalability.',
    offerings: [
      {
        title: 'Custom Website Design & Development',
        desc: 'Fast, responsive, mobile-first websites developed with React, modern CSS, and clean architecture tailored for brand growth.'
      },
      {
        title: 'Mobile App Development (Flutter & Native)',
        desc: 'Feature-rich Android and iOS applications with real-time GPS tracking, push notifications, and payment gateway integrations.'
      },
      {
        title: 'Enterprise Business Management Portals',
        desc: 'Custom ERP, CRM, and billing dashboards designed to streamline inventory, customer leads, staff, and financial records.'
      },
      {
        title: 'Technical SEO & Web Speed Optimization',
        desc: 'Advanced technical search engine optimization, Core Web Vitals optimization, and structured data implementation.'
      },
      {
        title: 'Cloud Infrastructure & Secure Deployment',
        desc: 'Setup and configuration on AWS, DigitalOcean, Cloudflare, and Railway with SSL, automated backups, and DDoS protection.'
      },
      {
        title: 'Ongoing Technical Maintenance & Support',
        desc: 'Continuous monitoring, framework updates, database maintenance, and prompt bug fixes for smooth daily operations.'
      }
    ],
    process: [
      { step: '1', title: 'Requirement & Architecture Scoping', desc: 'We detail your operational workflow, user personas, technical requirements, and project scope.' },
      { step: '2', title: 'Modern UI/UX Prototype', desc: 'Create responsive visual layouts and interactive workflows aligned with your brand identity.' },
      { step: '3', title: 'Agile Full-Stack Engineering', desc: 'Develop clean, modular code with secure RESTful APIs, modern frontend frameworks, and automated tests.' },
      { step: '4', title: 'Deployment, SEO & Handover', desc: 'Deploy to high-speed cloud infrastructure, verify technical SEO benchmarks, and provide training.' }
    ],
    faqs: [
      {
        q: 'Do you develop custom mobile applications like MWAY?',
        a: 'Yes, our development team creates native and cross-platform Flutter applications equipped with live location tracking, secure authentication, and payment workflows.'
      },
      {
        q: 'Do you provide complete source code ownership to the client?',
        a: 'Yes, upon project completion and handover, you receive full intellectual property rights, repository access, and source code ownership.'
      },
      {
        q: 'How long does it typically take to develop a custom website or application?',
        a: 'A standard professional business website typically takes 1 to 2 weeks, while complex web portals or mobile applications take 4 to 8 weeks depending on requirements.'
      }
    ]
  }
];

export const ALL_VERIFIED_SERVICES = [...VERIFIED_SERVICES];
