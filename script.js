/**
 * Muhammed Maklad — Portfolio Script
 * ─────────────────────────────────────────────────────────
 * Includes:
 *  • Custom mouse cursor (dot + ring + glow) with lerp
 *  • prefers-reduced-motion aware
 *  • Single rAF-throttled scroll handler
 *  • System theme auto-detect + live OS listener
 *  • Typed role effect (correct & entity)
 *  • 3D card tilt via CSS custom properties
 *  • Stat counter (data-target driven)
 *  • Category bar animation (data-width driven)
 *  • Full ARIA hamburger state management
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── REDUCED MOTION ────────────────────────────────────────
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── YEAR ──────────────────────────────────────────────────
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ══════════════════════════════════════════════════════════
       CUSTOM CURSOR
    ══════════════════════════════════════════════════════════ */
    const isTouchDevice = !window.matchMedia('(hover: hover)').matches;
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const cursorGlow = document.getElementById('cursorGlow');

    if (!isTouchDevice && !reducedMotion && cursorDot && cursorRing) {
        let mouseX  = window.innerWidth / 2;
        let mouseY  = window.innerHeight / 2;
        let ringX   = mouseX;
        let ringY   = mouseY;
        let glowX   = mouseX;
        let glowY   = mouseY;

        // Track mouse — dot follows instantly
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top  = mouseY + 'px';
        });

        // Ring + glow lag behind using lerp animation loop
        function lerpCursor() {
            // Ring: moderate lerp
            ringX += (mouseX - ringX) * 0.14;
            ringY += (mouseY - ringY) * 0.14;
            cursorRing.style.left = ringX.toFixed(2) + 'px';
            cursorRing.style.top  = ringY.toFixed(2) + 'px';

            // Glow: slow lerp for a trailing nebula effect
            if (cursorGlow) {
                glowX += (mouseX - glowX) * 0.06;
                glowY += (mouseY - glowY) * 0.06;
                cursorGlow.style.left = glowX.toFixed(2) + 'px';
                cursorGlow.style.top  = glowY.toFixed(2) + 'px';
            }

            requestAnimationFrame(lerpCursor);
        }
        lerpCursor();

        // Cursor state on hover of interactive elements
        const hoverTargets = 'a, button, .card, .social-chip, .category-card, .contact-chip, .achievement-card, .profile-photo, [role="button"]';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        // Cursor shrink + ripple on click
        document.addEventListener('mousedown', e => {
            document.body.classList.add('cursor-click');
            // ripple burst from click point
            const ripple = document.createElement('div');
            ripple.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:8px;height:8px;border-radius:50%;border:1.5px solid var(--primary);transform:translate(-50%,-50%);pointer-events:none;z-index:99997;animation:cursorRipple 0.55s ease-out forwards;`;
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
        document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

        // Inject ripple keyframes once
        if (!document.getElementById('cursorRippleStyle')) {
            const s = document.createElement('style');
            s.id = 'cursorRippleStyle';
            s.textContent = '@keyframes cursorRipple{to{width:52px;height:52px;opacity:0;border-width:1px}}';
            document.head.appendChild(s);
        }

        // Hide cursor when it leaves the page
        document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; cursorRing.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { cursorDot.style.opacity = ''; cursorRing.style.opacity = ''; });
    }

    /* ══════════════════════════════════════════════════════════
       THEME
    ══════════════════════════════════════════════════════════ */
    const html       = document.documentElement;
    const themeBtn   = document.getElementById('themeToggle');
    const themeIcon  = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    const DARK_F  = 'invert(85%) brightness(2)';
    const LIGHT_F = 'invert(20%) brightness(0.5)';

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const isDark = theme === 'dark';
        const svgIcon = document.getElementById('themeIconSvg');
        if (svgIcon) {
            svgIcon.innerHTML = isDark
                ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
                : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
        }
        if (themeLabel) themeLabel.textContent = isDark ? 'Light' : 'Dark';
        const f = isDark ? DARK_F : LIGHT_F;
        document.querySelectorAll('#ghIcon,#ghIcon2,#ghIconFooter,#emailIcon,#emailIcon2').forEach(el => {
            if (el) el.style.filter = f;
        });
    }

    const stored  = localStorage.getItem('theme');
    const osDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored || (osDark ? 'dark' : 'light'));

    themeBtn?.addEventListener('click', () =>
        applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
    );
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
    });

    /* ══════════════════════════════════════════════════════════
       SCROLL — single rAF-throttled handler
    ══════════════════════════════════════════════════════════ */
    const progressBar     = document.getElementById('scrollProgress');
    const navbar          = document.getElementById('navbar');
    const sections        = document.querySelectorAll('section[id]');
    const navLinks        = document.querySelectorAll('.nav-links a');
    const backToTop       = document.getElementById('backToTop');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let ticking = false;

    function onScroll() {
        const scrollTop = window.scrollY;
        const docH      = document.documentElement.scrollHeight - window.innerHeight;

        if (progressBar) progressBar.style.width = docH > 0 ? ((scrollTop / docH) * 100).toFixed(1) + '%' : '0%';
        if (navbar)      navbar.classList.toggle('scrolled', scrollTop > 60);

        let current = '';
        const offset = (navbar?.offsetHeight ?? 72) + 80;
        sections.forEach(s => { if (scrollTop >= s.offsetTop - offset) current = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));

        if (backToTop)       backToTop.classList.toggle('visible', scrollTop > 500);
        if (scrollIndicator) {
            scrollIndicator.style.opacity      = scrollTop > 80 ? '0' : '';
            scrollIndicator.style.pointerEvents = scrollTop > 80 ? 'none' : '';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    // Back to top
    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ══════════════════════════════════════════════════════════
       SMOOTH SCROLL (internal anchors)
    ══════════════════════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navH = navbar?.offsetHeight ?? 72;
                window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
            }
            closeMobile();
        });
    });

    /* ══════════════════════════════════════════════════════════
       MOBILE MENU
    ══════════════════════════════════════════════════════════ */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function openMobile() {
        hamburger?.classList.add('open');
        mobileMenu?.classList.add('open');
        hamburger?.setAttribute('aria-expanded', 'true');
        mobileMenu?.setAttribute('aria-hidden', 'false');
    }
    function closeMobile() {
        hamburger?.classList.remove('open');
        mobileMenu?.classList.remove('open');
        hamburger?.setAttribute('aria-expanded', 'false');
        mobileMenu?.setAttribute('aria-hidden', 'true');
    }
    function toggleMobile() { hamburger?.classList.contains('open') ? closeMobile() : openMobile(); }

    window.toggleMobile = toggleMobile;
    window.closeMobile  = closeMobile;

    hamburger?.addEventListener('click', toggleMobile);
    hamburger?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMobile(); } });

    document.addEventListener('click', e => {
        if (mobileMenu?.classList.contains('open') && !mobileMenu.contains(e.target) && !hamburger?.contains(e.target))
            closeMobile();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });

    /* ══════════════════════════════════════════════════════════
       FADE IN ON SCROLL
    ══════════════════════════════════════════════════════════ */
    const fadeObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); } });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

    /* ══════════════════════════════════════════════════════════
       PARTICLES
    ══════════════════════════════════════════════════════════ */
    if (!reducedMotion) {
        const pCont = document.getElementById('particles');
        if (pCont) {
            const colors = ['rgba(96,165,250,', 'rgba(16,185,129,', 'rgba(167,139,250,'];
            const frag   = document.createDocumentFragment();
            for (let i = 0; i < 22; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                const s = Math.random() * 3 + 2;
                const c = colors[i % colors.length];
                p.style.cssText = `width:${s}px;height:${s}px;background:${c}0.5);box-shadow:0 0 ${s*2}px ${c}0.3);left:${Math.random()*100}%;animation-delay:${(Math.random()*20).toFixed(1)}s;animation-duration:${(14+Math.random()*18).toFixed(1)}s;`;
                frag.appendChild(p);
            }
            pCont.appendChild(frag);
        }
    }

    /* ══════════════════════════════════════════════════════════
       STAT COUNTER (data-target driven)
    ══════════════════════════════════════════════════════════ */
    const statObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el      = e.target;
            const target  = parseFloat(el.dataset.target ?? el.textContent);
            const suffix  = el.dataset.suffix  ?? '';
            const decimal = el.dataset.decimal === 'true';
            if (isNaN(target)) return;
            statObs.unobserve(el);
            if (reducedMotion) { el.textContent = (decimal ? target.toFixed(2) : target) + suffix; return; }
            const dur   = 1400;
            const start = performance.now();
            function step(now) {
                const p = Math.min((now - start) / dur, 1);
                const v = (1 - Math.pow(1 - p, 3)) * target;
                el.textContent = (decimal ? v.toFixed(2) : Math.floor(v)) + suffix;
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-num, .ps-stat-num').forEach(el => statObs.observe(el));

    /* ══════════════════════════════════════════════════════════
       CATEGORY BAR ANIMATION (data-width driven)
    ══════════════════════════════════════════════════════════ */
    const barObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.cat-fill[data-width]').forEach(f => {
                const w = f.dataset.width + '%';
                if (reducedMotion) { f.style.width = w; return; }
                requestAnimationFrame(() => setTimeout(() => { f.style.width = w; }, 80));
            });
            barObs.unobserve(e.target);
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.category-card').forEach(c => barObs.observe(c));

    /* ══════════════════════════════════════════════════════════
       3D CARD TILT (pointer devices only)
    ══════════════════════════════════════════════════════════ */
    if (!reducedMotion && !isTouchDevice) {
        const TILT = 5;
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('pointermove', e => {
                const r  = card.getBoundingClientRect();
                const x  = (e.clientX - r.left) / r.width  - 0.5;
                const y  = (e.clientY - r.top)  / r.height - 0.5;
                card.style.transform = `perspective(900px) rotateX(${(-y * TILT).toFixed(2)}deg) rotateY(${(x * TILT).toFixed(2)}deg)`;
                card.style.setProperty('--mx', ((x + 0.5) * 100).toFixed(0) + '%');
                card.style.setProperty('--my', ((y + 0.5) * 100).toFixed(0) + '%');
            });
            card.addEventListener('pointerleave', () => {
                card.style.transform = '';
                card.style.removeProperty('--mx');
                card.style.removeProperty('--my');
            });
        });
    }

    /* ══════════════════════════════════════════════════════════
       PROFILE PHOTO EASTER EGG
    ══════════════════════════════════════════════════════════ */
    const photo = document.querySelector('.profile-photo');
    if (photo && !reducedMotion) {
        photo.addEventListener('click', function () {
            this.style.transition = 'transform 0.85s cubic-bezier(0.34,1.56,0.64,1)';
            this.style.transform  = 'scale(1.12) rotate(360deg)';
            setTimeout(() => { this.style.transform = ''; this.style.transition = ''; }, 860);
        });
    }

    /* ══════════════════════════════════════════════════════════
       TYPED TEXT EFFECT
    ══════════════════════════════════════════════════════════ */
    const typedEl = document.getElementById('typedRole');
    if (typedEl && !reducedMotion) {
        const roles = [
            'Data & BI Solutions Engineer',
            'Power BI Dashboard Designer',
            'Machine Learning Engineer',
            'ETL Pipeline Architect',
            'Data Analytics Specialist'
        ];
        let ri = 0, ci = 0, deleting = false, pauseEnd = 0;

        function typeStep() {
            const cur = roles[ri];
            if (!deleting) {
                typedEl.textContent = cur.slice(0, ++ci);
                if (ci === cur.length) { pauseEnd = Date.now() + 2400; deleting = true; }
            } else {
                if (Date.now() < pauseEnd) { setTimeout(() => requestAnimationFrame(typeStep), 60); return; }
                typedEl.textContent = cur.slice(0, --ci);
                if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
            }
            setTimeout(() => requestAnimationFrame(typeStep), deleting ? 30 : 58);
        }
        setTimeout(typeStep, 1600);
    }

});
