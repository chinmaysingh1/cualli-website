// Generates /robots.txt. Compatible with static export. Allows full crawling
// of the canonical site and points crawlers at the sitemap.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Block training/scraping bots that ignore commercial-use boundaries.
        userAgent: ["GPTBot", "CCBot"],
        disallow: "/",
      },
    ],
    sitemap: "https://cualli.bio/sitemap.xml",
    host: "https://cualli.bio",
  };
}
