import type { Project } from "@/domain/portfolio";

export const PROJECTS: Project[] = [
  {
    id: "portfolio",
    title: "This portfolio",
    description:
      "Next.js 16 and React 19 site with a typed content layer, server-rendered sections, live GitHub data, a rate-limited server-action contact pipeline, and a command palette with voice control. Structured with atomic design and SOLID boundaries.",
    domains: ["web"],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Server Actions",
      "Resend",
      "Vitest",
      "Playwright",
    ],
    sourceUrl: "https://github.com/sinahatami/portfolio",
    liveUrl: "https://sinahatami.vercel.app",
  },
  {
    id: "holdsup",
    title: "HoldsUp",
    description:
      "Audits statistical claims. Paste a sentence with a number; HoldsUp finds the official series (Eurostat, World Bank, OWID), recomputes the claim in code, checks the framing for cherry-picked windows, and returns a verdict with a receipt you can rerun.",
    domains: ["web", "ml"],
    stack: ["Python", "FastAPI", "Next.js", "pgvector", "LLM", "Docker"],
    sourceUrl: "https://github.com/sinahatami/holdsup",
    liveUrl: "https://holdsup.vercel.app",
  },
  {
    id: "changeradar",
    title: "ChangeRadar",
    description:
      "AI-powered code change impact analysis tool using dependency-aware retrieval and RAG. Analyzes pull requests and surfaces affected components by combining static code analysis with semantic search over a codebase knowledge base.",
    domains: ["ml"],
    stack: ["Python", "RAG", "LLM", "Semantic Search", "NLP", "Streamlit"],
    sourceUrl: "https://github.com/sinahatami/ChangeRadar",
  },
  {
    id: "rick-and-morty",
    title: "Rick and Morty Universe",
    description:
      "A high-performance interdimensional encyclopedia with infinite scroll, deep linking, and URL state sync. Demonstrates clean architecture patterns, complex data fetching, and server-side rendering with TanStack Query.",
    domains: ["web"],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "Vitest",
    ],
    sourceUrl: "https://github.com/sinahatami/rick-and-morty-web",
    liveUrl: "https://sinahatami.github.io/rick-and-morty-web",
  },
  {
    id: "life-expectancy",
    title: "Life Expectancy Data Visualization",
    description:
      "Five interactive visualizations of global life expectancy and its correlates using WHO data. Features heatmaps, scatter plots with linear regression, and interactive choropleth maps built with Angular 17 and D3.js.",
    domains: ["web", "data"],
    stack: ["Angular", "D3.js", "TypeScript", "Python", "Bootstrap"],
    sourceUrl: "https://github.com/sinahatami/dv",
    liveUrl: "https://sinahatami.github.io/dv/",
  },
  {
    id: "commensal",
    title: "Commensal Activity Recognition",
    description:
      "Research pipeline for recognizing nonverbal behaviors during commensal interactions. Syncs manual ELAN video annotations with MediaPipe facial pose extraction, then trains LSTM/GRU models to classify human activities from paired video streams.",
    domains: ["ml"],
    stack: ["Python", "LSTM", "GRU", "MediaPipe", "TensorFlow", "OpenCV"],
    sourceUrl: "https://github.com/sinahatami/commensal",
    liveUrl: "https://radoslawniewiadomski.github.io/happilab/happilab.html",
  },
  {
    id: "wildfire",
    title: "Wildfire Risk Prediction (Master's Thesis)",
    description:
      "AI-driven wildfire risk prediction system using ERA5 climate data, NASA FIRMS, MODIS, and NDVI vegetation indices. Applies XGBoost and deep learning to forecast fire occurrence across California with advanced spatiotemporal feature engineering.",
    domains: ["ml", "data"],
    stack: [
      "Python",
      "XGBoost",
      "Deep Learning",
      "Random Forest",
      "Remote Sensing",
      "ERA5",
    ],
    sourceUrl: "https://github.com/sinahatami/fire-risk-thesis",
  },
  {
    id: "debate-agents",
    title: "Multi-Agent Autonomous Debate Framework",
    description:
      "Autonomous debate framework where a moderator and two debater agents interact using GPT-2 for argument generation and spaCy for relevance scoring. The moderator selects topics, referees multi-round exchanges, and declares a winner.",
    domains: ["ml"],
    stack: ["Python", "NLP", "GPT-2", "spaCy", "Multi-Agent Systems"],
    sourceUrl: "https://github.com/sinahatami/mas-nlp",
  },
  {
    id: "cervical-cells",
    title: "Cervical Cell Classification",
    description:
      "Comparative study of cervical cell classification on the SIPaKMeD dataset (4,000+ images). Benchmarks deep feature extraction with VGG16 against handcrafted HOG features fed into an SVM, analyzing trade-offs in accuracy and interpretability.",
    domains: ["ml"],
    stack: [
      "Python",
      "TensorFlow",
      "VGG16",
      "SVM",
      "Computer Vision",
      "Medical Imaging",
    ],
    sourceUrl: "https://github.com/sinahatami/cv",
    liveUrl: "https://github.com/sinahatami/cv/blob/main/Report%20(2).pdf",
  },
  {
    id: "trustworthy-ai",
    title: "Trustworthy AI: Adversarial ML & XAI",
    description:
      "Labs and projects from the Trustworthy AI course at UniGe covering evasion attacks, data poisoning, malware evasion, and defenses. Includes explainable AI (XAI) experiments to audit and interpret model decisions.",
    domains: ["ml"],
    stack: [
      "Python",
      "Adversarial ML",
      "XAI",
      "SecML",
      "Scikit-learn",
      "Deep Learning",
    ],
    sourceUrl: "https://github.com/sinahatami/trustworthy-ai",
  },
  {
    id: "ml-fundamentals",
    title: "Machine Learning Fundamentals",
    description:
      "Comprehensive ML coursework covering neural networks, CNNs, Transformers, GANs, and reinforcement learning. Implements core algorithms from scratch and benchmarks them on standard datasets.",
    domains: ["ml"],
    stack: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Jupyter Notebook",
    ],
    sourceUrl: "https://github.com/sinahatami/ml",
  },
  {
    id: "ar",
    title: "Augmented Reality Spatial Computing",
    description:
      "Final AR project and lab assignments at the University of Genoa covering spatial tracking, marker-based object placement, and custom environment texturing using Unity, Vuforia, and AR Foundation.",
    domains: ["systems"],
    stack: ["Unity", "C#", "Vuforia", "AR Foundation", "Computer Vision"],
    sourceUrl: "https://github.com/sinahatami/ar",
  },
  {
    id: "dsip",
    title: "Digital Signal & Image Processing",
    description:
      "Final project and coursework covering Fourier series approximations, FFT-based frequency analysis, Gibbs phenomenon, Kalman filtering for noisy signal tracking, Haar Wavelet Transforms, and Gaussian high-pass filtering.",
    domains: ["data"],
    stack: [
      "Python",
      "NumPy",
      "SciPy",
      "Jupyter Notebook",
      "Signal Processing",
    ],
    sourceUrl: "https://github.com/sinahatami/dsip",
  },
  {
    id: "distributed-computing",
    title: "Distributed Computing: PySpark & Simulation",
    description:
      "Coursework at the University of Genoa: large-scale data queries on HDFS using PySpark and Python-based discrete event simulations for queuing theory and network analysis.",
    domains: ["data", "systems"],
    stack: ["Python", "PySpark", "Hadoop", "HDFS", "Discrete Event Simulation"],
    sourceUrl: "https://github.com/sinahatami/dc",
  },
  {
    id: "hpc",
    title: "High Performance Computing: CUDA, OpenMP, MPI",
    description:
      "HPC assignments from the University of Genoa implementing parallel algorithms with CUDA GPU acceleration, shared-memory parallelism via OpenMP, and distributed message-passing with MPI.",
    domains: ["systems"],
    stack: ["C++", "CUDA", "OpenMP", "MPI", "Parallel Programming"],
    sourceUrl: "https://github.com/sinahatami/hpc",
  },
];
