import type { Course } from "$lib/@types";

export function computeScore(course?: Course) {
  if (!course) return { totalScore: undefined, achievable: undefined };

  let totalScore = 0;
  let achievable = 0;

  for (const score of course.scores) {
    if (!score.children) {
      // Top Level Score
      totalScore += score.score ?? 0;
      achievable += score.score ?? score.fullScore;
      continue;
    }

    // Score with childrens

    let localScore = 0;
    let localAchievable = 0;
    let localFullScore = 0;

    for (const subScore of score.children) {
      localScore += subScore.score ?? 0;
      localAchievable += subScore.score ?? subScore.fullScore;
      localFullScore += subScore.fullScore;
    }

    const scaledScore = (localScore / localFullScore) * score.fullScore;
    const scaledAchievable =
      (localAchievable / localFullScore) * score.fullScore;

    score.score = scaledScore;

    totalScore += scaledScore;
    achievable += scaledAchievable;
  }

  return {
    totalScore,
    achievable,
  };
}
