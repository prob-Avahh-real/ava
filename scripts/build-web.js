#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'index.html');
const wwwDir = path.join(root, 'www');
const wwwOut = path.join(wwwDir, 'index.html');
const androidAssets = path.join(
  root,
  'android/app/src/main/assets/public/index.html'
);

if (!fs.existsSync(src)) {
  console.error('Missing index.html at project root');
  process.exit(1);
}

fs.mkdirSync(wwwDir, { recursive: true });
fs.copyFileSync(src, wwwOut);
console.log('Synced → www/index.html');

if (fs.existsSync(path.dirname(androidAssets))) {
  fs.mkdirSync(path.dirname(androidAssets), { recursive: true });
  fs.copyFileSync(src, androidAssets);
  console.log('Synced → android/app/src/main/assets/public/index.html');
} else {
  console.log('Android assets path not present yet (run cap add android / cap sync)');
}

console.log('✅ Ava web build ready');
