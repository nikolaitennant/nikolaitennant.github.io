export const personalInfo = {
  name: "Nikolai Tennant",
  title: "Research Engineer & Machine Learning Specialist",
  subtitle: "I build ML models for retail at dunnhumby and research ageing with deep learning at Brown University",
  location: "London, UK",
  email: "nikolaitennant@gmail.com",
  phone: "+44 7931 794345",
  linkedin: "https://www.linkedin.com/in/nikolai-tennant/",
  github: "https://github.com/nikolaitennant",
  bio: "Research engineer with a MSc in Data Science and BA in History from Brown University. Currently working at dunnhumby developing machine learning models for retail analytics whilst conducting research at IISAGE Lab on ageing biomarkers. Specialising in deep learning applications across biological and commercial domains.",
  citizenship: "Dual US/UK citizen, eligible to work in both countries"
};

export const experience = [
  {
    title: "Research Engineer, Customer Decision Sciences", 
    company: "dunnhumby",
    location: "London, England",
    period: "2025 - Present",
    description: "Promoted to Research Engineer. Leading advanced machine learning projects for retail analytics and customer decision sciences. Spearheading optimization of existing ML pipelines and developing next-generation recommendation systems.",
    technologies: ["Python", "SQL", "PySpark", "Machine Learning", "Data Engineering", "MLOps"],
    promotion: true
  },
  {
    title: "Associate Research Engineer, Customer Decision Sciences", 
    company: "dunnhumby",
    location: "London, England",
    period: "September 2023 - 2025",
    description: "Developing machine learning models for retail analytics and customer decision sciences. Redesigned and optimised existing codebases, enhanced Tesco Mobile's in-store basket assortment system through advanced analytics.",
    technologies: ["Python", "SQL", "PySpark", "Machine Learning", "Data Engineering"]
  },
  {
    title: "Research Assistant",
    company: "IISAGE Lab, Brown University",
    location: "Remote",
    period: "May 2022 - Present", 
    description: "Conducting X chromosome dosage compensation research as part of NSF-funded initiative. Developing computational models for cross-species ageing biomarker analysis. Contributing to multi-institutional collaboration across 11 research laboratories.",
    technologies: ["Python", "Deep Learning", "CNN", "Genomics", "Research"]
  }
];

export const education = [
  {
    degree: "MSc in Data Science",
    school: "Brown University",
    location: "Providence, RI",
    period: "September 2022 - October 2023",
    gpa: "4.0/4.0",
    relevant: ["Statistical Machine Learning", "Deep Learning Systems", "Computational Statistics", "Advanced Statistical Computing", "Bayesian Data Analysis", "Data Engineering at Scale", "Applied Statistical Methods", "Mathematical Foundations of Data Science", "Optimisation for Data Science", "Advanced Python Programming"]
  },
  {
    degree: "BA in History (minor in Data Science)",
    school: "Brown University", 
    location: "Providence, RI",
    period: "September 2018 - May 2022",
    gpa: "3.6/4.0",
    achievements: ["Data Science Club Team Lead", "Data Science Fellow", "Research Assistant for Machine Learning for the Earth & Environment"],
    relevant: ["Introduction to Statistical Computing", "Data Science", "Linear Algebra", "Multivariable Calculus", "Applied Statistics"]
  }
];

export const skills = {
  "Programming": ["Python", "SQL", "R", "JavaScript", "TypeScript", "Bash", "Git"],
  "ML/AI": ["PyTorch", "TensorFlow", "LangChain", "OpenAI API", "FAISS", "NLP", "Computer Vision"],
  "Mathematics & Statistics": ["Linear Algebra", "Statistical Modelling", "Bayesian Analysis", "Multivariate Calculus"],
  "Data & Cloud": ["PySpark", "Pandas", "NumPy", "AWS", "Databricks", "Docker", "Google Cloud Platform"],
  "Specialised Applications": ["Computational Biology", "Genomics", "RAG Systems", "LLMs", "Retail Analytics", "Full-Stack Development"]
};

export const projects = [
  {
    title: "RAG Scholar AI",
    description: "Research assistant application using Retrieval-Augmented Generation for academic literature analysis and synthesis.",
    longDescription: "Application combining large language models with retrieval systems for academic research assistance. Features include document processing, contextual Q&A with source citations, and multi-document synthesis using vector databases and custom embedding models.",
    technologies: ["Python", "LangChain", "Vector Databases", "OpenAI API", "Streamlit", "FAISS", "Natural Language Processing"],
    github: "https://github.com/nikolaitennant/rag_scholar",
    demo: "https://ragscholarai.web.app",
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
    category: "Machine Learning"
  }
];

export const publications = [
  {
    title: "TimeFlies: an RNA-seq ageing clock for the comprehensive study of tissue-specific ageing clocks Collection",
    authors: "Tennant, N.*, Okonkwo, A.*, O'Connor-Giles, K., Larshen, E.✝, & Singh, P.✝",
    status: "Manuscript accepted, undergoing final review (Preprint)",
    journal: "Nature Scientific Reports - Aging Clocks Collection",
    preprint: "https://pubmed.ncbi.nlm.nih.gov/39896546/",
    description: "Comprehensive study developing novel ageing biomarkers using RNA-seq data and deep learning methodologies to understand tissue-specific ageing patterns in Drosophila melanogaster.",
    longDescription: "As part of the NSF-funded IISAGE initiative, I developed novel computational approaches to understand ageing processes across different tissues using Drosophila melanogaster as a model organism. This work combines convolutional neural networks with genomic data analysis to identify ageing biomarkers that could translate to understanding human ageing mechanisms.",
    technologies: ["Python", "Deep Learning", "CNNs", "RNA-seq Analysis", "Genomics", "Bioinformatics", "Statistical Modeling"],
    keyFindings: [
      "Developed 1D CNN achieving 95% accuracy and 0.99 AUC on Drosophila ageing prediction",
      "Model generalises across all cell types while capturing cell-type-specific signals",
      "Identified ageing marker genes and sex-biased ageing mechanisms with in vivo validation",
      "Validated sexual dimorphism patterns in ageing processes"
    ],
    collaboration: "NSF-funded IISAGE initiative across 11 research institutions",
    impact: "Contributing to fundamental understanding of ageing biology with potential applications in longevity research"
  }
];

export const researchProjects = [
  {
    title: "SenID - Cellular Senescence Detection",
    description: "Computer vision system for identifying senescent cells using morphological analysis (2nd place, hackathon competition)",
    longDescription: "Developed during an intensive hackathon, this project applies computer vision techniques to identify cellular senescence - a key hallmark of ageing. The system analyzes cell morphology to detect senescent phenotypes, which is crucial for understanding age-related diseases and potential therapeutic interventions.",
    technologies: ["Python", "Computer Vision", "Deep Learning", "Cell Biology", "Image Processing", "Machine Learning"],
    keyFindings: [
      "Designed CNN-based methodology using nuclear morphology to identify cellular senescence",
      "Analysed 40,000 human and mouse cells, expanding beyond previous human-only studies",
      "Achieved 0.96 AUC using 1/100th the training samples of previous studies",
      "Created interpretable models showing which morphological features indicate senescence"
    ],
    achievement: "🥈 2nd Place Winner - Hackathon Competition (225+ participants)",
    impact: "Provides researchers with automated tools for senescence studies, accelerating ageing and cancer research",
    collaboration: "Individual hackathon project"
  }
];

export const researchInterests = {
  title: "Research Focus & Interests",
  subtitle: "Bridging computational biology and ageing research",
  overview: "My research sits at the intersection of computational biology, machine learning, and ageing science. I'm passionate about using advanced computational methods to understand fundamental biological processes, particularly how organisms age and how we can potentially intervene in age-related decline.",
  areas: [
    {
      title: "Computational Ageing Biology",
      description: "Developing AI/ML approaches to understand ageing mechanisms across species",
      focus: [
        "Tissue-specific ageing patterns and biomarker discovery",
        "Cross-species comparative ageing studies",
        "Sexual dimorphism in ageing processes",
        "Molecular mechanisms of cellular senescence"
      ]
    },
    {
      title: "Genomics & Deep Learning",
      description: "Applying neural networks to genomic data for biological insight",
      focus: [
        "RNA-seq data analysis and interpretation",
        "Convolutional neural networks for sequence analysis",
        "Multi-omics data integration",
        "Genomic feature engineering and selection"
      ]
    },
    {
      title: "Translational Research",
      description: "Bridging fundamental research with practical applications",
      focus: [
        "Biomarker development for clinical applications",
        "Drug discovery and therapeutic target identification",
        "Precision medicine approaches to ageing",
        "Commercial applications of biological insights"
      ]
    }
  ],
  currentProjects: [
    "NSF IISAGE Initiative: Multi-institutional ageing research collaboration",
    "X chromosome dosage compensation studies in Drosophila",
    "Cross-species ageing biomarker validation",
    "Development of interpretable AI models for biological discovery"
  ],
  futureDirections: "I'm interested in expanding this work to mammalian systems, developing clinical ageing biomarkers, and exploring how machine learning can accelerate drug discovery for age-related diseases."
};

export const personalInterests = {
  title: "Beyond Research",
  subtitle: "Personal Interests",
  interests: [
    "Sports: Football enthusiast, formerly lacrosse player",
    "Technology: Following AI/ML research and development", 
    "Research: Computational biology, genomics, and aging science",
    "Travel: Exploring different cultures",
    "Innovation: Bridging academic research and industry applications"
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