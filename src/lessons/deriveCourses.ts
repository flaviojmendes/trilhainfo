import { RoadmapCatalog } from '../learning/types';
import type { Course } from './courses';
import { LessonMeta } from './types';

/**
 * A trail's course follows the trail: stage by stage, group by group, each lesson listed once
 * under the first group it teaches.
 */
export function deriveCourses(catalogs: RoadmapCatalog[], lessons: LessonMeta[]): Course[] {
  return catalogs
    .map((catalog) => {
      const seen = new Set<string>();
      const groups: Record<string, string> = {};
      const modules = catalog.stages
        .map((stage) => {
          const lessonIds = stage.groupIds.flatMap((groupId) =>
            lessons
              .filter((lesson) => lesson.groupIds.includes(groupId) && !seen.has(lesson.id))
              .map((lesson) => {
                seen.add(lesson.id);
                groups[lesson.id] = groupId;
                return lesson.id;
              }),
          );
          return { title: stage.title, ...(stage.optional ? { optional: true } : {}), lessonIds };
        })
        .filter((module) => module.lessonIds.length > 0);
      return { id: catalog.id, title: catalog.title, modules, groups };
    })
    .filter((course) => course.modules.length > 0);
}
