export const personalInfo = {
  name: "Nikolai Tennant",
  title: "Data Scientist & Computational Biologist",
  subtitle: "Bridging AI, genomics, and real-world applications",
  location: "London, UK",
  email: "nikolaitennant@gmail.com",
  phone: "+44 7931 794345",
  linkedin: "https://www.linkedin.com/in/nikolai-tennant/",
  github: "https://github.com/nikolaitennant",
  bio: "Data scientist and computational biologist with a MSc in Data Science and BA in History from Brown University. Currently at dunnhumby, working on cutting-edge retail analytics while pursuing groundbreaking research in genomics and aging. Passionate about applying machine learning to solve complex biological and business problems.",
  citizenship: "Dual US/UK citizen, eligible to work in both countries"
};

export const experience = [
  {
    title: "Research Engineer, Customer Decision Sciences",
    company: "dunnhumby",
    location: "London, England",
    period: "March 2025 - Present",
    description: "Enhanced ML model personalization systems, developed science modules for internal/external applications, and optimized customer targeting for major retail clients.",
    technologies: ["Python", "PySpark", "SQL", "Machine Learning", "A/B Testing"]
  },
  {
    title: "Associate Research Engineer, Customer Decision Sciences", 
    company: "dunnhumby",
    location: "London, England",
    period: "September 2023 - March 2025",
    description: "Redesigned and optimized existing codebases, enhanced Tesco Mobile's in-store basket assortment system, and led customer data analysis driving £620k+ value.",
    technologies: ["Python", "SQL", "PySpark", "Machine Learning", "Data Engineering"]
  },
  {
    title: "Research Assistant",
    company: "IISAGE Lab, Brown University",
    location: "Remote",
    period: "May 2022 - May 2023", 
    description: "Developed 'TimeFlies' aging clock for Drosophila using convolutional neural networks, identified potential aging marker genes, and conducted X chromosome dosage compensation research.",
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
    relevant: ["Machine Learning", "Deep Learning", "Statistical Learning", "Computational Probability", "Statistics", "Data Engineering", "Python", "Data Science Fluency", "Hands-on Data Science", "Python Fluency"]
  },
  {
    degree: "BA in History (minor in Data Science)",
    school: "Brown University", 
    location: "Providence, RI",
    period: "September 2018 - May 2022",
    achievements: ["High Honor Diploma", "President of Ecology Club", "Young Women's Conference", "Senior Leadership Board Ambassador", "Varsity Lacrosse Captain", "Dean's List", "Honor Roll Student", "Junior Service Award", "Brentwood Service Award"]
  }
];

export const skills = {
  "Programming Languages": ["Python", "SQL", "R", "JavaScript", "TypeScript", "HTML/CSS"],
  "Data Science & ML": ["Machine Learning", "Deep Learning", "Statistical Analysis", "Computer Vision", "Natural Language Processing", "A/B Testing"],
  "Tools & Frameworks": ["PySpark", "PyTorch", "TensorFlow", "Pandas", "NumPy", "Scikit-learn", "Docker", "Git"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "BigQuery"],
  "Cloud & Platforms": ["AWS", "Google Cloud", "Azure", "Databricks", "Jupyter", "Linux"],
  "Specializations": ["Genomics", "Computational Biology", "Retail Analytics", "Time Series Analysis", "Statistical Modeling"]
};

export const projects = [
  {
    title: "Premier League Result Projections",
    description: "Comprehensive machine learning system for predicting Premier League match outcomes using advanced ensemble methods and feature engineering.",
    longDescription: "Developed a sophisticated ML pipeline analyzing 457+ data points across Premier League seasons, incorporating betting odds, team performance metrics, and FIFA ratings. Achieved high prediction accuracy using ensemble methods including LightGBM, Random Forest, and SVC models.",
    technologies: ["Python", "LightGBM", "Random Forest", "SVC", "Pandas", "NumPy", "SHAP", "Machine Learning"],
    github: "https://github.com/nikolaitennant/Premier-League-Result-Projections",
    features: [
      "Advanced feature engineering with betting odds integration",
      "Team strength indicators using Fantasy Premier League ICT index", 
      "FIFA 22/23 ratings for initial team assessments",
      "Model interpretability with SHAP values",
      "Comprehensive data visualization and analysis"
    ],
    impact: "Addresses multi-billion dollar sports betting market with data-driven predictions",
    category: "Machine Learning"
  },
  {
    title: "TimeFlies - Aging Clock for Drosophila",
    description: "Revolutionary deep learning methodology utilizing CNNs and RNA-seq data to create an aging clock for fruit flies, identifying novel aging biomarkers.",
    longDescription: "Developed an innovative deep learning approach for aging research, combining convolutional neural networks with genomic data to understand aging patterns in Drosophila. This research contributes to understanding fundamental aging mechanisms with potential human applications.",
    technologies: ["Python", "Deep Learning", "CNN", "RNA-seq", "Genomics", "Bioinformatics"],
    features: [
      "Cross-species data integration and nuclear morphology analysis",
      "Novel aging biomarker identification",
      "Advanced genomic feature extraction",
      "Statistical validation of aging patterns",
      "Potential applications in human aging research"
    ],
    publications: "Manuscript accepted, undergoing final review",
    category: "Research",
    collaboration: "Part of NSF-funded IISAGE initiative"
  },
  {
    title: "RAG Scholar AI",
    description: "Intelligent research assistant application leveraging Retrieval-Augmented Generation (RAG) to help researchers navigate and synthesize academic literature.",
    longDescription: "Advanced AI-powered application that combines large language models with retrieval systems to provide contextual, accurate assistance for academic research. The system can process vast amounts of scientific literature and provide intelligent summaries, citations, and research insights.",
    technologies: ["Python", "LangChain", "Vector Databases", "OpenAI API", "Streamlit", "FAISS", "Natural Language Processing"],
    github: "https://github.com/nikolaitennant/rag-scholar-ai",
    features: [
      "Intelligent document retrieval and ranking",
      "Contextual Q&A with source citations",
      "Research paper summarization and analysis",
      "Multi-document synthesis capabilities",
      "User-friendly web interface with real-time responses",
      "Custom embedding models for academic content"
    ],
    impact: "Streamlines research workflows and accelerates scientific discovery for researchers and students",
    category: "Machine Learning",
    timeline: "2023 - Present"
  },
  {
    title: "SenID - Cell Senescence Identification", 
    description: "Hackathon-winning deep learning solution for identifying senescent cells with applications in aging and disease research.",
    longDescription: "2nd place hackathon project developing a novel approach to identify senescent cells using machine learning techniques. This work has implications for aging research, cancer therapy, and regenerative medicine.",
    technologies: ["Python", "Deep Learning", "Computer Vision", "Cell Biology", "Machine Learning"],
    achievement: "🥈 2nd Place Winner - Hackathon",
    features: [
      "Advanced cell morphology analysis",
      "High-accuracy senescence detection",
      "Scalable processing pipeline", 
      "Real-time analysis capabilities",
      "Applications in aging and cancer research"
    ],
    impact: "Contributes to understanding cellular aging and potential therapeutic targets",
    category: "Bioinformatics",
    timeline: "January 2023 - May 2023"
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