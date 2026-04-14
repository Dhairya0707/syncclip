# Design System: High-Density Editorial Brutalism

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Broadsheet"**

This design system rejects the "soft" commodification of modern SaaS interfaces in favor of the raw, authoritative energy of mid-century editorial design and the digital vanguardism of WIRED. It is a system built on the tension between high-density information and aggressive whitespace.

We move beyond the "template" look by treating the browser as a physical canvas. The aesthetic is governed by a **Flat Depth Philosophy**: depth is not achieved through Z-axis shadows, but through layering, high-contrast ribbons, and rigid hairline rules. Every pixel must feel intentional; every corner must remain sharp. We are not building a generic dashboard—we are publishing a manifesto.

---

## 2. Colors & Tonal Architecture
The palette is binary and uncompromising. We use a high-contrast "Paper and Ink" philosophy.

### The Palette
| Role | Token | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `surface` | `#ffffff` | The primary "paper" background. |
| **Ink** | `primary` | `#000000` | Headlines, borders, and solid ribbon backgrounds. |
| **Action** | `secondary` | `#057dbc` | Interactive states and links only. |
| **Structure** | `outline` | `#000000` | 1px hairline rules for grid definition. |
| **Subtext** | `on-surface-variant` | `#474747` | Secondary metadata and captions. |

### Color Principles
*   **The "No-Shadow" Mandate:** Shadows are strictly prohibited. To separate elements, use a 1px solid black rule (`outline`) or a high-contrast background shift (e.g., a black ribbon on a white canvas).
*   **Surface Hierarchy:** Do not use soft grays to define containers. Use `surface_container_lowest` (#ffffff) for the main body and `primary` (#000000) for headers to create a "punched-out" effect.
*   **The Action Blue:** `secondary` (#057dbc) is a surgical tool. Use it sparingly for hover states, active text links, or critical "Read More" affordances. It should pop against the monochrome canvas like a highlighter mark.

---

## 3. Typography
Typography is the primary engine of this system. We use a four-tier type architecture to establish an aggressive editorial hierarchy.

### The Type Scale
*   **Display (Newsreader / Playfair Display):** Loud, high-contrast serif. Used for lead headlines. Tighten letter spacing (-2%) for a "printed" feel.
*   **Body (Noto Serif / Lora):** Humanist serif optimized for long-form readability. Use generous line height (1.6) to ensure the high-density grid remains legible.
*   **UI Affordance (Space Grotesk / Inter):** Geometric sans-serif. Used for functional elements: buttons, inputs, and navigation labels.
*   **Technical Kicker (JetBrains Mono):** Monospace. Used for "Eyebrows," "Kickers," and "Categories." Always UPPERCASE with `0.1em` tracking.

### Hierarchy & Identity
The contrast between the elegant Display Serif and the utilitarian Monospace creates the "Editorial Brutalist" signature. Kickers should act as anchors, grounding the expressive headlines.

---

## 4. Layout & Grid Rules
This system lives and dies by the grid.

*   **The Hairline Rule:** Use 1px black lines to separate columns and sections. These are not "dividers"; they are the skeleton of the page.
*   **Strict Square Geometry:** The `border-radius` token is globally set to `0px`. This applies to buttons, inputs, cards, and images. No exceptions.
*   **Intentional Asymmetry:** Break the vertical rhythm by using "Ribbon Headers"—full-width black bars (`primary`) that house white monospace text. These act as visual anchors in a high-density layout.

---

## 5. Components

### Buttons
*   **Primary:** Solid black background, white text (Space Grotesk). No radius. 2px hard black border. On hover: background shifts to `secondary` (#057dbc).
*   **Secondary:** White background, 2px solid black border. Black text.
*   **Tertiary:** Black text, underline only (1px offset).

### Ribbon Headers
Section headers are styled as 32px or 48px high black ribbons. 
*   **Typography:** `label-md` (Monospace), White, All Caps.
*   **Alignment:** Vertically centered, 16px horizontal padding.

### Editorial Cards
Cards do not have shadows or background fills.
*   **Structure:** Defined by a 1px top border only. 
*   **Composition:** A Technical Kicker (Mono), followed by a Display Headline (Serif), and a short Body summary.
*   **Image Handling:** Strictly rectangular. No rounded corners. Images should be separated from text by 12px of vertical white space.

### Input Fields
*   **Default:** 1px black border, 0px radius. White background.
*   **Focus:** 2px black border with a `secondary` blue label.
*   **Error:** 2px solid `error` (#ba1a1a) border. Error text must be in Monospace to feel like a "system alert."

### Progress Indicators
Avoid "spinning wheels." Use a technical, horizontal progress bar: a 1px black outline container with a solid black fill that grows horizontally.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use wide tracking (letter-spacing) for uppercase monospace labels.
*   **DO** embrace "information density." It is okay for the page to feel full, as long as the grid is rigid.
*   **DO** use 1px vertical rules to separate multi-column text layouts.
*   **DO** treat whitespace as a structural element, not just "emptiness."

### Don't
*   **DON'T** use 1px of border-radius. If it's not a sharp 90-degree angle, it doesn't belong.
*   **DON'T** use gradients or shadows. Depth is flat.
*   **DON'T** use "Soft Grays" for borders. Use black or nothing.
*   **DON'T** center-align long-form body text. Keep it flush-left to maintain the editorial "rag."

---

## 7. Director's Note to Junior Designers
*This system is about confidence. When you place a 2px border or a massive serif headline, do it with conviction. Brutalism isn't about being "ugly"; it's about being honest with the digital medium. If a component feels "floaty," don't reach for a shadow—reach for a thicker border or a rigid grid line.*