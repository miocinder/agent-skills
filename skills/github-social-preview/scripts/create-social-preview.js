const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, index, values) => {
    if (value.startsWith('--')) pairs.push([value.slice(2), values[index + 1]]);
    return pairs;
  }, []),
);

const required = ['input', 'font-file', 'output', 'brand', 'title', 'subtitle'];
for (const name of required) {
  if (!args[name]) throw new Error(`Missing required argument: --${name}`);
}

const escapeMarkup = (value) => value.replace(/[&<>]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[character]);

const themes = {
  dark: {
    accent: '#7c8cff',
    brand: '#aebcff',
    title: '#ffffff',
    subtitle: '#e1e5ee',
    topics: '#c4cbda',
    overlayStart: '#16101d',
    overlayStartOpacity: '0.48',
    overlayMiddleOpacity: '0.12',
    overlayEndOpacity: '0.28',
  },
  warm: {
    accent: '#c66563',
    brand: '#8f4962',
    title: '#351d36',
    subtitle: '#5b394f',
    topics: '#6f4a5d',
    overlayStart: '#fff6ee',
    overlayStartOpacity: '0.16',
    overlayMiddleOpacity: '0.04',
    overlayEndOpacity: '0.08',
  },
};

function textLayer(text, width, fontSize, weight, color) {
  return sharp({
    text: {
      text: `<span foreground="${color}" font_desc="Social Preview ${weight} ${fontSize}px">${escapeMarkup(text)}</span>`,
      fontfile: args['font-file'],
      width,
      rgba: true,
    },
  }).png().toBuffer();
}

async function main() {
  if (!fs.existsSync(args.input)) throw new Error(`Input image not found: ${args.input}`);
  if (!fs.existsSync(args['font-file'])) throw new Error(`Font file not found: ${args['font-file']}`);
  const theme = themes[args.theme || 'dark'];
  if (!theme) throw new Error(`Unknown theme: ${args.theme}. Use dark or warm.`);

  const output = path.resolve(args.output);
  await fs.promises.mkdir(path.dirname(output), { recursive: true });

  const overlay = Buffer.from(`
    <svg width="1280" height="640" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="${theme.overlayStart}" stop-opacity="${theme.overlayStartOpacity}"/><stop offset="0.62" stop-color="${theme.overlayStart}" stop-opacity="${theme.overlayMiddleOpacity}"/><stop offset="1" stop-color="${theme.overlayStart}" stop-opacity="${theme.overlayEndOpacity}"/></linearGradient></defs>
      <rect width="1280" height="640" fill="url(#fade)"/>
      <rect x="80" y="116" width="5" height="184" rx="2.5" fill="${theme.accent}"/>
    </svg>`);

  const [brand, title, subtitle, topics] = await Promise.all([
    textLayer(args.brand, 480, 24, 'Bold', theme.brand),
    textLayer(args.title, 600, 60, 'Bold', theme.title),
    textLayer(args.subtitle, 650, 26, 'Regular', theme.subtitle),
    textLayer(args.topics || '', 620, 20, 'Medium', theme.topics),
  ]);

  await sharp(args.input)
    .resize(1280, 640, { fit: 'cover', position: 'centre' })
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: brand, top: 145, left: 112 },
      { input: title, top: 190, left: 112 },
      { input: subtitle, top: 272, left: 112 },
      { input: topics, top: 416, left: 112 },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);

  const info = await sharp(output).metadata();
  const remainingMetadata = ['exif', 'icc', 'iptc', 'xmp'].filter((field) => info[field]);
  if (info.width !== 1280 || info.height !== 640) throw new Error(`Invalid output dimensions: ${info.width}×${info.height}`);
  if (remainingMetadata.length) throw new Error(`Metadata was not removed: ${remainingMetadata.join(', ')}`);
  console.log(`Created ${output} (${info.width}×${info.height}, metadata removed)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
