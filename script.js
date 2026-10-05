/* ============================================================
   FAZEEL.DEV — interactions (refined)
   Original identity: particles · typing · magnetic · tilt · glow.
   Refined: desktop-only pointer effects, particles pause offscreen,
   accessible mobile menu, modal focus management.
   ============================================================ */

/* ---------- EDIT HERE: your projects ----------
   repo = GitHub link shown as the GitHub icon on the card. link = live demo URL.
   featured = true renders the card full-width as a mini case study. */
const GITHUB = 'https://github.com/fazeel-0108/fazeel-projects/tree/main';
const PROJECTS = [
  {
    name: "Official College Website",
    emoji: "🏛️",
    featured: true,
    desc: "Designed and built the official website of my polytechnic college — live on the Telangana government education portal.",
    about: "The official website of Quli Qutub Shah Government Polytechnic College, Hyderabad — designed and built by me from scratch and deployed on the Telangana government education portal. It gives students and visitors a clean, responsive window into the college.",
    role: "Design · Development · Deployment",
    feats: [
      "7 fully responsive pages — home, about, courses, facilities, faculty, achievements & student corner",
      "Separate hand-written stylesheet per page for easy maintenance",
      "Live on the official Telangana DTE portal, used by real students",
      "Optimized images and fast loading even on slow connections"
    ],
    more: "A 7-page responsive site (home, about, courses, facilities, faculty, achievements, student corner) written from scratch in HTML/CSS — deployed on qqgpthyd.dte.telangana.gov.in.",
    tags: ["HTML", "CSS", "Responsive", "Production"],
    flag: "🌐 LIVE",
    repo: "",
    link: "https://qqgpthyd.dte.telangana.gov.in/showView?div_id=43"
  },
  {
    name: "J.A.R.V.I.S — AI Voice Assistant",
    emoji: "🤖",
    desc: "Real-time voice AI for your PC — speak to it and it thinks, remembers and answers out loud.",
    about: "A real-time voice AI assistant for the PC — you speak, it thinks, remembers and answers out loud. Built on the LiveKit Agents SDK with Google Gemini realtime models and extended by me with custom tools, a fallback LLM engine and an animated desktop dashboard.",
    role: "Architecture · Agent tools · Dashboard",
    feats: [
      "Realtime speech-to-speech via LiveKit + Gemini / OpenAI",
      "Long-term memory — every conversation recalled through mem0",
      "Function-calling tools: date & time, opening files and apps on the PC",
      "OpenRouter (Hermes-3) fallback engine when realtime models are unavailable",
      "CustomTkinter dashboard with a 25-bar audio visualizer reacting to the agent's state"
    ],
    more: "LiveKit + Gemini realtime agent · long-term memory via mem0 · function-calling tools (time, file/app control) · OpenRouter fallback LLM · animated CustomTkinter dashboard with a live audio visualizer.",
    tags: ["Python", "LiveKit", "Gemini", "mem0", "CustomTkinter"],
    flag: "⭐ Flagship",
    repo: GITHUB + "/python/jarvis-ai-assistant",
    link: ""
  },
  {
    name: "ATM Simulation",
    emoji: "💳",
    desc: "A desktop ATM simulator that works like the real thing — card, PIN and a full banking menu.",
    about: "A desktop ATM simulator that behaves like the real thing — from inserting your card to completing a withdrawal. Built entirely with Python's Tkinter, focusing on realistic page flow and a clean GUI.",
    role: "GUI design · Application logic",
    feats: [
      "Complete flow: insert card → PIN → menu → balance / deposit / withdraw",
      "Card artwork and bank-brand visuals (Visa, Amex, ATM)",
      "Page-by-page navigation like a physical ATM",
      "Clean separation of screens into individual modules"
    ],
    more: "Built in Tkinter with a page-by-page flow: insert card → PIN → menu → balance / deposit / withdraw, complete with card artwork.",
    tags: ["Python", "Tkinter", "GUI"],
    repo: GITHUB + "/python/atm-simulation",
    link: ""
  },
  {
    name: "Python Mini-Games & Tools",
    emoji: "🎮",
    desc: "A toolbox of small programs — games, a typing speed test, a voice assistant and a WhatsApp bot.",
    about: "A growing toolbox of small Python programs — each one standalone, each one teaching me something new: game loops, automation, speech and user interaction.",
    role: "Python scripting",
    feats: [
      "Games: dice game, guess-the-number, rock-paper-scissors",
      "Typing test that measures WPM and accuracy",
      "Voice assistant that answers basic spoken commands",
      "WhatsApp message automation with pywhatkit"
    ],
    more: "Dice game · guess-the-number · rock-paper-scissors · typing test (WPM) · voice assistant · WhatsApp automation with pywhatkit.",
    tags: ["Python", "Games", "Automation"],
    repo: GITHUB + "/python/mini-games-tools",
    link: ""
  },
  {
    name: "QR Code Generator",
    emoji: "🔳",
    desc: "Turn any text or URL into a custom QR code with an adjustable design.",
    about: "A customizable QR code generator — turn any text or URL into a scannable QR with your preferred size, border and colors, powered by Python's qrcode library.",
    role: "Python scripting",
    feats: [
      "Custom box size and border for every QR",
      "Full control over fill and background colors",
      "One-command generation from any text or URL"
    ],
    more: "Python + the qrcode library — configurable box size, border and fill/background colors.",
    tags: ["Python", "qrcode", "Pillow"],
    repo: GITHUB + "/python/qr-code-generator",
    link: ""
  },
  {
    name: "C & C++ Programs",
    emoji: "⚙️",
    desc: "35+ programs from my C and C++ grind — sorting, matrices, structs, unions and OOP.",
    about: "My foundations: 35+ programs written while grinding through C and C++ — the layer where you really learn how memory, pointers and logic work.",
    role: "Fundamentals",
    feats: [
      "C: bubble & insertion sort, matrix addition, Fibonacci, factorial",
      "Structs, nested structures, unions and passing them to functions",
      "All four function styles — with/without arguments & return values",
      "C++: runtime polymorphism, multiple objects, manipulators"
    ],
    more: "C: bubble/insertion sort, matrix addition, Fibonacci, structs & unions, string passing, all function arg/return combos. C++: polymorphism, multiple objects, manipulators.",
    tags: ["C", "C++", "OOP", "Algorithms"],
    repo: "https://github.com/fazeel-0108/fazeel-projects",
    link: ""
  }
];

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const dpr = Math.min(window.devicePixelRatio || 1, 2);
const finePointer = matchMedia('(pointer:fine)').matches;
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

/* ---------- Particles (hero background) ----------
   pause when the hero is offscreen; disabled under reduced motion */
const canvas = $('#particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [], heroVisible = true, rafId = null;
const mouse = { x: null, y: null };

function sizeCanvas() {
  W = canvas.width = canvas.offsetWidth * dpr;
  H = canvas.height = canvas.offsetHeight * dpr;
}
function makeParticles() {
  const n = Math.min(90, Math.floor(innerWidth / 16));
  particles = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: (Math.random() * 1.8 + .6) * dpr,
    vx: (Math.random() - .5) * .35 * dpr,
    vy: (Math.random() - .5) * .35 * dpr
  }));
}
sizeCanvas(); makeParticles();
addEventListener('resize', () => { sizeCanvas(); makeParticles(); });
if (finePointer) {
  addEventListener('mousemove', e => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  const linkDist = 130 * dpr;
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    // gentle repel from cursor
    if (mouse.x !== null) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 90 * 90 * dpr * dpr && d2 > 0.01) {
        const d = Math.sqrt(d2), f = (90 * dpr - d) / (90 * dpr) * .6;
        p.x += (dx / d) * f; p.y += (dy / d) * f;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,229,255,.55)';
    ctx.fill();
  }
  // connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d < linkDist) {
        ctx.strokeStyle = `rgba(0,229,255,${(1 - d / linkDist) * .18})`;
        ctx.lineWidth = dpr * .6;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }
  if (heroVisible) rafId = requestAnimationFrame(drawParticles);
  else rafId = null;
}
if (!reducedMotion) {
  drawParticles();
  new IntersectionObserver(([en]) => {
    heroVisible = en.isIntersecting;
    if (heroVisible && rafId === null) rafId = requestAnimationFrame(drawParticles);
  }).observe($('.hero'));
}

/* ---------- Typing effect (hero roles) ---------- */
const ROLES = ['websites', 'Python tools', 'small automations', 'voice assistants'];
const typingEl = $('#typing');
let wi = 0, ci = 0, deleting = false;
(function type() {
  const w = ROLES[wi];
  typingEl.textContent = w.slice(0, ci);
  if (!deleting && ci < w.length) { ci++; setTimeout(type, 85); }
  else if (!deleting) { deleting = true; setTimeout(type, 1500); }
  else if (ci > 0) { ci--; setTimeout(type, 42); }
  else { deleting = false; wi = (wi + 1) % ROLES.length; setTimeout(type, 350); }
})();

/* ---------- Magnetic buttons (effect #2) — desktop pointers only ---------- */
if (finePointer && !reducedMotion) {
  $$('.btn-magnet, .btn-outline-magnet, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * .22}px, ${y * .28}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ---------- 3D tilt cards (effect #1) ---------- */
  $$('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------- Cursor glow cards (effect #3) ---------- */
  const bindGlow = card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  };
  $$('.glow-card').forEach(bindGlow);
  window.__bindGlow = bindGlow;
}

/* ---------- Tap-tilt for touch devices: press = light lean back, release = ease back ---------- */
if (!finePointer && !reducedMotion) {
  $$('.tilt-card').forEach(card => {
    card.addEventListener('touchstart', () => {
      card.style.transition = 'transform .18s ease';
      card.style.transform = 'perspective(700px) rotateX(8deg) scale(.985)';
    }, { passive: true });
    const release = () => {
      card.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1)';
      card.style.transform = '';
    };
    card.addEventListener('touchend', release, { passive: true });
    card.addEventListener('touchcancel', release, { passive: true });
  });
}

/* ---------- Scroll progress bar ---------- */
const progress = $('#progressBar');
addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = pct + '%';
}, { passive: true });

/* ---------- Navbar: scrolled state + active link ---------- */
const nav = $('#nav');
const sections = [...$$('section[id], header[id]')];
const navLinkEls = $$('.nav-link');
addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 40);
  let current = 'home';
  for (const sec of sections) {
    if (scrollY >= sec.offsetTop - 140) current = sec.id;
  }
  navLinkEls.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}, { passive: true });

/* ---------- Mobile menu (accessible) ---------- */
const burger = $('#burger');
const navLinksEl = $('#navLinks');
function setMenu(open) {
  burger.classList.toggle('open', open);
  navLinksEl.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
}
burger.addEventListener('click', () => {
  setMenu(burger.getAttribute('aria-expanded') !== 'true');
});
navLinksEl.addEventListener('click', e => {
  if (e.target.tagName === 'A') setMenu(false);
});
addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('open')) closeModal();
    else if (burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
  }
});

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('visible');
      en.target.querySelectorAll?.('.skill-card').forEach(sc => sc.classList.add('visible'));
      io.unobserve(en.target);
    }
  });
}, { threshold: .15 });
$$('.reveal-up, .skills-grid').forEach(el => io.observe(el));

/* ---------- Build project cards ---------- */
const grid = $('#projectsGrid');
PROJECTS.forEach((p, idx) => {
  const card = document.createElement('article');
  card.className = 'project-card glow-card reveal-up' + (p.featured ? ' featured' : '');
  card.innerHTML = `
    <div class="proj-body">
      ${p.featured ? `<div class="featured-visual" aria-hidden="true">${p.emoji}</div>` : ''}
      <div class="proj-content">
        <div class="proj-top">
          <span class="proj-folder" aria-hidden="true">${p.featured ? '' : p.emoji}</span>
          ${p.flag ? `<span class="proj-flag">${p.flag}</span>` : ''}
          <div class="proj-links">
            ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener" aria-label="GitHub repo"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.38 2.9-.39.98 0 1.98.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg></a>` : ''}
            ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" aria-label="Live demo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg></a>` : ''}
          </div>
        </div>
        <h3 class="proj-title">${p.name}</h3>
        <p class="proj-desc">${p.desc}</p>
        <div class="proj-more">${p.more}</div>
        <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <button class="proj-open" aria-label="Open project details">Details <span aria-hidden="true">→</span></button>
      </div>
    </div>`;
  card.style.cursor = 'pointer';
  grid.appendChild(card);
  io.observe(card);
  if (finePointer) {
    if (window.__bindGlow) window.__bindGlow(card);
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    openModal(p);
  });
});

/* ---------- Project detail modal (with focus management) ---------- */
const modal = $('#projModal');
let lastFocus = null;
function openModal(p) {
  $('#modalEmoji').textContent = p.emoji;
  $('#modalTitle').textContent = p.name;
  $('#modalRole').textContent = p.role || '';
  $('#modalAbout').textContent = p.about || p.desc;
  $('#modalFeats').innerHTML = (p.feats || []).map(f => `<li>${f}</li>`).join('');
  $('#modalTags').innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  const actions = [];
  if (p.link) actions.push(`<a class="btn-magnet btn-shimmer" href="${p.link}" target="_blank" rel="noopener">View Live</a>`);
  if (p.repo) actions.push(`<a class="btn-outline-magnet" href="${p.repo}" target="_blank" rel="noopener">View Code</a>`);
  $('#modalActions').innerHTML = actions.join('');
  lastFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  $('#modalClose').focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocus) { lastFocus.focus(); lastFocus = null; }
}
$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
// focus trap
modal.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusables = modal.querySelectorAll('a[href], button');
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ---------- Copy-to-clipboard for Discord ---------- */
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
