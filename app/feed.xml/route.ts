import { blogs } from "@/utils/blog-data";

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const baseUrl = "https://syncclip.in";
  
  // Sort blogs by date descending (though our array is already sorted)
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const newestPostDate = sortedBlogs.length > 0 ? sortedBlogs[0].pubDate : new Date().toUTCString();

  const xmlItems = sortedBlogs
    .map((blog) => {
      const url = `${baseUrl}/blog/${blog.slug}`;
      return `    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(blog.desc)}</description>
      <pubDate>${blog.pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SyncClip Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical insights, guides, and audits for cross-device clipboard synchronization.</description>
    <language>en-us</language>
    <lastBuildDate>${newestPostDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${xmlItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Set cache headers to cache this for 1 hour on CDN, revalidate every 1 hour
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
    },
  });
}
