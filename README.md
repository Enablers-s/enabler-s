# Enabler-S website

Static website for **Enabler-S FZE LLC**, "Enabling Nations and Enterprises to Grow".

## Pages and sister sites
`index.html` is the Enabler-S home: the logo at the centre of a rotating orbit of the eight brand discs, over a gold-graded boardroom video.

Each brand is its **own website in its own repo**, linked from its disc:

| Disc | Site | Repo |
|---|---|---|
| Bizablers | `../bizablers/` | Enablers-s/bizablers |
| Finablers | `../finablers/` | Enablers-s/finablers |
| Trustablers | `../trustablers/` | Enablers-s/trustablers |
| Brandora | `../brandora/` | Enablers-s/brandora |
| Movera | https://moveraglobal.com/ | (external) |

Locally, clone the repos side by side in one folder (this one as `webpage1/`). When a brand gets its own domain, change its line in `BRAND_SITES` at the top of `js/data.js`.

## Editing
- Pillar names, services, logos and brand site addresses: `js/data.js`
- Styles: `css/styles.css`; behaviour: `js/main.js`
- Brand logos (transparent): `assets/`; hero video: `assets/video/`

## Fonts
Body and display fonts are self-hosted in `fonts/`. Ginelo (centre name) and Luxento (navigation name) are licensed fonts and are not included; the name falls back to Cormorant Garamond. To bundle one, add e.g. `fonts/Ginelo.woff2` and add its `url(...)` to the `src` of the matching `@font-face` in `css/styles.css` (instructions are in the comment there).

## Deploying on Vercel
Import this repo in Vercel as a new project named **`enabler-s`**: Framework preset **Other**, no build command, no output directory (the repo root is the site). Nothing else to configure; there are no environment variables.

The five sites link to each other at these addresses (set in js/data.js (BRAND_SITES_LIVE)). Opened from disk or localhost, the links use the side-by-side local folders instead.

| Site | GitHub repo | Vercel project name | Live address |
|---|---|---|---|
| Enabler-S | Enablers-s/enabler-s | `enabler-s` | https://enabler-s.vercel.app |
| Bizablers | Enablers-s/bizablers | `bizablers` | https://bizablers.vercel.app |
| Finablers | Enablers-s/finablers | `finablers` | https://finablers.vercel.app |
| Trustablers | Enablers-s/trustablers | `trustablers` | https://trustablers.vercel.app |
| Brandora | Enablers-s/brandora | `brandora-s` (brandora.vercel.app is taken) | https://brandora-s.vercel.app |

If a project ends up with a different address (for example a custom domain), update the addresses in js/data.js (BRAND_SITES_LIVE), the `canonical`/`og:` tags in index.html, robots.txt and sitemap.xml.

Already set up for production:
- `vercel.json`: security headers (Content-Security-Policy allowing only this site's own scripts, fonts and media; clickjacking protection; nosniff; referrer and permissions policies) and long caching for fonts and media
- `.vercelignore`: keeps source files and notes out of the published site
- `404.html`: branded "page not found" page
- `robots.txt`, `sitemap.xml`, and share-preview tags (`og:` / Twitter) with `assets/og.jpg`

## Running locally
No build step. Open `index.html` in a browser, or serve the folder (e.g. `python3 -m http.server`).

## Image credits
Service photos in `assets/photos/` are from Pexels, free for commercial use under the [Pexels License](https://www.pexels.com/license/) (no attribution required; listed here as a courtesy):

| File | Pexels photo |
|---|---|
| licensing.webp | https://www.pexels.com/photo/6358840/ |
| banking.webp | https://www.pexels.com/photo/7447655/ |
| contracts.webp | https://www.pexels.com/photo/8730987/ |
| visas.webp | https://www.pexels.com/photo/4922356/ |
| workspace.webp | https://www.pexels.com/photo/3801167/ |
| technology.webp | https://www.pexels.com/photo/17489156/ |

Country flags in `assets/flags/` are from [flag-icons](https://github.com/lipis/flag-icons) v7.2.3 (MIT License).

Case study photos (also Pexels): tax.webp https://www.pexels.com/photo/6863183/ · retail.webp https://www.pexels.com/photo/32367382/ · procurement.webp https://www.pexels.com/photo/5156696/ · gulf-skyline.webp https://www.pexels.com/photo/19894545/ (the case studies also reuse licensing, contracts, visas and technology).

Global page background video (`assets/video/globe-*.mp4`): Pexels video https://www.pexels.com/video/20481078/ (Pexels License), trimmed to 20 s and re-encoded for the web.
Valora and Brandablers service photos (Pexels): trade.webp https://www.pexels.com/photo/36652842/ · events.webp https://www.pexels.com/photo/31129059/
