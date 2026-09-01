# THEME TOGGLE — PREMIUM DARK/LIGHT TRANSITION

Improve the existing Dark / Light mode toggle.

Do NOT redesign the website or change the existing layout.
Keep the current visual identity, typography, spacing, components, and content.

The goal is to make switching between Dark Mode and Light Mode feel smooth, premium, and intentional.

---

## 01 — SMOOTH THEME TRANSITION

When the user clicks the Light/Dark toggle:

Do NOT instantly switch colors.

Animate the entire theme transition smoothly.

Transition:

Dark Mode
→ smooth animated transition
→ Light Mode

and:

Light Mode
→ smooth animated transition
→ Dark Mode

Use approximately:

duration: 450–650ms

easing:

cubic-bezier(0.4, 0, 0.2, 1)

Animate the important theme properties:

- background
- surface/card backgrounds
- text colors
- muted text
- borders
- accent colors
- navbar
- buttons
- inputs
- cards
- skill ticker
- Hero card
- section backgrounds

Avoid a cheap/simple fade.

The transition should feel like the entire interface is changing theme.

---

# 02 — ADD A PREMIUM COLOR TRANSITION EFFECT

When switching themes, add a subtle expanding transition originating from the theme-toggle button.

Concept:

User clicks Light

        ●
      ↗ ↑ ↖
   expanding
   color wave
        ↓
  entire interface
  transitions theme

The effect should be subtle and professional.

Use a circular/radial reveal or expanding overlay.

Dark → Light:

A soft warm/off-white light expands from the toggle.

Light → Dark:

A deep navy/charcoal tone expands from the toggle.

Do NOT use a bright white flash.

Do NOT use a flashy animation.

Do NOT make the effect distract from the content.

---

# 03 — THEME COLORS

## DARK MODE

Keep the current dark visual identity:

Background:
#0B1017

Secondary background:
#111923

Cards:
#141D28

Borders:
#263445

Primary text:
#F5F1E8

Secondary text:
#A7ADB5

Accent orange:
#FF6B35

Secondary teal:
#20B8A8

The existing orange/teal identity must remain recognizable.

---

## LIGHT MODE

Create a premium light theme.

Do NOT simply use pure white everywhere.

Use warm/neutral surfaces:

Main background:
#F5F3EE

Secondary background:
#ECEAE4

Cards:
#FFFFFF

Borders:
#D9D6CE

Primary text:
#151922

Secondary text:
#626873

Accent orange:
#E85D2A

Secondary teal:
#159B8F

The Light Mode should feel like the same portfolio,
not like a completely different website.

---

# 04 — PRESERVE BRAND IDENTITY

Dark Mode and Light Mode should share:

- same orange accent
- same teal accent
- same typography
- same spacing
- same component shapes
- same border radius
- same animations
- same layout

Only the visual theme should change.

The website must still clearly feel like the same Mohamed Maklad portfolio.

---

# 05 — NAVBAR TRANSITION

The navbar should transition smoothly.

Dark:

dark transparent/navy background.

Light:

warm/light background.

The logo:

MM

must remain visually strong in both modes.

Theme toggle itself should also animate.

---

# 06 — THEME TOGGLE ANIMATION

Animate the icon inside the toggle.

Dark Mode:

show Sun icon

Light Mode:

show Moon icon

When clicked:

Sun
→ rotate + scale slightly
→ Moon

or:

Moon
→ rotate + scale slightly
→ Sun

Use:

transform + opacity

Duration:

350–500ms

Keep the button compact and premium.

---

# 07 — BACKGROUND TRANSITION

The portfolio currently uses subtle gradients/glows.

Do NOT remove them.

Instead, create light-mode equivalents.

Dark Mode:

deep navy/charcoal
+
subtle teal glow
+
subtle orange glow

Light Mode:

warm gray/cream
+
very subtle teal tint
+
very subtle orange tint

Keep these effects low-contrast.

They should enhance the design without reducing readability.

---

# 08 — CARDS

All cards must transition smoothly.

For example:

Dark card:
#141D28

↓

Light card:
#FFFFFF

Borders should also transition smoothly.

Do NOT allow cards to suddenly disappear or flash.

Maintain:

border-radius
padding
shadows
spacing
layout

---

# 09 — HERO HANGING ID CARD

The hanging portrait card must also transition with the theme.

Dark:

dark premium ID-card appearance.

Light:

light premium ID-card appearance.

Keep:

- rope
- hanger
- portrait
- card interaction
- spring physics
- drag interaction

Do NOT remove the hanging-card animation.

Only adapt its colors and surface to the active theme.

---

# 10 — SKILLS TICKER

The animated skills ticker must transition too.

Dark:

dark navy surface
+
orange icons
+
cream text

Light:

light neutral surface
+
orange icons
+
dark text

The ticker animation itself must NOT restart when the theme changes.

It should continue moving seamlessly.

---

# 11 — BUTTONS

Primary CTA:

Dark:
orange background
cream/white text

Light:
orange background
white text

Secondary CTA:

Dark:
dark card
light text

Light:
white card
dark text

Add a subtle transition to hover states as well.

---

# 12 — INPUTS / CONTACT FORM

The Get in Touch form must also transition.

Dark:

dark inputs
light text
subtle dark borders

Light:

white inputs
dark text
light borders

Placeholders should remain readable in both themes.

---

# 13 — AVOID THIS

Do NOT:

- flash the entire screen white
- use a simple instant color swap
- make the animation slower than ~700ms
- use excessive blur
- use strong neon effects
- change layout during theme switching
- change font sizes
- change spacing
- move elements
- reload the page
- reset scroll position
- restart unrelated animations

The theme switch should feel like a visual transformation,
not a page reload.

---

# 14 — ACCESSIBILITY / PERFORMANCE

Respect:

prefers-reduced-motion

If the user has reduced motion enabled:

Use a very short/simple color transition
without the expanding reveal.

Do not use heavy JavaScript animation if CSS transitions are sufficient.

Prefer:

CSS variables
+
transition
+
a lightweight theme-reveal effect

The theme switch must remain fast and responsive.

---

# 15 — PERSIST THE SELECTED THEME

Keep the existing theme persistence behavior.

If the user selects Light Mode and refreshes the page:

Light Mode should remain active.

If the user selects Dark Mode and refreshes:

Dark Mode should remain active.

Avoid any visible flash of the wrong theme during page load.

---

# FINAL UX

The desired feeling:

User sees:

[ ☀ Light ]

Clicks it.

The toggle icon smoothly transforms.

A subtle light-colored circular wave expands from the button.

The dark navy interface smoothly transforms into the warm light theme.

Cards, text, borders, Hero, ticker, forms, and backgrounds transition together.

The result should feel:

Premium
Smooth
Modern
Technical
Minimal
Professional

Think of it as a polished portfolio-level theme transition,
not a basic CSS dark-mode toggle.