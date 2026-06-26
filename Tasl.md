## Phase 1: Pages & Content
*Focus: Establishing the core site structure and copy.*

### Landing Page
* **Hero section**: Create a clear one-liner explaining SyncClip in 6 words. `[copy]`
* **Feature highlights**: Outline 3 core benefits with icons. `[design]`
* **Live demo**: Embed a demo or GIF showing clipboard sync in action. `[media]`
* **Use-case examples**: Section showcasing the "copy on phone, paste on desktop" workflow. `[copy]`
* **Footer**: Include links for About, Contact, GitHub, and Privacy. `[structure]`

### About / Creator Page
* **Intro**: Brief background on who you are and why you built SyncClip. `[copy]`
* **Professional Links**: Link to LinkedIn and GitHub profiles. `[links]`
* **Portfolio (Optional)**: Mention previous projects like Orbin or SnapTrack. `[optional]`

### Contact Page
* **Contact Form**: Name, email, and message fields. `[form]`
* **Support Email**: Display support@syncclip.in clearly. `[email]`
* **SLA Note**: Set an expected response time (e.g., 48 hours). `[copy]`

### Privacy Policy
* **Legal Page**: Generate a basic policy using tools like Termly. `[legal]`
* **Data Statement**: Explicitly state that no login is required and no data is tracked/stored. `[legal]`

---

## Phase 2: Email & Support
*Focus: Communication infrastructure and automation.*

### Support Email Setup
* **Cloudflare Routing**: Create support@yourdomain.com forwarding to Gmail. `[infra]`
* **Gmail Organization**: Set up "SyncClip Support" filters and labels. `[gmail]`
* **Reply Templates**: Save templates for bug reports, features, and general feedback. `[template]`

### Contact Form Automation
* **Form Backend**: Connect form to Resend or Formspree. `[infra]`
* **Auto-reply**: Set up an automated acknowledgment email. `[automation]`

---

## Phase 3: SEO — Technical
*Focus: Optimization for search engine visibility and performance.*

### Meta Tags (Site-wide)
* **Title Tags**: Unique, keyword-first titles (50–60 chars) for every page. `[meta]`
* **Descriptions**: Benefit-focused meta descriptions (150–160 chars). `[meta]`
* **Social Tags**: Open Graph (OG) and Twitter card meta tags for link previews. `[og]`
* **Canonical Tags**: Ensure every page has a canonical tag to prevent duplicates. `[meta]`

### Structured Data
* **Landing Page**: Add JSON-LD WebApplication schema. `[schema]`
* **Inner Pages**: Add BreadcrumbList schema. `[schema]`

### Site Files
* **Robots & Sitemaps**: Configure robots.txt and auto-generate sitemap.xml. `[file]`
* **Assets**: Set up favicon.ico and apple-touch-icon.png. `[file]`
* **PWA**: Create manifest.json for install prompts. `[file]`

### Performance
* **Lighthouse**: Audit for 90+ scores across all categories. `[perf]`
* **Images**: Use WebP format with explicit width/height attributes. `[perf]`
* **Stability**: Prevent layout shifts on dynamic content. `[perf]`

---

## Phase 4: Indexing & Search Console
*Focus: Ensuring the site is found on Google and Bing.*

### Google
* **Search Console**: Create and verify the property via DNS TXT record. `[setup]`
* **Sitemap Submission**: Submit the sitemap.xml to Google. `[submit]`
* **Manual Indexing**: Use the URL Inspection tool for key pages. `[submit]`

### Bing / Microsoft
* **Webmaster Tools**: Create account and submit sitemap. `[setup]`
* **IndexNow**: Enable IndexNow for instant URL pinging. `[submit]`

---

## Phase 5: Analytics & Monitoring
*Focus: Tracking visitor usage and performance.*

### Vercel Integration
* **Analytics**: Enable Vercel Analytics (cookie-free). `[setup]`
* **Speed Insights**: Enable tracking for Core Web Vitals. `[setup]`

### Event Tracking
* **Usage Tracking**: Track "clipboard copied" events. `[events]`
* **Conversion Tracking**: Track contact form submissions. `[events]`

---

## Phase 6: Marketing — Free & No-Face
*Focus: Promotion strategies that don't require video or personal appearances.*

### Visual Assets
* **OG Image**: 1200×630 mockup showing the UI and tagline. `[design]`
* **Mockups**: Create phone + desktop side-by-side workflow visuals. `[design]`
* **Demo Media**: Create a <20s screen-recorded GIF of the tool. `[media]`

### Community Outreach
* **Reddit**: Post on r/webdev, r/sideprojects, and r/devtools. `[reddit]`
* **Hacker News**: Submit a "Show HN" post. `[hn]`
* **Product Hunt**: List under the Dev Tools category. `[ph]`
* **Indie Directories**: Submit to uneed.app, Peerlist, and Fazier. `[directory]`
* **Dev.to**: Write a "build log" article about the project journey. `[blog]`

### LinkedIn (Builder Angle)
* **Launch Post**: Focus on the "no login, no tracking" philosophy. `[linkedin]`
* **Follow-up**: Share stats/learnings after the first 100 visitors. `[linkedin]`
* **Public Building**: Use carousels to show the development process. `[linkedin]`

### Backlinks
* **AlternativeTo**: Submit as a free alternative to existing clipboard tools. `[backlink]`
* **GitHub**: Update README with the live URL and demo GIF. `[backlink]`

---

## Phase 7: SEO/AEO/GEO Optimization (May 21, 2026)
*Focus: AI citation (GEO), snippet CTR correction, and bounce rate diagnosis.*

### Analytics & Retention
* **Bounce Rate Investigation**: Investigate homepage bounce rate spike (59%) and verify `REDIRECT_NUDGE_ENABLED` configuration. `[analytics]`
* **Nepal Referral Search**: Filter Vercel Analytics by region to isolate and target the active Nepal referral source. `[referrals]`
* **Event Tracking (Flag F)**: Implement `va.track()` custom events for room creation and visitor conversion metrics. `[tracking]`

### CTR Optimization (Broken Page Snippets)
* **Guide Snippet**: Rewrite title and meta description for `/clipboard-sync-guide`. `[snippet]`
* **Competitor Blog Snippet**: Rewrite title and meta description for `/blog/go-online-tools-clipboard-alternative`. `[snippet]`
* **Pushbullet Alternatives Snippet**: Rewrite title and meta description for `/blog/pushbullet-alternatives-2026`. `[snippet]`
* **Ecosystem Sync Snippet**: Rewrite title and meta description for `/blog/how-to-copy-text-from-android-to-mac`. `[snippet]`

### Structured Data (AEO & LLM Grounding)
* **FAQ Schema Scaling**: Deploy/update FAQPage JSON-LD block on homepage, guide, competitor comparison, and Pushbullet pages. `[schema]`
* **Quick Answer Blocks**: Embed a 50-60 word editorial quick-answer block at the top of all 12+ blog posts. `[content]`
* **Social Proof Expansion**: Update homepage stats and trust badge to say "Used in 50+ countries". `[copy]`

### Content Expansion (AI Prompt Patterns)
* **Link-Sharing Blog Post**: Write and index "How to copy and paste online between two devices using a link". `[blog]`
* **Auto-Sync Blog Post**: Write and index "What is the best online clipboard that syncs automatically in real time?". `[blog]`