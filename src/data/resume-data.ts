import { ResumeData } from "@/types/resume";

const yearsExperience: string = "4+";
const position: string = "Software Engineer & Data Scientist";

export const RESUME_DATA: ResumeData = {
  name: "Sina Hatami",
  initials: "SH",
  location: "Genoa, Italy",
  locationLink: "https://www.google.com/maps/place/Genoa,+Italy",
  yearsExperience: yearsExperience,
  position: position,
  numberOfProjects: "+20",
  about: `${position} focused on building scalable web architectures and intelligent data systems.`,
  summary: `Experienced with ${yearsExperience} years of expertise in building high-performance web applications. Proficient in React, Next.Js, Angular, and Django, with a strong academic foundation in Data Science & AI.
    Master of architectural modularity and performance optimization.
    I translate the complexities of Data Science into high-performance software solutions, leveraging a deep academic foundation in Computer Science to build intelligent systems that are as scalable as they are insightful`,
  avatarUrl: "/avatar.jpg",
  personalWebsiteUrl: "https://sinahatami.vercel.app",
  contact: {
    email: "hatamisinaa@gmail.com",
    tel: "+39 379 114 9157",
    social: {
      github: {
        name: "GitHub",
        url: "https://github.com/sinahatami",
        iconName: "github",
      },
      linkedin: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sina-hatami/",
        iconName: "linkedin",
      },
    },
  },
  education: [
    {
      school: "University of Genoa",
      link: "https://unige.it/en/",
      degree:
        "Master of Computer Science | Data Science & Engineering | Artificial Intelligence",
      start: "Sep 2022",
      end: "Jul 2026",
      logoUrl: "/logo/unige.png",
      notes: `Thesis: 'A Systematic Review of Recommender Systems'.
        Relevant Coursework: Digital Signal & Image Processing (DSIP), Machine Learning (ML), Computer Vision (CV),
        Advanced Machine Learning (Deep Learning & Reinforcement Learning),
        Natural Language Processing (NLP), Multi-Agent Systems (MAS), Data Visualization (DV).`,
    },
    {
      school: "University of Buin Zahra",
      link: "https://bzte.ac.ir/",
      degree: "Bachelor of Computer Engineering | Software Engineering",
      start: "Sep 2017",
      end: "June 2021",
      logoUrl: "/logo/bzte.png",
      notes:
        "Courses: Computer Programming, Data Structures & Algorithms, Software Architecture, Database Systems, Operating Systems, Computer Networks.",
    },
  ],
  work: [
    {
      company: "hAppI Lab",
      link: "https://radoslawniewiadomski.github.io/happilab/members2.html",
      logoUrl: "/logo/happllab.png",
      badges: [
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
      title: "Data Science Researcher (Voluntary)",
      start: "Apr 2026",
      end: "Jul 2026",
      summary:
        "hAppI Lab is a research group at the University of Genoa focused on human activity recognition.",
      description: `I am part of the hAppI Lab team, collaborating with Professor Radoslaw Niewiadomski on the "Towards Commensal Activities Recognition With Machine Learning" project."`,
    },
    {
      company: "Widecons",
      link: "https://widecons.com",
      logoUrl: "/logo/widecons.png",
      badges: [
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
      title: "Software Engineer | Data Scientist",
      start: "Nov 2025",
      end: "Apr 2026",
      summary:
        "Innovative startup offering sustainable digital solutions and green technologies.",
      description:
        "Engineered digital consulting platforms using React and Node.js, boosting system efficiency. Implemented lean production methodologies that accelerated feature rollouts while integrating complex green energy analytics.",
    },
    {
      company: "Iran EIT",
      link: "https://en.iraneit.com/",
      logoUrl: "/logo/iran-eit.png",
      badges: [
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
      title: "Full Stack Engineer",
      start: "June 2021",
      end: "Sep 2022",
      summary:
        "Leading provider of integrated software for the national insurance industry serving millions of users.",
      description:
        "Architected a scalable Micro-Frontend system across 25+ modules to handle 100K+ daily transactions. Led the Software Architecture Committee to establish design patterns that reduced project timelines by 60%.",
    },
    {
      company: "BPT Soft",
      link: "https://www.bptsoft.com/",
      logoUrl: "/logo/bpt-soft.png",
      badges: [
        "Angular",
        "Performance Optimization",
        "E2E Testing",
        "SQL Server",
        "Jest",
        "Mentorship",
      ],
      title: "Full Stack Engineer",
      start: "May 2019",
      end: "June 2021",
      summary:
        "ERP software specialist developing robust administrative systems for government and academic sectors.",
      description:
        "Delivered 5+ large-scale ERP projects achieving 90% market adoption. Optimized legacy codebases to slash load times to under 2 seconds (90% performance gain) and mentored 5 developers to improve team code quality by 50%.",
    },
  ],
  skills: [
    {
      category: "Software Architecture",
      items: [
        "React",
        "Next.js 16",
        "Angular",
        "TypeScript",
        "JavaScript (ES6+)",
        "CSS3",
        "HTML5",
        "Tailwind CSS",
        "Micro-Frontends",
        "Python",
        "Django",
        "C#",
        "ASP.NET",
        "SQL",
        "Node.js",
        "GraphQL",
        "Docker",
        "AWS",
      ],
    },
    {
      category: "Data Science & AI",
      items: [
        "Python",
        "TensorFlow",
        "Keras",
        "Pandas/NumPy",
        "Scikit-Learn",
        "Machine Learning",
        "Computer Vision",
        "MediaPipe",
        "Deep Learning/CNNs",
        "PyTorch",
        "YOLO/Object Detection",
        "OpenCV",
        "PySpark",
        "NLP",
      ],
    },
  ],
  projects: [
    {
      title: "Modern Portfolio & 3D Visualization",
      techStack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Three.js",
        "Framer Motion",
        "tailwindcss",
        "ShadcnUI",
        "PWA",
      ],
      description:
        "A high-performance professional portfolio featuring interactive 3D WebGL visualizations, real-time GitHub activity integration, and server-side form handling. Optimized for SEO and accessibility with perfect Lighthouse scores.",
      link: {
        label: "sinahatami.dev",
        href: "https://github.com/sinahatami/portfolio",
        hrefLive: "https://sinahatami.vercel.app",
      },
    },
    {
      title: "HoldsUp",
      techStack: [
        "TypeScript",
        "Python",
        "pnpm Workspaces",
        "Docker",
        "Machine Learning",
      ],
      description:
        "A full-stack monorepo application with TypeScript frontend, Python ML backend, and an integrated product catalog with evaluation pipeline for AI-driven features.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/holdsup",
      },
    },
    {
      title: "ChangeRadar",
      techStack: [
        "Python",
        "RAG",
        "LLM",
        "Semantic Search",
        "NLP",
        "Streamlit",
      ],
      description:
        "AI-powered code change impact analysis tool using dependency-aware retrieval and RAG. Analyzes pull requests and surfaces affected components by combining static code analysis with semantic search over a codebase knowledge base.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/ChangeRadar",
      },
    },
    {
      title: "Rick and Morty Universe",
      techStack: [
        "React",
        "Next.js",
        "TypeScript",
        "TanStack Query",
        "tailwindcss",
        "vitest",
      ],
      description:
        "A high-performance interdimensional encyclopedia with infinite scroll, deep linking, and URL state sync. Demonstrates clean architecture patterns, complex data fetching, and server-side rendering with TanStack Query.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/rick-and-morty-web",
        hrefLive: "https://sinahatami.github.io/rick-and-morty-web",
      },
    },
    {
      title: "Life Expectancy Data Visualization",
      techStack: ["Angular 17", "D3.js", "TypeScript", "Python", "Bootstrap"],
      description:
        "Five interactive visualizations of global life expectancy and its correlates using WHO data. Features heatmaps, scatter plots with linear regression, and interactive choropleth maps built with Angular 17 and D3.js.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/dv",
        hrefLive: "https://sinahatami.github.io/dv/",
      },
    },
    {
      title: "Augmented Reality Spatial Computing",
      techStack: ["Unity", "C#", "Vuforia", "AR Foundation", "Computer Vision"],
      description:
        "Final AR project and lab assignments at the University of Genoa covering spatial tracking, marker-based object placement, and custom environment texturing using Unity, Vuforia, and AR Foundation.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/ar",
      },
    },
    {
      title: "Wildfire Risk Prediction (Master's Thesis)",
      techStack: [
        "Python",
        "XGBoost",
        "Deep Learning",
        "Random Forest",
        "Remote Sensing",
        "ERA5",
      ],
      description:
        "AI-driven wildfire risk prediction system using ERA5 climate data, NASA FIRMS, MODIS, and NDVI vegetation indices. Applies XGBoost and deep learning to forecast fire occurrence across California with advanced spatiotemporal feature engineering.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/fire-risk-thesis",
      },
    },
    {
      title: "Multi-Agent Autonomous Debate Framework",
      techStack: ["Python", "NLP", "GPT-2", "spaCy", "Multi-Agent Systems"],
      description:
        "Autonomous debate framework where a moderator and two debater agents interact using GPT-2 for argument generation and spaCy for relevance scoring. The moderator selects topics, referees multi-round exchanges, and declares a winner.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/mas-nlp",
      },
    },
    {
      title: "Commensal Activity Recognition",
      techStack: ["Python", "LSTM", "GRU", "MediaPipe", "TensorFlow", "OpenCV"],
      description:
        "Research pipeline for recognizing nonverbal behaviors during commensal interactions. Syncs manual ELAN video annotations with MediaPipe facial pose extraction, then trains LSTM/GRU models to classify human activities from paired video streams.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/commensal",
        hrefLive:
          "https://radoslawniewiadomski.github.io/happilab/happilab.html",
      },
    },
    {
      title: "Cervical Cell Classification (Computer Vision)",
      techStack: [
        "Python",
        "TensorFlow",
        "VGG16",
        "SVM",
        "Computer Vision",
        "Medical Imaging",
      ],
      description:
        "Comparative study of cervical cell classification on the SIPaKMeD dataset (4,000+ images). Benchmarks deep feature extraction with VGG16 against handcrafted HOG features fed into an SVM, analyzing trade-offs in accuracy and interpretability.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/cv",
        hrefLive: "https://github.com/sinahatami/cv/blob/main/Report%20(2).pdf",
      },
    },
    {
      title: "Trustworthy AI — Adversarial ML & XAI",
      techStack: [
        "Python",
        "Adversarial ML",
        "XAI",
        "SecML",
        "Scikit-learn",
        "Deep Learning",
      ],
      description:
        "Labs and projects from the Trustworthy AI course at UniGe covering evasion attacks, data poisoning, malware evasion, and defenses. Includes explainable AI (XAI) experiments to audit and interpret model decisions.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/trustworthy-ai",
      },
    },
    {
      title: "Machine Learning Fundamentals",
      techStack: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Jupyter Notebook",
      ],
      description:
        "Comprehensive ML coursework covering neural networks, CNNs, Transformers, GANs, and reinforcement learning. Implements core algorithms from scratch and benchmarks them on standard datasets.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/ml",
      },
    },
    {
      title: "Digital Signal & Image Processing",
      techStack: [
        "Python",
        "NumPy",
        "SciPy",
        "Jupyter Notebook",
        "Signal Processing",
      ],
      description:
        "Final project and coursework covering Fourier series approximations, FFT-based frequency analysis, Gibbs phenomenon, Kalman filtering for noisy signal tracking, Haar Wavelet Transforms, and Gaussian high-pass filtering.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/dsip",
      },
    },
    {
      title: "Distributed Computing — PySpark & Simulation",
      techStack: [
        "Python",
        "PySpark",
        "Hadoop",
        "HDFS",
        "Discrete Event Simulation",
      ],
      description:
        "Coursework at the University of Genoa: large-scale data queries on HDFS using PySpark and Python-based discrete event simulations for queuing theory and network analysis.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/dc",
      },
    },
    {
      title: "High Performance Computing — CUDA, OpenMP, MPI",
      techStack: ["C++", "CUDA", "OpenMP", "MPI", "Parallel Programming"],
      description:
        "HPC assignments from the University of Genoa implementing parallel algorithms with CUDA GPU acceleration, shared-memory parallelism via OpenMP, and distributed message-passing with MPI.",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/hpc",
      },
    },
  ],
  testimonials: [
    {
      name: "Behzad Feizi",
      role: "CEO",
      company: "BPt Soft",
      quote: `I am proud to introduce Mr.Sina. He was only 19 when he joined the company. He was very inexperienced at first, but he became one of the most important members of the company over time. He has been working as a engineer for more than two and a half years. He has developed projects such as HR software, performance evaluation software, and payroll software. 
      His level in this field is senior because he can uniquely advance a project from beginning to end at a high level. On the other hand, He has studied server-side languages and artificial intelligence, which is remarkable. Mr.Sina is familiar with and works with a variety of software tools, and develops projects using knowledge such as data structure, algorithm design, and design patterns.
      On the other side, I believe him because he is always looking for new knowledge in computer science. He wants to spare no expense to learn new knowledge. When someone of this low age has high experience and expert in his field, he can succeed anywhere. Moreover, he can architect software on large scale as a software engineer, and his ability to solve the problem is admirable.
      As a consequence, he is an orderly, precise, and motivated person with a bright future ahead of him. He was able to work well in the company. I admire him as the managing director and I ask you to contact me with any questions you have about Mr.Sina.`,
      fileUrl: "/recommendations/Recommendation_from_Manager_BPT.pdf",
      personalWebsite: "https://linkedin.com/in/behzad-feizi-2835b29b",
      companyWebsite: "https://www.bptsoft.com/",
      avatarUrl: null,
    },
    {
      name: "Payam Jabbari",
      role: "Senior software developer",
      company: "Iran EIT",
      quote: `It is my pleasure to recommend Sina Hatami for admission as an employee at your company.
      I am a ten-year senior developer at IranEIT Corporation in Iran. I came to know Sina when I was a co-worker in the infrastructure team at the Web framework project based on the Angular framework and backend of Django core. Sina distinguished herself by submitting an exceptionally well-implementation and interesting solution on the the Web framework structure and ability that is easy to develop future.
      I would rank her in the top 2% of co-workers that I have work in the past 18 years concerning her developer ability research and professional behavior skills.
      Overall, Sina is highly intelligent and because he recently graduated Master's degree in Artificial intelligence at the University of Genova in Italy therefor has good skills in Python, TensorFlow, Machine Learning and Computer Vision.`,
      personalWebsite: "https://www.linkedin.com/in/payamjabbari",
      companyWebsite: "https://www.iraneit.com/",
      avatarUrl: null,
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
  ],
};
