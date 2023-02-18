export interface Score {
  name: string;
  /** `undefined` if not announced */
  score?: number;
  fullScore: number;
  /** defaults to fullScore */
  actualFullScore?: number;
  isBonus?: boolean;
  includeBonusInMaxScore?: boolean;
}

export type ChildrenScore = Score;

export interface TopLevelScore extends Score {
  children?: ChildrenScore[];
}

export type Course = {
  name: string;
  courseId: string;
  grades: Record<string, number>;
  fullScore: number;
  scores: TopLevelScore[];
};

export const Grade = {
  A: 4,
  "B+": 3.5,
  B: 3,
  "C+": 2.5,
  C: 2,
  "D+": 1.5,
  D: 1,
  F: 0,
} as const;

export type GpaxCourse = {
  name: string;
  courseId: string;
  credits: number;
  outcome: keyof typeof Grade | "W" | "S";
};

export type LocalStorageData = {
  courses: Course[];
  gpax: {
    totalCredits: number;
    overCredits: number;
    courses: GpaxCourse[];
  };
};
