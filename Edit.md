# Hero Section Final Refinement (Production Ready)

## Objective

The Hero section is almost finished.

Do NOT redesign the Hero.

Do NOT change the visual style.

Keep the current:

- Colors
- Typography
- Animations
- Background
- Components
- Branding

The goal is only to improve layout, spacing, alignment, responsiveness, and visual balance.

---

# Keep Existing Structure

Reuse the current Hero component.

Do NOT rebuild it from scratch.

Keep:

- Navigation
- Hero Content
- Profile Image
- Floating Skill Cards
- Buttons
- Social Links

Only improve positioning and responsiveness.

---

# Hero Container

The Hero should be centered inside a fixed container.

```css
max-width: 1400px;
width: 100%;
margin: 0 auto;
padding-inline: clamp(24px,4vw,48px);
min-height: calc(100vh - 80px);

display: flex;
align-items: center;
justify-content: center;
gap: 64px;
```

Never stretch the Hero across the full viewport.

Avoid large empty spaces.

---

# Layout

The Hero should NOT feel like two disconnected columns.

Instead it should feel like one connected composition.

The profile image should sit naturally beside the content.

Reduce the empty space between both sections by approximately **180px**.

---

# Left Section

Width:

```css
max-width:560px;
flex-shrink:0;
```

Keep:

- Name
- Title
- Description
- Buttons
- Social Links

Do NOT change the order.

Everything remains left aligned.

---

# Typography

Responsive typography.

```css
Name:
font-size:clamp(4rem,6vw,5.5rem);

Title:
font-size:clamp(1.5rem,2vw,2rem);

Description:
font-size:clamp(1rem,1.25vw,1.15rem);
```

Never clip or wrap the title.

---

# Buttons

Desktop:

Buttons stay side-by-side.

```css
display:flex;
gap:16px;
flex-wrap:nowrap;
```

Tablet & Mobile:

Stack vertically.

Buttons become full width.

---

# Social Links

Desktop

One row if possible.

Tablet

Wrap naturally.

Mobile

Responsive grid.

---

# Right Section

The right section currently feels too large and too far away.

Reduce its visual width.

Target width:

```css
520px
```

Move it closer to the left section.

Everything inside should move together.

---

# Image Container

Wrap the image and floating cards inside one container.

```css
.image-container{
position:relative;
width:520px;
height:620px;

display:flex;
justify-content:center;
align-items:center;
}
```

The image container should be centered.

---

# Profile Image

Target:

```css
height:560px;
width:auto;
max-width:100%;
object-fit:contain;
```

Requirements:

- Full body visible
- No clipping
- No rounded frame
- No square container
- Natural shadow beneath image
- Blend naturally into the background

---

# Floating Skill Cards

IMPORTANT

Every floating card MUST be positioned relative to

.image-container

Never relative to the Hero.

Use

```css
position:absolute;
```

for every card.

---

# Floating Card Positions

Arrange them around the image.

```
              Python

SQL Database        Power BI

ETL Pipelines    Machine Learning

        Profile Image

Excel               Tableau

             Azure
```

Rules:

- Minimum 40px from the body.
- Never overlap the image.
- Never cover the face.
- Equal spacing.
- Move together with the image container.

---

# Card Design

Every card:

```css
width:170px;
height:56px;

padding:14px 20px;

border-radius:18px;

display:flex;
align-items:center;
gap:12px;
```

Icons

```css
18px;
```

Text

```css
15px;
font-weight:600;
```

---

# Floating Animation

Keep the current animation.

Requirements:

- translateY(8px)
- duration 5s
- ease-in-out
- infinite
- different delay

Hover

- scale(1.05)
- subtle glow
- pause floating animation

---

# Background

Keep the current background.

Only enhance with:

- subtle stars
- radial glow
- tiny particles

No heavy effects.

---

# Responsive Design

## Large Desktop (≥1440px)

- Hero centered.
- Compact layout.
- Left and right sections close together.
- No excessive whitespace.

---

## Laptop (1024px–1439px)

- Reduce image to 520px.
- Reduce spacing between cards.
- Maintain side-by-side layout.

---

## Tablet (768px–1023px)

Layout:

```
Text

↓

Image

↓

Skill Cards (2-column grid)

↓

Buttons

↓

Social Links
```

Remove absolute positioning.

Cards become:

```css
display:grid;
grid-template-columns:repeat(2,1fr);
gap:16px;
```

---

## Mobile (<768px)

Layout:

```
Name

↓

Title

↓

Description

↓

Image

↓

Skill Cards

↓

Buttons

↓

Social Links
```

Requirements:

- No horizontal scrolling.
- No clipping.
- Image width 80–90%.
- Buttons full width.
- Social links wrap.
- Skill cards become responsive grid.
- Use clamp() for all typography.
- Proper touch spacing.

---

# Performance

- No layout shift.
- No overflow.
- No clipping.
- Lazy-load images.
- Smooth animations.
- High Lighthouse performance.

---

# Final Goal

The Hero should look like a premium portfolio landing page.

Requirements:

- Keep the current design language.
- Bring the left and right sections closer together.
- Remove unnecessary empty space.
- Keep the profile image slightly smaller than it is now.
- Keep floating cards attached to the image.
- Perfect spacing and alignment.
- Fully responsive on Desktop, Laptop, Tablet, and Mobile.
- Production-ready layout.

IMPORTANT:
Do not simply scale elements down. Fix the layout by improving the container width, spacing, alignment, and proportions while preserving the current visual design.