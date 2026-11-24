import type { Profile } from "@/domain/portfolio";

export const PROFILE: Profile = {
  name: "Sina Hatami",
  initials: "SH",
  role: "Software engineer and data scientist",
  headline:
    "I build web platforms and the machine-learning systems behind them.",
  proof: [
    {
      kind: "fact",
      after: "web platforms",
      cite: "Iran EIT",
      title: "Iran EIT, 2021 to 2022",
      body: "A micro-frontend platform of 25+ modules, handling more than 100,000 insurance transactions a day.",
      link: { label: "See the role", href: "#experience-iran-eit" },
    },
    {
      kind: "fact",
      after: "machine-learning systems",
      cite: "HoldsUp and ChangeRadar",
      title: "HoldsUp, ChangeRadar and commensal activity recognition",
      body: "Checking statistical claims against official data, tracing the impact of code changes with retrieval, and recognising activities from video.",
      link: { label: "See the projects", href: "#projects" },
    },
    {
      kind: "reference",
      after: "behind them.",
      recommendationId: "payam-jabbari",
    },
  ],
  intro:
    "Four years of production software, a master's in data science and AI from the University of Genoa, and research on activity recognition at the hAppI Lab.",
  description:
    "Sina Hatami is a software engineer and data scientist in Genoa, Italy, building scalable web platforms and machine-learning systems with React, Next.js, Python and TensorFlow.",
  location: {
    label: "Genoa, Italy",
    mapUrl: "https://www.google.com/maps/place/Genoa,+Italy",
  },
  availability: { open: true, label: "Open to new roles" },
  yearsOfExperience: "4+",
  photo: { src: "/avatar.jpg", alt: "Sina Hatami" },
  website: "https://sinahatami.vercel.app",
  sourceCode: "https://github.com/sinahatami/portfolio",
  email: "hatamisinaa@gmail.com",
  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "sinahatami",
      url: "https://github.com/sinahatami",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "sina-hatami",
      url: "https://www.linkedin.com/in/sina-hatami/",
    },
  ],
};
