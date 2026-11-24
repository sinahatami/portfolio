import type { Education } from "@/domain/portfolio";

/** Ordered newest first. */
export const EDUCATION: Education[] = [
  {
    id: "unige",
    school: "University of Genoa",
    url: "https://unige.it/en/",
    logo: "/logo/unige.png",
    degree: "Master of Computer Science",
    focus: "Data Science & Engineering, Artificial Intelligence",
    period: { start: "2022-09", end: "2026-07" },
    thesis: "A Systematic Review of Recommender Systems",
    coursework: [
      "Digital Signal & Image Processing",
      "Machine Learning",
      "Computer Vision",
      "Advanced Machine Learning (Deep & Reinforcement Learning)",
      "Natural Language Processing",
      "Multi-Agent Systems",
      "Data Visualization",
    ],
  },
  {
    id: "bzte",
    school: "University of Buin Zahra",
    url: "https://bzte.ac.ir/",
    logo: "/logo/bzte.png",
    degree: "Bachelor of Computer Engineering",
    focus: "Software Engineering",
    period: { start: "2017-09", end: "2021-06" },
    coursework: [
      "Computer Programming",
      "Data Structures & Algorithms",
      "Software Architecture",
      "Database Systems",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];
