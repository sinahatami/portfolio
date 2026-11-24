import type { Experience } from "@/domain/portfolio";

/** Ordered newest first. */
export const EXPERIENCE: Experience[] = [
  {
    id: "happi-lab",
    company: "hAppI Lab",
    url: "https://radoslawniewiadomski.github.io/happilab/members2.html",
    logo: "/logo/happllab.png",
    role: "Data Science Researcher (Voluntary)",
    period: { start: "2026-04", end: "2026-07" },
    companySummary:
      "Research group at the University of Genoa focused on human activity recognition.",
    description:
      'Collaborated with Professor Radoslaw Niewiadomski on the "Towards Commensal Activities Recognition With Machine Learning" project.',
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Python",
      "Deep Learning",
      "TensorFlow",
      "OpenCV",
      "Keras",
      "PyTorch",
      "Artificial Neural Networks (ANN)",
      "Convolutional Neural Networks (CNN)",
    ],
  },
  {
    id: "widecons",
    company: "Widecons",
    url: "https://widecons.com",
    logo: "/logo/widecons.png",
    role: "Software Engineer | Data Scientist",
    period: { start: "2025-11", end: "2026-04" },
    companySummary:
      "Innovative startup offering sustainable digital solutions and green technologies.",
    description:
      "Engineered digital consulting platforms using React and Node.js, boosting system efficiency. Implemented lean production methodologies that accelerated feature rollouts while integrating complex green energy analytics.",
    skills: [
      "React",
      "Django",
      "Python",
      "Machine Learning",
      "Supervised Learning",
      "Recommender Systems",
      "Git",
      "AWS",
      "Docker",
    ],
  },
  {
    id: "iran-eit",
    company: "Iran EIT",
    url: "https://en.iraneit.com/",
    logo: "/logo/iran-eit.png",
    role: "Full Stack Engineer",
    period: { start: "2021-06", end: "2022-09" },
    companySummary:
      "Leading provider of integrated software for the national insurance industry, serving millions of users.",
    description:
      "Architected a scalable Micro-Frontend system across 25+ modules to handle 100K+ daily transactions. Led the Software Architecture Committee to establish design patterns that reduced project timelines by 60%.",
    skills: [
      "React",
      "Next.js",
      "Micro-Frontends",
      "Software Architecture",
      "GraphQL",
      "Jest",
      "Jasmine",
      "Node.js",
      "Django",
      "OOP",
      "Agile",
      "Git",
    ],
  },
  {
    id: "bpt-soft",
    company: "BPT Soft",
    url: "https://www.bptsoft.com/",
    logo: "/logo/bpt-soft.png",
    role: "Full Stack Engineer",
    period: { start: "2019-05", end: "2021-06" },
    companySummary:
      "ERP software specialist developing administrative systems for government and academic sectors.",
    description:
      "Delivered 5+ large-scale ERP projects achieving 90% market adoption. Optimized legacy codebases to slash load times to under 2 seconds (90% performance gain) and mentored 5 developers to improve team code quality by 50%.",
    skills: [
      "Angular",
      "Performance Optimization",
      "E2E Testing",
      "SQL Server",
      "Jest",
      "Mentorship",
    ],
  },
];
