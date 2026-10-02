/**
 * Writes public/sitemap.xml and appends the Sitemap directive to robots.txt.
 *
 * The production domain is not known at author time, so it must be supplied:
 *   SITE_URL=https://your-domain.example npm run build
 *
 * Without SITE_URL the script is a no-op — it will not invent a domain, and the
 * build continues normally.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = process.env.SITE_URL?.replace(/\/+$/, "");

if (!siteUrl) {
  console.warn(
    "[sitemap] SITE_URL not set — skipping sitemap.xml. " +
      "Run `SITE_URL=https://your-domain npm run build` to generate it.",
  );
  process.exit(0);
}

/** Static routes. Element/lesson/chapter detail pages are derived below. */
const staticPaths = ["/", "/explore", "/class10", "/learn", "/experiments", "/quiz"];

/** Pull ids out of the data modules without needing a TS build step. */
const idsFrom = (file, pattern) => {
  const full = resolve(root, file);
  if (!existsSync(full)) return [];
  const src = readFileSync(full, "utf8");
  return [...src.matchAll(pattern)].map((m) => m[1]);
};

const chapterIds = idsFrom("src/data/class10.ts", /^\s{4}id:\s*"([^"]+)"/gm);
const experimentIds = idsFrom("src/data/experiments.ts", /^\s{4}id:\s*"([^"]+)"/gm);
const lessonIds = idsFrom("src/data/lessons.ts", /^\s{4}id:\s*"([^"]+)"/gm);
const elementNumbers = Array.from({ length: 118 }, (_, i) => i + 1);

const paths = [
  ...staticPaths,
  ...chapterIds.map((id) => `/class10/${id}`),
  ...lessonIds.map((id) => `/learn/${id}`),
  ...experimentIds.map((id) => `/experiments/${id}`),
  ...elementNumbers.map((n) => `/element/${n}`),
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) =>
      `  <url>\n    <loc>${siteUrl}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p === "/" ? "1.0" : "0.7"}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);

// Keep robots.txt pointing at the sitemap, without duplicating the directive.
const robotsPath = resolve(root, "public/robots.txt");
const robots = readFileSync(robotsPath, "utf8").replace(/\n*Sitemap:.*\n?/g, "");
writeFileSync(robotsPath, `${robots.trimEnd()}\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`[sitemap] wrote ${paths.length} URLs for ${siteUrl}`);
