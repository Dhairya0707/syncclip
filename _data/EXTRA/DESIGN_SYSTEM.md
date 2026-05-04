# SyncClip Design System
## "Editorial Brutalism" — A Complete Design Language Guide

**Version:** 2.0 (Production)  
**Created by:** Design Lead, SyncClip  
**Theme Philosophy:** "The Digital Broadsheet"

> This document is the single source of truth for all visual and interactive decisions in the SyncClip product. Every pixel must be intentional. Every corner must stay sharp. We are not building a generic SaaS dashboard—we are publishing a manifesto.

---

## SECTION 1: THE PHILOSOPHY

### 1.1 Creative North Star
The SyncClip design system is rooted in the tension between **two opposing forces**:
- **High-density information** (like a newspaper front page)
- **Aggressive, structural whitespace** (like a luxury editorial layout)

We call this **"Editorial Brutalism."** It is the visual language of WIRED Magazine, the Bauhaus movement, and early internet terminal interfaces — applied to a modern browser-native tool.

### 1.2 Core Design Beliefs
1. **Depth is flat.** No shadows. No blurs. No gradients. Depth is achieved through layering, contrast, and 1px hairlines — not Z-axis illusions.
2. **Structure is king.** Every element must snap to the invisible grid. Randomness is chaos.
3. **Restraint is power.** Do not use color unless it carries information. Do not round a corner unless structural rules demand it.
4. **Typography is design.** The hierarchy of fonts carries as much weight as layout.
5. **Honest Materials.** Show borders. Show rules. Do not hide the skeleton of the interface.

### 1.3 The "Anti-Pattern" Pledge
This system explicitly rejects:
- ❌ Rounded corners (anything > 0px)
- ❌ Drop shadows or box-shadows
- ❌ Gradients (linear, radial, or otherwise)
- ❌ Soft grays for borders (use black or nothing)
- ❌ Center-aligned long-form body copy
- ❌ More than 3 font families active at once
- ❌ Generic SaaS blue buttons

---

## SECTION 2: COLOR SYSTEM

### 2.1 The Master Palette

The palette is deliberately binary and uncompromising. We operate on a **"Paper & Ink"** philosophy.

| Token Name | Hex Value | RGB | Role |
|---|---|---|---|
| `--color-surface` | `#FFFFFF` | rgb(255,255,255) | The "Paper" — primary page background |
| `--color-ink` | `#000000` | rgb(0,0,0) | The "Ink" — headlines, borders, solid fills |
| `--color-action` | `#057DBC` | rgb(5,125,188) | Action Blue — interactive states only |
| `--color-subtext` | `#474747` | rgb(71,71,71) | Secondary metadata and captions |
| `--color-error` | `#BA1A1A` | rgb(186,26,26) | Error states and alerts |
| `--color-surface-dark` | `#18181B` | rgb(24,24,27) | Rich near-black (zinc-900) for deep containers |
| `--color-surface-mid` | `#27272A` | rgb(39,39,42) | Slightly lighter container fill (zinc-800) |
| `--color-border` | `#000000` | rgb(0,0,0) | All rule lines and hairlines |
| `--color-tag-code` | `#004D26` | rgb(0,77,38) | Semantic tag: CODE type |
| `--color-tag-url` | `#004C8C` | rgb(0,76,140) | Semantic tag: URL type |
| `--color-tag-json` | `#5C3A00` | rgb(92,58,0) | Semantic tag: JSON type |
| `--color-tag-text` | `#3A3A3A` | rgb(58,58,58) | Semantic tag: TEXT type |

---

### 2.2 Tonal Architecture: Dark Mode Surfaces

In the clipboard session view (the "node"), the UI shifts to a rich dark-mode editorial canvas. This is NOT pure black; it is a layered zinc-based system.

| Layer | Token | Hex | Purpose |
|---|---|---|---|
| Page Base | `surface-base` | `#09090B` | Deepest background (zinc-950) |
| Container | `surface-container` | `#18181B` | Cards and panel backgrounds (zinc-900) |
| Elevated Container | `surface-elevated` | `#27272A` | Hovered or focused panels (zinc-800) |
| Border on Dark | `border-dark` | `#3F3F46` | Hairlines on dark backgrounds (zinc-700) |
| Text Primary (Dark) | `text-on-dark` | `#FAFAFA` | Main readable text on dark (zinc-50) |
| Text Secondary (Dark) | `text-on-dark-variant` | `#A1A1AA` | Captions and metadata on dark (zinc-400) |

---

### 2.3 Color Usage Rules

**Action Blue `#057DBC` Rules:**
- Use ONLY for: hover states on buttons, active text links, focused input labels.
- NEVER use as a background fill for large areas.
- It should appear like a highlighter mark — sparse and precise.

**Error Red `#BA1A1A` Rules:**
- Used only for destructive actions (delete, burn session).
- Error messages must be displayed in JetBrains Mono to feel like a "system alert."

**Semantic Tags (Code/URL/JSON/Text):**
- These colors are only used inside the metadata pill component within the ClipboardEditor.
- Background: 10% opacity of the tag color. Text: Full tag color. Border: 1px tag color.

---

## SECTION 3: TYPOGRAPHY

Typography is the **primary engine** of the Editorial Brutalist system. We use a strict four-tier type architecture.

### 3.1 Font Stack

| Tier | Family | Source | Usage |
|---|---|---|---|
| **Display** | Newsreader / Playfair Display | Google Fonts | Lead headlines, H1s, hero copy |
| **Body** | Noto Serif / Lora | Google Fonts | Long-form paragraphs, about pages |
| **UI Affordance** | Space Grotesk / Inter | Google Fonts | Buttons, inputs, nav labels, tags |
| **Technical** | JetBrains Mono | Google Fonts | Code snippets, kickers, metadata, error text |

---

### 3.2 Type Scale

All values in `rem`. Base: 16px.

| Name | Size | Weight | Line Height | Letter Spacing | Font Family | Usage |
|---|---|---|---|---|---|---|
| `display-2xl` | 4.5rem (72px) | 800 | 1.05 | -0.02em | Newsreader | Landing hero H1 |
| `display-xl` | 3rem (48px) | 700 | 1.1 | -0.02em | Newsreader | Section H1s |
| `display-lg` | 2.25rem (36px) | 700 | 1.2 | -0.015em | Newsreader | Card headlines |
| `heading-md` | 1.5rem (24px) | 600 | 1.3 | 0 | Space Grotesk | Sub-headings |
| `heading-sm` | 1.125rem (18px) | 600 | 1.4 | 0 | Space Grotesk | Feature titles |
| `body-lg` | 1.125rem (18px) | 400 | 1.7 | 0 | Noto Serif | Article copy |
| `body-md` | 1rem (16px) | 400 | 1.6 | 0 | Noto Serif | Standard paragraphs |
| `body-sm` | 0.875rem (14px) | 400 | 1.5 | 0 | Inter | Captions, notes |
| `label-lg` | 0.875rem (14px) | 600 | 1 | 0.08em | Space Grotesk | Button text |
| `label-md` | 0.75rem (12px) | 600 | 1 | 0.1em | JetBrains Mono | Ribbon headers, kickers (ALL CAPS) |
| `label-sm` | 0.625rem (10px) | 500 | 1 | 0.12em | JetBrains Mono | Micro-metadata |
| `code-md` | 0.875rem (14px) | 400 | 1.6 | 0 | JetBrains Mono | Code blocks |
| `code-sm` | 0.75rem (12px) | 400 | 1.5 | 0 | JetBrains Mono | Inline code |

---

### 3.3 Typography Rules

1. **Kickers are always `label-md` in JetBrains Mono, ALL CAPS, wide tracking.** They act as anchors above display headlines.
2. **Display text must always have tight tracking** (-0.015em to -0.02em). Loose tracking kills the editorial authority.
3. **Body text must NEVER be center-aligned.** Flush-left only. This maintains the editorial "rag."
4. **All caps text must always have generous letter-spacing (≥ 0.08em).** All caps without tracking is unreadable and looks amateurish.

---

## SECTION 4: SHAPES & GEOMETRY

This section defines the rigid spatial and geometric rules of the system.

### 4.1 Border Radius: The Hard Rule

**Border Radius is globally set to `0px`.**

| Element | Radius |
|---|---|
| Buttons | 0px |
| Input Fields | 0px |
| Cards | 0px |
| Modals / Drawers | 0px |
| Images | 0px |
| Tags / Pills | 0px |
| Tooltips | 0px |
| Progress Bars | 0px |
| Snackbars | 0px |

> There is ONE exception: The "Logo/Icon" mark (SC monogram). The monogram may use circular cropping internally, but its container bounding box remains square.

---

### 4.2 Border System: The Grid Skeleton

Borders are the structural skeleton. They are not decorative.

| Usage | Weight | Color | Style |
|---|---|---|---|
| Standard UI Rule | `1px` | `#000000` | Solid |
| Focused/Active State | `2px` | `#000000` | Solid |
| Error State | `2px` | `#BA1A1A` | Solid |
| Primary Button Border | `2px` | `#000000` | Solid |
| Secondary Button Border | `2px` | `#000000` | Solid |
| Column/Section Divider | `1px` | `#000000` | Solid |
| Dark Mode Grid Rules | `1px` | `#3F3F46` | Solid |
| Ribbon Header Bottom Rule | `2px` | `#000000` | Solid |

**Shadow Policy:** Box-shadows are entirely prohibited. If an element needs "separation," use a border or a contrasting background—never a shadow.

---

### 4.3 Spacing System (8px Grid)

All spacing uses a strict 8px base grid.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro-spacing (icon padding, tag internal) |
| `space-2` | 8px | Tight grouping |
| `space-3` | 12px | Related items |
| `space-4` | 16px | Standard element padding |
| `space-5` | 24px | Section breathing room |
| `space-6` | 32px | Container padding |
| `space-8` | 48px | Large section gaps |
| `space-10` | 64px | Major page section separators |
| `space-12` | 80px | Hero whitespace |
| `space-16` | 128px | Full-page vertical rhythm |

---

## SECTION 5: COMPONENTS

### 5.1 Buttons

**Primary Button**
- Background: `#000000`
- Text: `#FFFFFF`, `label-lg` (Space Grotesk), ALL CAPS
- Border: `2px solid #000000`
- Radius: `0px`
- Padding: `12px 24px`
- Hover State: Background shifts to `#057DBC`, border stays black
- Active State: Background: `#004A73`

**Secondary Button**
- Background: `#FFFFFF`
- Text: `#000000`, `label-lg` (Space Grotesk), ALL CAPS
- Border: `2px solid #000000`
- Radius: `0px`
- Hover State: Background: `#F4F4F5` (zinc-100)

**Destructive Button**
- Background: `#BA1A1A`
- Text: `#FFFFFF`, `label-lg` (JetBrains Mono), ALL CAPS
- Border: `2px solid #BA1A1A`
- Hover State: Background: `#8C0000`

---

### 5.2 Ribbon Headers

The most iconic visual element of the system.

- **Height:** 32px – 48px (depending on hierarchy)
- **Background:** `#000000`
- **Text:** `#FFFFFF`, `label-md` (JetBrains Mono), ALL CAPS, 0.1em tracking
- **Alignment:** Vertically centered, 16px horizontal padding
- **Bottom Rule:** `2px solid #000000` below the ribbon

---

### 5.3 Input Fields & Textarea

**Default State**
- Background: `#FFFFFF`
- Border: `1px solid #000000`
- Text: `body-md` (Noto Serif), `#000000`
- Radius: `0px`

**Focus State**
- Border: `2px solid #000000`
- Label color: `#057DBC`

**Error State**
- Border: `2px solid #BA1A1A`
- Error message: `label-sm` (JetBrains Mono), `#BA1A1A`

**Session Textarea (Dark Mode)**
- Background: `#18181B`
- Border: `1px solid #3F3F46`
- Text: `#FAFAFA`, code-md (JetBrains Mono)
- Resize: `none` — size is always intentional, not flexible

---

### 5.4 Editorial Cards

Cards have no shadows and no background fills of their own.

**Structure:**
- Top: `1px solid #000000` rule
- Body: Kicker (label-md, Mono) → Headline (display-lg, Serif) → Body (body-sm)
- Image: Always rectangular, `0px` radius, `12px` top margin

---

### 5.5 Semantic Type Pill (Payload Tag)

Displays `CODE`, `URL`, `JSON`, or `TEXT` based on clipboard content.

- Shape: Rectangle, 0px radius
- Padding: `2px 8px`
- Typography: `label-sm` (JetBrains Mono), ALL CAPS
- Color system: Each type has its own border and text color (see Section 2.3)
- Background: 10% opacity version of the border color

---

### 5.6 Snackbar / Toast Notification

- Position: Bottom-right, `24px` from edges
- Background: `#000000` (primary dark)
- Text: `#FFFFFF`, `label-md` (JetBrains Mono)
- Border: `2px solid #000000`
- Radius: `0px`
- Animation: Slide in from right, 200ms ease-out. Dismiss after 3s.
- NO rounded corners. NO drop shadow.

---

### 5.7 Command Palette (CMD+K)

- Overlay: `rgba(0,0,0,0.8)` full-screen backdrop
- Panel: `#18181B` background, `2px solid #3F3F46` border
- Input: `border-bottom: 1px solid #3F3F46`, monospace font
- Command items: `label-md` (JetBrains Mono), hover = `#27272A` background
- Keyboard shortcuts: Displayed right-aligned in `label-sm`, `#A1A1AA`

---

### 5.8 Modal / Overlay Panels

- Background: `#18181B`
- Border: `2px solid #000000` (Light mode) / `2px solid #3F3F46` (Dark mode)
- Header: Full Ribbon Header (Black bar, white mono text)
- Body: `16px` padding
- Radius: `0px` always
- Backdrop: Dark semi-transparent overlay, no blur

---

### 5.9 Progress Indicators

Avoid spinning wheels. Use the editorial horizontal progress bar.

- Container: `1px solid #000000`, `height: 4px`, `width: 100%`
- Fill: Solid black fill that grows horizontally
- NO circular loaders unless absolutely necessary (replace with a `[LOADING...]` monospace text state)

---

## SECTION 6: LAYOUT & GRID

### 6.1 Page Grid
- **Columns:** 12-column grid
- **Gutter:** 24px
- **Margin:** 48px (desktop), 16px (mobile)
- **Max content width:** 1200px, centered

### 6.2 Intentional Asymmetry
Use "Ribbon Headers" (full-width black bars) to break vertical rhythm and create visual anchors.

### 6.3 Hairline Column Rules
In multi-column text layouts, separate columns with `1px solid #000000` vertical rules.

### 6.4 Responsive Breakpoints
| Name | Breakpoint | Notes |
|---|---|---|
| Mobile | < 640px | Single column, 16px margins |
| Tablet | 640px – 1024px | Two-column max |
| Desktop | > 1024px | Full 12-column grid |

---

## SECTION 7: ICONOGRAPHY

- **Style:** Line icons only. Stroke weight: 1.5px. NO fill icons.
- **Size Grid:** 16px / 20px / 24px (must snap to these sizes only)
- **Color:** Inherit from text context (`#000000` on light, `#FAFAFA` on dark)
- **Hover:** Icon color transitions to `#057DBC`
- **Source:** Lucide Icons (recommended for consistency)
- **Radius on icons:** 0px bounding box. Soft-curved strokes within the icon are acceptable (circle check, etc.), but the icon container is always square.

---

## SECTION 8: MOTION & ANIMATION

### 8.1 Motion Philosophy
Motion should feel **mechanical and precise**, not playful. Think typewriter, not bounce.

### 8.2 Timing Standards
| Type | Duration | Easing | Usage |
|---|---|---|---|
| Micro-interaction | 100ms | `ease-out` | Button hover, focus ring |
| State transition | 200ms | `ease-in-out` | Panel open/close, snackbar in |
| Page transition | 300ms | `ease-out` | Route changes |
| Burn countdown | 1000ms | `linear` | Self-destruct timer fill |

### 8.3 Allowed Animations
- Slide (X or Y axis) — for drawers, snackbars
- Fade (opacity 0 → 1) — for overlays, modals
- Height collapse — for accordion sections
- Horizontal fill — for progress bars

### 8.4 Prohibited Animations
- ❌ Bounce / spring physics
- ❌ Scale/zoom effects on UI elements
- ❌ Rotation (except for loading state where no alternative exists)
- ❌ Blur transitions

---

## SECTION 9: BRANDING & LOGO

### 9.1 Logo Mark
- **Style:** "SC" Interlocking Monogram
- **Aesthetic:** Premium Editorial Brutalist (sharp, geometric)
- **Primary Usage:** Favicon, Apple Touch Icon, PWA icon, browser tab
- **Text-only Wordmark:** `SYNCCLIP` in JetBrains Mono, wide tracking (0.15em), all caps — used in the main navigation header
- **Color:** Black on white / White on black. Never the Action Blue.

### 9.2 Brand Voice (for AI context)
- **Tone:** Confident, precise, no fluff.
- **Language style:** Technical but accessible. Like a senior engineer writing documentation.
- **Avoid:** Exclamation marks, fluffy adjectives, startup jargon.

---

## SECTION 10: CSS VARIABLES (IMPLEMENTATION REFERENCE)

```css
:root {
  /* Colors */
  --color-surface: #ffffff;
  --color-ink: #000000;
  --color-action: #057dbc;
  --color-subtext: #474747;
  --color-error: #ba1a1a;
  --color-surface-dark: #18181b;
  --color-surface-mid: #27272a;
  --color-border: #000000;
  --color-border-dark: #3f3f46;
  --color-text-on-dark: #fafafa;
  --color-text-variant-dark: #a1a1aa;

  /* Typography */
  --font-display: 'Newsreader', 'Playfair Display', Georgia, serif;
  --font-body: 'Noto Serif', 'Lora', Georgia, serif;
  --font-ui: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing (8px grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-8: 48px;
  --space-10: 64px;
  --space-12: 80px;
  --space-16: 128px;

  /* Borders */
  --border-hairline: 1px solid #000000;
  --border-standard: 2px solid #000000;
  --border-error: 2px solid #ba1a1a;
  --border-dark-hairline: 1px solid #3f3f46;

  /* Border Radius */
  --radius: 0px; /* GLOBAL — NO EXCEPTIONS */

  /* Animation */
  --duration-micro: 100ms;
  --duration-state: 200ms;
  --duration-page: 300ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## SECTION 11: DO'S AND DON'TS

### ✅ Always DO
- Use 0px border-radius on every interactive element.
- Use `label-md` JetBrains Mono in ALL CAPS for ribbon headers and kickers.
- Let whitespace be a structural, intentional element.
- Separate multi-column layouts with 1px solid black rules.
- Treat errors as system alerts — monospace, red, never a soft "oops" in serif.
- Keep information density high on session views. This is a tool, not a marketing page.

### ❌ Never DO
- Apply shadows of any kind — `box-shadow`, `drop-shadow`, `text-shadow`.
- Use any color outside the defined palette without explicit approval.
- Center-align body paragraphs.
- Use `border-radius > 0px` on any component.
- Use a gradient anywhere in the UI.
- Use the Action Blue `#057DBC` as a large background fill.
- Use a "soft gray" border — if it needs a border, it uses full black.
- Animate using spring/bounce physics.

---

*"This system is about confidence. When you place a 2px border or a massive serif headline, do it with conviction. Brutalism isn't about being ugly — it's about being honest with the digital medium."*

— SyncClip Design System, v2.0
