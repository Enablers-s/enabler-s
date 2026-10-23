// Enabler-S landing page: the eight brand discs orbiting the logo.
// Plain script (no modules) so index.html also works when opened straight from disk.
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

  /* =====================================================================
     Pillar orbit
     Eight discs ride a circle (radius 40% of the orbit box) around the
     Enabler-S logo and turn slowly. Hovering or focusing the orbit pauses it;
     choosing a pillar glides that disc to the top and names it under the orbit.
     ===================================================================== */
  const ICONS = {
    licensing: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 10h7M9 13.5h5"/><circle cx="12.5" cy="18" r="1.6"/>',
    finance: '<path d="M4 20h16"/><path d="M6 17v-4M10.5 17V10M15 17V7"/><path d="M5 9.5l5-4 3.5 2.5L19.5 3M16 3h3.5v3.5"/>',
    technology: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10" y="10" width="4" height="4"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    legal: '<path d="M12 3v17M8 20h8M5 6h14"/><path d="M5 6l-3 7a3.2 3.2 0 0 0 6 0zM19 6l-3 7a3.2 3.2 0 0 0 6 0z"/>',
    realestate: '<path d="M3 21h18"/><path d="M5 21V8l6-3v16M11 21V3l8 4v14"/><path d="M14 10h2M14 13.5h2M14 17h2M7.5 11h1M7.5 15h1"/>',
    hr: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/>',
    branding: '<path d="M4 10v4h3l7 4V6L7 10z"/><path d="M7 14l1.5 5h2.5l-1.3-4.6"/><path d="M17.5 9.5a3.5 3.5 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10"/>',
    trade: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5L12 12l8-4.5M12 12v9"/><path d="M8 5.2l8 4.6"/>',
  };

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');
  const N = PILLARS.length;
  const STEP = (Math.PI * 2) / N;
  const TOP = -Math.PI / 2;
  const SPEED = (Math.PI * 2) / 60;   // one revolution a minute

  const orbit = $('orbit');
  const tabsEl = $('tabs');

  tabsEl.innerHTML = PILLARS.map((p, i) => `
    <button class="tab" id="tab-${p.id}" aria-pressed="false" tabindex="-1" type="button" aria-describedby="tip-${p.id}">
      <span class="disc${p.logo ? ' has-logo' : ''}${p.logoBg ? ' ' + p.logoBg : ''}"><span class="num">${pad(i + 1)}</span>${p.logo
        ? `<img class="mark" src="${p.logo}" alt="" width="256" height="256"${p.logoSize || p.logoNudge ? ` style="${p.logoSize ? `width:${p.logoSize}%;` : ''}${p.logoNudge ? `margin-top:${p.logoNudge}%;` : ''}"` : ''}${p.logoShadow ? ` data-shadow="${p.logoShadow}"` : ''}>`
        : `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[p.icon]}</svg>`}${(p.subs || []).map((s, k) =>
          `<span class="sub-disc sub-${k + 1}" title="${s.name}"><img src="${s.logo}" alt="${s.name}" width="256" height="256"></span>`).join('')}</span>
      <span class="label">${p.short}</span>
      <span class="about">${p.about}</span>
      <span class="tip" id="tip-${p.id}" role="tooltip">${p.line}</span>
    </button>`).join('');
  const tabs = [...tabsEl.querySelectorAll('.tab')];

  // Orbit state: `angle` is where disc 0 sits; disc i sits at angle + i·STEP
  let angle = TOP;
  let radius = 0;
  let glide = null;                    // { from, to, t0 } while easing a disc to the top
  let hovering = false;
  let focused = false;

  const measure = () => { radius = orbit.clientWidth * 0.4; };
  measure();
  new ResizeObserver(measure).observe(orbit);

  function place() {
    tabs.forEach((tab, i) => {
      const a = angle + i * STEP;
      tab.style.setProperty('--x', `${(Math.cos(a) * radius).toFixed(1)}px`);
      tab.style.setProperty('--y', `${(Math.sin(a) * radius).toFixed(1)}px`);
    });
  }

  function glideTo(i) {
    // Bring disc i to the top by the shortest way round
    let to = TOP - i * STEP;
    to += Math.round((angle - to) / (Math.PI * 2)) * Math.PI * 2;
    if (reduceMotion) { angle = to; place(); return; }
    glide = { from: angle, to, t0: performance.now() };
  }

  let last = performance.now();
  function spin(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (glide) {
      const k = seg(now - glide.t0, 0, 900);
      angle = glide.from + (glide.to - glide.from) * ease(k);
      if (k >= 1) glide = null;
    } else if (!hovering && !focused && !reduceMotion) {
      angle += SPEED * dt;
    }
    place();
    requestAnimationFrame(spin);
  }
  place();
  requestAnimationFrame(spin);

  orbit.addEventListener('pointerenter', () => { hovering = true; });
  orbit.addEventListener('pointerleave', () => { hovering = false; });
  tabsEl.addEventListener('focusin', () => { focused = true; });
  tabsEl.addEventListener('focusout', () => { focused = false; });

  let current = -1;
  function select(i, { focus = false, turn = true } = {}) {
    i = (i + N) % N;
    if (turn) glideTo(i);
    if (i === current) return;
    current = i;
    const p = PILLARS[i];
    tabs.forEach((t, j) => {
      t.setAttribute('aria-pressed', String(j === i));
      t.tabIndex = j === i ? 0 : -1;
    });
    if (focus) tabs[i].focus({ preventScroll: true });
    $('cue-title').textContent = p.title;
  }

  // Clicking a pillar with its own website (e.g. Finablers) opens that site; others are just selected
  tabs.forEach((t, i) => t.addEventListener('click', () => {
    if (PILLARS[i].site) window.location.href = PILLARS[i].site;
    else select(i);
  }));
  tabsEl.addEventListener('keydown', (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in keys) { e.preventDefault(); select(current + keys[e.key], { focus: true }); }
    else if (e.key === 'Home') { e.preventDefault(); select(0, { focus: true }); }
    else if (e.key === 'End') { e.preventDefault(); select(N - 1, { focus: true }); }
  });
  select(0, { turn: false });

  /* ---------- brand list (phones) ---------- */
  $('brand-list').innerHTML = PILLARS.map((p) => {
    const inner = `
      <span class="bl-logo"><img src="${p.logo}" alt="" width="256" height="256"${p.logoShadow ? ` data-shadow="${p.logoShadow}"` : ''}></span>
      <span class="bl-text"><b>${p.short}</b><small>${p.about}</small></span>
      <span class="bl-go" aria-hidden="true">${p.site ? '↗' : ''}</span>`;
    const row = p.site
      ? `<li><a href="${p.site}">${inner}</a></li>`
      : `<li><div>${inner}</div></li>`;
    // each sub-brand gets its own indented row (twice indented for level 2), linking to the parent brand's site
    const subs = (p.subs || []).map((s) => {
      const body = `
        <span class="bl-logo"><img src="${s.logo}" alt="" width="256" height="256"></span>
        <span class="bl-text"><b>${s.name}</b><small>${s.about}</small></span>
        <span class="bl-go" aria-hidden="true">${p.site ? '↗' : ''}</span>`;
      return `<li class="bl-sub${s.level === 2 ? ' bl-sub2' : ''}">${p.site ? `<a href="${p.site}">${body}</a>` : `<div>${body}</div>`}</li>`;
    }).join('');
    return row + subs;
  }).join('');

  /* ---------- hero video ---------- */
  // Reduced motion: hold on the handshake frame. Otherwise loop behind the page while the tab is visible.
  const video = $('hero-video');
  if (reduceMotion) {
    video.removeAttribute('autoplay');
    video.pause();
    video.addEventListener('loadeddata', () => { video.currentTime = 3.6; }, { once: true });
  } else {
    // The video sits behind the whole page; pause it only while the browser tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause();
      else video.play().catch(() => {});
    });
  }

  /* ---------- open at the top ----------
     The browser would otherwise restore the last scroll position on reload, or jump to #contact
     if the address still has it, which looks like the page scrolling by itself. */
  // Arriving from another page with #contact (the Global / Case Studies "Contact" link) still lands on the contact section.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const arrival = location.hash && document.getElementById(location.hash.slice(1));
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  const land = () => (arrival ? arrival.scrollIntoView() : window.scrollTo(0, 0));
  land();
  // Some browsers (Safari in particular) restore or nudge the scroll position after the page finishes
  // loading, or when it comes back from the back/forward cache. Land again, unless the visitor has
  // already started scrolling themselves.
  let visitorScrolled = false;
  ['wheel', 'touchmove', 'keydown', 'pointerdown'].forEach((t) =>
    window.addEventListener(t, () => { visitorScrolled = true; }, { once: true, passive: true }));
  window.addEventListener('load', () => { if (!visitorScrolled) land(); });
  window.addEventListener('pageshow', (e) => { if (e.persisted) window.scrollTo(0, 0); });
  // In-page links (Contact, Get in touch) scroll smoothly without adding #contact to the address;
  // the Enabler-S name (#hero) goes right back to the very top
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    const behavior = reduceMotion ? 'auto' : 'smooth';
    if (target.id === 'hero') window.scrollTo({ top: 0, behavior });
    else target.scrollIntoView({ behavior });
  });

  /* ---------- cookies & terms notice ---------- */
  // The choice is stored in this browser only; storage can be unavailable (private mode), so every access is guarded.
  const CONSENT_KEY = 'enabler-consent-v1';
  const consent = $('consent');
  const readConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
  const saveConsent = (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch { /* not stored: notice shows again next visit */ } };
  const showConsent = () => { consent.hidden = false; requestAnimationFrame(() => consent.classList.add('in')); };
  const closeConsent = (v) => { saveConsent(v); consent.classList.remove('in'); consent.hidden = true; };
  $('consent-accept').addEventListener('click', () => closeConsent('accepted'));
  $('consent-decline').addEventListener('click', () => closeConsent('declined'));
  $('cookie-settings').addEventListener('click', showConsent);
  if (!readConsent()) showConsent();

  /* ---------- footer year ---------- */
  // Contact details now live on contact.html (static), so the home page only fills in the year
  $('year').textContent = new Date().getFullYear();
})();
