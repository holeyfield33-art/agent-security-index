import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const lines = (await readFile(new URL('review/SHA256SUMS.txt', root), 'utf8')).trim().split('\n');
for (const line of lines) {
  const [expected, relative] = line.split('  ');
  if (!expected || !relative) throw new Error(`Bad manifest line: ${line}`);
  const raw = await readFile(new URL(relative, root));
  const content = relative.endsWith('.png') ? raw : Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'));
  const actual = createHash('sha256').update(content).digest('hex');
  if (actual !== expected) throw new Error(`Hash mismatch: ${relative}`);
}
console.log(`${lines.length} review artifact hashes verified`);
