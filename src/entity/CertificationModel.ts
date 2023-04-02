export interface Answer {
  label: string;
  correct: boolean;
}

export interface Question {
  description: string;
  answers: Answer[];
  selectedAnswer?: Answer;
}

export interface Category {
  name: string;
  quantity: number;
  questions: Question[];
}

export interface Certification {
  id: string;
  title: string;
  description: string;
  categories: Category[];
}

export interface CertificationResult {
  id: string;
  title: string;
  nickname: string;
  certificationId: string;
  correctQuestions: number;
  questions: Question[];
  date: number;
}
