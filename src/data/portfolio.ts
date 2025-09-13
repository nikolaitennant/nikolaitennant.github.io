export const personalInfo = {
  name: "Nikolai Tennant",
  title: "Research Engineer & Machine Learning Specialist",
  subtitle: "Research Engineer at dunnhumby working on customer data science, and conducting sexual dimorphism research at Singh Lab",
  location: "London, UK",
  email: "nikolaitennant@gmail.com",
  phone: "+44 7931 794345",
  linkedin: "https://www.linkedin.com/in/nikolai-tennant/",
  github: "https://github.com/nikolaitennant",
  bio: "I'm a Research Engineer at dunnhumby, where I work on applying deep learning and machine learning to customer data science for retailers. I have an MSc in Data Science and a BA in History (with a certificate in Data Science) from Brown University. Alongside my industry work, I conduct research at Singh Lab using machine learning to analyse sex-specific gene expression patterns in ageing Drosophila, investigating how males and females age differently through genomic analysis. My first-author publication on this research is currently under review.",
  citizenship: "Dual US/UK citizen, eligible to work in both countries"
};

export const experience = [
  {
    title: "Research Engineer, Customer Decision Sciences", 
    company: "dunnhumby",
    location: "London, England",
    period: "2025 - Present",
    description: "I develop and maintain NLP and LLM systems for data insight synthesis, contributing to the design and implementation of core functionality. I collaborate closely with the research team on advanced methodologies involving vector embeddings, cost modelling, impact prediction, and dynamic product ranking.",
    technologies: ["Python", "SQL", "PySpark", "AWS", "GCP", "Machine Learning", "Data Engineering", "MLOps"],
    promotion: true
  },
  {
    title: "Associate Research Engineer, Customer Decision Sciences", 
    company: "dunnhumby",
    location: "London, England",
    period: "September 2023 - 2025",
    description: "I developed a complete machine learning pipeline using autoencoders on a 5M customer dataset to optimise Tesco Mobile's handset assortment, creating a novel methodology to determine product selection and ordering for in-store displays. I also worked on customer profiling projects that delivered £829,000 in business value, whilst refactoring codebases, implementing testing, and removing external API dependencies.",
    technologies: ["Python", "SQL", "PySpark", "AWS", "GCP", "Data Pipelines", "Machine Learning", "Data Engineering"]
  },
  {
    title: "Research Assistant",
    company: "Singh Lab, Brown University (IISAGE Consortium)",
    location: "Remote",
    period: "May 2022 - Present", 
    description: "Conducting X chromosome dosage compensation research as part of NSF-funded initiative. Developing computational models for cross-species ageing biomarker analysis. Contributing to multi-institutional collaboration across 11 research laboratories.",
    technologies: ["Python", "Deep Learning", "CNN", "Single-cell Analysis", "Transcriptomics", "Genomics"]
  }
];

export const education = [
  {
    degree: "MSc in Data Science",
    school: "Brown University",
    location: "Providence, RI",
    period: "September 2022 - October 2023",
    gpa: "4.0/4.0",
    achievements: ["Singh Lab Research Assistant", "Sustainable Food Initiative", "Brown Club Lacrosse: Won D2 regionals, placed 5th in nationals"],
    relevant: ["Statistical Learning", "Machine Learning", "Hands-on Data Science", "Deep Learning", "Data Science Practicum", "Data Engineering", "Computational Probability and Statistics", "Data, Ethics and Society"]
  },
  {
    degree: "BA in History (minor in Data Science)",
    school: "Brown University", 
    location: "Providence, RI",
    period: "September 2018 - May 2022",
    gpa: "3.6/4.0",
    achievements: ["Data Science Club Team Lead", "Data Science Fellow", "Research Assistant for Machine Learning for the Earth & Environment"],
    relevant: ["Applied Statistics in Python", "Comp Foundations: Organisation", "Computing Foundations: Data", "Cybersecurity Ethics", "Data Science Fluency", "Intermediate Microeconomics", "Introduction to Econometrics", "Introductory Calculus, Part II", "Prog Des: Data Structures & Algorithms", "The Digital World", "Linear Algebra"]
  }
];

export const skills = {
  "Programming": ["Python", "SQL", "R", "TypeScript", "Bash", "Git"],
  "ML/AI": ["PyTorch", "TensorFlow", "LangChain", "FAISS", "NLP", "Computer Vision", "Deep Learning"],
  "Mathematics & Statistics": ["Linear Algebra", "Statistical Modelling", "Bayesian Analysis", "Multivariate Calculus"],
  "Data & Cloud": ["PySpark", "Pandas", "NumPy", "AWS", "Databricks", "Docker", "Google Cloud Platform"],
  "Specialised Applications": ["Computational Biology", "Genomics", "RAG Systems", "LLMs", "Retail Analytics", "MLOps"]
};

export const projects = [
  {
    title: "RAG Scholar AI",
    description: "Research assistant application using Retrieval-Augmented Generation for academic literature analysis and synthesis.",
    longDescription: "Application combining large language models with retrieval systems for academic research assistance. Features include document processing, contextual Q&A with source citations, and multi-document synthesis using vector databases and custom embedding models.",
    technologies: ["Python", "LangChain", "Vector Databases", "FAISS", "Natural Language Processing"],
    github: "https://github.com/nikolaitennant/rag_scholar",
    demo: "https://ragscholarai.web.app",
    image: "/rag-scholar-preview.png",
    features: [
      "Intelligent document retrieval and ranking",
      "Contextual Q&A with source citations",
      "Research paper summarisation and analysis",
      "Multi-document synthesis capabilities",
      "User-friendly web interface with real-time responses",
      "Custom embedding models for academic content"
    ],
    impact: "Demonstrates practical application of RAG architecture for scientific literature processing and analysis",
    category: "Deep Learning",
    timeline: "2025 - Present"
  },
  {
    title: "Premier League Result Projections",
    description: "Machine learning system for predicting Premier League match outcomes using ensemble methods and feature engineering.",
    longDescription: "ML pipeline analysing 457 data points across Premier League seasons 2021-2023, incorporating betting odds, team performance metrics, and FIFA ratings. Implementation includes LightGBM, Random Forest, and SVC models with SHAP interpretability analysis.",
    technologies: ["Python", "LightGBM", "Random Forest", "SVC", "Pandas", "NumPy", "SHAP", "Machine Learning"],
    github: "https://github.com/nikolaitennant/Premier-League-Result-Projections",
    features: [
      "Advanced feature engineering with betting odds integration",
      "Team strength indicators using Fantasy Premier League ICT index", 
      "FIFA 22/23 ratings for initial team assessments",
      "Model interpretability with SHAP values",
      "Comprehensive data visualisation and analysis"
    ],
    impact: "Demonstrates application of ML ensemble methods to sports analytics with quantifiable performance metrics",
    category: "Machine Learning",
    timeline: "2023"
  }
];

export const publications = [
  {
    title: "TimeFlies: an RNA-seq ageing clock for the comprehensive study of tissue-specific ageing clocks Collection",
    authors: "Tennant, N.*, Okonkwo, A.*, O'Connor-Giles, K., Larshen, E.✝, & Singh, P.✝",
    status: "Manuscript accepted, undergoing final review (Preprint)",
    journal: "Nature Scientific Reports - Aging Clocks Collection",
    preprint: "https://pubmed.ncbi.nlm.nih.gov/39896546/",
    description: "Research introducing TimeFlies, a pan-cell-type scRNA-seq ageing clock for Drosophila using deep learning to identify age-associated genes and investigate sex differences in ageing.",
    longDescription: "As part of the NSF-funded IISAGE initiative, I developed TimeFlies as a single-cell transcriptomic ageing clock that classifies donor age based on genome-wide gene expression. Using explainability methods, we identified key biomarker genes including lncRNA:roX1, validated experimentally with in vivo survival studies. Sex-specific clocks revealed significant differences in ageing pathways between males and females.",
    technologies: ["Python", "Deep Learning", "CNNs", "RNA-seq Analysis", "Genomics", "Bioinformatics", "Statistical Modeling"],
    keyFindings: [
      "Developed 1D CNN achieving 95% accuracy and 0.99 AUC on Drosophila ageing prediction",
      "Model generalises across all cell types while capturing cell-type-specific signals",
      "Identified ageing marker genes and sex-biased ageing mechanisms with in vivo validation",
      "Validated sexual dimorphism patterns in ageing processes"
    ],
    collaboration: "NSF-funded IISAGE initiative across 11 research institutions",
    impact: "Contributing to fundamental understanding of ageing biology with potential applications in longevity research. The methodology has since been developed into a tool for future research use."
  }
];

export const researchProjects = [
  {
    title: "SenID - Cellular Senescence Detection",
    description: "Computer vision methodology for identifying senescent cells using morphological analysis (2nd place, hackathon competition)",
    longDescription: "This project applies computer vision techniques to identify cellular senescence - a key hallmark of ageing. The system analyses cell morphology to detect senescent phenotypes, which is crucial for understanding age-related diseases and potential therapeutic interventions.",
    technologies: ["Python", "Computer Vision", "Deep Learning", "Cell Biology", "Image Processing", "Machine Learning"],
    keyFindings: [
      "Designed CNN-based methodology using nuclear morphology to identify cellular senescence",
      "Achieved 0.96 AUC using 1/100th the training samples of previous studies",
      "Created interpretable models showing which morphological features indicate senescence"
    ],
    achievement: "🥈 2nd Place Winner - Hackathon Competition (225+ participants)",
    impact: "Demonstrates potential for automated senescence detection methodology to support ageing and cancer research",
    collaboration: "Hackathon competition project"
  }
];

export const researchInterests = {
  title: "Research Focus & Interests",
  subtitle: "Current work and future directions",
  overview: "My current research focuses on computational biology and ageing science, using machine learning to understand fundamental biological processes. I'm particularly interested in expanding into high-impact applications in medical data science and cutting-edge AI research.",
  currentFocus: {
    title: "Current Research",
    description: "Computational Biology & Ageing Research",
    focus: [
      "Sexual dimorphism in ageing using RNA-seq and deep learning",
      "Cross-species comparative studies and biomarker discovery", 
      "Tissue-specific ageing patterns and cellular senescence",
      "Multi-omics data integration and genomic analysis"
    ]
  },
  futureInterests: [
    {
      title: "Medical Data Science & Healthcare AI",
      description: "Applying AI/ML to healthcare and medical research for high-impact applications",
      focus: [
        "Clinical data analysis and predictive modelling",
        "Healthcare AI systems and patient outcomes research",
        "Medical imaging and diagnostic tool development",
        "Precision medicine and personalised treatment approaches"
      ]
    },
    {
      title: "Cutting-Edge AI Research", 
      description: "Exploring frontier AI technologies and their applications across domains",
      focus: [
        "Large language models and multimodal AI systems",
        "Agentic AI and autonomous research assistants",
        "Novel neural architectures and training methodologies",
        "AI for scientific discovery and research acceleration"
      ]
    }
  ],
  currentProjects: [
    "TimeFlies: continuing development to transform the ageing clock methodology into a comprehensive analysis tool",
    "Alzheimer's disease research applications using TimeFlies methodology"
  ]
};

export const personalInterests = {
  title: "Beyond Research",
  subtitle: "Personal Interests",
  interests: [
    "Sports: Football enthusiast, formerly lacrosse player",
    "Arts: Theatre and visual arts", 
    "Travel: Exploring different cultures",
    "Cooking"
  ],
  academicInvolvement: {
    title: "Academic Involvement",
    items: [
      {
        title: "IISAGE Initiative",
        description: "Multi-institutional collaboration on ageing research across 11 research labs"
      },
      {
        title: "Brown University Alumni",
        description: "Active participant in university research communities and academic networks"
      }
    ]
  },
  leadership: {
    title: "Industry Leadership",
    description: "Former President of Ecology Club, Varsity Lacrosse Captain, and leadership roles"
  }
};