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
  avatarUrl: "/avatar.jpg",
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
      techStack: [
        "React",
        "Next.js",
        "TanStack Query",
        "tailwindcss",
        "vitest",
      ],
      description:
        "A high-performance interdimensional encyclopedia. Built to demonstrate state management complex data fetching patterns.",
      link: {
        href: "https://github.com/sinahatami/rick-and-morty-web",
        hrefLive: "https://sinahatami.github.io/rick-and-morty-web",
      },
    },
    {
      title: "Life Expectancy Data Visualization",
      techStack: ["Angular", "D3.js", "Python", "TypeScript", "bootstrap"],
      description:
        "This web application provides interactive visualizations of global life expectancy data as reported by the World Health Organization (WHO).",
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/dv-project",
        hrefLive: "https://sinahatami.github.io/dv-project/",
      },
    },
    {
      title: "Master's thesis: A Systematic Review of Recommender Systems",
      techStack: [
        "Machine Learning",
        "Python",
        "NumPy",
        "Pandas",
        "Scikit-learn",
      ],
      description: `This thesis presents a comprehensive and systematic review of
        recommender systems, aiming to analyze and compare key methodologies
        developed in the field over the past decade. Using the PRISMA (Preferred
        Reporting Items for Systematic Reviews and Meta-Analyses) framework, a
        structured review process was applied to select more than 20 high-quality
        research papers published between 2010 and 2025. The reviewed studies are
        categorized into five core methodological groups: collaborative filtering, matrix
        factorization, deep learning, hybrid models, and reinforcement learning. Each
        approach is critically evaluated with respect to its ability to address persistent
        challenges in the field, including data sparsity, cold-start problems, scalability,
        dynamic user preferences, and emerging ethical concerns such as bias and
        privacy. The review not only highlights the evolution of algorithms but also
        reveals key trends and trade-offs between accuracy, interpretability, and
        computational efficiency. To bridge theory and practice, the thesis further
        introduces an original project: an AI-driven Fire Risk Recommender System,
        designed to assess and predict wildfire risks in California. Using open-access
        spatiotemporal data sets, including NASA FIRMS, MODIS, and ERA5, andadvanced feature engineering, the model uses an XGBoost classifier to forecast
        fire occurrence and identify the most influential environmental factors. The
        results demonstrate the broader applicability of recommender systems in
        real-world decision support, especially in the context of environmental safety. In
        general, this work contributes to the ongoing development of intelligent,
        context-aware recommendation technologies through a structured academic
        synthesis and innovative practical implementation.`,
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/fire-risk-thesis.git",
      },
    },
    {
      title: "Towards Commensal Activities Recognition With Machine Learning",
      techStack: ["Python", "Machine Learning", "LSTM", "MediaPipe", "OpenCV"],
      description: `This project involved manual annotation of video frames to
        label meaningful human behaviors like speech, providing ground truth for model
        training. MediaPipe was then utilized to extract facial pose estimations for two
        interacting individuals. Finally, recurrent neural networks (LSTM and GRU)
        were employed to design and implement a model capable of accurately
        estimating each person's pose during commensal interactions`,
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/commensal",
        hrefLive:
          "https://radoslawniewiadomski.github.io/happilab/happilab.html",
      },
    },
    {
      title: "Recycling Robot (Final Reinforcement Learning Project)",
      techStack: ["Python", "Machine Learning"],
      description: `
        The title of my project was Recycling Robot and the description of the project is
        as follows: “Add some complexity to the model discussed in class (like making
        the reward a random variable, for example, or adding one more state (half full
        battery)) and explore the different regimes/results which can be obtained by
        varying the parameters at your disposal”. In addition, I got the full grade for my
        final project.
      `,
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/rl-final-project.git",
      },
    },
    {
      title: "Cancer Prediction (Final Computer Vision Project)",
      techStack: ["Python", "Computer Vision", "Unsupervised Learning", "SVM"],
      description: `
        This report delves into the world of cervical cell analysis, powered by the SIPaKMeD
        dataset. Comprising over 4,000 meticulously curated images, this dataset is a
        cornerstone of our investigation into the classification of cervical cells.
        Our journey begins with an exploration of the SIPaKMeD dataset and its potential
        applications. We leverage cutting-edge techniques, including automated feature
        extraction with pretrained models and traditional handcrafted feature engineering,
        to decode the rich information encapsulated within these cervical cell images.
        Through clustering and classification methodologies, we seek to uncover patterns
        and assess the accuracy of our models in distinguishing between cervical cell
        categories. This report provides a comprehensive overview of our findings, offering
        valuable insights into the world of cervical health analysis.
        By the end of this report, you will gain a deeper understanding of how the
        SIPaKMeD dataset can be harnessed for medical image analysis, showcasing the
        advantages and limitations of different feature extraction approaches.
      `,
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/cv-final-project",
        hrefLive:
          "https://github.com/sinahatami/cv-final-project/blob/main/Report%20(2).pdf",
      },
    },
    {
      title: "Cancer Prediction (Final Computer Vision Project)",
      techStack: ["Python", "Computer Vision", "Unsupervised Learning", "SVM"],
      description: `
        This report delves into the world of cervical cell analysis, powered by the SIPaKMeD
        dataset. Comprising over 4,000 meticulously curated images, this dataset is a
        cornerstone of our investigation into the classification of cervical cells.
        Our journey begins with an exploration of the SIPaKMeD dataset and its potential
        applications. We leverage cutting-edge techniques, including automated feature
        extraction with pretrained models and traditional handcrafted feature engineering,
        to decode the rich information encapsulated within these cervical cell images.
        Through clustering and classification methodologies, we seek to uncover patterns
        and assess the accuracy of our models in distinguishing between cervical cell
        categories. This report provides a comprehensive overview of our findings, offering
        valuable insights into the world of cervical health analysis.
        By the end of this report, you will gain a deeper understanding of how the
        SIPaKMeD dataset can be harnessed for medical image analysis, showcasing the
        advantages and limitations of different feature extraction approaches.
      `,
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/cv-final-project",
        hrefLive:
          "https://github.com/sinahatami/cv-final-project/blob/main/Report%20(2).pdf",
      },
    },
    {
      title:
        "A Multi-Agent Framework for Autonomous Discourse (Final NLP & MAS project)",
      techStack: ["Python", "Computer Vision", "Unsupervised Learning", "SVM"],
      description: `
        It features an autonomous debate framework where three distinct agents, a moderator and two debaters—interact using GPT-based language models.
        The moderator initiates the session by selecting a subject, after which the debaters engage in a multi-round exchange.
        The process concludes with the moderator evaluating the arguments and declaring a winner based on the quality of the discourse.
      `,
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/mas-nlp-project",
      },
    },
    {
      title:
        "Signal and Image Synthesis via Frequency and State-Space Analysis (Final DSIP project)",
      techStack: ["Python"],
      description: `
        This project implements several fundamental concepts in signal and image processing using Python, ranging from Fourier series approximations to optimal state estimation.
        It explores the frequency domain through the identification of signal components using FFT and the analysis of the Gibbs phenomenon as harmonic counts increase.
        Additionally, the project demonstrates the design of a Kalman Filter for tracking noisy signals and their derivatives, alongside advanced image processing techniques like Haar Wavelet Transforms for detail measurement and Gaussian high-pass filtering in both spatial and frequency domains.
      `,
      link: {
        label: "github.com",
        href: "https://github.com/sinahatami/dsip",
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
