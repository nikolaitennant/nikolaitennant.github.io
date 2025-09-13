import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const useTypewriter = (text: string, baseDelay: number = 50, startDelay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      
      const typeNextChar = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          
          // Variable delay to simulate realistic typing
          let currentDelay = baseDelay;
          const currentChar = text[i - 1];
          
          // Longer pause after punctuation
          if (currentChar === ',' || currentChar === '.') {
            currentDelay = baseDelay * 3;
          }
          // Shorter delay for common letters
          else if ('aeiou'.includes(currentChar.toLowerCase())) {
            currentDelay = baseDelay * 0.7;
          }
          // Slight random variation
          currentDelay += (Math.random() - 0.5) * baseDelay * 0.5;
          
          setTimeout(typeNextChar, currentDelay);
        } else {
          setIsTyping(false);
        }
      };
      
      typeNextChar();
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, baseDelay, startDelay]);

  return { displayedText, isTyping };
};

const Hero: React.FC = () => {
  const subtitleTypewriter = useTypewriter(personalInfo.subtitle, 40, 1000);
  
  // Calculate sequential delays
  const terminalCommandText = "~/biocomputing/genome_analysis $";
  const analysisCommandText = "# Analysing DNA_sequences.fasta";
  const foundCommandText = "# Found 23,146 base pairs";
  
  const terminalCommand = useTypewriter(terminalCommandText, 80, 500);
  const analysisCommand = useTypewriter(analysisCommandText, 70, 500 + (terminalCommandText.length * 80) + 500);
  const foundCommand = useTypewriter(foundCommandText, 70, 500 + (terminalCommandText.length * 80) + 500 + (analysisCommandText.length * 70) + 800);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };


  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-terminal-900 via-terminal-900 to-slate-900/40">
      {/* Static Background */}
      <div className="absolute inset-0">
        {/* Main geometric pattern - static, no animation */}
        <div 
          className="absolute inset-0 opacity-15" 
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(239, 68, 68, 0.6) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 90% 90%, rgba(239, 68, 68, 0.5) 0%, transparent 40%),
              radial-gradient(circle at 10% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 30%)
            `
          }}></div>
        
        {/* Flowing lines */}
        <motion.div 
          className="absolute inset-0 opacity-25"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 4, delay: 1 }}
        >
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.9)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.8)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.7)" />
              </linearGradient>
              <linearGradient id="flow2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
                <stop offset="50%" stopColor="rgba(239, 68, 68, 0.7)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.6)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M-100,200 Q300,100 600,300 T1300,200"
              stroke="url(#flow1)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1.5 }}
            />
            <motion.path
              d="M-100,400 Q300,500 600,200 T1300,600"
              stroke="url(#flow2)"
              strokeWidth="2.5"
              fill="none"
              className="animate-pulse"
              style={{animationDelay: '1s'}}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 2 }}
            />
            <motion.path
              d="M-100,600 Q500,300 800,500 T1300,400"
              stroke="url(#flow1)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              style={{animationDelay: '2s'}}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 2.5 }}
            />
          </svg>
        </motion.div>
        
        {/* Floating particles */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 3 }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '0s'}}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3 }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/3 right-1/4 w-2 h-2 bg-bio-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '0.5s'}}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.2 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-accent-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '1s'}}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.4 }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '1.5s'}}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.6 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/4 right-1/2 w-3 h-3 bg-bio-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '2s'}}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.8 }}
          ></motion.div>
          <motion.div 
            className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-accent-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '2.5s'}}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 4 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/2 right-1/4 w-2.5 h-2.5 bg-primary-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '3s'}}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 4.2 }}
          ></motion.div>
        </motion.div>
        
        {/* Neural network connections */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.30, scale: 1 }}
          transition={{ duration: 2.5, delay: 4.5 }}
        >
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <g className="neural-pulse">
              <motion.circle 
                cx="200" cy="150" r="4" fill="rgba(239, 68, 68, 0.9)" className="pulse-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 4.5 }}
              />
              <motion.circle 
                cx="400" cy="100" r="3" fill="rgba(34, 197, 94, 0.8)" className="pulse-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 4.7 }}
              />
              <motion.circle 
                cx="600" cy="200" r="3.5" fill="rgba(56, 189, 248, 0.8)" className="pulse-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 4.9 }}
              />
              <motion.circle 
                cx="800" cy="120" r="3" fill="rgba(239, 68, 68, 0.8)" className="pulse-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 5.1 }}
              />
              <motion.circle 
                cx="300" cy="300" r="3" fill="rgba(34, 197, 94, 0.9)" className="pulse-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 5.3 }}
              />
              <motion.circle 
                cx="700" cy="350" r="2.5" fill="rgba(56, 189, 248, 0.8)" className="pulse-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 5.5 }}
              />
              
              <motion.line 
                x1="200" y1="150" x2="400" y2="100" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="1.2" className="neural-pulse"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 5.7 }}
              />
              <motion.line 
                x1="400" y1="100" x2="600" y2="200" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1.2" className="neural-pulse"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 5.9 }}
              />
              <motion.line 
                x1="600" y1="200" x2="800" y2="120" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.2" className="neural-pulse"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 6.1 }}
              />
              <motion.line 
                x1="300" y1="300" x2="700" y2="350" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1" className="neural-pulse"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 6.3 }}
              />
              <motion.line 
                x1="200" y1="150" x2="300" y2="300" stroke="rgba(34, 197, 94, 0.5)" strokeWidth="1" className="neural-pulse"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 6.5 }}
              />
            </g>
          </svg>
        </motion.div>
      </div>
      
      {/* Bio-Terminal Header */}
      <div className="absolute top-8 left-8 text-primary-400 font-mono text-sm opacity-40 space-y-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 rounded-full bg-bio-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
        <div>
          {terminalCommand.displayedText}
        </div>
        <div className="text-xs opacity-70">
          <span className="text-bio-400">{analysisCommand.displayedText}</span>
        </div>
        <div className="text-xs opacity-70">
          <span className="text-terminal-500">{foundCommand.displayedText}</span>
        </div>
      </div>
      
      {/* DNA-inspired pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <div className="dna-helix w-full h-full"></div>
      </div>
      
      {/* DNA Sequence Easter Egg */}
      <div className="absolute bottom-8 right-8 text-primary-400 font-mono text-xs opacity-20 max-w-xs">
        <div className="text-bio-400 mb-1"># Human Chromosome 1 (sample)</div>
        <div className="break-all leading-tight">
          <span className="text-primary-400">ATCG</span>
          <span className="text-accent-400">TGCA</span>
          <span className="text-bio-400">CGAT</span>
          <span className="text-primary-400">TACG</span>
          <span className="text-accent-400">GCTA</span>
          <span className="text-bio-400">ATGC</span>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name and Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-futuristic tracking-wider">
              <span className="gradient-text">NIKOLAI</span>
              <br />
              <span className="text-terminal-100">TENNANT</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-semibold text-terminal-300 mb-4 font-display">
              <span className="text-bio-400">[</span>
              {personalInfo.title}
              <span className="text-bio-400">]</span>
            </h2>
          </motion.div>

          {/* Animated Subtitle */}
          <motion.div variants={itemVariants}>
            <div 
              className="text-xl md:text-2xl text-terminal-300 mb-8 min-h-8 font-mono select-none relative" 
              style={{
                caretColor: 'transparent', 
                userSelect: 'none', 
                cursor: 'default',
                outline: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
              tabIndex={-1}
            >
              <span className="text-primary-400">{'>'}</span> {subtitleTypewriter.displayedText}
              <span 
                className="inline-block ml-1 text-terminal-100" 
                style={{
                  animation: subtitleTypewriter.isTyping 
                    ? 'none' 
                    : 'blink 1s infinite'
                }}
              >|</span>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center mb-8 text-gray-600 dark:text-gray-400"
          >
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">{personalInfo.location}</span>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center space-x-6 mb-12"
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="tooltip p-3 bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-lg shadow-lg hover:shadow-xl hover:border-primary-500/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6 text-terminal-300 group-hover:text-primary-400" />
              <span className="tooltip-content">GitHub</span>
            </motion.a>
            
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="tooltip p-3 bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-lg shadow-lg hover:shadow-xl hover:border-primary-500/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-6 h-6 text-terminal-300 group-hover:text-primary-400" />
              <span className="tooltip-content">LinkedIn</span>
            </motion.a>
            
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="tooltip p-3 bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-lg shadow-lg hover:shadow-xl hover:border-primary-500/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-6 h-6 text-terminal-300 group-hover:text-primary-400" />
              <span className="tooltip-content">Email</span>
            </motion.a>
            
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 justify-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white font-semibold font-mono rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-500/50 flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-terminal-200 mr-2">{'>'}</span>View My Work
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-terminal-800/50 backdrop-blur-sm border-2 border-primary-500 text-primary-400 font-semibold font-mono rounded-lg hover:bg-terminal-700/70 hover:border-primary-400 transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary-300 mr-2">{'>'}</span>Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.button 
          className="p-2 rounded-full hover:bg-terminal-800/50 transition-colours cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => {
          const aboutSection = document.querySelector('#about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-6 h-6 text-primary-400 opacity-70" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;