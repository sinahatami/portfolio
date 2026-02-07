export interface SkillDetail {
  name: string;
  description: string;
  level: number;
  years: number;
  projects: number;
  certification?: string;
  icon?: string;
  category: "frontend" | "backend" | "devops" | "data-science" | "ai-ml";
}

export const SKILL_DETAILS: Record<string, SkillDetail> = {
  "React/Next.js 15": {
    name: "React/Next.js 15",
    description:
      "Expert in modern React with Next.js 15 App Router, Server Components, and React Server Components. Built production applications with 99% Lighthouse scores.",
    level: 95,
    years: 5,
    projects: 42,
    certification: "React Certification (Meta)",
    category: "frontend",
  },
  TypeScript: {
    name: "TypeScript",
    description:
      "Type-safe development with advanced patterns, generics, and type utilities. Strong experience in large-scale TypeScript monorepos.",
    level: 90,
    years: 4,
    projects: 38,
    category: "frontend",
  },
  "Node.js": {
    name: "Node.js",
    description:
      "Full-stack development with Express, NestJS, and serverless functions. Experience with microservices and REST/GraphQL APIs.",
    level: 85,
    years: 4,
    projects: 25,
    category: "backend",
  },
  "Computer Vision": {
    name: "Computer Vision",
    description:
      "Experience with OpenCV, image processing, object detection, and facial recognition. Worked on projects involving video analysis and pattern recognition.",
    level: 80,
    years: 2,
    projects: 4,
    category: "ai-ml",
  },

  "Data Visualization (D3.js)": {
    name: "Data Visualization (D3.js)",
    description:
      "Created interactive data visualizations and dashboards using D3.js. Expertise in charts, graphs, and real-time data representation.",
    level: 85,
    years: 3,
    projects: 6,
    category: "frontend",
  },

  "Micro-Frontends": {
    name: "Micro-Frontends",
    description:
      "Architected and implemented micro-frontend solutions for large-scale applications. Experience with module federation and independent deployment.",
    level: 85,
    years: 2,
    projects: 3,
    category: "frontend",
  },

  "System Design": {
    name: "System Design",
    description:
      "Designed scalable system architectures, database schemas, and API contracts. Experience with distributed systems and performance optimization.",
    level: 85,
    years: 4,
    projects: 8,
    category: "backend",
  },

  "Pandas/NumPy": {
    name: "Pandas/NumPy",
    description:
      "Proficient in data manipulation and analysis using Pandas and NumPy. Experience with data cleaning, transformation, and statistical analysis.",
    level: 90,
    years: 3,
    projects: 10,
    category: "data-science",
  },

  "Scikit-Learn": {
    name: "Scikit-Learn",
    description:
      "Implemented machine learning models using Scikit-Learn for classification, regression, clustering, and model evaluation.",
    level: 85,
    years: 2,
    projects: 6,
    category: "ai-ml",
  },

  NLP: {
    name: "NLP",
    description:
      "Natural Language Processing experience including text classification, sentiment analysis, and language modeling using modern NLP libraries.",
    level: 75,
    years: 1,
    projects: 3,
    category: "ai-ml",
  },

  AWS: {
    name: "AWS",
    description:
      "Deployed and managed cloud infrastructure on AWS including EC2, S3, Lambda, RDS, and CloudFront. Experience with serverless architectures.",
    level: 80,
    years: 2,
    projects: 5,
    category: "devops",
  },

  Docker: {
    name: "Docker",
    description:
      "Containerized applications using Docker, created Dockerfiles, and managed multi-container applications with Docker Compose.",
    level: 85,
    years: 2,
    projects: 7,
    category: "devops",
  },

  GraphQL: {
    name: "GraphQL",
    description:
      "Implemented GraphQL APIs with Apollo Server and Client. Experience with schema design, resolvers, and performance optimization.",
    level: 80,
    years: 2,
    projects: 4,
    category: "backend",
  },
};
