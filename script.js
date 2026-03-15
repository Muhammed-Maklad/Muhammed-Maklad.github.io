// ── YEAR ─────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── THEME ────────────────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '🌙' : '☀️';
  themeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  // adjust icons that need dark/light switching
  const darkFilter = 'invert(85%) brightness(2)';
  const lightFilter = 'invert(15%) brightness(0.4)';
  const f = isDark ? darkFilter : lightFilter;
  document.querySelectorAll('#ghIcon, #ghIcon2, #ghPagesIcon').forEach(el => el.style.filter = f);
  document.querySelectorAll('#emailIcon, #emailIcon2').forEach(el => el.style.filter = f);
}

const stored = localStorage.getItem('theme');
const preferred = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(preferred);

themeBtn.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ── SCROLL PROGRESS ──────────────────────────────────────
const progressBar = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
  navbar.classList.toggle('scrolled', scrollTop > 60);
}, { passive: true });

// ── SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  });
});

// ── MOBILE MENU ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
function toggleMobile() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
}
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ── ACTIVE NAV ────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── FADE IN ON SCROLL ─────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── PARTICLES ─────────────────────────────────────────────
const pContainer = document.getElementById('particles');
const colors = ['rgba(96,165,250,', 'rgba(16,185,129,', 'rgba(167,139,250,'];
for (let i = 0; i < 25; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const s = Math.random() * 3 + 1;
  const c = colors[Math.floor(Math.random() * colors.length)];
  p.style.cssText = `
    width:${s}px; height:${s}px;
    background:${c}0.8);
    box-shadow:0 0 ${s*3}px ${c}0.5);
    left:${Math.random()*100}%;
    animation-delay:${Math.random()*30}s;
    animation-duration:${20+Math.random()*20}s;
  `;
  pContainer.appendChild(p);
}

// ── ANIMATE CATEGORY BARS ─────────────────────────────────
const catObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.cat-fill').forEach(f => {
        const w = f.style.width;
        f.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { f.style.width = w; }, 100);
        });
      });
      catObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.category-card').forEach(c => catObserver.observe(c));

// ── PROFILE PHOTO CLICK ───────────────────────────────────
document.querySelector('.profile-photo').addEventListener('click', function() {
  this.style.transform = 'scale(1.15) rotate(360deg)';
  this.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
  setTimeout(() => {
    this.style.transform = '';
    this.style.transition = '';
  }, 700);
});
