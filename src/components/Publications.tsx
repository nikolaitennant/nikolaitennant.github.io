import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Users, Calendar, BookOpen, Award } from 'lucide-react';
import { publications, researchProjects, researchInterests } from '../data/portfolio';

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

const Publications: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.03 });
  
  // Terminal commands with scroll trigger
  const grepCommand = useScrollTriggeredTypewriter("$ grep -r 'publications' research/", 80, 500);
  const indexingCommand = useScrollTriggeredTypewriter("# Indexing academic papers...", 70, 500 + (grepCommand.displayedText.length > 0 ? 35 * 80 + 800 : 0));
  const statusCommand = useScrollTriggeredTypewriter("# Status: 1 publication, more incoming", 70, 500 + (grepCommand.displayedText.length > 0 ? 35 * 80 + 1600 : 0));

  useEffect(() => {
    if (isInView) {
      grepCommand.startTyping();
      setTimeout(() => indexingCommand.startTyping(), 500 + 35 * 80 + 800);
      setTimeout(() => statusCommand.startTyping(), 500 + 35 * 80 + 1600);
    }
  }, [isInView]);

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
    <section id="publications" className="section-padding bg-gradient-to-br from-terminal-900 via-purple-950/20 to-gray-900/20 relative overflow-hidden" ref={ref}>
      
      {/* Terminal Command Header */}
      <div className="absolute top-16 left-3 md:top-8 md:left-8 text-primary-400 font-mono text-xs md:text-sm opacity-40 space-y-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 rounded-full bg-bio-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
        <div>
          {grepCommand.displayedText}
        </div>
        <div className="text-xs text-accent-400 mt-1">
          {indexingCommand.displayedText}
        </div>
        <div className="text-xs text-bio-400 mt-1">
          {statusCommand.displayedText}
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-mono">
              <span className="text-primary-400">{'>'}</span> <span className="gradient-text">Research & Publications</span>
            </h2>
            <p className="text-base md:text-lg text-terminal-300 max-w-3xl mx-auto font-mono px-2">
              Research contributions in computational biology, ageing science, and machine learning applications
            </p>
          </motion.div>

          {/* Publications */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-16">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-center gradient-text font-mono">
              <span className="text-primary-400">{'>'}</span> Publications
            </h3>

            <div className="space-y-4 md:space-y-8">
              {publications.map((publication, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-2xl shadow-xl p-8 hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-6">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-r from-bio-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>

                    {/* Publication Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-semibold text-terminal-100 pr-4 font-mono">
                          {publication.title}
                        </h4>
                        
                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap font-mono ${
                          publication.status.includes('accepted') 
                            ? 'bg-terminal-700 border border-bio-500/30 text-bio-400'
                            : 'bg-terminal-700 border border-accent-500/30 text-accent-400'
                        }`}>
                          {publication.status.includes('accepted') ? 'Accepted' : 'In Review'}
                        </span>
                      </div>

                      {/* Authors */}
                      <div className="flex items-center text-terminal-300 mb-2">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm font-mono">{publication.authors}</span>
                      </div>

                      {/* Journal */}
                      <div className="flex items-center text-primary-400 font-medium mb-3">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span className="text-sm font-mono">{publication.journal}</span>
                      </div>

                      {/* Description */}
                      <p className="text-terminal-300 mb-2 leading-relaxed font-mono">
                        {publication.description}
                      </p>
                      
                      {/* Long Description */}
                      {publication.longDescription && (
                        <p className="text-terminal-300 text-sm mb-4 leading-relaxed font-mono">
                          {publication.longDescription}
                        </p>
                      )}

                      {/* Preprint Link */}
                      {publication.preprint && (
                        <div className="mb-4">
                          <a
                            href={publication.preprint}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-bio-400 hover:text-bio-300 transition-colours font-mono bg-terminal-700/30 border border-bio-500/30 rounded-lg px-4 py-2 text-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Preprint
                          </a>
                        </div>
                      )}

                      {/* Key Findings and Technologies */}
                      {(publication.keyFindings || publication.technologies) && (
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          {/* Key Findings */}
                          {publication.keyFindings && (
                            <div>
                              <h5 className="text-sm font-semibold text-terminal-100 mb-3 font-mono">
                                <span className="text-primary-400">{'>'}</span> Key Findings:
                              </h5>
                              <ul className="space-y-2">
                                {publication.keyFindings.map((finding, i) => (
                                  <li key={i} className="flex items-start text-sm text-terminal-300 font-mono">
                                    <span className="text-bio-400 mr-2 flex-shrink-0">•</span>
                                    {finding}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Technologies */}
                          {publication.technologies && (
                            <div>
                              <h5 className="text-sm font-semibold text-terminal-100 mb-3 font-mono">
                                <span className="text-primary-400">{'>'}</span> Technologies:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {publication.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-terminal-700 border border-primary-500/30 text-primary-400 rounded text-xs font-medium font-mono"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Impact and Collaboration */}
                      {(publication.impact || publication.collaboration) && (
                        <div className="bg-terminal-700/50 border border-bio-500/30 rounded-lg p-4 mb-4">
                          <div className="flex items-center text-bio-400 mb-2">
                            <Award className="w-4 h-4 mr-2" />
                            <span className="font-medium text-sm font-mono">Impact & Collaboration:</span>
                          </div>
                          {publication.impact && (
                            <p className="text-sm text-bio-400 font-mono mb-2">
                              {publication.impact}
                            </p>
                          )}
                          {publication.collaboration && (
                            <p className="text-xs text-terminal-300 font-mono">
                              {publication.collaboration}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Status Details */}
                      <div className="bg-terminal-700/50 border border-primary-500/30 rounded-lg p-4">
                        <div className="flex items-center text-terminal-100">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="font-medium text-sm font-mono">Status:</span>
                        </div>
                        <p className="text-sm text-terminal-300 mt-1 font-mono">
                          {publication.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Research Projects */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-semibold mb-8 text-center gradient-text font-mono">
              <span className="text-primary-400">{'>'}</span> Additional Research Projects
            </h3>
            
            <div className="space-y-8">
              {researchProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-2xl shadow-xl p-8 hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-2xl font-bold text-terminal-100 font-mono">
                        {project.title}
                      </h4>
                      {project.achievement && (
                        <span className="inline-block px-3 py-1 bg-accent-500/20 border border-accent-500/30 text-accent-400 rounded-full text-sm font-medium font-mono">
                          {project.achievement}
                        </span>
                      )}
                    </div>
                    <p className="text-terminal-300 text-lg leading-relaxed font-mono mb-4">
                      {project.description}
                    </p>
                    <p className="text-terminal-300 text-sm leading-relaxed font-mono mb-6">
                      {project.longDescription}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="text-sm font-semibold text-terminal-100 mb-3 font-mono">
                        <span className="text-primary-400">{'>'}</span> Key Findings:
                      </h5>
                      <ul className="space-y-2">
                        {project.keyFindings.map((finding, i) => (
                          <li key={i} className="flex items-start text-sm text-terminal-300 font-mono">
                            <span className="text-bio-400 mr-2 flex-shrink-0">•</span>
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-terminal-100 mb-3 font-mono">
                        <span className="text-primary-400">{'>'}</span> Technologies:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-terminal-700 border border-primary-500/30 text-primary-400 rounded text-xs font-medium font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-terminal-700/50 border border-bio-500/30 rounded-lg p-4">
                    <div className="flex items-center text-bio-400 mb-2">
                      <Award className="w-4 h-4 mr-2" />
                      <span className="font-medium text-sm font-mono">Impact & Collaboration:</span>
                    </div>
                    <p className="text-sm text-bio-400 font-mono mb-2">
                      {project.impact}
                    </p>
                    {project.collaboration && (
                      <p className="text-xs text-terminal-300 font-mono">
                        {project.collaboration}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Research Focus */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-semibold mb-8 text-center gradient-text font-mono">
              <span className="text-primary-400">{'>'}</span> Research Focus
            </h3>
            
            <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <p className="text-terminal-300 text-lg leading-relaxed font-mono text-center">
                  {researchInterests.overview}
                </p>
              </div>

              {/* Current Research */}
              <div className="mb-8">
                <div className="bg-terminal-700/30 border border-terminal-600 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-terminal-100 mb-2 font-mono">
                    <span className="text-primary-400">{'>'}</span> {researchInterests.currentFocus.title}
                  </h4>
                  <p className="text-terminal-300 font-mono mb-4">
                    {researchInterests.currentFocus.description}
                  </p>
                  <ul className="space-y-2">
                    {researchInterests.currentFocus.focus.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-terminal-300 font-mono">
                        <span className="text-primary-400 mr-2 flex-shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Future Interests */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-terminal-100 mb-4 font-mono text-center">
                  <span className="text-accent-400">{'>'}</span> Future Research Interests
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {researchInterests.futureInterests.map((area, index) => (
                    <div key={index} className="bg-terminal-700/30 border border-terminal-600 rounded-xl p-4">
                      <h5 className="text-lg font-bold text-terminal-100 mb-2 font-mono">
                        {area.title}
                      </h5>
                      <p className="text-terminal-300 text-sm font-mono mb-3">
                        {area.description}
                      </p>
                      <ul className="space-y-1">
                        {area.focus.map((item, i) => (
                          <li key={i} className="flex items-start text-xs text-terminal-300 font-mono">
                            <span className="text-accent-400 mr-2 flex-shrink-0">▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Projects */}
              <div>
                <h4 className="text-lg font-semibold text-terminal-100 mb-3 font-mono">
                  <span className="text-primary-400">{'>'}</span> Current Projects:
                </h4>
                <ul className="space-y-2">
                  {researchInterests.currentProjects.map((project, i) => (
                    <li key={i} className="flex items-start text-sm text-terminal-300 font-mono">
                      <span className="text-bio-400 mr-2 flex-shrink-0">▸</span>
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Publications;