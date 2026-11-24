import type { Recommendation } from "@/domain/portfolio";

/** Letters are reproduced verbatim; paragraphs are separated by blank lines. */
export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "radoslaw-niewiadomski",
    author: "Radoslaw Niewiadomski",
    role: "Professor",
    organization: "University of Genoa",
    highlight:
      "He has demonstrated the ability to work autonomously, as well as great enthusiasm for learning and developing new skills in this research area.",
    letter: `I am pleased to write this letter in support of Sina Hatami, the student at the University of Genoa, whom I have had the pleasure of working with since September 2024. From the beginning, Sina expressed a strong interest to participate voluntarily in the research project focused on activity detection (in the field of computer vision and applied deep learning). Specifically, the task involved the classification of nonverbal behaviors using LSTM in a pre-existing set of video recordings.

Throughout this time, Sina has regularly attended meetings and actively contributed to the project. He has demonstrated the ability to work autonomously, as well as great enthusiasm for learning and developing new skills in this research area. His perseverance and commitment are impressive, especially given that his participation in the project has been entirely voluntary and unrelated to his thesis or internship obligations.

I confidently recommend Sina for a junior position in your company. I am available for any further questions you may have.`,
    letterUrl: "/recommendations/Recommendation_Rad.pdf",
    authorUrl: "https://radoslawniewiadomski.github.io/",
    organizationUrl: "https://unige.it/en/",
  },
  {
    id: "payam-jabbari",
    author: "Payam Jabbari",
    role: "Senior software developer",
    organization: "Iran EIT",
    highlight:
      "I would rank [Sina] in the top 2% of co-workers that I have work[ed with] in the past 18 years.",
    letter: `It is my pleasure to recommend Sina Hatami for admission as an employee at your company.

I am a ten-year senior developer at IranEIT Corporation in Iran. I came to know Sina when I was a co-worker in the infrastructure team at the Web framework project based on the Angular framework and backend of Django core. Sina distinguished herself by submitting an exceptionally well-implementation and interesting solution on the the Web framework structure and ability that is easy to develop future.

I would rank her in the top 2% of co-workers that I have work in the past 18 years concerning her developer ability research and professional behavior skills.

Overall, Sina is highly intelligent and because he recently graduated Master's degree in Artificial intelligence at the University of Genova in Italy therefor has good skills in Python, TensorFlow, Machine Learning and Computer Vision.`,
    authorUrl: "https://www.linkedin.com/in/payamjabbari",
    organizationUrl: "https://www.iraneit.com/",
  },
  {
    id: "behzad-feizi",
    author: "Behzad Feizi",
    role: "CEO",
    organization: "BPT Soft",
    highlight:
      "His level in this field is senior because he can uniquely advance a project from beginning to end at a high level.",
    letter: `I am proud to introduce Mr.Sina. He was only 19 when he joined the company. He was very inexperienced at first, but he became one of the most important members of the company over time. He has been working as a engineer for more than two and a half years. He has developed projects such as HR software, performance evaluation software, and payroll software.

His level in this field is senior because he can uniquely advance a project from beginning to end at a high level. On the other hand, He has studied server-side languages and artificial intelligence, which is remarkable. Mr.Sina is familiar with and works with a variety of software tools, and develops projects using knowledge such as data structure, algorithm design, and design patterns.

On the other side, I believe him because he is always looking for new knowledge in computer science. He wants to spare no expense to learn new knowledge. When someone of this low age has high experience and expert in his field, he can succeed anywhere. Moreover, he can architect software on large scale as a software engineer, and his ability to solve the problem is admirable.

As a consequence, he is an orderly, precise, and motivated person with a bright future ahead of him. He was able to work well in the company. I admire him as the managing director and I ask you to contact me with any questions you have about Mr.Sina.`,
    letterUrl: "/recommendations/Recommendation_from_Manager_BPT.pdf",
    authorUrl: "https://linkedin.com/in/behzad-feizi-2835b29b",
    organizationUrl: "https://www.bptsoft.com/",
  },
];
