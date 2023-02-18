import { describe, expect, it } from "vitest";

import { computeGpax } from "./computeGpax";

describe("computeGpax", () => {
  it("one A", () => {
    expect(
      computeGpax({
        totalCredits: 139,
        overCredits: 0,
        courses: [
          {
            name: "Subject A",
            courseId: "000",
            credits: 3,
            outcome: "A",
          },
        ],
      })
    ).toStrictEqual({
      // gpax: 4,
      afCredits: 3,
      suCredits: 0,
      gpGained: 12,
      gpLost: 0,
    });
  });
});
