import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Code, Database, Cloud, Brain, BarChart, Settings } from 'lucide-react';
import { skills } from '../data/portfolio';

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

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Terminal commands with scroll trigger
  const lsCommand = useScrollTriggeredTypewriter("$ ls -la /skills/technical/", 80, 500);
  const loadingCommand = useScrollTriggeredTypewriter("# Loading skill profiles...", 70, 500 + (lsCommand.displayedText.length > 0 ? 26 * 80 + 800 : 0));
  const foundCommand = useScrollTriggeredTypewriter("# Found 25+ active modules", 70, 500 + (lsCommand.displayedText.length > 0 ? 26 * 80 + 1600 : 0));

  useEffect(() => {
    if (isInView) {
      lsCommand.startTyping();
      setTimeout(() => loadingCommand.startTyping(), 500 + 26 * 80 + 800);
      setTimeout(() => foundCommand.startTyping(), 500 + 26 * 80 + 1600);
    }
  }, [isInView]);

  const skillCategories = [
    {
      name: "Programming",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      skills: skills["Programming"]
    },
    {
      name: "Deep Learning",
      icon: Brain,
      color: "from-purple-500 to-purple-600", 
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      skills: skills["Deep Learning"]
    },
    {
      name: "Machine Learning",
      icon: Settings,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      skills: skills["Machine Learning"]
    },
    {
      name: "Data Engineering",
      icon: Database,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      skills: skills["Data Engineering"]
    },
    {
      name: "Cloud & Infrastructure",
      icon: Cloud,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20", 
      skills: skills["Cloud & Infrastructure"]
    },
    {
      name: "Specialised Applications",
      icon: BarChart,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      skills: skills["Specialised Applications"]
    }
  ];

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
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const skillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="skills" className="section-padding bg-gradient-to-br from-terminal-900 via-blue-950/30 to-slate-900/25 relative overflow-hidden" ref={ref}>
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric patterns */}
        <motion.div 
          className="absolute inset-0 opacity-15"
          initial={{ opacity: 0, rotate: -10 }}
          whileInView={{ opacity: 0.15, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 4 }}
        >
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-primary-500/20 via-bio-500/15 to-accent-500/20 rounded-3xl blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-tr from-accent-500/20 to-primary-500/15 rounded-2xl blur-xl"></div>
        </motion.div>

        {/* Tech nodes */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.div 
            className="absolute top-1/5 left-1/5 w-3 h-3 bg-blue-400 rounded-full pulse-glow" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          ></motion.div>
          <motion.div 
            className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-purple-400 rounded-full pulse-glow" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-green-400 rounded-full pulse-glow" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/2 right-1/5 w-3.5 h-3.5 bg-orange-400 rounded-full pulse-glow" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.4 }}
          ></motion.div>
        </motion.div>

        {/* Connection network */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, delay: 1 }}
        >
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <motion.path
              d="M240,160 L960,250 M960,250 L400,520 M400,520 L800,380"
              stroke="rgba(56, 189, 248, 0.6)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.8 }}
            />
            <motion.path
              d="M180,400 Q600,200 900,450"
              stroke="rgba(34, 197, 94, 0.5)"
              strokeWidth="1.2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 2.2 }}
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
          {lsCommand.displayedText}
        </div>
        <div className="text-xs text-accent-400 mt-1">
          {loadingCommand.displayedText}
        </div>
        <div className="text-xs text-bio-400 mt-1">
          {foundCommand.displayedText}
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
              <span className="text-primary-400">{'>'}</span> <span className="gradient-text">Technical Skills</span>
            </h2>
            <p className="text-xl text-terminal-300 max-w-3xl mx-auto font-mono">
              Technical skills developed through academic coursework, research projects, and industry experience
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;

              return (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary-500/50"
                  onHoverStart={() => setActiveCategory(category.name)}
                  onHoverEnd={() => setActiveCategory(null)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-terminal-100 font-mono">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills Preview (First 4) */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.slice(0, 4).map((skill: string, skillIndex: number) => (
                        <motion.div
                          key={skill}
                          className="bg-terminal-800/80 border border-terminal-700 px-3 py-2 rounded-lg text-sm font-medium text-terminal-300 text-center shadow-sm font-mono"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.1 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                    
                    {category.skills.length > 4 && (
                      <div className="mt-2 text-center">
                        <span className="text-sm text-terminal-300 font-mono">
                          +{category.skills.length - 4} more
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Skills */}
                  <AnimatePresence>
                    {isActive && category.skills.length > 4 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-primary-500/30">
                          <h4 className="text-sm font-semibold text-terminal-300 mb-3 font-mono">
                            <span className="text-primary-400">{'>'}</span> Additional Skills:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {category.skills.slice(4).map((skill: string, skillIndex: number) => (
                              <motion.div
                                key={skill}
                                variants={skillVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: skillIndex * 0.05 }}
                                className="bg-terminal-800/80 border border-terminal-700 px-2 py-1 rounded text-xs font-medium text-terminal-300 text-center shadow-sm font-mono"
                              >
                                {skill}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-center mb-8 gradient-text font-mono">
                <span className="text-primary-400">{'>'}</span> Core Competencies
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-terminal-100 mb-2 font-mono">
                    Machine Learning
                  </h4>
                  <p className="text-terminal-300 text-sm font-mono">
                    Deep expertise in ML algorithms, neural networks, and statistical modeling for complex data problems
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-terminal-100 mb-2 font-mono">
                    Data Engineering
                  </h4>
                  <p className="text-terminal-300 text-sm font-mono">
                    Building scalable data pipelines and infrastructure for high-performance analytics systems
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-terminal-100 mb-2 font-mono">
                    Research & Development
                  </h4>
                  <p className="text-terminal-300 text-sm font-mono">
                    Translating cutting-edge research into practical solutions for real-world applications
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;