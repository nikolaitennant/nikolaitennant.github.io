import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Users, Calendar, BookOpen, Award } from 'lucide-react';
import { publications, interests } from '../data/portfolio';

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
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Terminal commands with scroll trigger
  const grepCommand = useScrollTriggeredTypewriter('$ grep -r "research" publications/', 80, 500);
  const indexingCommand = useScrollTriggeredTypewriter("# Indexing academic papers...", 70, 500 + (grepCommand.displayedText.length > 0 ? 35 * 80 + 800 : 0));
  const statusCommand = useScrollTriggeredTypewriter("# Status: 1 publication ready", 70, 500 + (grepCommand.displayedText.length > 0 ? 35 * 80 + 1600 : 0));

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
    <section id="publications" className="section-padding bg-gradient-to-br from-terminal-900 via-zinc-900/35 to-slate-900/25 relative overflow-hidden" ref={ref}>
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Academic paper-like patterns */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3.5 }}
        >
          <div className="absolute top-1/5 right-1/5 w-44 h-28 bg-gradient-to-br from-bio-500/15 via-primary-500/20 to-accent-500/15 rounded-xl blur-2xl transform -rotate-6"></div>
          <div className="absolute bottom-1/4 left-1/5 w-32 h-32 bg-gradient-to-tl from-accent-500/20 to-bio-500/15 rounded-3xl blur-lg"></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-40 bg-gradient-to-b from-primary-500/15 to-bio-500/20 rounded-2xl blur-xl transform rotate-12"></div>
        </motion.div>

        {/* Research nodes */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.7 }}
        >
          <motion.div 
            className="absolute top-1/6 left-1/4 w-3.5 h-3.5 bg-bio-400 rounded-full pulse-glow" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1.1 }}
          ></motion.div>
          <motion.div 
            className="absolute top-2/3 right-1/5 w-4 h-4 bg-primary-400 rounded-lg rotate-45 pulse-glow" 
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.3 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/5 left-1/3 w-2.5 h-2.5 bg-accent-400 rounded-full pulse-glow" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.5 }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-bio-500 rounded-sm pulse-glow" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.7 }}
          ></motion.div>
        </motion.div>

        {/* Citation network connections */}
        <motion.div 
          className="absolute inset-0 opacity-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          transition={{ duration: 3, delay: 1.8 }}
        >
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <motion.path
              d="M300,130 Q500,250 700,150 Q900,50 1100,200"
              stroke="rgba(34, 197, 94, 0.6)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3,3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, delay: 2.2 }}
            />
            <motion.path
              d="M100,400 L300,350 L500,450 L800,350 L1000,500"
              stroke="rgba(239, 68, 68, 0.5)"
              strokeWidth="1.2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, delay: 2.5 }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Terminal Command Header */}
      <div className="absolute top-8 left-8 text-primary-400 font-mono text-sm opacity-40 space-y-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="w-3 h-3 rounded-full bg-bio-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
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
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-primary-400">{'>'}</span> <span className="gradient-text">Research & Publications</span>
            </h2>
            <p className="text-xl text-terminal-300 max-w-3xl mx-auto font-mono">
              Research contributions in computational biology and data science applications
            </p>
          </motion.div>

          {/* Publications */}
          <div className="mb-16">
            <motion.h3 
              variants={itemVariants} 
              className="text-3xl font-semibold mb-8 text-center gradient-text font-mono"
            >
              <span className="text-primary-400">{'>'}</span> Recent Publications
            </motion.h3>

            <div className="space-y-6">
              {publications.map((publication, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl shadow-lg p-6 card-hover hover:border-primary-500/50"
                >
                  <div className="flex items-start space-x-4">
                    {/* Publication Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
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
                      <p className="text-terminal-300 mb-4 leading-relaxed font-mono">
                        {publication.description}
                      </p>

                      {/* Preprint Link */}
                      {publication.preprint && (
                        <div className="mb-4">
                          <a
                            href={publication.preprint}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-bio-400 hover:text-bio-300 transition-colors font-mono bg-terminal-700/30 border border-bio-500/30 rounded-lg px-4 py-2 text-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Preprint
                          </a>
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
          </div>

          {/* Research Areas */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-semibold mb-8 text-center gradient-text font-mono">
              <span className="text-primary-400">{'>'}</span> Research Interests
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl shadow-lg p-6 card-hover hover:border-primary-500/50">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-terminal-100 mb-2 font-mono">
                  Computational Biology
                </h4>
                <p className="text-terminal-300 text-sm font-mono">
                  Developing computational methods to understand biological processes, particularly in ageing and genomics
                </p>
              </div>

              <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl shadow-lg p-6 card-hover hover:border-primary-500/50">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-terminal-100 mb-2 font-mono">
                  Machine Learning in Biology
                </h4>
                <p className="text-terminal-300 text-sm font-mono">
                  Applying deep learning and AI techniques to solve complex biological and medical problems
                </p>
              </div>

              <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl shadow-lg p-6 card-hover hover:border-primary-500/50">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-terminal-100 mb-2 font-mono">
                  Ageing & Longevity
                </h4>
                <p className="text-terminal-300 text-sm font-mono">
                  Investigating the molecular mechanisms of ageing and developing predictive models for healthspan
                </p>
              </div>
            </div>
          </motion.div>

          {/* Personal Interests */}
          <motion.div variants={itemVariants}>
            <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-center mb-8 gradient-text font-mono">
                <span className="text-primary-400">{'>'}</span> Beyond Research
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-terminal-100 mb-4 font-mono">
                    Personal Interests
                  </h4>
                  <ul className="space-y-3">
                    {interests.map((interest, index) => (
                      <li key={index} className="flex items-start text-terminal-300">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="font-mono">{interest}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-terminal-100 mb-4 font-mono">
                    Academic Involvement
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="text-terminal-100 font-medium font-mono">
                          IISAGE Initiative
                        </span>
                        <p className="text-terminal-300 text-sm mt-1 font-mono">
                          Multi-institutional collaboration on ageing research across 11 research labs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="text-terminal-100 font-medium font-mono">
                          Brown University Alumni
                        </span>
                        <p className="text-terminal-300 text-sm mt-1 font-mono">
                          Active participant in university research communities and academic networks
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="text-terminal-100 font-medium font-mono">
                          Industry Leadership
                        </span>
                        <p className="text-terminal-300 text-sm mt-1 font-mono">
                          Former President of Ecology Club, Varsity Lacrosse Captain, and leadership roles
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Publications;