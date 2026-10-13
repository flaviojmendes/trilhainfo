// Rasterizes public/favicon.svg into the PNG and ICO icons browsers, iOS, Android and link unfurlers request.
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
const rounded = readFileSync(resolve(publicDir, 'favicon.svg'), 'utf8');
const square = rounded.replace(/rx="[^"]*"/, 'rx="0"');

const png = (svg, size) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

const outputs = [
  ['favicon.png', rounded, 192],
  ['favicon-16x16.png', rounded, 16],
  ['favicon-32x32.png', rounded, 32],
  ['apple-touch-icon.png', square, 180],
  ['android-chrome-192x192.png', square, 192],
  ['android-chrome-512x512.png', square, 512],
];
for (const [file, svg, size] of outputs) writeFileSync(resolve(publicDir, file), png(svg, size));

const icoImages = [16, 32, 48].map((size) => ({ size, data: png(rounded, size) }));
const header = Buffer.alloc(6 + icoImages.length * 16);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoImages.length, 4);
let offset = header.length;
icoImages.forEach(({ size, data }, index) => {
  const entry = 6 + index * 16;
  header.writeUInt8(size, entry);
  header.writeUInt8(size, entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(data.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});
writeFileSync(
  resolve(publicDir, 'favicon.ico'),
  Buffer.concat([header, ...icoImages.map(({ data }) => data)]),
);
console.log(`Ícones gerados em ${publicDir}`);
