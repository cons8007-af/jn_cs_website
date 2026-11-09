const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const host = (req.headers.host || '').toLowerCase().split(':')[0];
  const proto = req.headers['x-forwarded-proto'];

  // Domain & Protocol Normalization:
  if (proto === 'http') {
    res.writeHead(301, {
      'Location': `https://${host}${req.url}`,
      'Connection': 'close'
    });
    res.end();
    return;
  }

  if (host === 'mwayjnconsultancy.in') {
    res.writeHead(301, {
      'Location': `https://www.mwayjnconsultancy.in${req.url}`,
      'Connection': 'close'
    });
    res.end();
    return;
  }

  if (host === 'mway.in' || host === 'www.mway.in') {
    res.writeHead(301, {
      'Location': `https://www.mwayjnconsultancy.in${req.url}`,
      'Connection': 'close'
    });
    res.end();
    return;
  }

  let reqPath = req.url.split('?')[0];

  const ROUTE_ALIASES = {
    '/app': '/download',
    '/download-app': '/download',
    '/contact-us': '/contact',
    '/services/real-estate': '/services/land-property',
    '/services/foreign-jobs': '/services/jobs',
    '/services/automobile': '/services/cars',
    '/privacy': '/privacy-policy',
    '/terms': '/terms-and-conditions',
    '/terms-of-service': '/terms-and-conditions',
    '/terms-conditions': '/terms-and-conditions',
    '/refund': '/refund-cancellation-policy',
    '/refund-policy': '/refund-cancellation-policy',
    '/cancellation-policy': '/refund-cancellation-policy',
    '/driver-terms-and-conditions': '/driver-terms',
    '/driver-privacy-policy': '/driver-privacy'
  };

  if (ROUTE_ALIASES[reqPath]) {
    res.writeHead(301, {
      'Location': ROUTE_ALIASES[reqPath],
      'Connection': 'close'
    });
    res.end();
    return;
  }

  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const dirIndex = path.join(filePath, 'index.html');
    if (fs.existsSync(dirIndex)) filePath = dirIndex;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const subIndex = path.join(DIST_DIR, reqPath, 'index.html');
      if (fs.existsSync(subIndex) && fs.statSync(subIndex).isFile()) {
        filePath = subIndex;
      } else {
        const reqExt = path.extname(reqPath).toLowerCase();
        if (reqExt && reqExt !== '.html') {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found');
          return;
        }
        filePath = path.join(DIST_DIR, 'index.html');
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isAsset = filePath.includes(path.join(DIST_DIR, 'assets'));
    const isSitemapOrRobots = reqPath === '/sitemap.xml' || reqPath === '/robots.txt';

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': isAsset
        ? 'public, max-age=31536000, immutable'
        : isSitemapOrRobots
        ? 'public, max-age=86400, must-revalidate'
        : 'no-cache'
    };

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

server.listen(3456, '127.0.0.1', async () => {
  const tests = [
    { url: '/', expectStatus: 200, expectType: 'text/html', check: 'MWAY' },
    { url: '/services', expectStatus: 200, expectType: 'text/html', check: 'Our Services' },
    { url: '/services/travels', expectStatus: 200, expectType: 'text/html', check: 'Outstation Cabs' },
    { url: '/services/admission', expectStatus: 200, expectType: 'text/html', check: 'College Guidance' },
    { url: '/services/land-property', expectStatus: 200, expectType: 'text/html', check: 'Verified Plots' },
    { url: '/services/jobs', expectStatus: 200, expectType: 'text/html', check: 'Overseas Jobs' },
    { url: '/services/cars', expectStatus: 200, expectType: 'text/html', check: 'Certified Pre-Owned Cars' },
    { url: '/services/banking', expectStatus: 200, expectType: 'text/html', check: 'Banking DSA Loans' },
    { url: '/services/it-solutions', expectStatus: 200, expectType: 'text/html', check: 'Custom Web Design' },
    { url: '/careers', expectStatus: 200, expectType: 'text/html', check: 'Careers at MWAY' },
    { url: '/contact', expectStatus: 200, expectType: 'text/html', check: 'Contact MWAY' },
    { url: '/mway-app', expectStatus: 200, expectType: 'text/html', check: 'MWAY Mobile App' },
    { url: '/download', expectStatus: 200, expectType: 'text/html', check: 'Download MWAY App' },
    { url: '/privacy-policy', expectStatus: 200, expectType: 'text/html', check: 'Privacy Policy' },
    { url: '/terms-and-conditions', expectStatus: 200, expectType: 'text/html', check: 'Terms and Conditions' },
    { url: '/refund-cancellation-policy', expectStatus: 200, expectType: 'text/html', check: 'Refund & Cancellation Policy' },
    { url: '/sitemap.xml', expectStatus: 200, expectType: 'application/xml', check: 'https://mway.in/services/travels' },
    { url: '/robots.txt', expectStatus: 200, expectType: 'text/plain', check: 'Sitemap: https://mway.in/sitemap.xml' },
    { url: '/nonexistent.xml', expectStatus: 404, expectType: 'text/plain', check: '404 Not Found' },
    // Railway Domain & Route Redirect tests
    {
      url: '/',
      headers: { host: 'mwayjnconsultancy.in' },
      expectStatus: 301,
      expectLocation: 'https://www.mwayjnconsultancy.in/'
    },
    {
      url: '/download',
      headers: { host: 'mwayjnconsultancy.in' },
      expectStatus: 301,
      expectLocation: 'https://www.mwayjnconsultancy.in/download'
    },
    {
      url: '/download',
      headers: { host: 'www.mwayjnconsultancy.in' },
      expectStatus: 200,
      expectType: 'text/html',
      check: 'Download MWAY App'
    },
    {
      url: '/download/',
      headers: { host: 'www.mwayjnconsultancy.in' },
      expectStatus: 200,
      expectType: 'text/html',
      check: 'Download MWAY App'
    },
    {
      url: '/app',
      headers: { host: 'www.mwayjnconsultancy.in' },
      expectStatus: 301,
      expectLocation: '/download'
    },
    {
      url: '/careers',
      headers: { host: 'www.mway.in' },
      expectStatus: 301,
      expectLocation: 'https://www.mwayjnconsultancy.in/careers'
    },
    {
      url: '/contact',
      headers: { host: 'www.mwayjnconsultancy.in', 'x-forwarded-proto': 'http' },
      expectStatus: 301,
      expectLocation: 'https://www.mwayjnconsultancy.in/contact'
    }
  ];

  let passed = 0;
  for (const t of tests) {
    await new Promise(resolve => {
      const options = {
        hostname: '127.0.0.1',
        port: 3456,
        path: t.url,
        method: 'GET',
        headers: t.headers || {}
      };

      const req = http.request(options, res => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const statusOk = res.statusCode === t.expectStatus;
          const typeOk = !t.expectType || (res.headers['content-type'] || '').includes(t.expectType);
          const bodyOk = !t.check || body.includes(t.check);
          const locOk = !t.expectLocation || res.headers['location'] === t.expectLocation;

          if (statusOk && typeOk && bodyOk && locOk) {
            console.log(`PASS: ${t.url} [Status: ${res.statusCode}${t.expectLocation ? ', Location: ' + res.headers['location'] : ''}]`);
            passed++;
          } else {
            console.error(`FAIL: ${t.url} [Status: ${res.statusCode} (expected ${t.expectStatus}), Location: ${res.headers['location']} (expected ${t.expectLocation}), Type: ${res.headers['content-type']}, bodyMatch: ${bodyOk}]`);
          }
          resolve();
        });
      });

      req.on('error', err => {
        console.error('Request error: ' + err.message);
        resolve();
      });

      req.end();
    });
  }

  console.log(`\nFINAL RESULT: ${passed} / ${tests.length} tests passed successfully.`);
  server.close();
  process.exit(passed === tests.length ? 0 : 1);
});
