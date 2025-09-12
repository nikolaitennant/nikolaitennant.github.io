import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Phone, Mail, Github, Globe } from 'lucide-react';

const Resume: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="resume" className="section-padding bg-gradient-to-br from-terminal-900 via-emerald-950/25 to-gray-900/20 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-primary-400">{'>'}</span> <span className="gradient-text">Resume</span>
            </h2>
            <p className="text-xl text-terminal-300 max-w-3xl mx-auto font-mono mb-8">
              Complete professional overview - research engineer and computational biologist
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 font-mono border border-primary-500"
              onClick={() => {
                const element = document.createElement('a');
                element.href = '/resume.pdf';
                element.download = 'Nikolai_Tennant_Resume.pdf';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </motion.button>
          </motion.div>

          {/* Resume Content */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="bg-white text-gray-900 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-200">
              
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b border-gray-300">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Nikolai Tennant</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    London, England
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    +44 7931 794345
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    nikolaitennant@gmail.com
                  </div>
                  <div className="flex items-center">
                    <Github className="w-4 h-4 mr-1" />
                    nikolaitennant
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    nikolaitennant.github.io
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-primary-700 border-b border-primary-200 pb-2">WORK EXPERIENCE</h2>
                
                <div className="mb-6">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">Research Engineer, Customer Decision Sciences</h3>
                      <p className="text-primary-600 font-medium">dunnhumby, London, England</p>
                    </div>
                    <span className="text-sm text-gray-600">March 2025 – Present</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Designed and implemented LLM-powered text generation system</li>
                    <li>• Developed science modules for cost modelling, impact prediction, and dynamic product ranking</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">Associate Research Engineer, Customer Decision Sciences</h3>
                      <p className="text-primary-600 font-medium">dunnhumby, London, England</p>
                    </div>
                    <span className="text-sm text-gray-600">September 2023 – March 2025</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Optimised Tesco Mobile's handset assortment using ML and autoencoders on 5M customer dataset</li>
                    <li>• Led customer profiling projects delivering £829,000 in business value</li>
                    <li>• Refactored codebases, implemented testing, and removed external API dependencies</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">Research Assistant</h3>
                      <p className="text-primary-600 font-medium">IISAGE & Singh Lab, Brown University, Remote</p>
                    </div>
                    <span className="text-sm text-gray-600">May 2022 – Present</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Conducting X chromosome dosage compensation research as part of multi-institutional initiative</li>
                    <li>• Developing computational models for cross-species ageing biomarker analysis</li>
                    <li>• Contributing to collaboration across 11 research laboratories</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-primary-700 border-b border-primary-200 pb-2">EDUCATION</h2>
                
                <div className="mb-4">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">MSc Data Science, GPA 4.0/4.0</h3>
                      <p className="text-primary-600 font-medium">Brown University, Providence, RI</p>
                    </div>
                    <span className="text-sm text-gray-600">September 2022 - October 2023</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">BA History and Minor in Data Science, GPA 3.6/4.0</h3>
                      <p className="text-primary-600 font-medium">Brown University, Providence, RI</p>
                    </div>
                    <span className="text-sm text-gray-600">September 2018 - May 2022</span>
                  </div>
                </div>

                <div className="text-sm text-gray-700">
                  <p className="mb-2"><strong>Relevant Coursework:</strong> Machine Learning, Deep Learning, Statistical Learning, Computational Probability and Statistics, Data Engineering, Applied Statistics in Python, Data Science Fluency</p>
                  <p><strong>Relevant Co-curricular:</strong> Research Assistant for Machine Learning for the Earth & Environment, Data Science Club Team Lead, Data Science Fellow</p>
                </div>
              </div>

              {/* Publications */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-primary-700 border-b border-primary-200 pb-2">PUBLICATIONS</h2>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Tennant, N.*</strong>, Pavuluri, A., O'Connor-Giles, K., Larschan, E.✝, & Singh, R.✝ TimeFlies: An snRNA-seq aging clock for the fruit fly head sheds light on sex-biased aging. <em>Nature Scientific Reports – Aging Clocks Collection</em>. Manuscript accepted, undergoing final review.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Developed 1D CNN achieving 95% accuracy and 0.99 AUC on Drosophila ageing prediction</li>
                    <li>• Model generalises across all cell types while capturing cell-type-specific signals</li>
                    <li>• Identified ageing marker genes and sex-biased ageing mechanisms with in vivo validation</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-2">✝Co-corresponding authors</p>
                </div>
              </div>

              {/* Projects */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-primary-700 border-b border-primary-200 pb-2">ADDITIONAL PROJECTS</h2>
                
                <div className="mb-4">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="font-bold">RAG Scholar - Professional Research Assistant</h3>
                    <span className="text-sm text-gray-600">2025</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Built full-stack RAG system with Python/FastAPI backend and React/TypeScript frontend</li>
                    <li>• Implemented hybrid search (FAISS vector + BM25 keyword) with OpenAI embeddings and LangChain</li>
                    <li>• Deployed on Google Cloud Platform with CI/CD pipeline, handling multi-format document processing</li>
                    <li>• Features: session memory, citation tracking, domain-specific responses, real-time chat interface</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="font-bold">SenID - Cellular Senescence Identification</h3>
                    <span className="text-sm text-gray-600">January 2023 – May 2023</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Designed CNN-based methodology using nuclear morphology to identify cellular senescence</li>
                    <li>• Analysed 40,000 human and mouse cells, expanding beyond previous human-only studies</li>
                    <li>• Achieved 0.96 AUC using 1/100th the training samples of previous studies</li>
                    <li>• 2nd place finish in 225+ participant hackathon</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="font-bold">Premier League Result Forecasting</h3>
                    <span className="text-sm text-gray-600">September 2022 – December 2022</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Built ML pipeline achieving 20% greater accuracy than baseline for match outcome prediction</li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-primary-700 border-b border-primary-200 pb-2">TECHNICAL SKILLS</h2>
                
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Programming:</strong> Python, SQL, R, JavaScript, TypeScript, Git, Bash</p>
                  <p><strong>ML/AI:</strong> PyTorch, TensorFlow, LangChain, OpenAI API, FAISS, NLP, Computer Vision</p>
                  <p><strong>Mathematics & Statistics:</strong> Linear Algebra, Statistical Modelling, Bayesian Analysis, Multivariate Calculus</p>
                  <p><strong>Data & Cloud:</strong> PySpark, Pandas, NumPy, AWS, Databricks, Docker, Google Cloud Platform</p>
                  <p><strong>Specialties:</strong> Computational Biology, Genomics, RAG Systems, LLMs, Retail Analytics, Full-Stack Development</p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
                <p>*Authorised to work for any US or UK employer (Dual Citizen)</p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;