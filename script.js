/* ============================================================
   FAZEEL — WORKBENCH interactions · vanilla JS, no libraries
   ============================================================ */

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Typing (hero) ---------- */
const ROLES = ['websites', 'Python tools', 'small automations', 'voice assistants'];
const typingEl = $('#typing');
let wi = 0, ci = 0, deleting = false;
(function type() {
  if (!typingEl) return;
  const w = ROLES[wi];
  typingEl.textContent = w.slice(0, ci);
  if (!deleting && ci < w.length)      { ci++; setTimeout(type, 78); }
  else if (!deleting)                  { deleting = true; setTimeout(type, 1700); }
  else if (ci > 0)                     { ci--; setTimeout(type, 38); }
  else { deleting = false; wi = (wi + 1) % ROLES.length; setTimeout(type, 380); }
})();

/* ---------- Oscilloscope trace (hero signature) ----------
   One amber line, reacting to the cursor like a scope probe.
   Paused when the hero leaves the viewport; static under reduced motion. */
const canvas = $('#trace');
const hero = $('.hero');
if (canvas && hero) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let W = 0, H = 0, running = true, rafId = null;
  const mouse = { x: null, boost: 0 };

  function size() {
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    const t = now * 0.0012;
    const mid = H * 0.72;                     // trace sits low, under the content
    const baseAmp = Math.min(34, H * 0.06);

    const trace = (ampMul, alpha, lw, phase) => {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 6) {
        // envelope: fade the wave out toward both edges
        const env = Math.sin((x / W) * Math.PI);
        // cursor energy: local amplitude bump near the pointer
        let bump = 0;
        if (mouse.x !== null) {
          const d = Math.abs(x - mouse.x);
          bump = Math.exp(-(d * d) / (2 * 130 * 130)) * (14 + mouse.boost * 26);
        }
        const amp = env * (baseAmp * ampMul + bump);
        const y = mid
          + Math.sin(x * 0.012 - t * 2.0 + phase) * amp
          + Math.sin(x * 0.031 + t * 1.3 + phase) * amp * 0.35;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255,180,84,${alpha})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    };

    trace(1.6, 0.10, 1, 0.6);   // faint echo
    trace(1,   0.55, 1.5, 0);   // main line
  }

  function loop(now) {
    if (running) draw(now);
    rafId = requestAnimationFrame(loop);
  }

  size();
  addEventListener('resize', () => { size(); if (reducedMotion) draw(0); }, { passive: true });

  if (reducedMotion) {
    draw(0); // one honest static frame
  } else {
    hero.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.boost = Math.min(1, mouse.boost + 0.08);
    });
    hero.addEventListener('mouseleave', () => { mouse.x = null; });
    // decay the cursor energy so the line settles when the pointer rests
    (function decay() { mouse.boost *= 0.96; requestAnimationFrame(decay); })();
    // save cycles when the hero is offscreen
    new IntersectionObserver(([en]) => {
      running = en.isIntersecting;
    }).observe(hero);
    rafId = requestAnimationFrame(loop);
  }
}

/* ---------- Scroll progress ---------- */
const progress = $('#progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
}, { passive: true });

/* ---------- Nav: scrolled state + active section ---------- */
const nav = $('#nav');
const sections = $$('section[id], header[id]');
const navLinks = $$('.nav-link');
addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 40);
  let current = 'home';
  for (const sec of sections) if (scrollY >= sec.offsetTop - 160) current = sec.id;
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}, { passive: true });

/* ---------- Mobile menu ---------- */
const burger = $('#burger');
const navLinksEl = $('#navLinks');
function setMenu(open) {
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navLinksEl.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
navLinksEl.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', e => {
  if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') setMenu(false);
});

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach(el => reducedMotion ? el.classList.add('visible') : io.observe(el));

/* ---------- Magnetic buttons (subtle, CTAs only) ---------- */
if (!reducedMotion) {
  $$('.btn-magnet').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.14}px, ${y * 0.22}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ---------- Project detail modal (data lives in each card) ---------- */
const modal = $('#projModal');
const modalCard = $('.modal-card');
let lastFocus = null;

function openModal(data, opener) {
  lastFocus = opener;
  $('#modalRole').textContent = data.role || '';
  $('#modalTitle').textContent = data.name || '';
  $('#modalAbout').textContent = data.about || '';
  $('#modalFeats').innerHTML = (data.feats || []).map(f => `<li>${f}</li>`).join('');
  $('#modalTags').innerHTML = (data.tags || []).map(t => `<span>${t}</span>`).join('');
  const actions = [];
  if (data.link) actions.push(`<a class="btn btn-solid btn-sm" href="${data.link}" target="_blank" rel="noopener">View live site</a>`);
  if (data.repo) actions.push(`<a class="btn btn-line btn-sm" href="${data.repo}" target="_blank" rel="noopener">View code</a>`);
  $('#modalActions').innerHTML = actions.join('');
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('open'));
  document.body.classList.add('modal-open');
  $('#modalClose').focus();
}
function closeModal() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
  setTimeout(() => { modal.hidden = true; }, 320);
  if (lastFocus) lastFocus.focus();
}

$$('[data-project]').forEach(card => {
  let data = {};
  try { data = JSON.parse(card.querySelector('.proj-data').textContent); } catch (_) {}
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;          // let real links work
    if (e.target.closest('[data-open-details]') || !e.target.closest('button, a')) openModal(data, e.target);
  });
  // keyboard: Enter on the card opens details
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target === card) openModal(data, card);
  });
});

$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
// basic focus trap inside the modal
modal.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusables = modal.querySelectorAll('a[href], button');
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ---------- Copy-to-clipboard (Discord) ---------- */
function bindCopy(id, text) {
  const el = $(id);
  if (!el) return;
  el.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard?.writeText(text)
      .then(() => toast(`Copied: ${text} ✓`))
      .catch(() => toast(text));
  });
}
bindCopy('#discordLink', '10xSpy');
bindCopy('#discordCopy2', '10xSpy');
