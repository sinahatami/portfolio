import { Github, Linkedin, Mail, Phone, Globe } from "lucide-react";

export const RESUME_DATA = {
  name: "Sina Hatami",
  initials: "SH",
  location: "Genoa, Italy",
  locationLink: "https://www.google.com/maps/place/Genoa,+Italy",
  about:
    "Senior Front-End Engineer with 5+ years of expertise in crafting scalable, high-performance web applications. Mastery in React and Angular, complemented by full-stack capabilities.",
  summary:
    "Senior Front-End Engineer with 5+ years of expertise in crafting scalable, high-performance web applications for diverse industries, including sustainable tech startups and enterprise software. Mastery in React and Angular, complemented by full-stack capabilities in Node.js and cloud services. Proven track record of optimizing UIs for 90%+ performance gains and leading projects that enhance user engagement by 65%. Seeking opportunities in the Netherlands with visa sponsorship.",
  avatarUrl: "https://github.com/sinahatami.png", // Pulls automatically from your GitHub
  personalWebsiteUrl: "https://sinahatami.github.io",
  contact: {
    email: "hatamisinaa@gmail.com",
    tel: "+39 379 114 9157",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/sinahatami",
        icon: Github,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sina-hatami/",
        icon: Linkedin,
      },
    ],
  },
  education: [
    {
      school: "University of Genoa",
      degree: "Master of Computer Science | Data Science & AI",
      start: "Sep 2022",
      end: "Jul 2025",
      notes:
        "Thesis: 'A Systematic Review of Recommender Systems'. Relevant Coursework: Machine Learning, Computer Vision, NLP.",
    },
    {
      school: "University of Buin Zahra",
      degree: "Bachelor of Computer Engineering | Software Engineering",
      start: "Sep 2017",
      end: "June 2021",
      notes: "Capstone: Web-based ERP System in Angular.",
    },
  ],
  work: [
    {
      company: "Independent Consultant",
      link: null,
      badges: ["Remote", "React", "Angular", "CI/CD"],
      title: "Senior Front-End Consultant",
      start: "May 2025",
      end: "Present",
      description:
        "Providing expert front-end development services to startups and SMEs. Developed custom React/Angular apps for 5+ clients, reducing deployment cycles by 50% via Docker/Git CI/CD pipelines.",
    },
    {
      company: "Widecons",
      link: "https://widecons.com",
      badges: ["React", "Node.js", "AWS", "Green Tech"],
      title: "Full-Stack Engineer",
      start: "Oct 2024",
      end: "Apr 2025",
      description:
        "Engineered features for green energy analytics using React and Node.js. Boosted platform efficiency by 70% and implemented lean production methodologies in a fast-paced startup environment.",
    },
    {
      company: "Iran EIT",
      link: null,
      badges: ["Micro-Frontends", "Architecture", "Angular", "Node.js"],
      title: "Front-End Developer",
      start: "June 2021",
      end: "Sep 2022",
      description:
        "Led Micro-Frontend architecture across 25+ modules handling 100K+ daily transactions. Developed reusable UI libraries that accelerated team productivity by 60%.",
    },
    {
      company: "BPT Soft",
      link: null,
      badges: ["React", "Angular", "Performance", "Mentorship"],
      title: "Front-End Developer",
      start: "May 2019",
      end: "June 2021",
      description:
        "Engineered 8+ large-scale ERP projects. Optimized legacy code performance by 90% (load times < 2s). Mentored 7 junior developers, improving team code quality metrics by 50%.",
    },
  ],
  skills: [
    "React/Next.js",
    "Angular/RxJS",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "Docker/AWS",
    "Tailwind CSS",
    "Python",
    "PostgreSQL",
    "Micro-Frontends",
  ],
  projects: [
    {
      title: "Rick and Morty Database",
      techStack: ["React", "Clean Architecture", "Performance"],
      description:
        "Interdimensional database exploring characters and locations. Features real-time search, pagination, and responsive design.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/rick-and-morty-web",
      },
    },
    {
      title: "Life Expectancy Viz",
      techStack: ["Angular", "Python", "Data Viz"],
      description:
        "Interactive dashboard for global life expectancy data using TypeScript, SCSS, and Python for data processing.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/dv-project",
      },
    },
  ],
} as const;
