import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Award, Calendar, Users, Zap, ChevronRight } from 'lucide-react';
import { projects } from '../data/portfolio';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'Research', 'Deep Learning', 'Machine Learning'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
    <section id="projects" className="section-padding bg-white dark:bg-gray-800">
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
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Research and development projects applying machine learning to biological and business problems
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600'
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
              className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  layout
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                >
                  <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                    {/* Project Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* Category Badge */}
                        <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          project.category === 'Machine Learning' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : project.category === 'Research'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        }`}>
                          {project.category}
                        </span>
                      </div>

                      {/* Special Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.achievement && (
                          <div className="flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
                            <Award className="w-4 h-4 mr-1" />
                            {project.achievement}
                          </div>
                        )}
                        {project.publications && (
                          <div className="flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                            <Users className="w-4 h-4 mr-1" />
                            Published
                          </div>
                        )}
                        {project.collaboration && (
                          <div className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                            <Users className="w-4 h-4 mr-1" />
                            Collaboration
                          </div>
                        )}
                      </div>

                      {/* Tech Stack Preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded text-xs">
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
                              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">Code</span>
                            </a>
                          )}
                          {project.timeline && (
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {project.timeline}
                            </div>
                          )}
                        </div>

                        <button className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                          <span className="text-sm font-medium mr-1">
                            {selectedProject === index ? 'Less' : 'More'}
                          </span>
                          <ChevronRight 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              selectedProject === index ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {selectedProject === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-600">
                            {/* Long Description */}
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Project Details:
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {project.longDescription}
                              </p>
                            </div>

                            {/* Features */}
                            {project.features && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  Key Features:
                                </h4>
                                <ul className="space-y-1">
                                  {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                      <Zap className="w-3 h-3 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Impact */}
                            {project.impact && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  Impact:
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {project.impact}
                                </p>
                              </div>
                            )}

                            {/* All Technologies */}
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Technologies Used:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Publication Status */}
                            {project.publications && (
                              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                                <div className="flex items-center text-green-700 dark:text-green-300">
                                  <Award className="w-4 h-4 mr-2" />
                                  <span className="font-medium text-sm">Publication Status:</span>
                                </div>
                                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
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
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">
                Technical Discussions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Open to discussing technical approaches, methodologies, and potential applications of machine learning in research and industry.
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">Get In Touch</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;