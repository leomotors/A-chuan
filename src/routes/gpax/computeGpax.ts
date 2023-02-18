import { Grade, type LocalStorageData } from "$lib/@types";

export function computeGpax(gpax: LocalStorageData["gpax"]) {
  const computed = gpax.courses.reduce(
    (acc, course) => {
      if (course.outcome === "W") return acc;

      if (course.outcome === "S")
        return {
          ...acc,
          suCredits: acc.suCredits + course.credits,
        };

      const grade = Grade[course.outcome];

      return {
        ...acc,
        afCredits: acc.afCredits + course.credits,
        gpGained: acc.gpGained + course.credits * grade,
        gpLost: acc.gpLost + course.credits * (4 - grade),
      };
    },
    {
      afCredits: 0,
      suCredits: 0,
      gpGained: 0,
      gpLost: 0,
    }
  );

  return computed;
}
