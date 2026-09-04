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
        const hoverTargets = 'a, button, .card, .hero-id-card, .social-chip, .category-card, .contact-chip, .achievement-card, .cert-spotlight-card, .cert-badge-frame, .profile-photo, [role="button"]';
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
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#0D1117' : '#F7F3EC');
        }
        const svgIcon = document.getElementById('themeIconSvg');
        if (svgIcon) {
            svgIcon.innerHTML = isDark
                ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
                : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
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

        if (backToTop) {
            backToTop.classList.toggle('visible', scrollTop > 400);
            const progressCircle = document.getElementById('progressCircle');
            if (progressCircle) {
                const circumference = 131.95;
                const progress = docH > 0 ? (scrollTop / docH) : 0;
                progressCircle.style.strokeDashoffset = (circumference - (progress * circumference)).toFixed(2);
            }
        }
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
            const colors = ['rgba(90,135,199,', 'rgba(49,151,149,', 'rgba(167,139,250,'];
            const frag   = document.createDocumentFragment();
            for (let i = 0; i < 50; i++) {
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
       HERO ROLE TYPING ANIMATION
    ══════════════════════════════════════════════════════════ */
    const heroTypedEl = document.getElementById('heroTypedText');
    if (heroTypedEl) {
        const roles = [
            'DATA ANALYTICS SPECIALIST',
            'DATA SOLUTIONS ENGINEER',
            'BUSINESS INTELLIGENCE ANALYST',
            'DATA ENGINEER',
            'MACHINE LEARNING ENGINEER'
        ];
        
        if (reducedMotion) {
            heroTypedEl.textContent = roles[0];
        } else {
            let roleIdx = 0;
            let charIdx = roles[0].length;
            heroTypedEl.textContent = roles[0];
            let isDeleting = true;
            let typingTimeout;

            function typeRole() {
                const currentRole = roles[roleIdx];
                
                if (isDeleting) {
                    charIdx--;
                    heroTypedEl.textContent = currentRole.substring(0, charIdx);
                } else {
                    charIdx++;
                    heroTypedEl.textContent = currentRole.substring(0, charIdx);
                }

                let speed = isDeleting ? 48 : 80;

                if (!isDeleting && charIdx === currentRole.length) {
                    speed = 1600;
                    isDeleting = true;
                } else if (isDeleting && charIdx === 0) {
                    isDeleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                    speed = 380;
                }

                typingTimeout = setTimeout(typeRole, speed);
            }

            // Initial pause before deleting first text
            setTimeout(typeRole, 1800);
        }
    }

    /* ══════════════════════════════════════════════════════════
       INTERACTIVE HANGING PORTRAIT CARD (Physics & Dynamic SVG Cord)
    ══════════════════════════════════════════════════════════ */
    const heroCard = document.querySelector('.hero-id-card');
    const badgeCablePath = document.getElementById('badgeCablePath');
    const badgeMetalClip = document.querySelector('.badge-metal-clip');

    if (heroCard) {
        let isDragging = false;
        let startX = 0, startY = 0;
        let currentX = 0, currentY = 0, currentRot = 0;
        let vx = 0, vy = 0, vRot = 0;
        let animFrameId = null;
        let idleFrameId = null;
        let isSpringing = false;

        function getLimits() {
            const isMobile = window.innerWidth < 768;
            return {
                maxX: isMobile ? 20 : 70,
                maxY: isMobile ? 25 : 50,
                maxRot: isMobile ? 3 : 7
            };
        }

        function updateTransforms(x, y, rot, velX = 0) {
            heroCard.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
            
            if (badgeMetalClip) {
                badgeMetalClip.style.transform = `translate3d(${x.toFixed(2)}px, ${(y * 0.18).toFixed(2)}px, 0) rotate(${(rot * 0.65).toFixed(2)}deg)`;
            }

            // Dynamically calculate Bézier curve for cord with physical lag
            if (badgeCablePath) {
                const topX = 50;
                const topY = 0;
                const bottomX = 50 + x;
                const bottomY = 32 + (y * 0.18);
                const ctrlX = 50 + (x * 0.42) + (velX * 1.5);
                const ctrlY = 16 + (y * 0.08);

                badgeCablePath.setAttribute('d', `M ${topX} ${topY} Q ${ctrlX.toFixed(2)} ${ctrlY.toFixed(2)} ${bottomX.toFixed(2)} ${bottomY.toFixed(2)}`);
            }
        }

        function springAnimate() {
            if (isDragging) return;

            const k = 0.11;   // Spring stiffness (low for elastic rope feel)
            const d = 0.82;   // Moderate damping

            const fx = -k * currentX;
            const fy = -k * currentY;
            const fRot = -k * currentRot;

            vx = (vx + fx) * d;
            vy = (vy + fy) * d;
            vRot = (vRot + fRot) * d;

            currentX += vx;
            currentY += vy;
            currentRot += vRot;

            updateTransforms(currentX, currentY, currentRot, vx);

            if (Math.abs(currentX) > 0.04 || Math.abs(currentY) > 0.04 || Math.abs(vx) > 0.04 || Math.abs(vy) > 0.04) {
                animFrameId = requestAnimationFrame(springAnimate);
            } else {
                currentX = 0;
                currentY = 0;
                currentRot = 0;
                vx = 0;
                vy = 0;
                vRot = 0;
                updateTransforms(0, 0, 0, 0);
                isSpringing = false;
                animFrameId = null;
                startIdleMotion();
            }
        }

        function idleLoop(timestamp) {
            if (isDragging || isSpringing || reducedMotion) return;

            // Very subtle organic pendulum & breathing movement
            const idleX = Math.sin(timestamp * 0.0012) * 1.4;
            const idleY = Math.cos(timestamp * 0.0018) * 0.7;
            const idleRot = Math.sin(timestamp * 0.0012) * 0.35;

            updateTransforms(idleX, idleY, idleRot, 0);
            idleFrameId = requestAnimationFrame(idleLoop);
        }

        function startIdleMotion() {
            if (!reducedMotion && !idleFrameId && !isDragging && !isSpringing) {
                idleFrameId = requestAnimationFrame(idleLoop);
            }
        }

        function stopIdleMotion() {
            if (idleFrameId) {
                cancelAnimationFrame(idleFrameId);
                idleFrameId = null;
            }
        }

        heroCard.addEventListener('pointerdown', (e) => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            stopIdleMotion();
            isDragging = true;
            isSpringing = false;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
            heroCard.classList.add('dragging');
            heroCard.setPointerCapture(e.pointerId);

            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = null;
            }
        });

        heroCard.addEventListener('pointermove', (e) => {
            if (!isDragging) return;

            const limits = getLimits();
            const rawX = e.clientX - startX;
            const rawY = e.clientY - startY;

            const prevX = currentX;
            // Clamping with soft elastic resistance
            currentX = Math.max(-limits.maxX, Math.min(limits.maxX, rawX));
            currentY = Math.max(-limits.maxY * 0.5, Math.min(limits.maxY, rawY));
            currentRot = (currentX / limits.maxX) * limits.maxRot;
            const dragVelX = currentX - prevX;

            updateTransforms(currentX, currentY, currentRot, dragVelX);
        });

        function endDrag(e) {
            if (!isDragging) return;
            isDragging = false;
            isSpringing = true;
            heroCard.classList.remove('dragging');
            try {
                heroCard.releasePointerCapture(e.pointerId);
            } catch (_) {}

            animFrameId = requestAnimationFrame(springAnimate);
        }

        heroCard.addEventListener('pointerup', endDrag);
        heroCard.addEventListener('pointercancel', endDrag);

        // Start idle animation on load
        if (!reducedMotion) {
            startIdleMotion();
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
    document.querySelectorAll('[data-target], .stat-num, .ps-stat-num, .hero-stat-num').forEach(el => statObs.observe(el));

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
            'Data Solutions Engineer',
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

    /* ══════════════════════════════════════════════════════════
       ANALYTICAL TOOLKIT ECOSYSTEM & DYNAMIC INSPECTOR
    ══════════════════════════════════════════════════════════ */
    (function initToolkitEcosystem() {
        const ecosystem = document.getElementById('toolkitEcosystem');
        if (!ecosystem) return;

        const inspectorTitle = document.getElementById('inspectorTitle');
        const inspectorDesc  = document.getElementById('inspectorDesc');
        const inspectorUsed  = document.getElementById('inspectorUsed');

        const defaultTitle = "Explore Mohamed's Technical Ecosystem";
        const defaultDesc  = "Hover over any domain card or tool badge above to inspect specialized capabilities, stack interactions, and real project implementations.";
        const defaultUsed  = "";

        const domainCards = ecosystem.querySelectorAll('.toolkit-domain-card');
        const toolPills   = ecosystem.querySelectorAll('.tool-pill');

        // Hover domain cards
        domainCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                ecosystem.classList.add('has-hover');
                card.classList.add('active-domain');

                const title = card.querySelector('.domain-title')?.textContent || '';
                const desc  = card.querySelector('.domain-desc')?.textContent || '';
                
                if (inspectorTitle) inspectorTitle.textContent = title;
                if (inspectorDesc)  inspectorDesc.textContent = desc;
                if (inspectorUsed)  inspectorUsed.textContent = "Includes core tools: " + Array.from(card.querySelectorAll('.tool-pill')).map(p => p.dataset.tool || p.textContent).join(', ');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('active-domain');
            });
        });

        // Hover tool pills
        toolPills.forEach(pill => {
            pill.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                toolPills.forEach(p => p.classList.remove('active-tool'));
                pill.classList.add('active-tool');

                const toolName = pill.dataset.tool || pill.textContent;
                const toolInfo = pill.dataset.info || '';
                const toolUsed = pill.dataset.used || '';

                if (inspectorTitle) inspectorTitle.innerHTML = `<span style="color:var(--accent); font-weight:800;">${toolName}</span> Capability`;
                if (inspectorDesc)  inspectorDesc.textContent = toolInfo;
                if (inspectorUsed)  inspectorUsed.innerHTML = toolUsed ? `<strong>✦ Applied in:</strong> ${toolUsed}` : '';
            });

            pill.addEventListener('mouseleave', () => {
                pill.classList.remove('active-tool');
            });
        });

        // Reset to default on mouse leaving ecosystem
        ecosystem.addEventListener('mouseleave', () => {
            ecosystem.classList.remove('has-hover');
            domainCards.forEach(c => c.classList.remove('active-domain'));
            toolPills.forEach(p => p.classList.remove('active-tool'));

            if (inspectorTitle) inspectorTitle.textContent = defaultTitle;
            if (inspectorDesc)  inspectorDesc.textContent = defaultDesc;
            if (inspectorUsed)  inspectorUsed.textContent = defaultUsed;
        });

        // Entrance observer for skills section
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            const secObs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        skillsSection.classList.add('skills-visible');
                        secObs.unobserve(skillsSection);
                    }
                });
            }, { threshold: 0.1 });
            secObs.observe(skillsSection);
        }
    })(); /* end initSkillsAnimation */

    // ── CINEMATIC LOADING EXPERIENCE ──────────────────────────
    const loader = document.getElementById('loading-screen');
    const canvas = document.getElementById('loader-canvas');
    if (loader && canvas) {
        const ctx = canvas.getContext('2d');
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        });

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Loader State variables
        const duration = 3200; // 3.2 seconds display time constraint
        const startTime = Date.now();
        let frameId = null;

        // Particle definitions
        const particleCount = 100;
        const particles = [];
        const colors = ['rgba(255, 107, 53, ', 'rgba(50, 181, 166, ', 'rgba(110, 168, 216, ']; // Orange, Teal, Supporting Blue

        // Distribute particles into 4 layers for the database cylinder
        const layerOffsets = [50, 15, -20, -55];
        const particlesPerLayer = Math.floor(particleCount / 4);

        for (let i = 0; i < particleCount; i++) {
            const layer = Math.floor(i / particlesPerLayer);
            const indexInLayer = i % particlesPerLayer;
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                randomTargetX: Math.random() * W,
                randomTargetY: Math.random() * H,
                layer: layer,
                indexInLayer: indexInLayer,
                angle: indexInLayer * (2 * Math.PI / particlesPerLayer),
                size: Math.random() * 2 + 1,
                color: colors[i % colors.length],
                alpha: Math.random() * 0.5 + 0.5,
                history: []
            });
        }

        // Data streams for Phase 4
        const dataStreams = [];
        for (let i = 0; i < 6; i++) {
            dataStreams.push({
                color: colors[i % colors.length],
                progress: -Math.random(),
                speed: Math.random() * 0.02 + 0.015,
                startX: i % 2 === 0 ? 0 : W,
                startY: Math.random() * H * 0.4,
                cp1x: W * (i % 2 === 0 ? 0.3 : 0.7),
                cp1y: H * 0.2,
                cp2x: W * 0.5,
                cp2y: H * 0.1
            });
        }

        // Floating tech labels for Phase 5
        const techLabels = [
            { text: 'SQL', xOffset: -160, yOffset: -80, tStart: 2000, tEnd: 2500 },
            { text: 'Power BI', xOffset: 150, yOffset: -50, tStart: 2100, tEnd: 2600 },
            { text: 'Python', xOffset: -140, yOffset: 30, tStart: 2200, tEnd: 2700 },
            { text: 'Azure', xOffset: 150, yOffset: 40, tStart: 2300, tEnd: 2800 },
            { text: 'Machine Learning', xOffset: -170, yOffset: -20, tStart: 2400, tEnd: 2900 },
            { text: 'ETL', xOffset: 140, yOffset: -100, tStart: 2150, tEnd: 2650 },
            { text: 'Data Warehouse', xOffset: -150, yOffset: -130, tStart: 2250, tEnd: 2750 },
            { text: 'Analytics', xOffset: 130, yOffset: 90, tStart: 2350, tEnd: 2850 }
        ];

        // Draw perspective grid
        function drawPerspectiveGrid(timeProgress) {
            ctx.strokeStyle = 'rgba(50, 181, 166, 0.04)';
            ctx.lineWidth = 1;
            const horizon = H * 0.65;
            const gridY = H * 0.65;

            // Vertical perspective lines
            const linesCount = 20;
            for (let i = 0; i <= linesCount; i++) {
                const xTop = W * 0.5;
                const xBottom = W * (i / linesCount - 0.5) * 3 + W * 0.5;
                ctx.beginPath();
                ctx.moveTo(xTop, horizon);
                ctx.lineTo(xBottom, H);
                ctx.stroke();
            }

            // Horizontal scrolling grid lines
            const horizCount = 10;
            const scrollOffset = (timeProgress * 60) % 50;
            for (let i = 0; i < horizCount; i++) {
                const py = gridY + Math.pow(i / horizCount, 2) * (H - gridY) + scrollOffset;
                if (py < H) {
                    ctx.beginPath();
                    ctx.moveTo(0, py);
                    ctx.lineTo(W, py);
                    ctx.stroke();
                }
            }
        }

        // Animate frame loop
        function drawLoaderFrame() {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed, duration);
            const progress = t / duration; // 0.0 to 1.0

            ctx.fillStyle = '#0D1117';
            ctx.fillRect(0, 0, W, H);

            // 3D perspective grid (slow moving)
            drawPerspectiveGrid(progress);

            // Volumetric glowing backdrop
            const cx = W / 2;
            const cy = H / 2 - 40;
            const radialGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 280);
            radialGlow.addColorStop(0, `rgba(255, 107, 53, ${0.12 * (1 - Math.pow(progress, 3))})`);
            radialGlow.addColorStop(1, 'rgba(13, 17, 23, 0)');
            ctx.fillStyle = radialGlow;
            ctx.beginPath();
            ctx.arc(cx, cy, 300, 0, Math.PI * 2);
            ctx.fill();

            // Camera slow zoom
            const zoom = 1 + progress * 0.08;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(zoom, zoom);
            ctx.translate(-cx, -cy);

            // Render particles
            particles.forEach((p, idx) => {
                let targetX, targetY;

                const rotSpeed = 0.0007;
                const rotAngle = p.angle + t * rotSpeed * (p.layer % 2 === 0 ? 1 : -1);
                const cylinderR = 90;
                const ellipseAspect = 22; // height aspect of ellipses
                
                const cylX = cx + cylinderR * Math.cos(rotAngle);
                const cylY = cy + layerOffsets[p.layer] + ellipseAspect * Math.sin(rotAngle);

                if (t < 600) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > W) p.vx *= -1;
                    if (p.y < 0 || p.y > H) p.vy *= -1;
                    
                    targetX = p.x;
                    targetY = p.y;
                } else if (t < 1300) {
                    const factor = (t - 600) / 700;
                    const pullX = cx + (p.x - cx) * 0.98;
                    const pullY = cy + (p.y - cy) * 0.98;
                    
                    targetX = pullX + (cylX - pullX) * 0.15 * factor;
                    targetY = pullY + (cylY - pullY) * 0.15 * factor;
                } else if (t < 2200) {
                    const layerDelay = p.layer * 120;
                    const startT = 1300 + layerDelay;
                    const factor = Math.min(Math.max((t - startT) / 500, 0), 1);
                    
                    targetX = p.x + (cylX - p.x) * factor;
                    targetY = p.y + (cylY - p.y) * factor;
                } else {
                    targetX = cylX;
                    targetY = cylY;
                }

                if (t >= 600) {
                    p.x += (targetX - p.x) * 0.09;
                    p.y += (targetY - p.y) * 0.09;
                }

                if (t < 1300 && !reducedMotion) {
                    p.history.push({ x: p.x, y: p.y });
                    if (p.history.length > 5) p.history.shift();
                } else {
                    p.history = [];
                }

                if (p.history.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(p.history[0].x, p.history[0].y);
                    for (let h = 1; h < p.history.length; h++) {
                        ctx.lineTo(p.history[h].x, p.history[h].y);
                    }
                    ctx.strokeStyle = p.color + '0.15)';
                    ctx.lineWidth = p.size;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color + (t >= 2200 ? '0.85)' : p.alpha.toFixed(2) + ')');
                ctx.fill();

                if (t >= 600 && t < 2200) {
                    const connMax = idx + 4;
                    for (let j = idx + 1; j < Math.min(particles.length, connMax); j++) {
                        const o = particles[j];
                        const dx = p.x - o.x;
                        const dy = p.y - o.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 75) {
                            const alpha = (1 - dist / 75) * 0.12 * Math.min((t - 600) / 400, 1);
                            ctx.beginPath();
                            ctx.strokeStyle = p.color + alpha.toFixed(3) + ')';
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(o.x, o.y);
                            ctx.stroke();
                        }
                    }
                }
            });

            if (t >= 1400) {
                ctx.lineWidth = 1;
                layerOffsets.forEach((yOff, i) => {
                    const layerProgress = Math.min(Math.max((t - (1300 + i * 120)) / 500, 0), 1);
                    ctx.strokeStyle = `rgba(50, 181, 166, ${0.18 * layerProgress})`;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy + yOff, 90, 22, 0, 0, Math.PI * 2);
                    ctx.stroke();
                });
            }

            if (t >= 1500 && t < 2800) {
                const scanY = cy - 65 + ((t * 0.08) % 135);
                if (scanY < cy + 65) {
                    ctx.strokeStyle = 'rgba(50, 181, 166, 0.22)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(cx - 95, scanY);
                    ctx.lineTo(cx + 95, scanY);
                    ctx.stroke();
                }
            }

            if (t >= 2000) {
                dataStreams.forEach(stream => {
                    stream.progress += stream.speed;
                    if (stream.progress > 1) {
                        stream.progress = -Math.random() * 0.5;
                        stream.startY = Math.random() * H * 0.4;
                    }
                    if (stream.progress > 0) {
                        const factor = stream.progress;
                        const x0 = stream.startX;
                        const y0 = stream.startY;
                        const x1 = stream.cp1x;
                        const y1 = stream.cp1y;
                        const x2 = stream.cp2x;
                        const y2 = stream.cp2y;
                        const x3 = cx;
                        const y3 = cy - 55;

                        const mt = 1 - factor;
                        const tx = mt*mt*mt*x0 + 3*mt*mt*factor*x1 + 3*mt*factor*factor*x2 + factor*factor*factor*x3;
                        const ty = mt*mt*mt*y0 + 3*mt*mt*factor*y1 + 3*mt*factor*factor*y2 + factor*factor*factor*y3;

                        ctx.beginPath();
                        ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
                        ctx.fillStyle = stream.color + '0.9)';
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = stream.color;
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                });
            }

            if (t >= 2000) {
                techLabels.forEach(label => {
                    if (t >= label.tStart && t <= label.tEnd) {
                        const activeDuration = label.tEnd - label.tStart;
                        const activeElapsed = t - label.tStart;
                        let alpha = 0;
                        if (activeElapsed < activeDuration * 0.2) {
                            alpha = activeElapsed / (activeDuration * 0.2);
                        } else if (activeElapsed > activeDuration * 0.8) {
                            alpha = (label.tEnd - t) / (activeDuration * 0.2);
                        } else {
                            alpha = 1.0;
                        }

                        ctx.font = '600 11px "Outfit", sans-serif';
                        ctx.fillStyle = `rgba(244, 240, 232, ${alpha * 0.45})`;
                        ctx.fillText(label.text, cx + label.xOffset, cy + label.yOffset);
                        
                        ctx.beginPath();
                        ctx.arc(cx + label.xOffset - 8, cy + label.yOffset - 3, 1.5, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(50, 181, 166, ${alpha * 0.55})`;
                        ctx.fill();
                    }
                });
            }

            if (t >= 2650) {
                const pulseElapsed = t - 2650;
                const r = pulseElapsed * 0.65;
                const alpha = Math.max(1 - pulseElapsed / 500, 0);
                if (alpha > 0) {
                    ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.65})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            ctx.restore();

            if (t >= 2600) {
                const nameEl = document.getElementById('loader-name');
                const titleEl = document.getElementById('loader-title');
                const footerEl = document.getElementById('loader-footer');
                if (nameEl) nameEl.classList.add('visible');
                if (titleEl) titleEl.classList.add('visible');
                if (footerEl) footerEl.classList.add('visible');
            }

            const barEl = document.getElementById('loader-progress-bar');
            if (barEl) {
                const barProgress = Math.min(t / (duration - 150), 1);
                barEl.style.width = (barProgress * 100).toFixed(1) + '%';
            }

            if (t < duration) {
                frameId = requestAnimationFrame(drawLoaderFrame);
            } else {
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    document.body.classList.remove('loading-active');
                }, 150);
            }
        }

        frameId = requestAnimationFrame(drawLoaderFrame);
    }

    // ── PROFILE BACKGROUND REMOVAL (FLOOD FILL) ──────────────────
    const profileImg = document.querySelector('.profile-photo');
    if (profileImg) {
        function removeWhiteBackground(imgElement) {
            const img = new Image();
            img.src = imgElement.src;
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const W = canvas.width = img.naturalWidth;
                    const H = canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    const imgData = ctx.getImageData(0, 0, W, H);
                    const data = imgData.data;
                    const visited = new Uint8Array(W * H);
                    const queue = [];
                    
                    // Helper to check if pixel is near-white
                    function isWhite(x, y) {
                        const idx = (y * W + x) * 4;
                        // White or extremely light gray (background)
                        return data[idx] > 230 && data[idx+1] > 230 && data[idx+2] > 230;
                    }
                    
                    // Push border pixels that are white to queue
                    for (let x = 0; x < W; x++) {
                        if (isWhite(x, 0)) { queue.push([x, 0]); visited[0 * W + x] = 1; }
                        if (isWhite(x, H - 1)) { queue.push([x, H - 1]); visited[(H - 1) * W + x] = 1; }
                    }
                    for (let y = 1; y < H - 1; y++) {
                        if (isWhite(0, y)) { queue.push([0, y]); visited[y * W + 0] = 1; }
                        if (isWhite(W - 1, y)) { queue.push([W - 1, y]); visited[y * W + (W - 1)] = 1; }
                    }
                    
                    // BFS to flood-fill background to transparent
                    let head = 0;
                    while (head < queue.length) {
                        const [cx, cy] = queue[head++];
                        const idx = (cy * W + cx) * 4;
                        data[idx + 3] = 0; // Alpha = 0 (transparent)
                        
                        const neighbors = [
                            [cx + 1, cy], [cx - 1, cy],
                            [cx, cy + 1], [cx, cy - 1]
                        ];
                        for (const [nx, ny] of neighbors) {
                            if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
                                const nidx = ny * W + nx;
                                if (!visited[nidx] && isWhite(nx, ny)) {
                                    visited[nidx] = 1;
                                    queue.push([nx, ny]);
                                }
                            }
                        }
                    }
                    
                    ctx.putImageData(imgData, 0, 0);
                    imgElement.src = canvas.toDataURL('image/png');
                } catch (e) {
                    console.warn("Failed to process background removal (CORS/security restriction on local file):", e);
                } finally {
                    imgElement.classList.add('ready');
                }
            };
            if (img.complete) {
                img.onload();
            }
        }
        removeWhiteBackground(profileImg);
    }


    /* ══════════════════════════════════════════════════════════
       CONTACT FORM INTERACTION & VALIDATION
    ══════════════════════════════════════════════════════════ */
    const contactForm = document.getElementById('portfolioContactForm');
    const toast = document.getElementById('formStatusToast');
    const submitBtn = document.getElementById('contactSubmitBtn');

    if (contactForm) {
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const subjectInput = document.getElementById('contactSubject');
        const messageInput = document.getElementById('contactMessage');

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function clearErrors() {
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
            if (toast) {
                toast.className = 'form-status-toast';
                toast.style.display = 'none';
            }
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();

            let isValid = true;
            const name = nameInput?.value.trim() ?? '';
            const email = emailInput?.value.trim() ?? '';
            const subject = subjectInput?.value.trim() ?? 'Portfolio Contact / Opportunity Discussion';
            const message = messageInput?.value.trim() ?? '';

            if (!name) {
                nameInput?.closest('.form-group')?.classList.add('has-error');
                isValid = false;
            }

            if (!email || !validateEmail(email)) {
                emailInput?.closest('.form-group')?.classList.add('has-error');
                isValid = false;
            }

            if (!message) {
                messageInput?.closest('.form-group')?.classList.add('has-error');
                isValid = false;
            }

            if (!isValid) return;

            // Show submitting feedback
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Preparing Message...</span>';
            }

            setTimeout(() => {
                // Open mailto fallback client with pre-filled content
                const recipient = 'mo7amedmaklad@gmail.com';
                const bodyText = `Hi Mohamed,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`;
                const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
                
                window.location.href = mailtoUrl;

                if (toast) {
                    toast.textContent = '✓ Message draft prepared in your email client. Thank you for connecting!';
                    toast.className = 'form-status-toast success';
                    toast.style.display = 'block';
                }

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Message Prepared ✓</span>';
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Send Message</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
                    }, 3500);
                }

                contactForm.reset();
            }, 600);
        });

        // Realtime clear errors on input
        [nameInput, emailInput, messageInput].forEach(input => {
            input?.addEventListener('input', () => {
                input.closest('.form-group')?.classList.remove('has-error');
            });
        });
    }

    // Auto-update footer year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ══════════════════════════════════════════════════════════
       05 — PROJECTS: INTERACTIVE CARD DECK & STACK FILTERS
    ══════════════════════════════════════════════════════════ */
    const PORTFOLIO_PROJECTS = [
        {
            id: 'sila',
            title: 'Customer Service Analytics (SILA)',
            category: 'Customer Intelligence Platform',
            year: 'Jun 2026',
            badge: 'Flagship BI Platform',
            description: 'Enterprise-grade relational database and end-to-end BI system for telecom operations. Integrates a dimensional data warehouse, SSIS ETL pipelines, 16+ Power BI dashboards, 7+ Tableau views, and AI churn prediction module.',
            image: 'images/Projects/Customer Service Analytics (SILA).png',
            technologies: ['Power BI', 'Tableau', 'SQL Server', 'Data Warehouse', 'SSIS / ETL', 'AI Churn Prediction'],
            filterTags: ['all', 'Power BI', 'SQL', 'Tableau', 'AI'],
            actionUrl: 'https://github.com/Muhammed-Maklad/Customer-Service-Analytics-Platform',
            actionLabel: 'View Flagship Repository',
            isGithub: true
        },
        {
            id: 'tourism',
            title: 'Tourism & Hospitality BI Dashboard',
            category: 'Business Intelligence',
            year: 'Jun 2026',
            badge: 'Executive BI Suite',
            description: 'Multi-page business intelligence dashboard transforming raw hospitality operations data into strategic insights on revenue drivers, occupancy benchmarks, and guest sentiment trends.',
            image: 'images/Projects/Tourism & Hospitality BI Dashboard.png',
            technologies: ['Power BI', 'DAX', 'Data Analytics', 'KPI Benchmarking', 'Sentiment Analysis'],
            filterTags: ['all', 'Power BI', 'SQL'],
            actionUrl: 'https://github.com/Muhammed-Maklad/Tourism-Intelligence---PowerBi',
            actionLabel: 'GitHub Repository',
            isGithub: true
        },
        {
            id: 'restaurant',
            title: 'Restaurant Analytics Dashboard',
            category: 'Data Analytics',
            year: 'May 2026',
            badge: 'Enterprise Analytics',
            description: 'End-to-end Power BI analytics platform for a restaurant chain, featuring five dashboards for executive sales, operations, customer segmentation, and financial health with advanced DAX and RLS.',
            image: 'images/Projects/Restaurant Analytics Dashboard — Power BI.png',
            technologies: ['Power BI', 'DAX', 'Data Modeling', 'RLS Security', 'Business Intelligence'],
            filterTags: ['all', 'Power BI', 'SQL'],
            actionUrl: 'https://github.com/Muhammed-Maklad/Restaurant-Analytics-Dashboard---Power-Bi',
            actionLabel: 'GitHub Repository',
            isGithub: true
        },
        {
            id: 'roshtty',
            title: 'Roshtty — Medical Prescription OCR',
            category: 'AI & Vision',
            year: 'Sep 2024 – Jul 2025',
            badge: 'AI Cloud Solution',
            description: 'AI-powered OCR that interprets handwritten medical prescriptions via image preprocessing and Google Gemini API, deployed as a scalable web service on Microsoft Azure.',
            image: 'images/Projects/Roshtty — Medical Prescription OCR.png',
            technologies: ['Python', 'Flask', 'Azure', 'Gemini AI', 'OpenCV'],
            filterTags: ['all', 'Python', 'Azure', 'AI'],
            actionUrl: 'https://read-acgqhjb2b8hyd6fb.canadacentral-01.azurewebsites.net/',
            actionLabel: 'Live Cloud Demo',
            isGithub: false
        },
        {
            id: 'linguasense',
            title: 'Linguasense — Multilingual Chatbot',
            category: 'NLP & RAG',
            year: 'Oct 2024',
            badge: 'Generative AI & RAG',
            description: 'Real-time multilingual NLP customer intelligence combining Whisper ASR speech-to-text, DistilBERT sentiment classification, and Llama 3.1 RAG via FAISS vector search.',
            image: 'images/Projects/Linguasense — Multilingual Sentiment Chatbot.png',
            technologies: ['Python', 'Streamlit', 'FAISS / RAG', 'Llama 3.1', 'Whisper ASR'],
            filterTags: ['all', 'Python', 'AI'],
            actionUrl: 'https://github.com/Muhammed-Maklad/DEPI-Graduation-Project',
            actionLabel: 'Source Code',
            isGithub: true
        },
        {
            id: 'maklad-store',
            title: 'Maklad Store Analytics — Tableau',
            category: 'Tableau BI',
            year: 'Apr 2026',
            badge: 'Executive BI Platform',
            description: 'Five-page interactive Tableau platform replacing static reports with real-time revenue, regional profitability, and customer behavior insights hosted on Tableau Public.',
            image: 'images/Projects/Maklad Store Analytics — Tableau.png',
            technologies: ['Tableau', 'Excel', 'Dashboard Actions', 'Tableau Public'],
            filterTags: ['all', 'Tableau'],
            actionUrl: 'https://public.tableau.com/app/profile/muhammed.gamal5404/viz/MakladTechSolution/ProductDashborad?publish=yes',
            actionLabel: 'Live Dashboard',
            isGithub: false
        }
    ];

    const projectCardDeck = document.getElementById('projectCardDeck');
    const filterButtons = document.querySelectorAll('.project-filters-wrap .filter-pill');
    const currentNumEl = document.getElementById('currentProjectIndex');
    const totalNumEl = document.getElementById('totalProjectCount');
    const prevBtn = document.getElementById('deckPrevBtn');
    const nextBtn = document.getElementById('deckNextBtn');
    const dotsContainer = document.getElementById('deckDotsIndicator');

    if (projectCardDeck) {
        let activeFilter = 'all';
        let filteredProjects = [...PORTFOLIO_PROJECTS];
        let currentIndex = 0;

        function getFilteredList(filter) {
            if (filter === 'all') return [...PORTFOLIO_PROJECTS];
            return PORTFOLIO_PROJECTS.filter(p => p.filterTags.includes(filter));
        }

        function createCardHtml(project, index) {
            const chipsHtml = project.technologies.slice(0, 4).map(tech => `
                <span class="deck-chip">${tech}</span>
            `).join('');

            const actionIcon = project.isGithub ? `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
            ` : `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
            `;

            return `
                <article class="deck-card" data-index="${index}" id="deck-card-${index}">
                    <div class="deck-card-media">
                        <img class="deck-card-img" src="${project.image}" alt="${project.title}" loading="lazy" />
                        <span class="deck-card-badge">${project.badge}</span>
                        <span class="deck-card-date">${project.year}</span>
                    </div>
                    <div class="deck-card-info">
                        <h3 class="deck-card-title">${project.title}</h3>
                        <p class="deck-card-desc">${project.description}</p>
                    </div>
                    <div class="deck-card-footer">
                        <div class="deck-card-chips">
                            ${chipsHtml}
                        </div>
                        <a class="deck-action-btn" href="${project.actionUrl}" target="_blank" rel="noopener noreferrer">
                            ${actionIcon}
                            <span>${project.actionLabel}</span>
                        </a>
                    </div>
                </article>
            `;
        }

        function renderDeck() {
            if (filteredProjects.length === 0) {
                projectCardDeck.innerHTML = `
                    <div class="deck-empty-state">
                        <p>No projects in this stack yet.</p>
                    </div>
                `;
                if (currentNumEl) currentNumEl.textContent = '00';
                if (totalNumEl) totalNumEl.textContent = '00';
                if (dotsContainer) dotsContainer.innerHTML = '';
                return;
            }

            // Adjust index if out of bounds
            if (currentIndex >= filteredProjects.length) {
                currentIndex = 0;
            }

            projectCardDeck.innerHTML = filteredProjects.map((p, i) => createCardHtml(p, i)).join('');

            // Render Dots
            if (dotsContainer) {
                dotsContainer.innerHTML = filteredProjects.map((_, i) => `
                    <button class="deck-dot ${i === currentIndex ? 'active' : ''}" data-index="${i}" aria-label="Go to project ${i + 1}" role="tab" aria-selected="${i === currentIndex}"></button>
                `).join('');

                dotsContainer.querySelectorAll('.deck-dot').forEach(dot => {
                    dot.addEventListener('click', () => {
                        const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
                        if (!isNaN(targetIdx)) {
                            goToProject(targetIdx);
                        }
                    });
                });
            }

            updateDeckStack();
            bindDragEvents();
        }

        function updateDeckStack() {
            const cards = projectCardDeck.querySelectorAll('.deck-card');
            const total = filteredProjects.length;

            if (currentNumEl) {
                currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
            }
            if (totalNumEl) {
                totalNumEl.textContent = String(total).padStart(2, '0');
            }

            cards.forEach((card, i) => {
                card.className = 'deck-card';
                const relativePos = (i - currentIndex + total) % total;

                if (relativePos === 0) {
                    card.classList.add('is-active');
                } else if (relativePos === 1) {
                    card.classList.add('is-behind-1');
                } else if (relativePos === 2) {
                    card.classList.add('is-behind-2');
                } else if (relativePos === 3) {
                    card.classList.add('is-behind-3');
                } else {
                    card.classList.add('is-hidden');
                }
            });

            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.deck-dot');
                dots.forEach((dot, i) => {
                    const isActive = i === currentIndex;
                    dot.classList.toggle('active', isActive);
                    dot.setAttribute('aria-selected', isActive);
                });
            }
        }

        function goToProject(index) {
            if (filteredProjects.length === 0) return;
            currentIndex = (index + filteredProjects.length) % filteredProjects.length;
            updateDeckStack();
        }

        function nextProject() {
            goToProject(currentIndex + 1);
        }

        function prevProject() {
            goToProject(currentIndex - 1);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextProject);
        if (prevBtn) prevBtn.addEventListener('click', prevProject);

        // Filter Click Events
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                activeFilter = btn.getAttribute('data-filter');
                filteredProjects = getFilteredList(activeFilter);
                currentIndex = 0;

                // Subtle transition
                projectCardDeck.style.opacity = '0.3';
                projectCardDeck.style.transform = 'scale(0.97)';
                projectCardDeck.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

                setTimeout(() => {
                    renderDeck();
                    projectCardDeck.style.opacity = '1';
                    projectCardDeck.style.transform = 'scale(1)';
                }, 220);
            });
        });

        // Interactive Drag & Touch Swipe on Active Card
        function bindDragEvents() {
            const activeCard = projectCardDeck.querySelector('.deck-card.is-active');
            if (!activeCard || reducedMotion) return;

            let isDragging = false;
            let startX = 0, startY = 0;
            let dragX = 0, dragY = 0;

            function onPointerDown(e) {
                // Don't drag if clicking buttons or links
                if (e.target.closest('a') || e.target.closest('button')) return;
                if (e.button !== 0 && e.pointerType === 'mouse') return;

                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                dragX = 0;
                dragY = 0;

                activeCard.classList.add('dragging');
                activeCard.setPointerCapture(e.pointerId);
            }

            function onPointerMove(e) {
                if (!isDragging) return;

                dragX = e.clientX - startX;
                dragY = (e.clientY - startY) * 0.4;
                const rot = dragX * 0.08;

                activeCard.style.transform = `translate3d(${dragX}px, ${dragY}px, 0) rotate(${rot}deg)`;
            }

            function onPointerUp(e) {
                if (!isDragging) return;
                isDragging = false;
                activeCard.classList.remove('dragging');

                try {
                    activeCard.releasePointerCapture(e.pointerId);
                } catch (_) {}

                const threshold = 55;

                if (dragX < -threshold) {
                    // Swiped Left -> Next Project
                    activeCard.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s ease';
                    activeCard.style.transform = `translate3d(-120px, 0, -40px) rotate(-12deg)`;
                    activeCard.style.opacity = '0.4';
                    setTimeout(() => {
                        nextProject();
                    }, 200);
                } else if (dragX > threshold) {
                    // Swiped Right -> Previous Project
                    activeCard.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s ease';
                    activeCard.style.transform = `translate3d(120px, 0, -40px) rotate(12deg)`;
                    activeCard.style.opacity = '0.4';
                    setTimeout(() => {
                        prevProject();
                    }, 200);
                } else {
                    // Spring Back
                    activeCard.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    activeCard.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
                }
            }

            activeCard.addEventListener('pointerdown', onPointerDown);
            activeCard.addEventListener('pointermove', onPointerMove);
            activeCard.addEventListener('pointerup', onPointerUp);
            activeCard.addEventListener('pointercancel', onPointerUp);
        }

        // Keyboard Navigation Support
        document.addEventListener('keydown', (e) => {
            const projectsSec = document.getElementById('projects');
            if (!projectsSec) return;

            const rect = projectsSec.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (isInView) {
                if (e.key === 'ArrowRight') {
                    nextProject();
                } else if (e.key === 'ArrowLeft') {
                    prevProject();
                }
            }
        });

        // Initialize Card Deck
        renderDeck();
    }

});

