# SYNCCLIP — SEO, AEO & GEO MASTER TRACKER & MANAGEMENT DOC

> **Internal Operations & Strategy Document**  
> **Status:** Live & Active  
> **Last Updated:** 2026-08-09  
> **Owner:** Dhairya Darji / Growth & SEO Engineering  

---

## 🎯 1. EXECUTIVE OVERVIEW & MASTER TARGETS

This document is the **single source of truth** for managing, testing, and tracking SyncClip’s organic growth across three core search horizons:
1. **SEO (Search Engine Optimization):** Google & Bing traditional SERP rankings, CTR optimization, and keyword consolidation.
2. **AEO (Answer Engine Optimization):** Winning Google AI Overviews (AIO), Featured Snippets, and Voice Search answers.
3. **GEO (Generative Engine Optimization):** Ensuring SyncClip is cited and recommended when users query AI LLMs (ChatGPT, Perplexity, SearchGPT, Claude, Gemini).

### Master KPI Dashboard & Targets (90-Day Goals)

| Metric Category | Baseline (Aug 2026) | Month 1 Target | Month 2 Target | Month 3 Target (Final) |
| :--- | :---: | :---: | :---: | :---: |
| **"Online Clipboard" CTR (GSC)** | 0.15% | 0.28% | 0.45% | **0.60%+** |
| **Average Position (GSC)** | 4.9 – 5.2 | 4.5 | 3.8 | **Top 3 (#1–#3)** |
| **Daily Organic Visitors** | 100 – 150 | 180 – 220 | 250 – 300 | **350+ / day** |
| **US Organic Clicks / Week** | 2 – 5 | 15 – 25 | 40 – 60 | **80 – 100+ / week** |
| **Google AI Overview Inclusion** | 0% | 20% | 50% | **75%+ of targeted queries** |
| **LLM Recommendations (Perplexity/ChatGPT)** | Moderate | Consistent | Dominant | **Default Recommendation** |

---

## ⚙️ 2. RECENT IMPLEMENTATIONS (CODE BASELINE)

The following core technical upgrades have been deployed directly into the codebase:

### ✅ Implemented Upgrades

1. **Unified JSON-LD `@graph` Schema Structure**  
   - **Location:** [`app/clipboard/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/clipboard/page.tsx)
   - **Details:** Consolidated fragmented JSON-LD schemas into a single `@graph` array connecting `WebApplication`, `Organization`, `HowTo`, and `FAQPage`.
   - **Benefit:** Provides search engines and AI parsers with a complete entity map of SyncClip.

2. **UX Anchor Jump Fix (`id="live-clipboard"`)**  
   - **Location:** [`app/clipboard/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/clipboard/page.tsx#L230)
   - **Details:** Added `id="live-clipboard"` to the `<InlineClipboardEmbed />` container wrapper.
   - **Benefit:** Fixes `<a href="#live-clipboard">` CTA jumps, reducing user bounce rates.

3. **AI LLM Crawler Accessibility (`llms.txt` & `robots.ts`)**  
   - **Locations:** [`public/llms.txt`](file:///Users/dhairyadarji/Developer/experiments/syncclip/public/llms.txt), [`app/robots.ts`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/robots.ts)
   - **Details:** Verified explicit `allow: '/'` permissions for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, and `Bytespider`. Clean markdown summary provided in `llms.txt`.

4. **Regional Canonicalization**  
   - **Location:** [`app/online-clipboard/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/online-clipboard/page.tsx#L10)
   - **Details:** Regional page correctly canonicalizes to `https://syncclip.in/clipboard`, preventing keyword self-cannibalization.

5. **US Market Landing Pages Self-Canonical Unlocking (CRITICAL FIX)**  
   - **Locations:**  
     - [`app/copy-text-from-phone-to-computer/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/copy-text-from-phone-to-computer/page.tsx)
     - [`app/send-text-mobile-to-laptop/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/send-text-mobile-to-laptop/page.tsx)
     - [`app/how-to-send-otp-from-phone-to-pc/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/how-to-send-otp-from-phone-to-pc/page.tsx)
     - [`app/share-text-without-whatsapp/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/share-text-without-whatsapp/page.tsx)
     - [`app/share-links-between-devices/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/share-links-between-devices/page.tsx)
     - [`app/fastest-way-to-copy-links-between-devices/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/fastest-way-to-copy-links-between-devices/page.tsx)
     - [`app/share-text-across-devices-free/page.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/share-text-across-devices-free/page.tsx)
   - **Details:** Discovered and fixed canonical tags pointing to external pages. All 7 high-intent US problem-focused landing pages are now self-canonicalized, allowing Google to independently index and rank each landing page for US search queries (e.g. *"copy text from phone to computer"*).

6. **Global Root Layout `@graph` Schema Consolidation**  
   - **Location:** [`app/layout.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/app/layout.tsx#L94-L150)
   - **Details:** Replaced separate global script tags with a single unified JSON-LD `@graph` connecting `WebSite` (with Sitelinks `SearchAction`), `Organization`, `Person`, and `SoftwareApplication` with `sameAs` entity links.

---

## 🧪 3. EXPERIMENTAL SPLIT-TESTING & RECOVERY LOG

### Incident Recovery & Title Tag Optimization (2026-08-16)

> 🚨 **INCIDENT & RECOVERY SUMMARY:**
> - **Issue:** On Aug 14 (commit `76d1e76`), the title on `/clipboard` was changed to `Online Clipboard — Sync Instantly, No Login (124K+ Synced)`. Paired with layout's template, it expanded to 87 characters, duplicated "Online Clipboard" twice, stripped psychological intent keywords, and caused average position to drop from 4.9 to 8.6–9.2.
> - **Resolution Deployed:** Fixed root layout title template to `"%s | SyncClip"`, deployed optimized high-CTR intent title `Free Online Clipboard — Copy Text Between Phone & PC Instantly` (59 chars), restored full OS coverage in description, expanded FAQ schema to 16 comprehensive Q&As, and launched 2 programmatic landing pages (`/iphone-to-windows-clipboard`, `/airdrop-for-windows-and-android`).

```
TEST PROTOCOL:
- Recovery Period: Aug 16 – Aug 30, 2026
- Variable Under Test: Optimized High-Intent Title & Programmatic Cluster Expansion
- Primary URL: https://syncclip.in/clipboard
```

#### Daily Tracking Log

| Date | Active Title Variant | GSC Clicks | GSC Impressions | CTR % | Avg Position | Notes / Events |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **2026-08-09** | Baseline (Pre-regression) | 84 | 64,320 | 0.30% | 4.9–5.2 | High baseline |
| **2026-08-15** | Regressed Variant (124K+) | 23 | 2,090 | 1.10% | 8.6–9.2 | SERP truncation & keyword drop |
| **2026-08-16** | **Recovery Variant (High-Intent)** | -- | -- | -- | -- | **Deployed title fix, 16 FAQs, pSEO cluster** |
| **2026-08-23** | Recovery (Day 7) | -- | -- | -- | -- | Re-index check in GSC |
| **2026-08-30** | Recovery (Day 14) | -- | -- | -- | -- | Target: Return to Top 3–5 |

---

## 🤖 4. AEO & GEO EXECUTION PLAYBOOK

### AEO Strategy (AI Overviews & Featured Snippets)
1. **BLUF (Bottom Line Up Front) Format:** Place direct 40–60 word answer blocks immediately under major heading tags (`<h2>`).
   - Example Structure:
     ```html
     <h2>What is an online clipboard?</h2>
     <p>An <strong>online clipboard</strong> is a browser-native utility that enables instant text synchronization (<100ms) between multiple devices (Android, iOS, Windows, Mac) without requiring app downloads or user accounts.</p>
     ```
2. **Tabular Data Formatting:** Comparison tables with explicit headers (`Feature`, `SyncClip`, `Pushbullet`, `AirDrop`) rank 3x higher in Google AI Overviews.
3. **Structured Q&A Expansion:** Expand the FAQ section on `/clipboard` from 7 items to 20+ items covering long-tail questions (e.g., *"How do I copy text from Android to Mac without WhatsApp?"*).

### GEO Strategy (Generative AI Engine Optimization)
1. **Brand Entity Co-occurrence:** Publish targeted comparison pages (`/pushbullet-alternative`, `/pastebin-alternative`) to establish SyncClip's context within AI training & Retrieval-Augmented Generation (RAG) graphs.
2. **`llms.txt` Maintenance:** Update `public/llms.txt` whenever new features or landing pages are published so LLM web scrapers digest fresh documentation.
3. **Semantic Anchoring:** Ensure external and internal anchor text uses clear intent phrases (e.g., *"free cross-platform online clipboard"* instead of generic *"click here"*).

---

## 📋 5. WEEKLY OPERATIONS & SOP CHECKLIST

### Weekly Monday Morning Routine (15 Mins)

- [ ] **1. GSC Performance Audit:**
  - Open Google Search Console → Performance → Filter by query `"online clipboard"`.
  - Log weekly Clicks, Impressions, CTR, and Avg Position in Section 3 table above.
- [ ] **2. Competitor SERP Check:**
  - Perform an incognito search for `"online clipboard"`. Record rank positions for top 5 competitors vs SyncClip.
- [ ] **3. AI Overview Verification:**
  - Search `"best free online clipboard"` in Google (with AI Overviews active) and Perplexity.ai.
  - Verify if SyncClip is cited as a source link.
- [ ] **4. Core Web Vitals & Indexing Check:**
  - Verify zero coverage errors in GSC. Confirm sitemap status is `Success`.

---

## 🚨 6. INCIDENT RESPONSE SOP (Emergency Protocols)

| Trigger Event | Diagnosis | Immediate Action |
| :--- | :--- | :--- |
| **Position drops > 3 ranks after Title Change** | Google misinterpreted title intent | Revert title code immediately. Wait 7 days for rank recovery before testing Option B. |
| **CTR drops below 0.10%** | Snippet preview is unappealing | Revert metadata change. Re-evaluate competitor snippets. |
| **Impressions drop > 40%** | Indexation split or technical glitch | Run GSC URL Inspection on `https://syncclip.in/clipboard`. Check for accidental `noindex` tags. |
| **LLM Hallucination / Misattribution** | AI models confusing SyncClip features | Update `public/llms.txt` with clearer bullet points and submit URL to IndexNow/Perplexity. |

---

*Doc maintained by SyncClip Engineering. For updates, edit this file directly in repository root at `docs/files/SEO_AEO_GEO_MASTER_TRACKER.md`.*
