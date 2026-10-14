import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// SPA FALLBACK.
//
// Every route other than "/" exists only inside the bundle -- react-router
// decides it in the browser. A static host asked for /privacy-policy has no
// such file on disk, so a direct visit or a refresh returns the host's own
// 404 and the site never loads at all. That affects /privacy-policy,
// /terms-and-conditions, /refund-cancellation-policy, /contact-us,
// /account-deletion, /mway-app and every /services/:id page.
//
// THERE IS NO DEPLOYMENT PLATFORM CONFIGURED IN THIS PROJECT. There is no
// vercel.json, netlify.toml, firebase.json, Dockerfile, nginx config or CI
// workflow anywhere in it, and package.json has only vite's own dev/build/
// preview scripts. So the fallback is provided in the two forms that hosts
// read generically, instead of guessing at one platform's config file:
//
//   dist/404.html    A copy of the built index.html, emitted below. GitHub
//                    Pages, Cloudflare Pages, Firebase Hosting, Vercel and
//                    S3/CloudFront all serve it for an unknown path, so the
//                    app boots and react-router renders the route that was
//                    asked for. Caveat: GitHub Pages and S3 serve it with
//                    HTTP 404 rather than 200 -- invisible to a visitor, but
//                    crawlers see the status, so the host's real rewrite
//                    rule should still be added once the host is chosen.
//
//   dist/_redirects  `/*  /index.html  200` (see public/_redirects), read by
//                    Netlify and Cloudflare Pages, which gives a correct
//                    200. On every other host it is an unreferenced text
//                    file and does nothing.
//
// Neither contradicts the other, and neither commits the project to a
// platform. Nothing else about the build is configured here: Vite's defaults
// are what produced the existing dist/, and this file only adds the copy.
//
// WHY writeBundle AND NOT generateBundle. The first version of this plugin
// looked for `bundle['index.html']` in generateBundle and emitted a copy of
// its source. Under Vite 8 the HTML is not in the bundle at that point, so
// it warned and emitted nothing -- the build reported success with no
// fallback in dist/. writeBundle runs after the output has actually been
// written to disk, so the file is simply copied from where it really is.
function spaFallback() {
  let outDir;
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      const page = resolve(outDir, 'index.html');
      if (!existsSync(page)) {
        // Loud rather than silent: a missing fallback is the kind of thing
        // only discovered by a visitor hitting a dead link.
        this.warn('no index.html in ' + outDir + ' - 404.html fallback not emitted');
        return;
      }
      copyFileSync(page, resolve(outDir, '404.html'));
    }
  };
}

export default defineConfig({
  plugins: [spaFallback()]
});
