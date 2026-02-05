import { Github, Linkedin } from "lucide-react";
import { Testimonial } from "./testimonial-interface";

export const RESUME_DATA = {
  name: "Sina Hatami",
  initials: "SH",
  location: "Genoa, Italy",
  locationLink: "https://www.google.com/maps/place/Genoa,+Italy",
  about:
    "Senior Front-End Engineer with 5+ years of expertise in crafting scalable, high-performance web applications. Mastery in React and Angular, complemented by full-stack capabilities.",
  summary:
    "Senior Front-End Engineer with 5+ years of expertise in crafting scalable, high-performance web applications for diverse industries, including sustainable tech startups and enterprise software. Mastery in React and Angular, complemented by full-stack capabilities in Node.js and cloud services. Proven track record of optimizing UIs for 90%+ performance gains and leading projects that enhance user engagement by 65%. Seeking opportunities in the Netherlands with visa sponsorship.",
  avatarUrl: "/self-photo.jpg",
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
      link: "https://unige.it/en/",
      degree:
        "Master of Computer Science | Data Science & Engineering | Artificial Intelligence",
      start: "Sep 2022",
      end: "Jul 2025",
      logoUrl: "/logo/unige.png",
      notes:
        "Thesis: 'A Systematic Review of Recommender Systems'. Relevant Coursework: Machine Learning, Computer Vision, NLP.",
    },
    {
      school: "University of Buin Zahra",
      link: "https://bzte.ac.ir/",
      degree: "Bachelor of Computer Engineering | Software Engineering",
      start: "Sep 2017",
      end: "June 2021",
      logoUrl: "/logo/bzte.png",
      notes: "Capstone: Web-based ERP System in Angular.",
    },
  ],
  work: [
    {
      company: "Independent Consultant",
      link: null,
      logoUrl: "/logos/consultant-placeholder.png",
      badges: ["Remote", "React", "Angular", "CI/CD"],
      title: "Senior Front-End Consultant",
      start: "May 2025",
      end: "Present",
      summary: "Specialized consultancy for high-growth startups and SMEs.",
      description: "Provided expert front-end development services...",
    },
    {
      company: "Widecons",
      link: "https://widecons.com",
      logoUrl: "/logo/widecons.png",
      badges: ["React", "Node.js", "AWS", "Green Tech"],
      title: "Full-Stack Engineer",
      start: "Oct 2024",
      end: "Apr 2025",
      summary: "Specialized consultancy for high-growth startups and SMEs.",
      description:
        "Engineered features for green energy analytics using React and Node.js. Boosted platform efficiency by 70% and implemented lean production methodologies in a fast-paced startup environment.",
    },
    {
      company: "Iran EIT",
      link: "https://en.iraneit.com/",
      logoUrl: "/logo/iran-eit.png",
      badges: ["Micro-Frontends", "Architecture", "Angular", "Node.js"],
      title: "Front-End Developer",
      start: "June 2021",
      end: "Sep 2022",
      summary: "Specialized consultancy for high-growth startups and SMEs.",
      description:
        "Led Micro-Frontend architecture across 25+ modules handling 100K+ daily transactions. Developed reusable UI libraries that accelerated team productivity by 60%.",
    },
    {
      company: "BPT Soft",
      link: "https://www.bptsoft.com/",
      logoUrl: "/logo/bpt-soft.png",
      badges: ["React", "Angular", "Performance", "Mentorship"],
      title: "Front-End Developer",
      start: "May 2019",
      end: "June 2021",
      summary: "Specialized consultancy for high-growth startups and SMEs.",
      description:
        "Engineered 8+ large-scale ERP projects. Optimized legacy code performance by 90% (load times < 2s). Mentored 7 junior developers, improving team code quality metrics by 50%.",
    },
  ],
  skills: [
    {
      category: "Software Architecture",
      items: [
        "React/Next.js 15",
        "TypeScript",
        "Micro-Frontends",
        "Node.js",
        "GraphQL",
        "Docker",
        "AWS",
        "System Design",
      ],
    },
    {
      category: "Data Science & AI",
      items: [
        "Python",
        "Pandas/NumPy",
        "Scikit-Learn",
        "Computer Vision",
        "NLP",
        "TensorFlow",
        "Data Visualization (D3.js)",
      ],
    },
  ],
  projects: [
    {
      title: "Rick and Morty Universe",
      slug: "rick-and-morty-universe",
      techStack: ["React", "Next.js", "TanStack Query", "Framer Motion"],
      description:
        "A high-performance interdimensional encyclopedia. Built to demonstrate state management complex data fetching patterns.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/rick-and-morty-web",
        hrefLive: "https://rick-and-morty-universe-demo.vercel.app",
      },
      content: {
        tagline: "Mapping the Multiverse with Millisecond Precision",
        challenge:
          "The API provides thousands of nodes with complex relationships. The challenge was to create a seamless, non-blocking exploration experience without overwhelming the browser's main thread.",
        solution:
          "Implemented an optimistic caching strategy using TanStack Query to pre-fetch character associations. Used Virtualization for infinite scrolling lists to maintain 60fps even with 1000+ DOM nodes.",
        features: [
          "Server-Side Rendering for SEO",
          "Optimistic UI Updates",
          "Virtual Scrolling for Performance",
          "Dynamic Theme Generation based on character species",
        ],
      },
    },
    {
      title: "Life Expectancy Viz",
      slug: "life-expectancy-viz",
      techStack: ["Angular", "D3.js", "Python", "TypeScript"],
      description:
        "Interactive dashboard for visualizing global life expectancy data. Features complex data normalization and canvas-based rendering.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/rick-and-morty-web",
        hrefLive: "https://rick-and-morty-universe-demo.vercel.app",
      },
      content: {
        tagline: "Visualizing Human Longevity Trends",
        challenge:
          "Rendering 50+ years of data across 195 countries created a performance bottleneck in standard DOM-based charting libraries.",
        solution:
          "Leveraged D3.js with a Canvas layer for the heavy rendering, keeping the UI thread responsive. Backend Python processing normalized the disparate datasets before they ever reached the client.",
        features: [
          "Canvas-based rendering engine",
          "Python Pandas for data normalization",
          "Interactive time-series scrubbing",
          "Exportable reports in PDF/CSV",
        ],
      },
    },
  ],
  testimonials: [
    {
      name: "Behzad Feizi",
      role: "CEO",
      company: "BPt Soft",
      quote: `I am proud to introduce Mr.Sina. He was only 19 when he joined the company. He was very inexperienced at first, but he became one of the most important members of the company over time. He has been working as a front-end developer for more than two and a half years. He has developed projects such as HR software, performance evaluation software, and payroll software. 
      His level in this field is senior because he can uniquely advance a project from beginning to end at a high level. On the other hand, He has studied server-side languages and artificial intelligence, which is remarkable. Mr.Sina is familiar with and works with a variety of software tools, and develops projects using knowledge such as data structure, algorithm design, and design patterns.
      On the other side, I believe him because he is always looking for new knowledge in computer science. He wants to spare no expense to learn new knowledge. When someone of this low age has high experience and expert in his field, he can succeed anywhere. Moreover, he can architect software on large scale as a software engineer, and his ability to solve the problem is admirable.
      As a consequence, he is an orderly, precise, and motivated person with a bright future ahead of him. He was able to work well in the company. I admire him as the managing director and I ask you to contact me with any questions you have about Mr.Sina.`,
      fileUrl: "/recommendations/Recommendation_from_Manager_BPT.pdf",
      personalWebsite: "https://linkedin.com/in/behzad-feizi-2835b29b",
      companyWebsite: "https://www.bptsoft.com/",
    },
    {
      name: "Payam Jabbari",
      role: "Senior software developer",
      company: "Iran EIT",
      quote: `It is my pleasure to recommend Sina Hatami for admission as an employee at your company.
      I am a ten-year senior developer at IranEIT Corporation in Iran. I came to know Sina when I was a co-worker in the infrastructure team at the Web framework project based on the Angular framework and backend of Asp.net core. Sina distinguished herself by submitting an exceptionally well-implementation and interesting solution on the the Web framework structure and ability that is easy to develop future.
      I would rank her in the top 2% of co-workers that I have work in the past 18 years concerning her developer ability research and professional behavior skills.
      Overall, Sina is highly intelligent and because he recently graduated Master's degree in Artificial intelligence at the University of Genova in Italy therefor has good skills in Python, TensorFlow, Machine Learning and Computer Vision.`,
      personalWebsite: "https://www.linkedin.com/in/payamjabbari",
      companyWebsite: "https://www.iraneit.com/",
    },
    {
      name: "Radoslaw Niewiadomski",
      role: "Professor",
      company: "University of Genoa",
      quote: `I am pleased to write this letter in support of Sina Hatami, the student at the University of Genoa,
      whom I have had the pleasure of working with since September 2024. From the beginning, Sina
      expressed a strong interest to participate voluntarily in the research project focused on activity
      detection (in the field of computer vision and applied deep learning). Specifically, the task involved
      the classification of nonverbal behaviors using LSTM in a pre-existing set of video recordings.
      Throughout this time, Sina has regularly attended meetings and actively contributed to the project.
      He has demonstrated the ability to work autonomously, as well as great enthusiasm for learning
      and developing new skills in this research area.
      His perseverance and commitment are impressive, especially given that his participation in the
      project has been entirely voluntary and unrelated to his thesis or internship obligations.
      I confidently recommend Sina for a junior position in your company.
      I am available for any further questions you may have.`,
      avatarUrl: null,
      fileUrl: "/recommendations/Recommendation_Rad.pdf.pdf",
      personalWebsite: "https://radoslawniewiadomski.github.io/",
      companyWebsite: "https://unige.it/en/",
    },
  ] as Testimonial[],
} as const;
