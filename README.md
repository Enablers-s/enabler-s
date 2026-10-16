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
Ginelo (centre name) and Luxento (navigation name) are licensed fonts and are not included.
Add `Ginelo.woff2|otf|ttf` and `Luxento.woff2|otf|ttf` to `fonts/` to enable them; until then the name falls back to Cormorant Garamond.

## Running locally
No build step. Open `index.html` in a browser, or serve the folder (e.g. `python3 -m http.server`).
