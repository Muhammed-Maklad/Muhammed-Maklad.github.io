# HERO — PROFESSIONAL COPY + TYPOGRAPHY + REALISTIC HANGING CARD PHYSICS

Update ONLY the Hero section.

Do not redesign the rest of the website.

The Hero should communicate:
- technical capability
- business impact
- analytical thinking
- professionalism

Keep the design minimal and premium.

---

## 01 — REPLACE THE HERO DESCRIPTION

Remove the current sentence:

"Turning data into decisions that move businesses forward."

Replace it with EXACTLY:

"Building data solutions that turn complex information into measurable business value."

This is the final copy.

Do not add another sentence underneath it.

Do not add marketing buzzwords.

Do not use words such as:
- innovative
- cutting-edge
- next-generation
- revolutionary
- AI-powered

The tone should feel confident, technical, and business-focused.

---

# 02 — TYPOGRAPHY

The sentence should look like a strong professional statement, NOT a normal paragraph.

Desktop:

font-size: 23px
font-weight: 500
line-height: 1.55
letter-spacing: -0.01em
max-width: 650px

Mobile:

font-size: 17px
line-height: 1.55
max-width: 350px

Use the same primary font already used by the portfolio.

Do not introduce a new font family.

---

# 03 — TEXT COLOR HIERARCHY

Do NOT make the whole sentence orange.

Use:

"Building data solutions that turn complex information into"

→ warm off-white:
#F5F1E8

Highlight:

"measurable business value."

→ primary orange:
#FF6B35

The orange highlight should feel intentional and premium.

Do NOT highlight every keyword.

---

# 04 — BETTER LINE BREAK

Desktop should visually read approximately:

Building data solutions that turn complex information into
measurable business value.

Avoid awkward line wrapping.

Use max-width rather than manually inserting <br> tags unless absolutely necessary.

On mobile allow natural wrapping.

---

# 05 — HANGING ID CARD INTERACTION

Keep the professional portrait inside the hanging ID-card frame.

The user should be able to physically grab the card using:

- mouse
- trackpad
- touch

and drag it slightly.

The interaction should feel like a real hanging card.

Do NOT make it behave like a draggable UI window.

It should feel physical.

---

# 06 — DRAG RANGE

Desktop:

X movement:
maximum ±35px

Y movement:
maximum ±45px

Rotation:
maximum ±5deg

Mobile:

X:
maximum ±20px

Y:
maximum ±30px

Rotation:
maximum ±3deg

Keep the movement constrained.

The card must never leave the Hero composition.

---

# 07 — CARD SPRING PHYSICS

Use spring physics instead of simple CSS transitions.

When the user drags:

the card follows the pointer naturally.

When the user releases:

the card should smoothly return toward its resting position.

Use:

- spring damping
- slight inertia
- smooth interpolation
- subtle overshoot

The return motion should feel like a real lightweight card hanging from a cable.

Avoid:

linear movement
instant snapping
excessive bouncing

The animation should be smooth and premium.

---

# 08 — IMPORTANT: THE CABLE MUST MOVE

The cable is a major part of the interaction.

Do NOT simply animate the card while keeping the cable static.

The cable must dynamically react to the card position.

Structure:

TOP ANCHOR
     │
     │
     │
   CARD

When the card moves right:

TOP ANCHOR
     \
      \
       CARD

When the card moves left:

TOP ANCHOR
     /
    /
   CARD

The cable should continuously point toward the card's current attachment point.

---

# 09 — REALISTIC CABLE PHYSICS

The cable should behave like a flexible hanging wire/string.

Do NOT use a rigid straight line.

Use one of these approaches:

Preferred:

SVG path controlled by the card position.

OR:

a dynamically calculated curved path using Bézier curves.

The cable should have:

- subtle curvature
- smooth interpolation
- slight elastic movement
- smooth return after release

The cable should lag behind the card by a very small amount.

This creates a believable physical effect.

---

# 10 — CABLE MOVEMENT

During drag:

card moves first
↓
cable follows with slight delay
↓
cable bends naturally
↓
card rotation responds to movement

On release:

card returns using spring physics
↓
cable follows naturally
↓
both settle at the same time

Do NOT animate the cable independently.

The cable position must be derived from the card's actual position.

---

# 11 — CABLE DETAILS

Keep the cable thin and premium.

Recommended:

width:
2px

Color:
rgba(170,180,195,0.65)

Add a very subtle highlight.

Do not use bright orange for the entire cable.

Orange should only appear in the small connector/metal accent.

---

# 12 — TOP HANGER

Keep the small top-mounted hanger.

Refine it so it looks like a real mounting point.

Structure:

small metallic anchor
↓
short cable
↓
small connector
↓
ID card

Use subtle shadows and highlights.

The connector can use the orange accent:

#FF6B35

But keep it restrained.

---

# 13 — CARD ROTATION

Rotation must be derived from drag velocity/direction.

Example:

drag right:

rotate slightly clockwise

drag left:

rotate slightly counter-clockwise

Fast drag:

slightly stronger rotation

Slow drag:

minimal rotation

Clamp rotation to:

±5deg desktop
±3deg mobile

---

# 14 — CARD RESTING POSITION

The card should always have a clear default position.

When the page loads:

card is centered in its Hero visual area.

Cable is perfectly aligned.

No unnecessary movement.

After interaction:

card always returns to the same resting position.

---

# 15 — HOVER STATE

Before dragging:

cursor:
grab

On drag:

cursor:
grabbing

Add only a subtle elevation change.

Example:

slightly stronger shadow
slightly higher visual depth

Do NOT add:

large glow
scale animation
neon effect

---

# 16 — TOUCH SUPPORT

Use Pointer Events rather than separate mouse/touch implementations.

Support:

pointerdown
pointermove
pointerup
pointercancel

Prevent unwanted horizontal page scrolling ONLY while actively dragging the card.

Do not disable normal page scrolling.

---

# 17 — ACCESSIBILITY

The interaction must not be required to understand the portfolio.

If dragging is unavailable:

the card should still look completely normal.

Respect:

prefers-reduced-motion

When reduced motion is enabled:

disable spring/swing animation
disable decorative movement
keep the card static.

---

# 18 — CARD VISUAL DESIGN

Keep the current ID-card concept but improve its visual quality.

Background:

#141C27

Border:

rgba(120,135,155,0.25)

Border radius:

24px

Subtle shadow.

Very subtle internal gradient.

Very subtle technical pattern.

Avoid excessive grid lines.

The portrait remains the visual focus.

---

# 19 — PORTRAIT

Keep the existing portrait.

Do not modify the person's appearance.

Keep the image naturally centered.

Avoid:

cropping the face
excessive empty space
unnatural scaling
floating appearance

The bottom of the portrait can subtly fade into the card background.

---

# 20 — HERO BALANCE

The final Hero composition should be:

LEFT:

Open to New Opportunities

Mohamed
Maklad

[Animated professional title]

Building data solutions that turn complex information into
measurable business value.

[Download CV] [View Projects]

[LinkedIn] [GitHub] [LeetCode] [Email] [WhatsApp]


RIGHT:

Professional hanging ID card

        |
        |
      ┌───────┐
      │       │
      │PHOTO  │
      │       │
      └───────┘

Bottom:

Animated Skills Ticker

Python · SQL · Power BI · Tableau · Excel · Azure ·
Power Query · DAX · SSIS · ETL · PyTorch · TensorFlow · ...

---

# 21 — DO NOT CHANGE

Do NOT bring back floating skill cards.

Do NOT add unnecessary decorative elements.

Do NOT add another paragraph.

Do NOT change the existing navigation.

Do NOT change the CTA structure.

Do NOT change the overall dark theme.

Do NOT introduce purple.

Keep:

Orange:
#FF6B35

Teal:
#27B3A6

Background:
#0B1017

Surface:
#141C27

Text:
#F5F1E8

Muted:
#A7A9AD

---

# 22 — FINAL QUALITY TARGET

The Hero should feel like:

A premium Data / BI / Engineering portfolio.

The card interaction should feel:

physical
subtle
responsive
realistic

The cable should feel physically connected to the card.

The text should feel:

professional
confident
clear
business-oriented

Avoid making the Hero look like a flashy gaming website.

The result should communicate:

"I build reliable data solutions that create real business value."

without literally using that sentence.