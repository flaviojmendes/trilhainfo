import { courses, Course, CourseModule } from './courses';
import { LessonMeta } from './types';
import { lessons as frontend } from './meta/frontend';
import { lessons as iaEstudo } from './meta/iaEstudo';
import { lessons as iaParceria } from './meta/iaParceria';
import { lessons as pythonSql } from './meta/pythonSql';
import { lessons as backend } from './meta/backend';
import { lessons as opsBase } from './meta/opsBase';
import { lessons as opsEntrega } from './meta/opsEntrega';
import { lessons as react } from './meta/react';
import { lessons as reactFullstack } from './meta/reactFullstack';
import { lessons as reactAvancado } from './meta/reactAvancado';
import { lessons as dados } from './meta/dados';
import { lessons as dadosPipelines } from './meta/dadosPipelines';
import { lessons as testesBase } from './meta/testesBase';
import { lessons as testesAutomacao } from './meta/testesAutomacao';
import { lessons as entrevistasCarreira } from './meta/entrevistasCarreira';
import { lessons as entrevistasTecnica } from './meta/entrevistasTecnica';
export type { LessonMeta, LessonContent, LessonBlock, LessonSection } from './types';
export type { Course, CourseModule } from './courses';
export { courses } from './courses';

/** Every lesson, in no particular order; each trail's course defines the teaching order. */
export const lessons: LessonMeta[] = [
  ...frontend,
  ...iaEstudo,
  ...iaParceria,
  ...pythonSql,
  ...backend,
  ...opsBase,
  ...opsEntrega,
  ...react,
  ...reactFullstack,
  ...reactAvancado,
  ...dados,
  ...dadosPipelines,
  ...testesBase,
  ...testesAutomacao,
  ...entrevistasCarreira,
  ...entrevistasTecnica,
];

const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));

export function findLesson(id: string | undefined): LessonMeta | undefined {
  return id ? byId.get(id) : undefined;
}

export function lessonsForGroup(groupId: string): LessonMeta[] {
  return lessons.filter((lesson) => lesson.groupIds.includes(groupId));
}

export function lessonsByGroup(): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  lessons.forEach((lesson) =>
    lesson.groupIds.forEach((groupId) => {
      (result[groupId] ||= []).push(lesson.id);
    }),
  );
  return result;
}

export function findCourse(id: string | undefined): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function courseLessons(course: Course): LessonMeta[] {
  return course.modules.flatMap((module) =>
    module.lessonIds.map((id) => byId.get(id)).filter((lesson): lesson is LessonMeta => !!lesson),
  );
}

export interface LessonPlace {
  course: Course;
  module: CourseModule;
  /** 1-based position in the course. */
  number: number;
  total: number;
  previous?: LessonMeta;
  next?: LessonMeta;
}

/** Where a lesson sits in a course: the requested one when it has the lesson, else the first. */
export function lessonPlace(lessonId: string, courseId?: string | null): LessonPlace | undefined {
  const course =
    courses.find(
      (candidate) =>
        candidate.id === courseId &&
        candidate.modules.some((module) => module.lessonIds.includes(lessonId)),
    ) ||
    courses.find((candidate) =>
      candidate.modules.some((module) => module.lessonIds.includes(lessonId)),
    );
  if (!course) return undefined;
  const ordered = courseLessons(course);
  const index = ordered.findIndex((lesson) => lesson.id === lessonId);
  const module = course.modules.find((value) => value.lessonIds.includes(lessonId)) as CourseModule;
  return {
    course,
    module,
    number: index + 1,
    total: ordered.length,
    previous: ordered[index - 1],
    next: ordered[index + 1],
  };
}

export function lessonUrl(lessonId: string, courseId?: string) {
  return courseId && findCourse(courseId)?.groups[lessonId]
    ? `/aula/${lessonId}?trilha=${encodeURIComponent(courseId)}`
    : `/aula/${lessonId}`;
}

/** Stable key for an activity inside a lesson, used to store the first answer. */
export const activityKey = (sectionId: string, index: number) => `${sectionId}:${index}`;
