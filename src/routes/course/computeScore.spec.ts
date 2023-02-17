import { describe, expect, it } from "vitest";

import { defaultData } from "$lib/storage/default";

import { computeScore } from "./computeScore";

describe("computeScore", () => {
  it("default value when undefined", () => {
    expect(computeScore()).toStrictEqual({
      totalScore: undefined,
      achievable: undefined,
    });
  });

  it("empty data", () => {
    expect(computeScore(defaultData.courses[0])).toStrictEqual({
      totalScore: 0,
      achievable: 100,
    });
  });

  describe("Partially filled data", () => {
    const baseData = defaultData.courses[0];

    const factory = (score: number) => ({
      ...baseData,
      scores: [
        {
          name: "Preparation / Pre-test",
          fullScore: 10,
          children: [
            ...new Array(6).fill(undefined).map((_, i) => ({
              name: `Pre-test Activity ${i + 1}`,
              fullScore: 10,
              score,
            })),
            ...new Array(6).fill(undefined).map((_, i) => ({
              name: `Pre-test Activity ${i + 7}`,
              fullScore: 10,
            })),
          ],
        },
        ...baseData.scores.slice(1),
      ],
    });

    it("ALL PERFECT", () => {
      expect(computeScore(factory(10))).toStrictEqual({
        totalScore: 5,
        achievable: 100,
      });
    });

    it("all miss", () => {
      expect(computeScore(factory(0))).toStrictEqual({
        totalScore: 0,
        achievable: 95,
      });
    });

    it("partial score", () => {
      expect(computeScore(factory(5))).toStrictEqual({
        totalScore: 2.5,
        achievable: 97.5,
      });
    });
  });
});
