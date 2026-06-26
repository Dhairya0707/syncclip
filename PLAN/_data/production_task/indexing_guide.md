# 🚀 SyncClip Search Indexing Guide

This guide will walk you through indexing **syncclip.in** on the two most important search engines: Google and Bing.

---

## 1. Google Search Console (GSC)

Google is your primary source of traffic. Follow these steps to get verified and indexed.

### Step 1: Add your Property
1. Go to [Google Search Console](https://search.google.com/search-console/).
2. Click **"Add Property"** in the sidebar.
3. Select **"Domain"** (Recommended). Enter `syncclip.in`.

### Step 2: Verification (DNS Method)
1. Google will provide a **TXT record** (e.g., `google-site-verification=xxxx`).
2. Log in to your domain provider (where you bought `syncclip.in`).
3. Add a new **TXT record** at the root (`@`):
   - **Type:** TXT
   - **Name/Host:** `@`
   - **Value:** (The code from Google)
4. Go back to GSC and click **Verify**. (It might take a few minutes to propagate).

### Step 3: Submit Sitemap
1. In the GSC sidebar, click **Sitemaps**.
2. Under "Add a new sitemap", type: `sitemap.xml`.
3. Click **Submit**.

---

## 2. Bing Webmaster Tools

Bing also powers DuckDuckGo and other smaller search engines.

### Step 1: Sign Up / Import from Google
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. **Pro Tip:** Sign in with the same Google account you used for Search Console.
3. You will see an option to **"Import"** your properties from Google Search Console.
   - This is the fastest method. It automatically verifies your site on Bing if it's already verified on Google.

### Step 2: Manual Verification (If not importing)
1. Add `https://syncclip.in`.
2. Choose **HTML Meta Tag** verification.
3. Copy the `<meta name="msvalidate.01" content="xxxx" />` tag.
4. **Action Required:** If you choose this method, I need to add this tag to your `app/layout.tsx`.

### Step 3: Submit Sitemap
1. Go to **Sitemaps** in the Bing sidebar.
2. Click **Submit Sitemap**.
3. Enter `https://syncclip.in/sitemap.xml`.

---

## 3. Post-Submission Checklist

- [ ] **URL Inspection**: In Google Search Console, use the "URL Inspection" tool at the top. Paste `https://syncclip.in` and click **Request Indexing**. This forces Google to crawl your home page immediately.
- [ ] **Check Robots.ts**: Ensure `https://syncclip.in/robots.txt` is accessible. (It is already configured in your project).
- [ ] **Check Sitemap**: Ensure `https://syncclip.in/sitemap.xml` is accessible and lists all your niche landing pages.

### Current Indexed Status
| Page | Status |
| :--- | :--- |
| `/` | Ready to Index |
| `/about` | Ready to Index |
| `/clipboard-sync-guide` | Ready to Index |
| `/pushbullet-alternative` | Ready to Index |

> [!TIP]
> Google typically takes **24–72 hours** to show your site in search results after verification. Bing is usually faster (12–24 hours).
