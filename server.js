import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

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
  // 1. Force HTTPS in production (when forwarded over plain http)
  if (proto === 'http') {
    res.writeHead(301, {
      'Location': `https://${host}${req.url}`,
      'Connection': 'close'
    });
    res.end();
    return;
  }

  // 2. Apex domain redirect: mwayjnconsultancy.in -> https://www.mwayjnconsultancy.in
  if (host === 'mwayjnconsultancy.in') {
    res.writeHead(301, {
      'Location': `https://www.mwayjnconsultancy.in${req.url}`,
      'Connection': 'close'
    });
    res.end();
    return;
  }

  // 3. Fallback redirect for alternative domains: mway.in / www.mway.in -> https://www.mwayjnconsultancy.in
  if (host === 'mway.in' || host === 'www.mway.in') {
    res.writeHead(301, {
      'Location': `https://www.mwayjnconsultancy.in${req.url}`,
      'Connection': 'close'
    });
    res.end();
    return;
  }

  let reqPath = req.url.split('?')[0];

  // Canonical Route Aliases:
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

  // Guard against directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Resolve directory index or direct file
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const dirIndex = path.join(filePath, 'index.html');
    if (fs.existsSync(dirIndex)) {
      filePath = dirIndex;
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Check for route-specific prerendered index.html
      const subIndex = path.join(DIST_DIR, reqPath, 'index.html');
      if (fs.existsSync(subIndex) && fs.statSync(subIndex).isFile()) {
        filePath = subIndex;
      } else {
        // Return 404 for missing static files with explicit extensions (e.g. .xml, .txt, .png, .js)
        // Exempt /track paths so tokens like /track/19.abc... route to SPA index.html
        const isTrackRoute = reqPath.startsWith('/track');
        const reqExt = path.extname(reqPath).toLowerCase();
        if (!isTrackRoute && reqExt && reqExt !== '.html') {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found');
          return;
        }
        // SPA Fallback: serve index.html for client-side routing
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`MWAY Website listening on port ${PORT}`);
});
