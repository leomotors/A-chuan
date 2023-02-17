export type Subject = {
  name: string;
  courseId: string;
  grades: Record<string, number>;
  fullScore: number;
  scores: TopLevelScore[];
};

export interface Score {
  name: string;
  /** `undefined` if not announced */
  score?: number;
  fullScore: number;
  weight: number;
  isBonus?: boolean;
  includeBonusInMaxScore?: boolean;
}

export interface TopLevelScore extends Score {
  children: ChildrenScore[];
}

export type ChildrenScore = Score;
