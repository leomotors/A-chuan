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

export type LocalStorageData = {
  courses: Course[];
};
