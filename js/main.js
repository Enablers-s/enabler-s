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
        ? `<img class="mark" src="${p.logo}" alt="${p.brand || ''}" width="256" height="256"${p.logoSize ? ` style="width:${p.logoSize}%"` : ''}${p.logoShadow ? ` data-shadow="${p.logoShadow}"` : ''}>`
        : `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[p.icon]}</svg>`}</span>
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

  /* ---------- hero video ---------- */
  // Reduced motion: hold on the handshake frame. Otherwise play only while the hero is on screen.
  const video = $('hero-video');
  if (reduceMotion) {
    video.removeAttribute('autoplay');
    video.pause();
    video.addEventListener('loadeddata', () => { video.currentTime = 3.6; }, { once: true });
  } else {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }).observe(video);
  }

  /* ---------- contact ---------- */
  $('c-email').textContent = CONTACT.email;
  $('c-email').href = `mailto:${CONTACT.email}`;
  $('c-phone').textContent = CONTACT.phone;
  $('c-phone').href = `tel:${CONTACT.phone.replace(/\s/g, '')}`;
  $('c-address').textContent = CONTACT.address;
  $('year').textContent = new Date().getFullYear();
})();
