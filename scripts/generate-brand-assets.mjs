/**
 * Regenerates the favicon set and the Open Graph card from the master logo.
 *
 * Run manually after the logo changes — it is deliberately NOT wired into
 * `npm run build`, so CI never depends on it:
 *
 *     node scripts/generate-brand-assets.mjs
 *
 * Requires `sharp`, which ships with Next.js. The outputs are committed to
 * public/ because the site is a static export (`images.unoptimized`), so every
 * asset has to be final at authoring time.
 */

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "/"));
const sharp = require("sharp");

const PUBLIC = path.join(ROOT, "public");
const LOGO = path.join(PUBLIC, "cualli_logo.webp");
const WORDMARK = path.join(PUBLIC, "cualli_wordmark.png");

// Palette — keep in sync with :root in app/globals.css.
const INK_HEX = "#07090a";
const INK = { r: 7, g: 9, b: 10, alpha: 1 };
const AC = "#86e8a8";
const MIST = "#b9c2bc";
const TXT = "#eaefec";
const FAINT = "#6e7873";

// Crops into cualli_logo.webp (white artwork on black, 1193x1158). The "C" of
// the wordmark is drawn as a bacterium; x 143..322 isolates it from the "U",
// whose stems start at x 325.
//
// Optical sizing: small icons use the letter body alone, because the flagellum
// forces the whole glyph smaller in a square and its hairline strokes turn to
// mush below ~32px. Large icons keep the tail, where the detail reads.
const CROP_BODY = { left: 143, top: 260, width: 180, height: 412 };
const CROP_TAIL = { left: 143, top: 260, width: 180, height: 520 };

/** The greyscale artwork doubles as an alpha mask: white ink = opaque. */
const maskOf = (crop) => sharp(LOGO).greyscale().extract(crop).toBuffer();

/**
 * Square icon: glyph tinted `color`, centred on the ink canvas.
 * `boost` multiplies alpha to stop hairlines washing out when downscaled.
 */
async function icon(mask, size, { pad = 0.16, color = AC, boost = null } = {}) {
  const inner = Math.round(size * (1 - pad));
  let pipeline = sharp(mask).resize({ height: inner, fit: "inside" });
  if (boost) pipeline = pipeline.linear(boost, 0);
  const glyph = await pipeline.toBuffer();
  const { width, height } = await sharp(glyph).metadata();

  const tinted = await sharp({
    create: { width, height, channels: 3, background: color },
  })
    .joinChannel(glyph)
    .png()
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: tinted, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Wraps PNGs in an ICO container. ICO has allowed PNG-encoded entries since
 * Vista, and every browser that still asks for /favicon.ico accepts them.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

async function buildIcons() {
  const body = await maskOf(CROP_BODY);
  const tail = await maskOf(CROP_TAIL);

  const favicon16 = await icon(body, 16, { pad: 0.12, boost: 1.7 });
  const favicon32 = await icon(body, 32, { pad: 0.14, boost: 1.5 });

  const out = [
    ["favicon-16x16.png", favicon16],
    ["favicon-32x32.png", favicon32],
    ["icon-192.png", await icon(tail, 192, { pad: 0.18 })],
    ["icon-512.png", await icon(tail, 512, { pad: 0.18 })],
    // iOS masks the corners itself, so this stays full-bleed with tighter padding.
    ["apple-touch-icon.png", await icon(tail, 180, { pad: 0.2 })],
  ];

  for (const [name, data] of out) {
    await fs.writeFile(path.join(PUBLIC, name), data);
    console.log(`  public/${name.padEnd(24)} ${(data.length / 1024).toFixed(1)} KB`);
  }

  const ico = buildIco([
    { size: 16, data: favicon16 },
    { size: 32, data: favicon32 },
  ]);
  await fs.writeFile(path.join(PUBLIC, "favicon.ico"), ico);
  console.log(`  public/${"favicon.ico".padEnd(24)} ${(ico.length / 1024).toFixed(1)} KB`);
}

async function buildOgCard() {
  const W = 1200;
  const H = 630;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="46%" r="52%">
      <stop offset="0%"  stop-color="${AC}" stop-opacity=".20"/>
      <stop offset="34%" stop-color="${AC}" stop-opacity=".07"/>
      <stop offset="70%" stop-color="${INK_HEX}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="96" height="96" patternUnits="userSpaceOnUse">
      <path d="M96 0H0V96" fill="none" stroke="#eaefec" stroke-opacity=".045" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="${INK_HEX}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity=".5"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <circle cx="76" cy="232" r="6" fill="${AC}"/>
  <text x="96" y="238" font-family="Menlo" font-size="20" letter-spacing="3.4" fill="${AC}">ENGINEERED LIVING MEDICINE</text>

  <text x="72" y="356" font-family="Avenir Next" font-weight="500" font-size="104" letter-spacing="-3" fill="${TXT}">Filter the Forever</text>

  <text x="72" y="424" font-family="Avenir Next" font-size="29" fill="${MIST}">A programmable probiotic that captures PFAS in the gut</text>
  <text x="72" y="466" font-family="Avenir Next" font-size="29" fill="${MIST}">and carries them out of the body.</text>

  <line x1="72" y1="536" x2="${W - 72}" y2="536" stroke="#eaefec" stroke-opacity=".12"/>
  <text x="72" y="576" font-family="Menlo" font-size="19" letter-spacing="2.6" fill="${FAINT}">CUALLI.BIO</text>
  <text x="${W - 72}" y="576" text-anchor="end" font-family="Menlo" font-size="19" letter-spacing="2.6" fill="${FAINT}">CHAPEL HILL / RALEIGH, NC</text>
</svg>`;

  // Headline/eyebrow fall back to system faces here: librsvg can't load the
  // site's woff2 files. Avenir Next / Menlo are the closest available stand-ins
  // for Bricolage Grotesque / IBM Plex Mono. The wordmark is the real asset.
  const wordmark = await sharp(WORDMARK).resize({ height: 54 }).toBuffer();
  const card = await sharp(Buffer.from(svg))
    .composite([{ input: wordmark, top: 72, left: 72 }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await fs.writeFile(path.join(PUBLIC, "og-image.png"), card);
  console.log(`  public/${"og-image.png".padEnd(24)} ${(card.length / 1024).toFixed(1)} KB`);
}

console.log("Icons:");
await buildIcons();
console.log("Open Graph card:");
await buildOgCard();
console.log("Done.");
