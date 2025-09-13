import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Github, Award, Calendar, Users, Zap, ChevronRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';

const useScrollTriggeredTypewriter = (text: string, delay: number = 50, startDelay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [shouldStart, setShouldStart] = useState(false);
  
  const startTyping = () => {
    if (!shouldStart) {
      setShouldStart(true);
    }
  };

  useEffect(() => {
    if (!text || !shouldStart) return;
    
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, delay);
      
      return () => clearInterval(timer);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, delay, startDelay, shouldStart]);

  return { displayedText, isTyping, startTyping, shouldStart };
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [expandedTags, setExpandedTags] = useState<Set<number>>(new Set());
  const [previewModal, setPreviewModal] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.03 });
  
  const toggleTagsExpansion = (projectIndex: number) => {
    setExpandedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectIndex)) {
        newSet.delete(projectIndex);
      } else {
        newSet.add(projectIndex);
      }
      return newSet;
    });
  };
  
  // Terminal commands with scroll trigger
  const gitCommand = useScrollTriggeredTypewriter("$ git log --oneline projects/", 80, 500);
  const scanningCommand = useScrollTriggeredTypewriter("# Scanning repository...", 70, 500 + (gitCommand.displayedText.length > 0 ? 29 * 80 + 800 : 0));
  const activeCommand = useScrollTriggeredTypewriter("# Active: 2 personal projects", 70, 500 + (gitCommand.displayedText.length > 0 ? 29 * 80 + 1600 : 0));

  useEffect(() => {
    if (isInView) {
      gitCommand.startTyping();
      setTimeout(() => scanningCommand.startTyping(), 500 + 29 * 80 + 800);
      setTimeout(() => activeCommand.startTyping(), 500 + 29 * 80 + 1600);
    }
  }, [isInView]);

  const categories = ['all', 'Deep Learning', 'Machine Learning'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Organize projects into columns manually for proper masonry
  const organiseIntoColumns = (projects: any[], numCols: number) => {
    const columns: any[][] = Array.from({ length: numCols }, () => []);
    projects.forEach((project, index) => {
      columns[index % numCols].push({ ...project, originalIndex: index });
    });
    return columns;
  };

  // Use responsive column organization
  const [columnCount, setColumnCount] = useState(1);

  useLayoutEffect(() => {
    const updateColumns = () => {
      if (typeof window !== 'undefined') {
        setColumnCount(window.innerWidth >= 1280 ? 3 : window.innerWidth >= 1024 ? 2 : 1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const projectColumns = organiseIntoColumns(filteredProjects, columnCount);

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

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-terminal-900 via-emerald-950/25 to-gray-900/20 relative overflow-hidden" ref={ref}>

      {/* Terminal Command Header */}
      <div className="absolute top-8 left-8 text-primary-400 font-mono text-sm opacity-40 space-y-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="w-3 h-3 rounded-full bg-bio-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
        </div>
        <div>
          {gitCommand.displayedText}
        </div>
        <div className="text-xs text-accent-400 mt-1">
          {scanningCommand.displayedText}
        </div>
        <div className="text-xs text-bio-400 mt-1">
          {activeCommand.displayedText}
        </div>
      </div>
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.03 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 font-mono">
              <span className="text-primary-400">{'>'}</span> <span className="gradient-text">Personal Projects</span>
            </h2>
            <p className="text-lg sm:text-xl text-terminal-300 max-w-3xl mx-auto font-mono px-4">
              Things I've built for fun - personal projects showcasing technical skills and interests
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8 md:mb-12">
            <div className="flex flex-wrap gap-1 md:gap-2 p-1.5 md:p-2 bg-terminal-800 border border-primary-500/30 rounded-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full font-medium transition-all duration-300 font-mono text-sm md:text-base ${
                    filter === category
                      ? 'bg-primary-600 text-white shadow-lg border border-primary-500/50'
                      : 'text-terminal-300 hover:bg-terminal-700 hover:text-primary-400 border border-terminal-600'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={filter}
              className="flex flex-col lg:flex-row gap-6 lg:gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {projectColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 space-y-6 lg:space-y-8">
                  {column.map((project) => (
                    <motion.div
                      key={project.title}
                      variants={cardVariants}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(selectedProject === project.originalIndex ? null : project.originalIndex)}
                    >
                  <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl hover:border-primary-500/50 h-full flex flex-col">
                    {/* Project Header */}
                    <div className="p-4 md:p-6 lg:p-8 pb-4 md:pb-6 flex-1 flex flex-col"
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl md:text-2xl font-bold text-terminal-100 group-hover:text-primary-400 transition-colours font-mono leading-tight flex-1">
                            {project.title}
                          </h3>
                          {(project as any).logo && (
                            <div className="w-12 h-12 rounded overflow-hidden bg-terminal-700/30 flex-shrink-0">
                              <img
                                src={(project as any).logo}
                                alt={`${project.title} logo`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                        
                        {/* Category Badge */}
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium font-mono mb-3 ${
                          project.category === 'Machine Learning' 
                            ? 'bg-terminal-700 border border-primary-500/30 text-primary-400'
                            : 'bg-terminal-700 border border-bio-500/30 text-bio-400'
                        }`}>
                          {project.category}
                        </span>
                        
                        <p className="text-terminal-300 text-base md:text-lg leading-relaxed font-mono">
                          {project.description}
                        </p>
                      </div>

                      {/* Special Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.achievement && (
                          <div className="flex items-center px-3 py-1 bg-terminal-700 border border-accent-500/30 text-accent-400 rounded-full text-sm font-medium font-mono">
                            <Award className="w-4 h-4 mr-1" />
                            {project.achievement}
                          </div>
                        )}
                        {project.publications && (
                          <div className="flex items-center px-3 py-1 bg-terminal-700 border border-bio-500/30 text-bio-400 rounded-full text-sm font-medium font-mono">
                            <Users className="w-4 h-4 mr-1" />
                            Published
                          </div>
                        )}
                        {project.collaboration && (
                          <div className="flex items-center px-3 py-1 bg-terminal-700 border border-primary-500/30 text-primary-400 rounded-full text-sm font-medium font-mono">
                            <Users className="w-4 h-4 mr-1" />
                            Collaboration
                          </div>
                        )}
                      </div>

                      {/* Tech Stack Preview */}
                      <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                        {(expandedTags.has(project.originalIndex) ? project.technologies : project.technologies.slice(0, 4)).map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2 md:px-3 py-1 md:py-1.5 bg-terminal-700 border border-terminal-600 text-terminal-300 rounded text-xs md:text-sm font-medium font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTagsExpansion(project.originalIndex);
                            }}
                            className="px-2 md:px-3 py-1 md:py-1.5 bg-terminal-700 border border-primary-500/50 text-primary-400 rounded text-xs md:text-sm font-medium font-mono hover:border-primary-500 transition-colours"
                          >
                            {expandedTags.has(project.originalIndex) 
                              ? 'Show Less' 
                              : `+${project.technologies.length - 4}`
                            }
                          </button>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-terminal-300 hover:text-primary-400 transition-colours font-mono"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">Code</span>
                            </a>
                          )}
                          {(project as any).demo && (
                            <a
                              href={(project as any).demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-terminal-300 hover:text-bio-400 transition-colours font-mono"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">Demo</span>
                            </a>
                          )}
                          {project.image && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewModal(project.image);
                              }}
                              className="flex items-center text-terminal-300 hover:text-accent-400 transition-colours font-mono"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span className="text-sm font-medium">Preview</span>
                            </button>
                          )}
                          {project.preprint && (
                            <a
                              href={project.preprint}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-terminal-300 hover:text-bio-400 transition-colours font-mono"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-sm font-medium">Preprint</span>
                            </a>
                          )}
                          {project.timeline && (
                            <div className="flex items-center text-terminal-300 text-sm font-mono">
                              <Calendar className="w-4 h-4 mr-1" />
                              {project.timeline}
                            </div>
                          )}
                        </div>

                        <button className="flex items-center text-primary-400 hover:text-primary-300 transition-colours ml-4">
                          <span className="text-sm font-medium mr-1 font-mono">
                            {selectedProject === project.originalIndex ? 'Less' : 'More'}
                          </span>
                          <ChevronRight 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              selectedProject === project.originalIndex ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {selectedProject === project.originalIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t border-primary-500/30">
                            {/* Long Description */}
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-terminal-100 mb-2 font-mono">
                                <span className="text-primary-400">{'>'}</span> Project Details:
                              </h4>
                              <p className="text-terminal-300 text-sm leading-relaxed font-mono">
                                {project.longDescription}
                              </p>
                            </div>

                            {/* Features */}
                            {project.features && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-terminal-100 mb-2 font-mono">
                                  <span className="text-primary-400">{'>'}</span> Key Features:
                                </h4>
                                <ul className="space-y-1">
                                  {project.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start text-sm text-terminal-300 font-mono">
                                      <Zap className="w-3 h-3 text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Impact */}
                            {project.impact && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-terminal-100 mb-2 font-mono">
                                  <span className="text-primary-400">{'>'}</span> Impact:
                                </h4>
                                <p className="text-sm text-terminal-300 font-mono">
                                  {project.impact}
                                </p>
                              </div>
                            )}

                            {/* All Technologies */}
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-terminal-100 mb-2 font-mono">
                                <span className="text-primary-400">{'>'}</span> Technologies Used:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech: string) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-terminal-700 border border-primary-500/30 text-primary-400 rounded text-xs font-medium font-mono"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Publication Status */}
                            {project.publications && (
                              <div className="bg-terminal-700/50 border border-bio-500/30 rounded-lg p-3">
                                <div className="flex items-center text-bio-400">
                                  <Award className="w-4 h-4 mr-2" />
                                  <span className="font-medium text-sm font-mono">Publication Status:</span>
                                </div>
                                <p className="text-sm text-bio-400 mt-1 font-mono">
                                  {project.publications}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

        </motion.div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewModal(null)}
          >
            <motion.div
              className="max-w-4xl max-h-[90vh] overflow-auto bg-terminal-800 border border-primary-500/30 rounded-xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-terminal-100 font-mono">App Preview</h3>
                  <button
                    onClick={() => setPreviewModal(null)}
                    className="text-terminal-400 hover:text-terminal-100 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <img
                  src={previewModal}
                  alt="App preview"
                  className="w-full h-auto rounded"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;