// Generates /sitemap.xml. Compatible with static export — Next.js writes the
// file at build time. The site is a single canonical route (SPA homepage with
// in-page anchor sections), so one entry is mapped.
export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://cualli.bio",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
