import type { Profile } from "@/domain/portfolio";

export const PROFILE: Profile = {
  name: "Sina Hatami",
  initials: "SH",
  role: "Software engineer and data scientist",
  headline:
    "I build web platforms and the machine-learning systems behind them.",
  intro:
    "Four years shipping production software: ERP suites for government and academic institutions, then a micro-frontend platform handling more than 100,000 insurance transactions a day. From 2022 to 2026 I studied Data Science & AI at the University of Genoa, where I also worked on activity-recognition research at the hAppI Lab.",
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
