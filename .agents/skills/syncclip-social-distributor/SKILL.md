---
name: syncclip-social-distributor
description: Generates high-impact Reddit and LinkedIn content for SyncClip distribution while maintaining an execution log.
---

# SyncClip Social Distributor Skill

Use this skill to transform SyncClip technical assets and blogs into high-conversion social media posts.

## 🎨 Design System: Editorial Brutalism
All content must adhere to the SyncClip visual identity:
- **Minimalist:** No fluff.
- **High Contrast:** Strong hooks, bold claims.
- **Structured:** Use bullet points, code blocks, and clear headers.
- **Tone:** Founder-led, technical but accessible, solving a specific pain point.

## 🛠️ Execution Protocol
1. **Analyze Source:** Read the targeted SyncClip page or blog post.
2. **Select Platform:** Choose Reddit (Community/Technical) or LinkedIn (Professional/Ecosystem).
3. **Generate Content:** Use the Master Prompts defined in `_data/seo-planning/phase-3-growth/MASTER_CONTENT_PROMPTS.md`.
4. **Log Execution:** Append the post metadata to `_data/seo-planning/phase-3-growth/SOCIAL_TRACKING_LOG.md`.

## 📊 Tracking Schema
Every time you generate content, update the log with:
- **Date:** YYYY-MM-DD
- **Platform:** [Reddit / LinkedIn / Twitter]
- **Source Page:** The URL/Path used.
- **Status:** [PLANNED / POSTED]
- **Core Hook:** The primary angle used.

## 🚀 Target Communities
- **Reddit:** r/webdev, r/programming, r/productivity, r/India.
- **LinkedIn:** Productivity influencers, Indie hackers, Tech leads.
