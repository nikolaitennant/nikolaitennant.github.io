import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = personalInfo.subtitle;
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [fullText]);

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

  const backgroundVariants = {
    animate: {
      background: [
        "radial-gradient(circle at 20% 80%, rgba(29, 78, 216, 0.1) 0%, transparent 50%)",
        "radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)",
        "radial-gradient(circle at 40% 40%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)"
      ],
      transition: {
        duration: 10,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-indigo-900/10">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-50"
        variants={backgroundVariants}
        animate="animate"
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Nikolai</span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">Tennant</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {personalInfo.title}
            </h2>
          </motion.div>

          {/* Animated Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 h-8">
              {displayedText}
              <span className="animate-pulse">|</span>
            </p>
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
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary-600" />
            </motion.a>
            
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
            </motion.a>
            
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-green-600" />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-semibold rounded-full hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 dark:hover:bg-primary-900/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;