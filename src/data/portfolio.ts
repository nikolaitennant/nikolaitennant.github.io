export const personalInfo = {
  name: "Nikolai Tennant",
  title: "LLM Engineer",
  subtitle: "Building agentic AI systems at NatureAlpha",
  location: "London, UK",
  email: "nikolaitennant@gmail.com",
  linkedin: "https://www.linkedin.com/in/nikolai-tennant/",
  github: "https://github.com/nikolaitennant",
  bio: "I build agentic AI systems at NatureAlpha, designing and deploying LLM-powered pipelines for sustainable finance data. Previously, I was a Research Engineer at dunnhumby working on customer data science, and a Research Assistant at Singh Lab using deep learning to study ageing biology. I hold an MSc in Data Science and a BA in History from Brown University.",
  citizenship: "Dual US/UK citizen",
};

export const experience = [
  {
    title: "LLM Engineer",
    company: "NatureAlpha",
    period: "2025 - Present",
    description:
      "Building agentic AI systems for sustainable finance. Designing and deploying LLM-powered data pipelines, RAG systems, and multi-agent workflows for ESG and biodiversity data analysis.",
    technologies: ["Python", "LLMs", "LangChain", "RAG", "Agentic Systems", "AWS"],
  },
  {
    title: "Research Engineer",
    company: "dunnhumby",
    period: "2023 - 2025",
    description:
      "Developed NLP and LLM systems for data insight synthesis. Built a complete ML pipeline using autoencoders on a 5M customer dataset for Tesco Mobile. Delivered projects generating £829K in business value.",
    technologies: ["Python", "PySpark", "SQL", "AWS", "GCP", "Machine Learning"],
  },
  {
    title: "Research Assistant",
    company: "Singh Lab, Brown University",
    period: "2022 - Present",
    description:
      "Conducting X chromosome dosage compensation research as part of the NSF-funded IISAGE initiative. Developed computational models for cross-species ageing biomarker analysis across 11 research laboratories.",
    technologies: ["Python", "Deep Learning", "CNN", "Genomics", "Single-cell Analysis"],
  },
];

export const education = [
  {
    degree: "MSc Data Science",
    school: "Brown University",
    gpa: "4.0/4.0",
    period: "2022 - 2023",
  },
  {
    degree: "BA History (Data Science minor)",
    school: "Brown University",
    gpa: "3.6/4.0",
    period: "2018 - 2022",
  },
];

export const projects = [
  {
    title: "RAG Scholar AI",
    description:
      "RAG-based study tool for document Q&A with smart citations and subject-based organisation. Students upload papers and get targeted answers with exact source references.",
    technologies: ["Python", "LangChain", "FAISS", "NLP"],
    github: "https://github.com/nikolaitennant/rag_scholar",
    demo: "https://ragscholarai.web.app",
  },
  {
    title: "Premier League Projections",
    description:
      "ML pipeline analysing 457 data points across Premier League seasons using LightGBM, Random Forest, and SVC with SHAP interpretability.",
    technologies: ["Python", "LightGBM", "Random Forest", "SHAP"],
    github: "https://github.com/nikolaitennant/Premier-League-Result-Projections",
  },
  {
    title: "SenID - Senescence Detection",
    description:
      "Computer vision for identifying senescent cells using nuclear morphology. Achieved 0.96 AUC with 1/100th the training samples. 2nd place, hackathon (225+ participants).",
    technologies: ["Python", "Computer Vision", "Deep Learning", "CNN"],
  },
];

export const publication = {
  title: "TimeFlies: an RNA-seq ageing clock for Drosophila",
  authors: "Tennant, N.*, Okonkwo, A.*, O'Connor-Giles, K., Larshen, E., & Singh, P.",
  journal: "Nature Scientific Reports",
  status: "Accepted",
  link: "https://pubmed.ncbi.nlm.nih.gov/39896546/",
  description:
    "Developed a deep learning ageing clock achieving 95% accuracy and 0.99 AUC on Drosophila age prediction. Identified ageing biomarker genes with in vivo validation.",
  keyFindings: [
    "1D CNN achieving 95% accuracy, 0.99 AUC",
    "Model generalises across all cell types",
    "Identified sex-biased ageing mechanisms",
    "Validated with in vivo survival studies",
  ],
};

export const skills = {
  "Languages": ["Python", "SQL", "R", "TypeScript", "Bash"],
  "ML & AI": ["PyTorch", "LangChain", "FAISS", "NLP", "Computer Vision", "Deep Learning"],
  "Data & Cloud": ["PySpark", "Pandas", "AWS", "GCP", "Databricks", "Docker"],
  "Specialised": ["RAG Systems", "LLMs", "Agentic AI", "Genomics", "MLOps"],
};

export const stats = [
  { value: "4.0", label: "MSc GPA, Brown" },
  { value: "1st", label: "Author, Nature" },
  { value: "Top 1%", label: "Hackathon, 225+" },
  { value: "£829K", label: "Business Value" },
];
