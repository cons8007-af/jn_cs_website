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
  let reqPath = req.url.split('?')[0];
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
    { url: '/', expectStatus: 200, expectType: 'text/html', check: 'JN Consultancy Services' },
    { url: '/services', expectStatus: 200, expectType: 'text/html', check: 'Our Services' },
    { url: '/services/travels', expectStatus: 200, expectType: 'text/html', check: 'Outstation Cabs' },
    { url: '/services/admission', expectStatus: 200, expectType: 'text/html', check: 'College Guidance' },
    { url: '/services/land-property', expectStatus: 200, expectType: 'text/html', check: 'Verified Plots' },
    { url: '/services/jobs', expectStatus: 200, expectType: 'text/html', check: 'Overseas Jobs' },
    { url: '/services/cars', expectStatus: 200, expectType: 'text/html', check: 'Certified Pre-Owned Cars' },
    { url: '/services/banking', expectStatus: 200, expectType: 'text/html', check: 'Banking DSA Loans' },
    { url: '/services/it-solutions', expectStatus: 200, expectType: 'text/html', check: 'Custom Web Design' },
    { url: '/careers', expectStatus: 200, expectType: 'text/html', check: 'Careers at JN Consultancy' },
    { url: '/contact', expectStatus: 200, expectType: 'text/html', check: 'Contact JN Consultancy' },
    { url: '/mway-app', expectStatus: 200, expectType: 'text/html', check: 'MWAY Mobile App' },
    { url: '/privacy-policy', expectStatus: 200, expectType: 'text/html', check: 'Privacy Policy' },
    { url: '/terms-and-conditions', expectStatus: 200, expectType: 'text/html', check: 'Terms and Conditions' },
    { url: '/refund-cancellation-policy', expectStatus: 200, expectType: 'text/html', check: 'Refund & Cancellation Policy' },
    { url: '/sitemap.xml', expectStatus: 200, expectType: 'application/xml', check: 'https://www.mwayjnconsultancy.in/services/travels' },
    { url: '/robots.txt', expectStatus: 200, expectType: 'text/plain', check: 'Sitemap:' },
    { url: '/nonexistent.xml', expectStatus: 404, expectType: 'text/plain', check: '404 Not Found' }
  ];

  let passed = 0;
  for (const t of tests) {
    await new Promise(resolve => {
      http.get('http://127.0.0.1:3456' + t.url, res => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const statusOk = res.statusCode === t.expectStatus;
          const typeOk = (res.headers['content-type'] || '').includes(t.expectType);
          const bodyOk = body.includes(t.check);
          if (statusOk && typeOk && bodyOk) {
            console.log('PASS: ' + t.url + ' [' + res.statusCode + ', ' + res.headers['content-type'] + ']');
            passed++;
          } else {
            console.error('FAIL: ' + t.url + ' [Status: ' + res.statusCode + ', Type: ' + res.headers['content-type'] + ', bodyMatch: ' + bodyOk + ']');
          }
          resolve();
        });
      });
    });
  }

  console.log('\nFINAL RESULT: ' + passed + ' / ' + tests.length + ' tests passed successfully.');
  server.close();
  process.exit(passed === tests.length ? 0 : 1);
});
