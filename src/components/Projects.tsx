import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Github, Award, Calendar, Users, Zap, ChevronRight } from 'lucide-react';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Terminal commands with scroll trigger
  const gitCommand = useScrollTriggeredTypewriter("$ git log --oneline projects/", 80, 500);
  const scanningCommand = useScrollTriggeredTypewriter("# Scanning repository...", 70, 500 + (gitCommand.displayedText.length > 0 ? 29 * 80 + 800 : 0));
  const activeCommand = useScrollTriggeredTypewriter("# Active: 4 major projects", 70, 500 + (gitCommand.displayedText.length > 0 ? 29 * 80 + 1600 : 0));

  useEffect(() => {
    if (isInView) {
      gitCommand.startTyping();
      setTimeout(() => scanningCommand.startTyping(), 500 + 29 * 80 + 800);
      setTimeout(() => activeCommand.startTyping(), 500 + 29 * 80 + 1600);
    }
  }, [isInView]);

  const categories = ['all', 'Research', 'Deep Learning', 'Machine Learning'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Organize projects into columns manually for proper masonry
  const organizeIntoColumns = (projects: any[], numCols: number) => {
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

  const projectColumns = organizeIntoColumns(filteredProjects, columnCount);

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
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-primary-400">{'>'}</span> <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-xl text-terminal-300 max-w-3xl mx-auto font-mono">
              Research and development projects applying machine learning to biological and business problems
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2 p-2 bg-terminal-800 border border-primary-500/30 rounded-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 font-mono ${
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
              className="flex flex-col lg:flex-row gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {projectColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 space-y-8">
                  {column.map((project) => (
                    <motion.div
                      key={project.title}
                      variants={cardVariants}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(selectedProject === project.originalIndex ? null : project.originalIndex)}
                    >
                  <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl hover:border-primary-500/50">
                    {/* Project Header */}
                    <div className="p-8 pb-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-terminal-100 mb-3 group-hover:text-primary-400 transition-colors font-mono leading-tight">
                          {project.title}
                        </h3>
                        
                        {/* Category Badge */}
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium font-mono mb-3 ${
                          project.category === 'Machine Learning' 
                            ? 'bg-terminal-700 border border-primary-500/30 text-primary-400'
                            : project.category === 'Research'
                            ? 'bg-terminal-700 border border-accent-500/30 text-accent-400'
                            : 'bg-terminal-700 border border-bio-500/30 text-bio-400'
                        }`}>
                          {project.category}
                        </span>
                        
                        <p className="text-terminal-300 text-lg leading-relaxed font-mono">
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
                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.technologies.slice(0, 4).map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-terminal-700 border border-terminal-600 text-terminal-300 rounded text-sm font-medium font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1.5 bg-terminal-700 border border-terminal-600 text-terminal-300 rounded text-sm font-mono">
                            +{project.technologies.length - 4}
                          </span>
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
                              className="flex items-center text-terminal-300 hover:text-primary-400 transition-colors font-mono"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">Code</span>
                            </a>
                          )}
                          {project.preprint && (
                            <a
                              href={project.preprint}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-terminal-300 hover:text-bio-400 transition-colors font-mono"
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

                        <button className="flex items-center text-primary-400 hover:text-primary-300 transition-colors">
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
                          <div className="px-6 pb-6 pt-2 border-t border-primary-500/30">
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
    </section>
  );
};

export default Projects;