---
name: image-processing
description: Process existing or newly generated raster images with Sharp. Use when resizing, cropping, converting, compressing, stripping metadata, or validating PNG, JPEG, WebP, or AVIF images during development.
---

# Image Processing

Use this skill to generate a new raster source with Codex image generation when needed, or to transform an existing image deterministically with the bundled Sharp wrapper. The wrapper does not generate imagery; it resizes, crops, converts, compresses, and validates supplied image files.

## Workflow

1. Inspect the source image and identify its required output: dimensions, crop, format, target byte size, and whether transparency must be preserved.
2. For a new visual, use Codex image generation first. Save the generated source in the project, then process it with the wrapper.
3. Install Sharp in the project being processed if it is unavailable:

   ```bash
   npm i sharp
   ```

4. Write output to a new explicit path. The wrapper refuses to overwrite an existing file unless `--overwrite` is supplied.
5. Keep metadata stripping enabled unless metadata is explicitly required. Inspect the script's final report for output dimensions, format, byte size, and remaining metadata fields.
6. Open the output and visually inspect crops, text, transparency, and compression artifacts.

## Optional presets

Use a preset for a quick starting point, then set direct options to override any of its values. Presets never prevent explicit control.

- `thumbnail`: 640×360, cover, WebP.
- `web-share`: 1200×630, cover, JPEG.
- `avatar`: 512×512, cover, PNG.

```bash
node scripts/process-image.js --input source.png --output card.webp --preset thumbnail --width 800 --quality 85
```

## Direct options

```bash
node scripts/process-image.js \
  --input /absolute/path/source.png \
  --output /absolute/path/processed.webp \
  --width 1600 \
  --height 900 \
  --fit cover \
  --position centre \
  --format webp \
  --quality 82 \
  --target-bytes 500000
```

- `--width`, `--height`: resize dimensions. Supply either or both.
- `--fit`: `cover`, `contain`, `fill`, `inside`, or `outside` when both dimensions are supplied.
- `--position`: Sharp crop position such as `centre`, `top`, `bottom`, `left`, `right`, or `attention`.
- `--left`, `--top`, `--extract-width`, `--extract-height`: crop an exact rectangle before resizing. Supply all four together.
- `--format`: `png`, `jpeg`, `webp`, or `avif`. Defaults to the output file extension.
- `--quality`: output quality from 1 to 100. Defaults to 82.
- `--target-bytes`: maximum output size. The wrapper lowers quality in five-point steps and fails if it cannot meet the target.
- `--preset`: optional `thumbnail`, `web-share`, or `avatar` starting point. Direct options override it.
- `--palette`: use an indexed palette PNG. Useful for illustration-like PNGs that need a smaller file.
- `--rotate`: rotate by 90, 180, or 270 degrees. Without it, EXIF orientation is applied automatically.
- `--background`: background color for `contain` resizing and JPEG flattening. Defaults to white.
- `--without-enlargement`: prevent upscaling.
- `--keep-metadata`: preserve metadata. Metadata is stripped by default.
- `--overwrite`: allow replacing an existing output file.

## Safety and quality rules

- Never overwrite the source by default.
- Preserve transparency by using PNG, WebP, or AVIF; JPEG always flattens alpha against `--background`.
- Use a target byte size for upload limits. Leave a practical margin below a hard limit.
- For PNG output with metadata stripping, retain only rendering-essential PNG chunks.
- Do not claim the image is optimized until the wrapper succeeds and the output has been visually inspected.
