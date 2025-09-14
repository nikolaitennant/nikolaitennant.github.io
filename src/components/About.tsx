import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Award, MapPin, Users, Calendar } from 'lucide-react';
import { personalInfo, experience, education, personalInterests } from '../data/portfolio';

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

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.03 });
  const [expandedEducation, setExpandedEducation] = useState<number | null>(null);
  
  // Terminal commands with scroll trigger
  const grepCommand = useScrollTriggeredTypewriter("$ grep -i \"background\" profile.json", 80, 500);
  const executingCommand = useScrollTriggeredTypewriter("# Executing query...", 70, 500 + (grepCommand.displayedText.length > 0 ? 32 * 80 + 800 : 0));

  useEffect(() => {
    if (isInView) {
      grepCommand.startTyping();
      setTimeout(() => executingCommand.startTyping(), 500 + 32 * 80 + 800);
    }
  }, [isInView]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const achievementVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-slate-900/40 via-slate-900/40 to-gray-900/30 relative overflow-hidden" ref={ref}>
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric patterns */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3 }}
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-bio-500/20 to-accent-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-primary-500/20 to-bio-500/20 rounded-full blur-lg"></div>
        </motion.div>

        {/* Floating particles */}
        <motion.div 
          className="absolute inset-0 opacity-25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.25 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.div 
            className="absolute top-1/3 right-1/5 w-2 h-2 bg-bio-400 rounded-full float-animation" 
            style={{animationDelay: '0.5s'}}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-400 rounded-full float-animation" 
            style={{animationDelay: '1.5s'}}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/2 left-1/4 w-2.5 h-2.5 bg-accent-400 rounded-full float-animation" 
            style={{animationDelay: '2.5s'}}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.4 }}
          ></motion.div>
        </motion.div>

        {/* Connection lines */}
        <motion.div 
          className="absolute inset-0 opacity-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          transition={{ duration: 3, delay: 1 }}
        >
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <motion.path
              d="M300,200 Q700,100 900,300"
              stroke="rgba(34, 197, 94, 0.5)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.5 }}
            />
            <motion.path
              d="M100,500 Q500,300 800,600"
              stroke="rgba(239, 68, 68, 0.4)"
              strokeWidth="0.8"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 2 }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Terminal Command Header */}
      <div className="absolute top-16 left-3 md:top-8 md:left-8 text-primary-400 font-mono text-xs md:text-sm opacity-40 space-y-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="w-3 h-3 rounded-full bg-bio-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
        </div>
        <div>
          {grepCommand.displayedText}
        </div>
        <div className="text-xs text-accent-400 mt-1">
          {executingCommand.displayedText}
        </div>
      </div>
      
      {/* DNA Pattern Overlay */}
      <div className="absolute bottom-8 right-8 text-bio-400 font-mono text-xs opacity-15">
        <div className="text-primary-400 mb-1"># Gene Expression: ACTIVE</div>
        <div>BRCA1, TP53, APOE4...</div>
      </div>
      
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.03 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInVariants} className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-mono">
              <span className="text-primary-400">{'>'}</span> <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-base md:text-lg text-terminal-300 max-w-3xl mx-auto font-mono px-2">
              Background in data science and computational biology with experience in both research and industry applications
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Bio Section */}
            <motion.div variants={fadeInVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-terminal-100 mb-4 font-mono">
                <span className="text-primary-400">$</span> cat profile.md
              </h3>
              <p className="text-terminal-300 leading-relaxed text-lg font-mono">
                {personalInfo.bio}
              </p>
              
              <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl p-6 hover:border-primary-500/50 transition-colours">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-primary-400 mr-2" />
                  <span className="font-semibold text-terminal-100 font-mono">Citizenship</span>
                </div>
                <p className="text-terminal-300 font-mono">{personalInfo.citizenship}</p>
              </div>

              <div className="flex items-center text-terminal-300 font-mono">
                <MapPin className="w-5 h-5 mr-2 text-primary-400" />
                <span>Currently based in {personalInfo.location}</span>
              </div>
            </motion.div>

            {/* Stats/Highlights */}
            <motion.div variants={fadeInVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-terminal-100 mb-4 font-mono">
                <span className="text-primary-400">$</span> ls -la achievements/
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl p-6 text-center hover:border-primary-500/50 transition-colours">
                  <div className="text-3xl font-bold text-primary-400 mb-2 font-mono">4.0</div>
                  <div className="text-sm font-medium text-terminal-300 font-mono">MSc GPA</div>
                </div>
                
                <div className="bg-terminal-800/50 backdrop-blur-sm border border-bio-500/30 rounded-xl p-6 text-center hover:border-bio-500/50 transition-colours">
                  <div className="text-3xl font-bold text-bio-400 mb-2 font-mono">2nd</div>
                  <div className="text-sm font-medium text-terminal-300 font-mono">Hackathon Place</div>
                </div>
                
                <div className="bg-terminal-800/50 backdrop-blur-sm border border-accent-500/30 rounded-xl p-6 text-center hover:border-accent-500/50 transition-colours">
                  <div className="text-3xl font-bold text-accent-400 mb-2 font-mono">1</div>
                  <div className="text-sm font-medium text-terminal-300 font-mono">Publication</div>
                </div>
                
                <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl p-6 text-center hover:border-primary-500/50 transition-colours">
                  <div className="text-3xl font-bold text-primary-400 mb-2 font-mono">2+</div>
                  <div className="text-sm font-medium text-terminal-300 font-mono">Years Industry Experience</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div variants={fadeInVariants} className="mb-16">
            <h3 className="text-3xl font-semibold text-center mb-12 gradient-text font-mono">
              <span className="text-primary-400">$</span> cat work_history.log
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-bio-400"></div>
              
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInVariants}
                    className="relative flex items-start"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-terminal-900 shadow-lg animate-pulse"></div>
                    
                    {/* Content */}
                    <div className="ml-20 bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-terminal-100 mb-1 font-mono">
                            <span className="text-primary-400">{'>'}</span> {exp.title}
                          </h4>
                          <div className="flex items-center text-bio-400 font-medium mb-2 font-mono">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex flex-col lg:text-right text-terminal-400 font-mono">
                          <div className="flex items-center lg:justify-end mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period}
                          </div>
                          <div className="flex items-center lg:justify-end">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-terminal-300 mb-4 leading-relaxed font-mono">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-terminal-700/50 border border-bio-500/30 text-bio-400 rounded text-sm font-medium font-mono hover:border-bio-500/50 transition-colours"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={fadeInVariants}>
            <h3 className="text-3xl font-semibold text-center mb-12 gradient-text font-mono">
              <span className="text-primary-400">$</span> cat education.json
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={fadeInVariants}
                  className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
                  onHoverStart={() => edu.achievements && edu.achievements.length > 6 && setExpandedEducation(index)}
                  onHoverEnd={() => setExpandedEducation(null)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-terminal-200 mb-2 font-mono">
                        <span className="text-primary-400">{'>'}</span> {edu.degree}
                      </h4>
                      <div className="flex items-center text-primary-400 font-medium mb-2 font-mono">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {edu.school}
                      </div>
                      <div className="flex items-center text-terminal-300 font-mono">
                        <MapPin className="w-4 h-4 mr-1" />
                        {edu.location} • {edu.period}
                      </div>
                    </div>
                    {edu.gpa && (
                      <div className="bg-terminal-700/50 border border-bio-500/30 px-3 py-1 rounded-lg hover:border-bio-500/50 transition-colours">
                        <span className="text-bio-400 font-semibold font-mono">
                          GPA: {edu.gpa}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {edu.relevant && (
                    <div>
                      <h5 className="font-semibold text-terminal-100 mb-2 font-mono">
                        <span className="text-accent-400">$</span> ls coursework/
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevant.map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 border border-accent-500/40 text-accent-300 rounded text-sm font-mono hover:border-accent-500/70 hover:text-accent-400 transition-colours bg-transparent"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {edu.achievements && (
                    <div className="mt-4">
                      <h5 className="font-semibold text-terminal-100 mb-2 flex items-center font-mono">
                        <Award className="w-4 h-4 mr-2 text-primary-400" />
                        <span className="text-primary-400">$</span> cat achievements.txt
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.slice(0, 6).map((achievement) => (
                          <span
                            key={achievement}
                            className="px-3 py-1 border border-bio-500/40 text-bio-300 rounded text-sm font-mono hover:border-bio-500/70 hover:text-bio-400 transition-colours bg-transparent"
                          >
                            {achievement}
                          </span>
                        ))}
                        {edu.achievements.length > 6 && (
                          <span className="px-3 py-1 border border-terminal-400/40 text-terminal-400 rounded text-sm font-mono hover:border-terminal-400/70 transition-colours bg-transparent">
                            +{edu.achievements.length - 6} more
                          </span>
                        )}
                      </div>
                      
                      {/* Expanded achievements */}
                      <AnimatePresence>
                        {expandedEducation === index && edu.achievements.length > 6 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="pt-3 border-t border-primary-500/30">
                              <h6 className="text-sm font-semibold text-terminal-300 mb-2 font-mono">
                                <span className="text-primary-400">{'>'}</span> Additional Achievements:
                              </h6>
                              <div className="flex flex-wrap gap-2">
                                {edu.achievements.slice(6).map((achievement, achievementIndex) => (
                                  <motion.span
                                    key={achievement}
                                    variants={achievementVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: achievementIndex * 0.05 }}
                                    className="px-3 py-1 border border-bio-500/40 text-bio-300 rounded text-sm font-mono hover:border-bio-500/70 hover:text-bio-400 transition-colours bg-transparent"
                                  >
                                    {achievement}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personal Interests */}
          <motion.div variants={fadeInVariants} className="mt-16">
            <h3 className="text-3xl font-semibold text-center mb-12 gradient-text font-mono">
              <span className="text-primary-400">$</span> grep -i "interests" profile.json
            </h3>
            
            <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl p-6 max-w-md mx-auto">
              <h4 className="text-lg font-semibold text-terminal-100 mb-4 font-mono text-center">
                <span className="text-bio-400">{'>'}</span> Personal Interests
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {personalInterests.interests.map((interest, index) => (
                  <div key={index} className="flex items-center text-terminal-300 font-mono">
                    <span className="text-primary-400 mr-2 flex-shrink-0">▸</span>
                    <span className="text-sm">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;