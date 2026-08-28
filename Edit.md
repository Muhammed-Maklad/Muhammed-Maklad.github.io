# DARK MODE FIX — CRITICAL

The current Dark Mode implementation is visually incorrect.

The problem is NOT the overall color palette.

The problem is the CONTRAST and SURFACE SYSTEM.

The current Dark Mode looks like a Light Mode interface placed on a dark background.

This must be fixed.

---

# 01 — DARK MODE MUST BE A TRUE DARK THEME

Do NOT simply change the page background to dark.

Every UI layer must have an appropriate dark-mode value.

The hierarchy should be:

PAGE BACKGROUND
↓
CARD SURFACE
↓
ELEVATED SURFACE
↓
BORDER
↓
PRIMARY TEXT
↓
SECONDARY TEXT
↓
ACCENT

---

# 02 — DARK BACKGROUND

Use:

#0D1117

This is the primary page background.

Do NOT use pure black #000000.

The background should feel like:

deep ink / deep navy

not pure black.

---

# 03 — CARD BACKGROUND

Use:

#151C26

All major cards should use this surface.

Examples:

- Skill cards
- Project cards
- Experience cards
- Problem-solving cards
- Content containers
- Interactive panels

Cards must be visibly distinguishable from the page background.

---

# 04 — ELEVATED SURFACE

For elements that need additional hierarchy:

#1B2430

Use for:

- Hover states
- Expanded content
- Interactive elements
- Important panels
- Dropdowns
- Modal-like elements

---

# 05 — PRIMARY TEXT

THIS IS CRITICAL.

In Dark Mode:

Primary text MUST NOT be black.

Use:

#F4F0E8

for:

- Main headings
- Project titles
- Navigation
- Important numbers
- Button text
- Primary labels

NEVER use:

#171717

or any other dark text on dark-mode surfaces.

---

# 06 — SECONDARY TEXT

Use:

#A9A49C

for:

- Paragraphs
- Descriptions
- Metadata
- Supporting information

Secondary text must remain clearly readable.

Do not make body text too dim.

---

# 07 — BORDER

Use:

#293544

for subtle borders.

Borders should be visible enough to separate surfaces but should NOT look bright.

---

# 08 — PRIMARY ACCENT

Use:

#FF6B35

This is the primary brand accent in Dark Mode.

Use it for:

- CTA buttons
- Active navigation
- Important numbers
- Section labels
- Links
- Hover states
- Small highlights
- Indicators

Orange should remain the strongest accent.

---

# 09 — SECONDARY ACCENT

Use:

#32B5A6

for:

- Analytics-related elements
- Secondary interactions
- Supporting data visualization
- Secondary highlights

Use it sparingly.

---

# 10 — TECHNICAL ACCENT

Use:

#6EA8D8

for:

- Technical elements
- Code-related UI
- Data engineering
- Supporting visualization

Do not overuse it.

---

# 11 — ABSOLUTELY NO BLACK TEXT IN DARK MODE

This is a hard rule.

In Dark Mode:

DO NOT use:

#000000

#111111

#171717

#1A1A1A

or any dark gray as primary text.

Dark text on dark surfaces is unacceptable.

---

# 12 — NAVIGATION DARK MODE

Navbar:

Background:
#0D1117

or a slightly elevated version:

#151C26

Navigation text:

#F4F0E8

Inactive navigation:

#A9A49C

Hover:

#FF6B35

Active:

#FF6B35

The navbar must remain readable.

---

# 13 — BUTTONS DARK MODE

Primary button:

Background:
#FF6B35

Text:
#FFFFFF

Hover:
#FF8557

Secondary button:

Background:
transparent

Border:
#293544

Text:
#F4F0E8

Hover:

#1B2430

Do not use dark text on orange buttons if contrast is insufficient.

---

# 14 — CARDS DARK MODE

Cards should look like actual dark UI surfaces.

Correct:

Page:
#0D1117

Card:
#151C26

Elevated:
#1B2430

Text:
#F4F0E8

Border:
#293544

Incorrect:

Page:
#0D1117

Card:
#555555

Text:
#111111

NEVER create gray cards with black text.

---

# 15 — PROJECTS DARK MODE

Project cards must remain dark.

Use:

Background:
#151C26

Project title:
#F4F0E8

Description:
#A9A49C

Tags:
#1B2430

Tag text:
#A9A49C

Accent:
#FF6B35

Real project screenshots should remain authentic.

Do not apply dark filters that destroy the screenshots.

---

# 16 — TECHNICAL SKILLS DARK MODE

The skill system should NOT become a collection of gray cards.

Use:

Background:
#0D1117

Skill surface:
#151C26

Primary text:
#F4F0E8

Secondary:
#A9A49C

Accent:
#FF6B35

Supporting:
#32B5A6
#6EA8D8

Keep the visual hierarchy subtle.

---

# 17 — PROBLEM SOLVING DARK MODE

The LeetCode and Codeforces panels should use dark surfaces.

LEETCODE:

Surface:
#151C26

Accent:
#FF6B35

Code background:
#0D1117

Text:
#F4F0E8

CODEFORCES:

Surface:
#151C26

Accent:
#32B5A6

Code background:
#0D1117

Text:
#F4F0E8

The code background should be subtle.

The large number must be the visual focus.

---

# 18 — CODE BACKGROUND

For the LeetCode / Codeforces background:

Use actual code-like visual texture.

It should be:

- Low opacity
- Dark
- Slightly blurred
- Subtle
- Non-distracting

The code should never interfere with the statistic.

---

# 19 — LIGHT MODE MUST REMAIN

Do NOT break the Light Mode while fixing Dark Mode.

Light Mode:

Background:
#F7F3EC

Surface:
#EEE8DE

Primary Text:
#171717

Secondary Text:
#625E58

Border:
#D8D0C5

Primary Accent:
#E85D2A

Analytics:
#167C78

Technical:
#19324A

---

# 20 — LIGHT AND DARK MUST FEEL LIKE ONE BRAND

Light Mode:

WARM
EDITORIAL
CLEAN

Dark Mode:

DEEP
TECHNICAL
PREMIUM

But both must clearly belong to the same portfolio.

The brand color remains ORANGE in both themes.

---

# 21 — NO PURPLE

Remove purple completely.

No:

- Purple
- Violet
- Magenta
- Lavender
- Purple gradients
- Purple glow

The previous purple-heavy UI is rejected.

---

# 22 — NO RANDOM COLORS

Do not introduce arbitrary colors.

Every UI color should come from the design system.

Exception:

Actual colors inside real project screenshots / external brand assets.

Do not recolor those assets.

---

# 23 — CONTRAST REQUIREMENT

Before considering Dark Mode complete, inspect every section.

Check:

- Navbar
- Hero
- Buttons
- Cards
- Project cards
- Skill elements
- Tags
- Experience
- Awards
- Problem Solving
- Contact
- Footer

Primary text must be highly readable.

Secondary text must remain readable.

Borders must provide enough separation.

Interactive states must be obvious.

---

# 24 — VISUAL TEST

Dark Mode should look approximately like:

BACKGROUND
████████
#0D1117

CARD
████████
#151C26

ELEVATED
████████
#1B2430

TEXT
████████
#F4F0E8

SECONDARY
████████
#A9A49C

ORANGE
████████
#FF6B35

TEAL
████████
#32B5A6

BLUE
████████
#6EA8D8

---

# FINAL RULE

Do not redesign the website.

Do not change the layout.

Do not change the sections.

Do not change the content.

Do not change the overall visual identity.

ONLY fix the Light/Dark color implementation.

The Dark Mode must look like a professionally designed dark interface, NOT a light interface with a dark background.

Most importantly:

# DARK BACKGROUND + DARK SURFACE + LIGHT TEXT

NOT:

# DARK BACKGROUND + GRAY CARD + BLACK TEXT