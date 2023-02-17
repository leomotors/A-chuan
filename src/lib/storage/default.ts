import type { Course, LocalStorageData } from "../@types";

export const CompEngEss = {
  name: "COMP ENG ESS",
  courseId: "2110221",
  grades: {
    A: 80,
    "B+": 75,
    B: 70,
    "C+": 65,
    C: 60,
    "D+": 55,
    D: 50,
  },
  fullScore: 100,
  scores: [
    {
      name: "Preparation / Pre-test",
      fullScore: 10,
      children: [
        ...new Array(12).fill(undefined).map((_, i) => ({
          name: `Pre-test Activity ${i + 1}`,
          fullScore: 10,
        })),
      ],
    },
    {
      name: "Activities",
      fullScore: 50,
      children: [
        "Data Rep.",
        "CPU",
        "OS & Linux",
        "Embed Sys.",
        "Sensors",
        "UX/UI",
        "Web Dev. I",
        "Web Dev. II",
        "ML",
        "Teamwork",
        "Com Laws",
        "Ethics",
      ].map((name, i) => ({
        name: `Activity ${i + 1} (${name})`,
        fullScore: 4,
      })),
    },
    {
      name: "Midterm Exam",
      fullScore: 20,
    },
    {
      name: "Final Exam",
      fullScore: 20,
    },
  ],
} satisfies Course;

export const defaultData = {
  courses: [CompEngEss],
} satisfies LocalStorageData;
