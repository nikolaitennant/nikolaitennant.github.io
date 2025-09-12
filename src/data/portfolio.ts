export const personalInfo = {
  name: "Nikolai Tennant",
  title: "Research Engineer & Machine Learning Specialist",
  subtitle: "Developing deep learning solutions for biological discovery and commercial applications",
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
    title: "Associate Research Engineer, Customer Decision Sciences", 
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
    title: "TimeFlies - Ageing Clock for Drosophila",
    description: "Deep learning methodology utilising CNNs and RNA-seq data to develop ageing biomarkers in Drosophila melanogaster.",
    longDescription: "Deep learning approach for ageing research combining convolutional neural networks with genomic data to identify ageing patterns in Drosophila. Research conducted as part of NSF-funded IISAGE initiative examining sexual dimorphism in ageing processes.",
    technologies: ["Python", "Deep Learning", "CNN", "RNA-seq", "Genomics", "Bioinformatics"],
    features: [
      "Cross-species data integration and nuclear morphology analysis",
      "Novel ageing biomarker identification",
      "Advanced genomic feature extraction",
      "Statistical validation of ageing patterns",
      "Applications in understanding ageing mechanisms"
    ],
    publications: "Manuscript accepted, undergoing final review",
    category: "Research",
    collaboration: "Part of NSF-funded IISAGE initiative"
  },
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
    title: "SenID - Cell Senescence Identification", 
    description: "Deep learning approach for identifying senescent cells using computer vision techniques (2nd place, hackathon).",
    longDescription: "Machine learning system for senescent cell identification using morphological analysis. Developed during hackathon competition, achieving 2nd place. Implementation includes computer vision techniques for cell classification with applications in ageing research.",
    technologies: ["Python", "Deep Learning", "Computer Vision", "Cell Biology", "Machine Learning"],
    achievement: "🥈 2nd Place Winner - Hackathon",
    features: [
      "Advanced cell morphology analysis",
      "High-accuracy senescence detection",
      "Scalable processing pipeline", 
      "Real-time analysis capabilities",
      "Applications in ageing and cancer research"
    ],
    impact: "Demonstrates computer vision application to cellular biology with competitive performance validation",
    category: "Deep Learning",
    timeline: "January 2023 - May 2023"
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
    title: "TimeFlies: an RNA-seq aging clock for the comprehensive study of tissue-specific aging clocks Collection",
    authors: "Tennant, N.*, Okonkwo, A.*, O'Connor-Giles, K., Larshen, E.T., & Singh, P.T.",
    status: "Manuscript accepted, undergoing final review (Preprint)",
    journal: "Nature Scientific Reports - Aging Clocks Collection",
    description: "Comprehensive study developing novel aging biomarkers using RNA-seq data and deep learning methodologies."
  }
];

export const interests = [
  "Sports: Lacrosse, Football (Soccer)",
  "Technology: Latest AI developments and applications", 
  "Research: Aging, genomics, and computational biology",
  "Travel: Exploring different cultures and scientific communities",
  "Innovation: Bridging academic research with real-world applications"
];