#!/usr/bin/env node

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

function usage() {
  return [
    'Usage: node hash-assets.js <file...> [--length <1-32>]',
    'Input paths are resolved from the current working directory.',
  ].join('\n');
}

function parseArgs(values) {
  const args = { files: [], length: 10 };
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === '--length') {
      const length = Number(values[index + 1]);
      if (!Number.isInteger(length) || length < 1 || length > 32) {
        throw new Error('--length must be an integer from 1 to 32.');
      }
      args.length = length;
      index += 1;
      continue;
    }
    if (value === '--help') {
      args.help = true;
      continue;
    }
    if (value.startsWith('--')) throw new Error(`Unknown option: ${value}`);
    args.files.push(value);
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (!args.files.length) throw new Error(usage());

  const hashes = {};
  for (const file of args.files) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      throw new Error(`File not found: ${file}`);
    }
    hashes[file] = crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('hex').slice(0, args.length);
  }
  console.log(JSON.stringify(hashes, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
