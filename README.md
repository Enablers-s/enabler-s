# Enabler-S website

Static website for **Enabler-S FZE LLC**, "Enabling Nations and Enterprises to Grow".

## Pages
- `index.html`: Enabler-S home. The logo sits at the centre of a slowly rotating orbit of the eight service pillars, over a gold-graded boardroom video. Choosing a pillar shows its services below.
- `finablers/`: Finablers, the corporate finance arm (opens from the Finablers disc).
- `trustablers/`: Trustablers, the corporate legal arm (opens from the Trustablers disc).

## Editing
- Pillar names, services, logos and links: `js/data.js`
- Styles: `css/styles.css`; behaviour: `js/main.js`
- Brand logos (transparent): `assets/`; hero video: `assets/video/`

## Fonts
Ginelo (centre name) and Luxento (navigation name) are licensed fonts and are not included.
Add `Ginelo.woff2|otf|ttf` and `Luxento.woff2|otf|ttf` to `fonts/` to enable them; until then the name falls back to Cormorant Garamond.

## Running locally
No build step. Open `index.html` in a browser, or serve the folder (e.g. `python3 -m http.server`).
