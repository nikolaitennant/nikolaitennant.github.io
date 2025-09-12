import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Cloud, Brain, BarChart, Settings } from 'lucide-react';
import { skills } from '../data/portfolio';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      name: "Programming Languages",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      skills: skills["Programming Languages"]
    },
    {
      name: "Data Science & ML",
      icon: Brain,
      color: "from-purple-500 to-purple-600", 
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      skills: skills["Data Science & ML"]
    },
    {
      name: "Tools & Frameworks",
      icon: Settings,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      skills: skills["Tools & Frameworks"]
    },
    {
      name: "Databases",
      icon: Database,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      skills: skills["Databases"]
    },
    {
      name: "Cloud & Platforms",
      icon: Cloud,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20", 
      skills: skills["Cloud & Platforms"]
    },
    {
      name: "Specializations",
      icon: BarChart,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      skills: skills["Specializations"]
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
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Technical Skills</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit spanning data science, machine learning, and software engineering
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
                  className={`${category.bgColor} rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg`}
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
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills Preview (First 4) */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.slice(0, 4).map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 text-center shadow-sm"
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
                        <span className="text-sm text-gray-500 dark:text-gray-400">
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
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                            All Skills:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {category.skills.slice(4).map((skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                variants={skillVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: skillIndex * 0.05 }}
                                className="bg-white dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-300 text-center shadow-sm"
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-center mb-8 gradient-text">
                Core Competencies
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Machine Learning
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Deep expertise in ML algorithms, neural networks, and statistical modeling for complex data problems
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Data Engineering
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Building scalable data pipelines and infrastructure for high-performance analytics systems
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Research & Development
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
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