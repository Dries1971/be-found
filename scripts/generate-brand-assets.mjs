/**
 * Generate all brand assets from SVG source files.
 *
 * Outputs: PNG, JPEG, favicon set, social images, Apple Touch Icon
 *
 * Created by Dries de Gelder
 * Commissioned by Be-Found
 * In collaboration with Claude Code, OpenAI, Deepseek and Gemini
 */

import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAND_DIR = join(__dirname, '..', 'public', 'brand');
const SVG_DIR = join(BRAND_DIR, 'svg');
const PNG_DIR = join(BRAND_DIR, 'png');
const JPG_DIR = join(BRAND_DIR, 'jpg');
const FAVICON_DIR = join(BRAND_DIR, 'favicon');
const SOCIAL_DIR = join(BRAND_DIR, 'social');

// Ensure dirs exist
[PNG_DIR, JPG_DIR, FAVICON_DIR, SOCIAL_DIR].forEach(d => mkdirSync(d, { recursive: true }));

// Midnight background for dark variants
const MIDNIGHT = { r: 2, g: 6, b: 23, alpha: 1 }; // #020617
const SNOW = { r: 248, g: 250, b: 252, alpha: 1 };  // #F8FAFC

async function svgToPng(svgPath, outputPath, width, height, opts = {}) {
  const svg = readFileSync(svgPath);
  let pipeline = sharp(svg, { density: 300 })
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });

  if (opts.background) {
    pipeline = pipeline.flatten({ background: opts.background });
  }

  await pipeline.png().toFile(outputPath);
  console.log(`  PNG: ${outputPath} (${width}x${height})`);
}

async function svgToJpg(svgPath, outputPath, width, height, background) {
  const svg = readFileSync(svgPath);
  await sharp(svg, { density: 300 })
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background })
    .jpeg({ quality: 95 })
    .toFile(outputPath);
  console.log(`  JPG: ${outputPath} (${width}x${height})`);
}

async function generateFavicons(svgPath) {
  const svg = readFileSync(svgPath);

  // favicon-16x16.png
  await sharp(svg, { density: 300 })
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(FAVICON_DIR, 'favicon-16x16.png'));

  // favicon-32x32.png
  await sharp(svg, { density: 300 })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(FAVICON_DIR, 'favicon-32x32.png'));

  // favicon-48x48.png (for .ico generation)
  await sharp(svg, { density: 300 })
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(FAVICON_DIR, 'favicon-48x48.png'));

  // android-chrome-192x192.png
  await sharp(svg, { density: 300 })
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: MIDNIGHT })
    .png()
    .toFile(join(FAVICON_DIR, 'android-chrome-192x192.png'));

  // android-chrome-512x512.png
  await sharp(svg, { density: 300 })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: MIDNIGHT })
    .png()
    .toFile(join(FAVICON_DIR, 'android-chrome-512x512.png'));

  // apple-touch-icon 180x180
  await sharp(svg, { density: 300 })
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: MIDNIGHT })
    .png()
    .toFile(join(FAVICON_DIR, 'apple-touch-icon.png'));

  // mstile-150x150.png
  await sharp(svg, { density: 300 })
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: MIDNIGHT })
    .png()
    .toFile(join(FAVICON_DIR, 'mstile-150x150.png'));

  // SVG favicon (copy)
  const svgContent = readFileSync(svgPath, 'utf8');
  writeFileSync(join(FAVICON_DIR, 'favicon.svg'), svgContent);

  console.log('  Favicons: 16, 32, 48, 192, 512, apple-touch-icon, mstile, SVG');
}

async function generateOGImage(logoSvgPath, outputPath, background) {
  // Create a 1200x630 OG image with logo centered
  const logoSvg = readFileSync(logoSvgPath);

  // First render the logo at a nice size
  const logoPng = await sharp(logoSvg, { density: 300 })
    .resize(600, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Create the OG background and composite the logo
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background,
    }
  })
    .composite([
      {
        input: logoPng,
        top: 220,
        left: 300,
      }
    ])
    .png()
    .toFile(outputPath);

  console.log(`  OG: ${outputPath} (1200x630)`);
}

async function main() {
  console.log('Generating brand assets...\n');

  // --- LOGO FULL: PNG ---
  console.log('[Logo Full - Dark]');
  await svgToPng(join(SVG_DIR, 'logo-dark.svg'), join(PNG_DIR, 'logo-dark.png'), 600, 140);
  await svgToPng(join(SVG_DIR, 'logo-dark.svg'), join(PNG_DIR, 'logo-dark-2x.png'), 1200, 280);
  await svgToPng(join(SVG_DIR, 'logo-dark.svg'), join(PNG_DIR, 'logo-dark-bg.png'), 600, 140, { background: MIDNIGHT });

  console.log('\n[Logo Full - Light]');
  await svgToPng(join(SVG_DIR, 'logo-light.svg'), join(PNG_DIR, 'logo-light.png'), 600, 140);
  await svgToPng(join(SVG_DIR, 'logo-light.svg'), join(PNG_DIR, 'logo-light-2x.png'), 1200, 280);
  await svgToPng(join(SVG_DIR, 'logo-light.svg'), join(PNG_DIR, 'logo-light-bg.png'), 600, 140, { background: SNOW });

  // --- ICON ONLY: PNG ---
  console.log('\n[Icon - Dark]');
  await svgToPng(join(SVG_DIR, 'icon-static-dark.svg'), join(PNG_DIR, 'icon-dark-64.png'), 64, 64);
  await svgToPng(join(SVG_DIR, 'icon-static-dark.svg'), join(PNG_DIR, 'icon-dark-128.png'), 128, 128);
  await svgToPng(join(SVG_DIR, 'icon-static-dark.svg'), join(PNG_DIR, 'icon-dark-256.png'), 256, 256);
  await svgToPng(join(SVG_DIR, 'icon-static-dark.svg'), join(PNG_DIR, 'icon-dark-512.png'), 512, 512);

  // --- LOGO FULL: JPEG ---
  console.log('\n[Logo Full - JPG]');
  await svgToJpg(join(SVG_DIR, 'logo-dark.svg'), join(JPG_DIR, 'logo-dark.jpg'), 600, 140, MIDNIGHT);
  await svgToJpg(join(SVG_DIR, 'logo-dark.svg'), join(JPG_DIR, 'logo-dark-2x.jpg'), 1200, 280, MIDNIGHT);
  await svgToJpg(join(SVG_DIR, 'logo-light.svg'), join(JPG_DIR, 'logo-light.jpg'), 600, 140, SNOW);
  await svgToJpg(join(SVG_DIR, 'logo-light.svg'), join(JPG_DIR, 'logo-light-2x.jpg'), 1200, 280, SNOW);

  // --- ICON: JPEG ---
  console.log('\n[Icon - JPG]');
  await svgToJpg(join(SVG_DIR, 'icon-static-dark.svg'), join(JPG_DIR, 'icon-dark-256.jpg'), 256, 256, MIDNIGHT);
  await svgToJpg(join(SVG_DIR, 'icon-static-dark.svg'), join(JPG_DIR, 'icon-dark-512.jpg'), 512, 512, MIDNIGHT);

  // --- FAVICONS ---
  console.log('\n[Favicons]');
  await generateFavicons(join(SVG_DIR, 'icon-static-dark.svg'));

  // --- OG / SOCIAL IMAGES ---
  console.log('\n[Social / OG Images]');
  await generateOGImage(join(SVG_DIR, 'logo-dark.svg'), join(SOCIAL_DIR, 'og-dark.png'), MIDNIGHT);
  await generateOGImage(join(SVG_DIR, 'logo-light.svg'), join(SOCIAL_DIR, 'og-light.png'), SNOW);

  // Twitter card (same as OG but 1200x600 for summary_large_image)
  const twitterLogoSvg = readFileSync(join(SVG_DIR, 'logo-dark.svg'));
  const twitterLogoPng = await sharp(twitterLogoSvg, { density: 300 })
    .resize(500, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: { width: 1200, height: 600, channels: 4, background: MIDNIGHT }
  })
    .composite([{ input: twitterLogoPng, top: 240, left: 350 }])
    .png()
    .toFile(join(SOCIAL_DIR, 'twitter-card.png'));
  console.log(`  Twitter: ${join(SOCIAL_DIR, 'twitter-card.png')} (1200x600)`);

  // --- SITE MANIFEST ---
  console.log('\n[Web Manifest]');
  const manifest = {
    name: 'Be-Found',
    short_name: 'Be-Found',
    description: 'AI Visibility Experts — GEO & Generative Engine Optimization',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#F59E0B',
    icons: [
      { src: '/brand/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/brand/favicon/favicon.svg', type: 'image/svg+xml' },
    ]
  };
  writeFileSync(join(FAVICON_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('  Manifest: site.webmanifest');

  // --- BROWSERCONFIG ---
  const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/brand/favicon/mstile-150x150.png"/>
      <TileColor>#020617</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  writeFileSync(join(FAVICON_DIR, 'browserconfig.xml'), browserconfig);
  console.log('  Browserconfig: browserconfig.xml');

  console.log('\n✅ All brand assets generated!\n');

  // Print summary
  console.log('=== SUMMARY ===');
  console.log('');
  console.log('SVG (scalable):');
  console.log('  logo-dark.svg          — Full logo, white text (dark backgrounds)');
  console.log('  logo-light.svg         — Full logo, navy text (light backgrounds)');
  console.log('  logo-animated-dark.svg — Animated, white text');
  console.log('  logo-animated-light.svg— Animated, navy text');
  console.log('  icon-animated-dark.svg — Animated icon only');
  console.log('  icon-static-dark.svg   — Static icon only');
  console.log('');
  console.log('PNG (transparent + with bg):');
  console.log('  logo-dark.png (600x140)    logo-dark-2x.png (1200x280)');
  console.log('  logo-light.png (600x140)   logo-light-2x.png (1200x280)');
  console.log('  logo-dark-bg.png           logo-light-bg.png');
  console.log('  icon-dark-64/128/256/512.png');
  console.log('');
  console.log('JPEG (with background):');
  console.log('  logo-dark.jpg / logo-dark-2x.jpg (midnight bg)');
  console.log('  logo-light.jpg / logo-light-2x.jpg (snow bg)');
  console.log('  icon-dark-256.jpg / icon-dark-512.jpg');
  console.log('');
  console.log('Favicon set:');
  console.log('  favicon.svg, 16x16, 32x32, 48x48');
  console.log('  android-chrome 192x192, 512x512');
  console.log('  apple-touch-icon 180x180');
  console.log('  mstile-150x150, site.webmanifest, browserconfig.xml');
  console.log('');
  console.log('Social / OG:');
  console.log('  og-dark.png (1200x630)');
  console.log('  og-light.png (1200x630)');
  console.log('  twitter-card.png (1200x600)');
}

main().catch(console.error);
