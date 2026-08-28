# HERO — MOVE THE SKILLS TICKER LOWER

Update ONLY the Hero section.

The current skills ticker design is good.
Do NOT redesign it.

The only issue is its vertical position.

---

## 01 — MOVE THE TICKER DOWN

Move the skills ticker lower vertically.

Currently the ticker starts immediately at the bottom edge of the Hero content.

Add more vertical breathing room before the ticker.

The visual structure should become:

Hero Content
        ↓
   clear empty space
        ↓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       SKILLS TICKER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The ticker should NOT touch the social links,
portrait card, or bottom of the main Hero content.

---

## 02 — DESKTOP

On desktop:

Add approximately:

40–60px

of vertical separation between the main Hero content area and the ticker.

The ticker should remain at the bottom of the Hero,
but its STARTING EDGE should visually sit lower.

Do NOT increase the Hero content height unnecessarily.

Do NOT push the main content upward.

Do NOT move the navbar.

---

## 03 — PORTRAIT RELATIONSHIP

The portrait card should remain completely above the ticker.

There should be a visible gap between:

Portrait card bottom
↓
40–60px
↓
Skills ticker

The ticker must NEVER overlap the portrait.

---

## 04 — LEFT CONTENT RELATIONSHIP

The social buttons should remain above the ticker.

There should be a comfortable gap between:

Social buttons
↓
40–50px
↓
Skills ticker

Do NOT make the social buttons touch the ticker.

---

## 05 — TICKER POSITIONING

Prefer this structure:

.hero
  ├── .hero-main
  │     ├── .hero-content
  │     └── .portrait-card
  │
  └── .skills-ticker

The ticker should be a separate block at the bottom of the Hero.

Do NOT use absolute positioning that causes overlap.

Avoid:

position: absolute

for the ticker if it causes layout problems.

Prefer normal document flow / flex layout.

---

## 06 — IMPORTANT

Do NOT make the ticker itself taller just to create spacing.

Keep its current height.

Only increase the vertical gap BEFORE the ticker.

Current ticker height is good.

---

## 07 — MOBILE

On mobile, preserve the same concept.

The order should remain:

Social Links
↓
Portrait Card
↓
40–60px spacing
↓
Skills Ticker

The ticker should clearly begin below the portrait.

Do NOT allow the ticker to overlap the portrait.

---

## 08 — FINAL VISUAL RESULT

Desktop:

┌──────────────────────────────────────────┐
│              HERO                        │
│                                          │
│  Content                    Portrait      │
│                                          │
│  Buttons                                  │
│  Social Links                             │
│                                          │
│             breathing room               │
│                                          │
├──────────────────────────────────────────┤
│  Python · SQL · Power BI · Tableau ...  │
└──────────────────────────────────────────┘

The ticker should feel like a separate,
intentional technology strip attached to the Hero.

Do NOT change:

- ticker colors
- ticker icons
- ticker animation
- ticker content
- portrait design
- typography
- buttons
- navbar

ONLY fix the vertical spacing and positioning.