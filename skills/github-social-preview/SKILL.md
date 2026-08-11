---
name: github-social-preview
description: Create a polished GitHub repository social-preview image (1280×640 PNG) from an AI-generated background and exact Sharp-rendered text. Use when creating or refreshing a GitHub repository social card, Open Graph preview, or repository banner.
---

# GitHub Social Preview

Create a 1280×640px PNG for a GitHub repository's social preview. Use image generation for the abstract visual background, then render every word with Sharp so titles are accurate and reproducible.

## Workflow

1. Generate a text-free background image. Reserve the left 55% for copy, keep all important graphics inside a 60px safe margin, and avoid logos, watermarks, and UI screenshots.
2. Install Sharp in the working project if needed:

   ```bash
   npm i sharp
   ```

3. Choose a Korean font with a clear, permissive redistribution/use license. Do not include a font file in this skill or repository; obtain the font from its official source and pass its local path to the script.
4. Run the included script. It crops the background, lays out accurate text, writes a palette PNG, removes non-image PNG chunks, and fails unless the result is below the 900 KB target.

   ```bash
   node scripts/create-social-preview.js \
     --input /absolute/path/background.png \
     --font-file /absolute/path/licensed-korean-font.ttf \
     --theme dark \
     --output /absolute/path/social-preview.png \
     --brand "OWNER / REPOSITORY" \
     --title "개인용 Agent Skills" \
     --subtitle "반복 업무를 위한 나만의 에이전트 스킬 모음" \
     --topics "DEVELOPMENT  ·  RESEARCH  ·  WRITING"
   ```

5. Inspect the final image. Confirm its dimensions are exactly 1280×640px, below 1 MB, all copy is legible, and no text enters the outer 60px safe area.

Use `--theme dark` for dark or cool backgrounds and `--theme warm` for light or warm backgrounds. The warm theme uses deep plum text instead of white so it retains contrast without looking out of place.

## Design rules

- Generate the visual background with image generation; never ask the image model to render the final copy.
- Keep the composition simple: dark or muted backdrop, left-aligned text, visual object cluster on the right.
- Use a locally supplied font file only. Never rely on an unverified system font for Korean text.
- Keep social-card text brief: one title, one explanatory line, and optional topic labels.
- Do not retain image metadata. Keep only the PNG image chunks required for rendering.
- Keep the final file below 1 MB; the script targets 900 KB to leave a safety margin.
