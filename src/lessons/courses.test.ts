// @vitest-environment node
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { roadmapCatalogs } from '../../scripts/catalogPlugin';
import { courses } from './courses';
import { deriveCourses } from './deriveCourses';
import { lessons } from '.';

const file = resolve(__dirname, 'courses.ts');

it('cada trilha tem um curso que segue a ordem da própria trilha', () => {
  const derived = deriveCourses(roadmapCatalogs(), lessons);
  if (process.env.UPDATE_COURSES) {
    const source = readFileSync(file, 'utf8');
    const head = source.slice(0, source.indexOf('export const courses'));
    writeFileSync(
      file,
      `${head}export const courses: Course[] = ${JSON.stringify(derived, null, 2)};\n`,
    );
    return;
  }
  expect(courses).toEqual(derived);
});
