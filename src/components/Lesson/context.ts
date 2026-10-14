import { createContext, useContext } from 'react';
import { LessonBlock } from '../../lessons/types';

export const LessonContext = createContext<{ lessonId: string }>({ lessonId: 'avulsa' });

export const useLessonId = () => useContext(LessonContext).lessonId;

export type Block<T extends LessonBlock['type']> = Extract<LessonBlock, { type: T }>;
