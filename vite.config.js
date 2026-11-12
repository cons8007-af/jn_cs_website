import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';

const CANONICAL_ROUTES = [
  {
    path: '/services',
    title: 'Our Services | Complete Life & Business Solutions - MWAY',
    description: 'Explore all verified services by MWAY in Perambalur: Travels, Admission guidance, Land & Property, Overseas Jobs, Pre-Owned Cars, Banking loans, and IT solutions.',
    canonical: 'https://mway.in/services',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mway.in/services' }
          ]
        }
      ]
    }
  },
  {
    path: '/services/travels',
    title: 'Outstation Cabs, Airport Transfers & Travel Packages | MWAY Travels',
    description: 'Book reliable outstation cabs, round-trips, airport transfers to Trichy & Chennai, savari-based rides, and holiday tour packages in Perambalur with MWAY Travels & MWAY App.',
    canonical: 'https://mway.in/services/travels',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mway.in/services' },
            { '@type': 'ListItem', position: 3, name: 'Travels', item: 'https://mway.in/services/travels' }
          ]
        },
        {
          '@type': 'Service',
          name: 'Travels & Outstation Cab Services',
          serviceType: 'Outstation Rides, Packages & Coach Bookings',
          description: 'Pickup & drop, savari-based travel, tourist packages, airport transfers and bus booking in Perambalur.',
          provider: {
            '@type': 'ProfessionalService',
            name: 'MWAY',
            url: 'https://mway.in/',
            telephone: '+91-9677796891'
          },
          areaServed: ['Perambalur', 'Tamil Nadu']
        }
      ]
    }
  },
  {
    path: '/services/admission',
    title: 'College Guidance & University Admission Counselling | MWAY Education',
    description: 'Expert admission guidance in Perambalur for Engineering (TNEA), Arts & Science, Medical (NEET), MBA/MCA, and Abroad Universities with MWAY Education counselling.',
    canonical: 'https://mway.in/services/admission',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mway.in/services' },
            { '@type': 'ListItem', position: 3, name: 'Admission', item: 'https://mway.in/services/admission' }
          ]
        },
        {
          '@type': 'Service',
          name: 'College Guidance & University Admission Counselling',
          serviceType: 'College Guidance & University Admissions',
          description: 'Tamil Nadu engineering, arts & science, medical, and abroad university admission guidance in Perambalur.',
          provider: {
            '@type': 'ProfessionalService',
            name: 'MWAY',
            url: 'https://mway.in/',
            telephone: '+91-9677796891'
          },
          areaServed: ['Perambalur', 'Tamil Nadu']
        }
      ]
    }
  },
  {
    path: '/services/land-property',
    title: 'Verified Plots, Real Estate & Commercial Property | MWAY Properties',
    description: 'Find DTCP & RERA approved residential plots, agricultural land, commercial property, and rental spaces in Perambalur with MWAY Properties. Verified documents and honest pricing.',
    canonical: 'https://mway.in/services/land-property',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mway.in/services' },
            { '@type': 'ListItem', position: 3, name: 'Land & Property', item: 'https://mway.in/services/land-property' }
          ]
        },
        {
          '@type': 'Service',
          name: 'Land & Property Real Estate Services',
          serviceType: 'Verified Plots, Villas & Commercial Properties',
          description: 'Land, commercial property, residential plots, rentals, buying and selling assistance in Perambalur.',
          provider: {
            '@type': 'ProfessionalService',
            name: 'MWAY',
            url: 'https://mway.in/',
            telephone: '+91-9677796891'
          },
          areaServed: ['Perambalur', 'Tamil Nadu']
        }
      ]
    }
  },
  {
    path: '/services/jobs',
    title: 'Overseas Jobs & Career Guidance Services | MWAY Jobs',
    description: 'Genuine overseas job guidance, CV documentation, and career opportunities for Gulf countries, Southeast Asia, and Europe with MWAY Jobs. Transparent verification support.',
    canonical: 'https://mway.in/services/jobs',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mway.in/services' },
            { '@type': 'ListItem', position: 3, name: 'Jobs', item: 'https://mway.in/services/jobs' }
          ]
        },
        {
          '@type': 'Service',
          name: 'Overseas Job Guidance & Placement Support',
          serviceType: 'Overseas Employment & Career Opportunities',
          description: 'Guidance, documentation and verification support for overseas job opportunities in Perambalur.',
          provider: {
            '@type': 'ProfessionalService',
            name: 'MWAY',
            url: 'https://mway.in/',
            telephone: '+91-9677796891'
          },
          areaServed: ['Perambalur', 'Tamil Nadu']
        }
      ]
    }
  },
  {
    path: '/services/cars',
    title: 'Certified Pre-Owned Cars & Vehicle Buying Guidance | MWAY Cars',
    description: 'Buy and sell inspected pre-owned cars in Perambalur with MWAY Cars. Multi-point vehicle evaluation, fair market pricing, RC transfer, and complete ownership transfer documentation.',
    canonical: 'https://mway.in/services/cars',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mway.in/services' },
            { '@type': 'ListItem', position: 3, name: 'Cars', item: 'https://mway.in/services/cars' }
          ]
        },
        {
          '@type': 'Service',
          name: 'Certified Pre-Owned Cars & Vehicle Services',
          serviceType: 'Certified Pre-Owned & Vehicle Coordination',
          description: 'Used car search, buyer guidance, vehicle inspection and seller coordination in Perambalur.',
          provider: {
            '@type': 'ProfessionalService',
            name: 'MWAY',
            url: 'https://mway.in/',
            telephone: '+91-9677796891'
          },
          areaServed: ['Perambalur', 'Tamil Nadu']
        }
      ]
    }
  },
  {
    path: '/services/banking',
    title: 'Banking DSA Loans, Credit Cards & Financial Assistance | MWAY Banking',
    description: 'Direct Selling Agent (DSA) loan facilitation in Perambalur: Personal loans, business loans, home loans, mortgage loans, and credit cards with competitive bank interest rates via MWAY Banking.',
    canonical: 'https://mway.in/services/banking',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mway.in/services' },
            { '@type': 'ListItem', position: 3, name: 'Banking', item: 'https://mway.in/services/banking' }
          ]
        },
        {
          '@type': 'Service',
          name: 'Banking DSA Loan Facilitation & Financial Guidance',
          serviceType: 'DSA Facilitation, Loans & Financial Guidance',
          description: 'Personal & business loans, credit cards, DSA facilitation and complete financial support in Perambalur.',
          provider: {
            '@type': 'ProfessionalService',
            name: 'MWAY',
            url: 'https://mway.in/',
            telephone: '+91-9677796891'
          },
          areaServed: ['Perambalur', 'Tamil Nadu']
        }
      ]
    }
  },
  {
    path: '/services/it-solutions',
    title: 'Custom Web Design, Mobile App Development & IT Solutions | MWAY IT Solutions',
    description: 'Full-stack web development, custom software, native Android/iOS mobile apps, cloud hosting, and enterprise IT solutions with MWAY IT Solutions.',
    canonical: 'https://mway.in/services/it-solutions',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mway.in/services' },
            { '@type': 'ListItem', position: 3, name: 'IT Software & Solutions', item: 'https://mway.in/services/it-solutions' }
          ]
        },
        {
          '@type': 'Service',
          name: 'IT Software & Mobile App Development Solutions',
          serviceType: 'Custom Web, Mobile Apps & Enterprise Systems',
          description: 'Modern web platforms, native mobile apps, cloud security, dashboards and custom software in Perambalur.',
          provider: {
            '@type': 'ProfessionalService',
            name: 'MWAY',
            url: 'https://mway.in/',
            telephone: '+91-9677796891'
          },
          areaServed: ['Perambalur', 'Tamil Nadu']
        }
      ]
    }
  },
  {
    path: '/careers',
    title: 'Careers at MWAY | Job Openings in Perambalur',
    description: 'Join MWAY in Perambalur. Current job openings for Telecalling Executives, Social Media Influencers, and Software Developer Interns. Apply online today.',
    canonical: 'https://mway.in/careers',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
        { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://mway.in/careers' }
      ]
    }
  },
  {
    path: '/contact',
    title: 'Contact MWAY | Office Location & Phone in Perambalur',
    description: 'Get in touch with MWAY. Office: Shop No-9, C-Block, 5Star Complex, Opposite New Bus Stand, Perambalur. Call +91 96777 96891 or email jnconsultancy26@gmail.com.',
    canonical: 'https://mway.in/contact',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://mway.in/contact' }
      ]
    }
  },
  {
    path: '/mway-app',
    title: 'MWAY Mobile App | Travel Booking & Multiservice App',
    description: 'Discover the MWAY mobile app. Book outstation cabs, savari rides, track trips live, and access all consultation services on your phone.',
    canonical: 'https://mway.in/mway-app',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mway.in/' },
        { '@type': 'ListItem', position: 2, name: 'MWAY Mobile App', item: 'https://mway.in/mway-app' }
      ]
    }
  },
  {
    path: '/download',
    title: 'Download MWAY App | Official Mobile App - JN Consultancy Services',
    description: 'Download the official MWAY mobile app by JN Consultancy Services. Book outstation cabs, savari rides, track trips live, and access education, property & banking services in Perambalur.',
    canonical: 'https://www.mwayjnconsultancy.in/download',
    schema: {
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
          name: 'MWAY',
          operatingSystem: 'ANDROID',
          applicationCategory: 'TravelApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR'
          },
          publisher: {
            '@type': 'Organization',
            name: 'JN Consultancy Services',
            url: 'https://www.mwayjnconsultancy.in/'
          }
        }
      ]
    }
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | MWAY',
    description: 'Read how MWAY and the MWAY mobile app collect, use, and protect your personal information in compliance with privacy standards.',
    canonical: 'https://mway.in/privacy-policy'
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | MWAY',
    description: 'Official terms of use and service agreement for MWAY and the MWAY mobility platform in Perambalur.',
    canonical: 'https://mway.in/terms-and-conditions'
  },
  {
    path: '/refund-cancellation-policy',
    title: 'Refund & Cancellation Policy | MWAY',
    description: 'Understand trip cancellations, booking modifications, refund calculations, and payment reversal timelines with MWAY.',
    canonical: 'https://mway.in/refund-cancellation-policy'
  },
  {
    path: '/driver-terms',
    title: 'Driver Partner Terms & Conditions | MWAY-D Platform',
    description: 'Commercial partner terms, vehicle requirements, dispatch rules, and code of conduct for registered driver partners on the MWAY-D mobility network.',
    canonical: 'https://mway.in/driver-terms'
  },
  {
    path: '/driver-privacy',
    title: 'Driver Partner Privacy Policy | MWAY-D Platform',
    description: 'Learn how driver documents, vehicle records, and GPS location telemetry are collected and protected on the MWAY-D driver application.',
    canonical: 'https://mway.in/driver-privacy'
  },
  {
    path: '/account-deletion',
    title: 'Account & Data Deletion Request | MWAY Mobile App',
    description: 'Official procedure to submit an account deletion and data removal request for the MWAY mobile application.',
    canonical: 'https://www.mwayjnconsultancy.in/delete-account'
  },
  {
    path: '/delete-account',
    title: 'Delete Account & Data Removal Request | MWAY',
    description: 'Official procedure to submit an account deletion and personal data removal request for the MWAY mobile applications.',
    canonical: 'https://www.mwayjnconsultancy.in/delete-account',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mwayjnconsultancy.in/' },
            { '@type': 'ListItem', position: 2, name: 'Delete Account', item: 'https://www.mwayjnconsultancy.in/delete-account' }
          ]
        }
      ]
    }
  }
];

function staticSeoGenerator() {
  let outDir;
  return {
    name: 'static-seo-generator',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      const baseHtmlPath = resolve(outDir, 'index.html');
      if (!existsSync(baseHtmlPath)) {
        this.warn('no index.html in ' + outDir + ' - static SEO routes not emitted');
        return;
      }

      // Always maintain 404.html fallback
      copyFileSync(baseHtmlPath, resolve(outDir, '404.html'));

      // Ensure /track/index.html exists for static hosts / SPA fallback
      const trackDir = resolve(outDir, 'track');
      if (!existsSync(trackDir)) {
        mkdirSync(trackDir, { recursive: true });
      }
      copyFileSync(baseHtmlPath, resolve(trackDir, 'index.html'));

      const baseHtml = readFileSync(baseHtmlPath, 'utf8');

      // Generate static HTML for each canonical route with pre-populated metadata
      for (const route of CANONICAL_ROUTES) {
        let routeHtml = baseHtml;

        // Replace title
        if (route.title) {
          routeHtml = routeHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);
          routeHtml = routeHtml.replace(/<meta\s+property="og:title"[\s\S]*?\/>/i, `<meta property="og:title" content="${route.title}" />`);
          routeHtml = routeHtml.replace(/<meta\s+name="twitter:title"[\s\S]*?\/>/i, `<meta name="twitter:title" content="${route.title}" />`);
        }

        // Replace description
        if (route.description) {
          routeHtml = routeHtml.replace(/<meta\s+name="description"[\s\S]*?\/>/i, `<meta name="description" content="${route.description}" />`);
          routeHtml = routeHtml.replace(/<meta\s+property="og:description"[\s\S]*?\/>/i, `<meta property="og:description" content="${route.description}" />`);
          routeHtml = routeHtml.replace(/<meta\s+name="twitter:description"[\s\S]*?\/>/i, `<meta name="twitter:description" content="${route.description}" />`);
        }

        // Replace canonical & og:url
        if (route.canonical) {
          routeHtml = routeHtml.replace(/<link\s+rel="canonical"[\s\S]*?\/>/i, `<link rel="canonical" href="${route.canonical}" />`);
          routeHtml = routeHtml.replace(/<meta\s+property="og:url"[\s\S]*?\/>/i, `<meta property="og:url" content="${route.canonical}" />`);
          routeHtml = routeHtml.replace(/<meta\s+name="twitter:url"[\s\S]*?\/>/i, `<meta name="twitter:url" content="${route.canonical}" />`);
        }

        // Inject route-specific schema if present
        if (route.schema) {
          const schemaScript = `\n    <script type="application/ld+json">\n    ${JSON.stringify(route.schema, null, 2)}\n    </script>`;
          routeHtml = routeHtml.replace('</head>', `${schemaScript}\n</head>`);
        }

        // Write to route directory
        const routeClean = route.path.replace(/^\//, '');
        const targetDir = resolve(outDir, routeClean);
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }
        const targetFile = resolve(targetDir, 'index.html');
        writeFileSync(targetFile, routeHtml, 'utf8');
      }
    }
  };
}

export default defineConfig({
  plugins: [staticSeoGenerator()]
});
