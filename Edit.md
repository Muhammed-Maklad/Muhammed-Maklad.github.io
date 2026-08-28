# HERO — FINAL LAYOUT / VIEWPORT REFINEMENT

Update ONLY the Hero section.

The goal is to make the entire Hero composition visible within the first viewport on desktop, while keeping the current premium design.

Do NOT redesign the Hero from scratch.

---

## 01 — PUT THE FULL NAME ON ONE LINE

Currently:

Mohamed
Maklad

Change it to:

Mohamed Maklad

Keep the name on ONE SINGLE LINE on desktop.

Do NOT use a <br> between Mohamed and Maklad.

Desktop:

font-size:
clamp(64px, 6vw, 96px)

font-weight:
800–900

letter-spacing:
-0.04em

white-space:
nowrap

Make sure the name fits comfortably within the left Hero column.

Do NOT make it so large that it collides with the right portrait/card.

The name remains the strongest visual element in the Hero.

---

## 02 — RESPONSIVE NAME BEHAVIOR

Desktop / large screens:

Mohamed Maklad
→ one line

Tablet:

Allow one line if the available width allows it.

Mobile:

The name may wrap into two lines if necessary.

Do NOT force horizontal scrolling.

Do NOT shrink the desktop typography excessively just to keep one line on very small screens.

---

# 03 — MOVE THE SKILLS TICKER UP

The skills ticker currently sits too low.

Move it upward so that it is visible inside the initial Hero viewport.

The user should NOT need to scroll to discover the skills ticker.

Target structure:

NAVBAR
↓
HERO CONTENT
↓
SKILLS TICKER

The ticker should sit immediately after the Hero content with a controlled amount of spacing.

---

## 04 — SKILLS TICKER POSITION

Desktop:

The bottom of the ticker should remain inside the first viewport.

Use approximately:

margin-top:
20–28px

The ticker should NOT create a large empty gap between the Hero content and the ticker.

The Hero should feel like one complete composition.

---

## 05 — REDUCE HERO HEIGHT

Do NOT use an unnecessarily tall:

min-height: 100vh

if it causes the skills ticker to fall below the fold.

Instead, calculate the Hero height around:

navbar
+
hero content
+
skills ticker

The complete composition should fit comfortably within the first desktop viewport.

Target:

100vh
minus navbar height

with the ticker included inside the visible composition.

Avoid vertical scrolling immediately after page load.

---

# 06 — DESKTOP COMPOSITION

The intended visual hierarchy:

┌─────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Open to New Opportunities        ┌──────────────────────┐   │
│                                   │                      │   │
│  Mohamed Maklad                   │    HANGING CARD      │   │
│                                   │       PORTRAIT       │   │
│  DATA ANALYTICS SPECIALIST        │                      │   │
│                                   └──────────────────────┘   │
│  I build with data, engineer...                              │
│                                                             │
│  [Download CV] [View Projects]                              │
│                                                             │
│  [LinkedIn] [GitHub] [LeetCode] [Email] [WhatsApp]         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ● Python · ● SQL · ● Power BI · ● Tableau · ● Excel ...  │
└─────────────────────────────────────────────────────────────┘

Everything above the ticker should feel compact and balanced.

---

# 07 — LEFT COLUMN

Because the name is now one line, rebalance the left column.

Do NOT simply shrink everything.

Use the extra horizontal space to create better visual balance.

Recommended:

Hero left width:
52–55%

Hero right width:
45–48%

Keep sufficient spacing between the text and hanging card.

---

# 08 — RIGHT HANGING CARD

Keep the existing hanging ID-card design.

Do NOT remove:

- rope
- hanger
- card
- portrait
- subtle interaction
- spring physics

However, slightly reduce its overall size if necessary to ensure the complete Hero + ticker fits within the viewport.

Desktop card target:

width:
360–420px

height:
520–600px

Keep it visually dominant.

Do NOT make it tiny.

---

# 09 — VERTICAL ALIGNMENT

Align the Hero content vertically around the visual center of the available Hero area.

Do NOT push the content too far downward.

The availability badge, name, title, statement, CTA, and social links should form a compact vertical rhythm.

Recommended approximate spacing:

Badge → Name:
28–34px

Name → Title:
24–30px

Title → Statement:
18–24px

Statement → CTA:
26–30px

CTA → Social:
18–22px

Social → Skills ticker:
22–28px

Avoid huge vertical gaps.

---

# 10 — SKILLS TICKER

Keep the existing animated ticker.

Keep:

- icons
- skill names
- separators
- infinite movement
- seamless loop

Skills should include:

Python
SQL
Power BI
Tableau
Excel
Azure
Power Query
DAX
SSIS
ETL
PyTorch
TensorFlow
Scikit-Learn
Data Modeling

The ticker should be clearly visible in the initial viewport.

---

# 11 — TICKER VISUAL SIZE

Do not make the ticker too thin.

Keep it visually noticeable.

Recommended:

height:
64–76px

icons:
20–22px

skill text:
16–18px

font-weight:
600–700

The ticker should feel like a deliberate part of the Hero rather than a footer-like strip.

---

# 12 — TICKER COLORS

Background:

#141C27

Text:

#F5F1E8

Icons:

#FF6B35

Separators:

rgba(255,107,53,0.45)

Keep the existing dark/orange/teal visual identity.

---

# 13 — IMPORTANT VIEWPORT REQUIREMENT

At common desktop resolutions such as:

1366 × 768
1440 × 900
1536 × 864

the user should immediately see:

✓ Navbar
✓ Full "Mohamed Maklad" name
✓ Professional title
✓ Hero statement
✓ CTA buttons
✓ Social links
✓ Hanging portrait card
✓ Skills ticker

WITHOUT scrolling.

This is the primary requirement.

---

# 14 — MOBILE

Do NOT try to force the desktop composition into mobile.

Mobile should remain vertically stacked.

Recommended:

Availability badge
↓
Mohamed Maklad
↓
Animated title
↓
Hero statement
↓
CTA
↓
Social links
↓
Hanging card
↓
Skills ticker

The ticker can appear after the card on mobile if necessary.

The main requirement to keep the ticker above the fold applies primarily to desktop/tablet.

---

# 15 — DO NOT CHANGE

Do NOT change:

- Hero copy
- "I build with data, engineer with purpose, and solve for impact."
- Animated title
- Portrait
- Hanging-card interaction
- Rope physics
- CTA buttons
- Social links
- Navbar
- Overall color palette
- Skills data

Only improve:

- name layout
- vertical spacing
- Hero height
- ticker position
- viewport composition
- responsive sizing

---

# FINAL RESULT

The Hero should feel significantly more compact and intentional.

The user's first impression should be:

Mohamed Maklad
↓
Data / Engineering identity
↓
Clear positioning statement
↓
Professional portrait
↓
Actions
↓
Skills

Everything important should be visible immediately without requiring the user to scroll.

Most importantly:

"MOHAMED MAKLAD" MUST BE ON ONE LINE ON DESKTOP.

The SKILLS TICKER MUST BE VISIBLE AT THE BOTTOM OF THE FIRST VIEWPORT.