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
    period: "September 2023 - Present",
    description: "Developing machine learning models for retail analytics and customer decision sciences. Redesigned and optimised existing codebases, enhanced Tesco Mobile's in-store basket assortment system through advanced analytics.",
    technologies: ["Python", "SQL", "PySpark", "Machine Learning", "Data Engineering"]
  },
  {
    title: "Research Assistant",
    company: "IISAGE Lab, Brown University",
    location: "Remote",
    period: "May 2022 - Present", 
    description: "Developing 'TimeFlies' ageing clock for Drosophila using convolutional neural networks, identifying potential ageing marker genes, and conducting X chromosome dosage compensation research as part of NSF-funded initiative.",
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
    achievements: ["Dean's List"],
    relevant: ["Introduction to Statistical Computing", "Data Science", "Linear Algebra", "Multivariable Calculus", "Applied Statistics"]
  },
  {
    degree: "High School Diploma",
    school: "Brentwood High School", 
    location: "Los Angeles, CA",
    period: "September 2014 - May 2018",
    achievements: ["High Honour Diploma", "President of Ecology Club", "Young Women's Conference", "Senior Leadership Board Ambassador", "Varsity Lacrosse Captain", "Honour Roll Student", "Junior Service Award", "Brentwood Service Award"]
  }
];

export const skills = {
  "Programming": ["Python", "SQL", "R", "Bash", "Git"],
  "Deep Learning": ["PyTorch", "TensorFlow", "Convolutional Neural Networks", "Computer Vision", "Neural Architecture Design"],
  "Machine Learning": ["Scikit-learn", "XGBoost", "LightGBM", "Statistical Modelling", "Feature Engineering", "Model Evaluation"],
  "Data Engineering": ["PySpark", "Pandas", "NumPy", "Data Pipelines", "ETL Processes"],
  "Cloud & Infrastructure": ["AWS", "Databricks", "Docker", "Linux", "Jupyter"],
  "Specialised Applications": ["Genomics", "Computational Biology", "Retail Analytics", "Bioinformatics"]
};

export const projects = [
  {
    title: "RAG Scholar AI",
    description: "Research assistant application using Retrieval-Augmented Generation for academic literature analysis and synthesis.",
    longDescription: "Application combining large language models with retrieval systems for academic research assistance. Features include document processing, contextual Q&A with source citations, and multi-document synthesis using vector databases and custom embedding models.",
    technologies: ["Python", "LangChain", "Vector Databases", "OpenAI API", "Streamlit", "FAISS", "Natural Language Processing"],
    github: "https://github.com/nikolaitennant/rag-scholar-ai",
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
    timeline: "2023 - Present"
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
    authors: "Tennant, N.*, Okonkwo, A.*, O'Connor-Giles, K., Larshen, E.T., & Singh, P.T.",
    status: "Manuscript accepted, undergoing final review (Preprint)",
    journal: "Nature Scientific Reports - Aging Clocks Collection",
    preprint: "https://pubmed.ncbi.nlm.nih.gov/39896546/",
    description: "Comprehensive study developing novel ageing biomarkers using RNA-seq data and deep learning methodologies to understand tissue-specific ageing patterns in Drosophila melanogaster."
  }
];

export const researchProjects = [
  {
    title: "TimeFlies - Ageing Clock Development",
    description: "Developing deep learning methodologies to create tissue-specific ageing clocks using RNA-seq data from Drosophila melanogaster",
    longDescription: "As part of the NSF-funded IISAGE initiative, I'm developing novel computational approaches to understand ageing processes across different tissues. This work combines convolutional neural networks with genomic data analysis to identify ageing biomarkers that could translate to understanding human ageing mechanisms.",
    technologies: ["Python", "Deep Learning", "CNNs", "RNA-seq Analysis", "Genomics", "Bioinformatics", "Statistical Modeling"],
    keyFindings: [
      "Identified tissue-specific ageing signatures across multiple Drosophila tissues",
      "Developed novel CNN architectures for genomic sequence analysis",
      "Discovered potential ageing marker genes with cross-species relevance",
      "Validated sexual dimorphism patterns in ageing processes"
    ],
    collaboration: "NSF-funded IISAGE initiative across 11 research institutions",
    impact: "Contributing to fundamental understanding of ageing biology with potential applications in longevity research"
  },
  {
    title: "SenID - Cellular Senescence Detection",
    description: "Computer vision system for identifying senescent cells using morphological analysis (2nd place, hackathon competition)",
    longDescription: "Developed during an intensive hackathon, this project applies computer vision techniques to identify cellular senescence - a key hallmark of ageing. The system analyzes cell morphology to detect senescent phenotypes, which is crucial for understanding age-related diseases and potential therapeutic interventions.",
    technologies: ["Python", "Computer Vision", "Deep Learning", "Cell Biology", "Image Processing", "Machine Learning"],
    keyFindings: [
      "Achieved high accuracy in senescent cell identification using morphological features",
      "Developed scalable image processing pipeline for cellular analysis",
      "Demonstrated real-time analysis capabilities for research applications",
      "Created interpretable models showing which morphological features indicate senescence"
    ],
    achievement: "🥈 2nd Place Winner - Hackathon Competition",
    impact: "Provides researchers with automated tools for senescence studies, accelerating ageing and cancer research"
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
    "Sports: University lacrosse captain, football enthusiast",
    "Technology: Following cutting-edge AI research and applications", 
    "Research: Ageing biology, genomics, and computational methods",
    "Travel: Exploring different cultures and international research communities",
    "Innovation: Translating academic research into commercial applications"
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