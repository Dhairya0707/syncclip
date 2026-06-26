# Design System: High-Density Editorial Brutalism

This document outlines the visual identity and styling directives for SyncClip. Every component, page, and state must adhere to this system to maintain visual coherence.

---

## 1. Creative Philosophy: "The Digital Broadsheet"

SyncClip rejects the soft, round, gradient-filled styles of modern SaaS in favor of the raw, high-contrast, structured feel of mid-century newspapers combined with early digital publications. 

### Core Design Pillars
1. **Flat Depth**: Shadows are strictly prohibited. Depth is achieved via layering, thick borders, and contrasting backgrounds (e.g., solid black bars against white).
2. **Sharp Geometry**: A global `border-radius` of `0px` is enforced on every card, button, modal, input, and image. No exceptions.
3. **Rigid Grids**: Structure is built with 1px black hairline rules (`outline`). These rule lines act as the canvas skeleton rather than soft spacers.
4. **Whitespace Tension**: High density of raw text balanced against aggressive, intentional blocks of blank space.

---

## 2. Color Palette & Tonal System

The color palette is minimalist and binary.

| Role | Design Token | Hex Code | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `surface` | `#ffffff` | The main "paper" background. |
| **Ink** | `primary` | `#000000` | Headlines, borders, and solid ribbon backgrounds. |
| **Action** | `secondary` | `#057dbc` | Interactive states, links, and highlighters. |
| **Borders** | `outline` | `#000000` | 1px hairline rules for grid and container borders. |
| **Subtext** | `on-surface-variant` | `#474747` | Secondary text, timestamps, and metadata. |
| **Alert/Error** | `error` | `#ba1a1a` | Form failures and system alerts. |

---

## 3. Typography Architecture

The visual identity relies heavily on the typographic tension between classic serif and industrial monospace.

### 1. Display Headers
* **Font Family**: `Newsreader` or `Playfair Display` (High-contrast serif).
* **Styles**: Bold/Italic, letter-spacing set to `-2%` (tight tracking).
* **Usage**: Main page titles, landing page headlines, and category titles.

### 2. Body Text
* **Font Family**: `Noto Serif` or `Lora` (Humanist readability serif).
* **Styles**: Regular weight, line-height set to `1.6`.
* **Usage**: Long-form guides, comparisons, and clipboard text views.

### 3. Functional UI & Affordances
* **Font Family**: `Space Grotesk` or `Inter` (Geometric sans-serif).
* **Styles**: Medium/Bold, uppercase for buttons.
* **Usage**: Buttons, input labels, tooltips, and settings switches.

### 4. Technical Eyebrows / Kickers
* **Font Family**: `JetBrains Mono` (Monospace).
* **Styles**: Uppercase, tracking (letter-spacing) set to `0.1em`.
* **Usage**: Section kickers, metadata, room code readouts, and timestamps.

---

## 4. Layout Grid Rules

* **Dividers**: Sections must be divided using a `1px solid black` rule. Do not use margin padding to create separations without a dividing grid line.
* **Columns**: Multiple columns (e.g. side-by-side forms, desktop vs. mobile layouts) should be separated by vertical `1px` rule lines.
* **Ribbons**: Section dividers are styled as solid black ribbons (height: 32px or 48px) containing white, uppercase monospace text aligned flush-left with 16px of horizontal padding.

---

## 5. UI Component Specs

### Buttons
1. **Primary Button**:
   * **CSS**: `background-color: #000000; color: #ffffff; border: 2px solid #000000; border-radius: 0px;`
   * **Hover State**: Background shifts to Action Blue (`#057dbc`). Text remains white.
2. **Secondary Button**:
   * **CSS**: `background-color: #ffffff; color: #000000; border: 2px solid #000000; border-radius: 0px;`
   * **Hover State**: Background shifts to black. Text shifts to white.
3. **Tertiary Button**:
   * **CSS**: Underlined text only (`text-decoration-underline`, 1px offset). No borders or background.

### Input Fields
* **Default**: `border: 1px solid #000000; border-radius: 0px; background-color: #ffffff;`
* **Focus**: `border-width: 2px; outline: none;` accompanied by a label change to Action Blue (`#057dbc`).
* **Error**: `border: 2px solid #ba1a1a;` with error instructions written in Monospace.

### Technical Progress Bars
* Do not use spinning circles or spinner icons.
* **Style**: A 1px black outline container (`border: 1px solid #000000; height: 8px; border-radius: 0px;`) with a solid black fill that grows horizontally to show progress.

### Cards
* Cards must not feature shadows or background fills.
* Structural boundaries are drawn with a `1px` top border.
* Composition order: Category kicker (Monospace) $\rightarrow$ Title (Serif) $\rightarrow$ Body summary (Humanist Serif).
