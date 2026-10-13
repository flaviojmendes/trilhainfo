import { existsSync, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { Contribution } from '../src/contributions/types';

export const contributionsDir = 'src/contributions/entries';

export function readContributions(root = process.cwd()): Contribution[] {
  const dir = resolve(root, contributionsDir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => JSON.parse(readFileSync(resolve(dir, file), 'utf8')) as Contribution);
}
