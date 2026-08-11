const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const VALUE_OPTIONS = new Set([
  'input', 'output', 'width', 'height', 'fit', 'position', 'left', 'top',
  'extract-width', 'extract-height', 'format', 'quality', 'target-bytes',
  'rotate', 'background', 'preset',
]);
const FLAG_OPTIONS = new Set(['palette', 'without-enlargement', 'keep-metadata', 'overwrite', 'help']);
const FORMATS = new Set(['png', 'jpeg', 'webp', 'avif']);
const PRESETS = {
  thumbnail: { width: '640', height: '360', fit: 'cover', format: 'webp', quality: '80' },
  'web-share': { width: '1200', height: '630', fit: 'cover', format: 'jpeg', quality: '82' },
  avatar: { width: '512', height: '512', fit: 'cover', format: 'png' },
};
const PNG_SIGNATURE_LENGTH = 8;
const PNG_IMAGE_CHUNKS = new Set(['IHDR', 'PLTE', 'tRNS', 'IDAT', 'IEND']);

function usage() {
  return `Usage: node process-image.js --input <file> --output <file> [options]

Options: --width --height --fit --position --left --top --extract-width
--extract-height --format --quality --target-bytes --palette --rotate
--background --preset --without-enlargement --keep-metadata --overwrite`;
}

function parseArgs(values) {
  const args = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith('--')) throw new Error(`Unexpected argument: ${value}`);
    const name = value.slice(2);
    if (FLAG_OPTIONS.has(name)) {
      args[name] = true;
      continue;
    }
    if (!VALUE_OPTIONS.has(name)) throw new Error(`Unknown option: --${name}`);
    const optionValue = values[index + 1];
    if (!optionValue || optionValue.startsWith('--')) throw new Error(`Missing value for --${name}`);
    args[name] = optionValue;
    index += 1;
  }
  return args;
}

function numberOption(args, name, { min = 0, max = Number.MAX_SAFE_INTEGER, integer = true } = {}) {
  if (args[name] === undefined) return undefined;
  const value = Number(args[name]);
  if (!Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) {
    throw new Error(`Invalid --${name} value: ${args[name]}`);
  }
  return value;
}

function stripPngMetadata(buffer) {
  const chunks = [buffer.subarray(0, PNG_SIGNATURE_LENGTH)];
  let offset = PNG_SIGNATURE_LENGTH;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString('ascii');
    const chunkEnd = offset + 12 + length;
    if (chunkEnd > buffer.length) throw new Error('Invalid PNG chunk length.');
    if (PNG_IMAGE_CHUNKS.has(type)) chunks.push(buffer.subarray(offset, chunkEnd));
    offset = chunkEnd;
    if (type === 'IEND') break;
  }
  return Buffer.concat(chunks);
}

function pngChunkTypes(buffer) {
  const types = [];
  let offset = PNG_SIGNATURE_LENGTH;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString('ascii');
    types.push(type);
    offset += 12 + length;
    if (type === 'IEND') break;
  }
  return types;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (args.preset && !PRESETS[args.preset]) {
    throw new Error(`Unknown --preset: ${args.preset}. Use ${Object.keys(PRESETS).join(', ')}.`);
  }
  const directArgs = { ...args };
  Object.assign(args, PRESETS[args.preset], directArgs);
  if (!args.input || !args.output) throw new Error(usage());
  if (!fs.existsSync(args.input)) throw new Error(`Input not found: ${args.input}`);

  const output = path.resolve(args.output);
  if (fs.existsSync(output) && !args.overwrite) throw new Error(`Output exists: ${output}. Use --overwrite to replace it.`);

  const width = numberOption(args, 'width', { min: 1 });
  const height = numberOption(args, 'height', { min: 1 });
  const quality = numberOption(args, 'quality', { min: 1, max: 100 }) ?? 82;
  const targetBytes = numberOption(args, 'target-bytes', { min: 1 });
  const rotate = numberOption(args, 'rotate', { min: 0, max: 360 });
  const extractValues = ['left', 'top', 'extract-width', 'extract-height'];
  const hasExtract = extractValues.some((name) => args[name] !== undefined);
  if (hasExtract && !extractValues.every((name) => args[name] !== undefined)) {
    throw new Error('Exact cropping requires --left, --top, --extract-width, and --extract-height.');
  }

  const extension = path.extname(output).slice(1).toLowerCase().replace('jpg', 'jpeg');
  const format = (args.format || extension).toLowerCase().replace('jpg', 'jpeg');
  if (!FORMATS.has(format)) throw new Error('Use --format png, jpeg, webp, or avif, or an output path with one of those extensions.');
  if (args.fit && !['cover', 'contain', 'fill', 'inside', 'outside'].includes(args.fit)) throw new Error(`Invalid --fit: ${args.fit}`);

  const background = args.background || '#ffffff';
  const render = async (outputQuality) => {
    let pipeline = sharp(args.input, { animated: false });
    pipeline = rotate === undefined ? pipeline.rotate() : pipeline.rotate(rotate);
    if (hasExtract) {
      pipeline = pipeline.extract({
        left: numberOption(args, 'left', { min: 0 }),
        top: numberOption(args, 'top', { min: 0 }),
        width: numberOption(args, 'extract-width', { min: 1 }),
        height: numberOption(args, 'extract-height', { min: 1 }),
      });
    }
    if (width || height) {
      pipeline = pipeline.resize({
        width,
        height,
        fit: args.fit || 'inside',
        position: args.position || 'centre',
        background,
        withoutEnlargement: Boolean(args['without-enlargement']),
      });
    }
    if (args['keep-metadata']) pipeline = pipeline.withMetadata();
    if (format === 'jpeg') return pipeline.flatten({ background }).jpeg({ quality: outputQuality, mozjpeg: true }).toBuffer();
    if (format === 'webp') return pipeline.webp({ quality: outputQuality }).toBuffer();
    if (format === 'avif') return pipeline.avif({ quality: outputQuality }).toBuffer();
    return pipeline.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: Boolean(args.palette || targetBytes),
      quality: outputQuality,
      colours: 256,
      dither: 1,
    }).toBuffer();
  };

  let finalBuffer;
  for (let currentQuality = quality; currentQuality >= 20; currentQuality -= 5) {
    let candidate = await render(currentQuality);
    if (format === 'png' && !args['keep-metadata']) candidate = stripPngMetadata(candidate);
    finalBuffer = candidate;
    if (!targetBytes || candidate.length <= targetBytes) break;
  }
  if (targetBytes && finalBuffer.length > targetBytes) {
    throw new Error(`Could not reach --target-bytes ${targetBytes}; smallest result was ${finalBuffer.length} bytes.`);
  }

  await fs.promises.mkdir(path.dirname(output), { recursive: true });
  await fs.promises.writeFile(output, finalBuffer);

  const info = await sharp(output).metadata();
  const metadata = ['exif', 'icc', 'iptc', 'xmp'].filter((field) => info[field]);
  if (!args['keep-metadata'] && metadata.length) throw new Error(`Metadata remains: ${metadata.join(', ')}`);
  if (format === 'png' && !args['keep-metadata']) {
    const unexpected = pngChunkTypes(finalBuffer).filter((type) => !PNG_IMAGE_CHUNKS.has(type));
    if (unexpected.length) throw new Error(`PNG metadata chunks remain: ${unexpected.join(', ')}`);
  }

  console.log(JSON.stringify({ output, width: info.width, height: info.height, format: info.format, bytes: finalBuffer.length, metadata }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
