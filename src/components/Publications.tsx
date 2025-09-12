import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Users, Calendar, BookOpen, Award } from 'lucide-react';
import { publications, interests } from '../data/portfolio';

const Publications: React.FC = () => {
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
    <section id="publications" className="section-padding bg-gray-50 dark:bg-gray-900">
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
              <span className="gradient-text">Research & Publications</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Contributing to the scientific community through innovative research in computational biology and data science
            </p>
          </motion.div>

          {/* Publications */}
          <div className="mb-16">
            <motion.h3 
              variants={itemVariants} 
              className="text-3xl font-semibold mb-8 text-center gradient-text"
            >
              Recent Publications
            </motion.h3>

            <div className="space-y-6">
              {publications.map((publication, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover"
                >
                  <div className="flex items-start space-x-4">
                    {/* Publication Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>

                    {/* Publication Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 pr-4">
                          {publication.title}
                        </h4>
                        
                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                          publication.status.includes('accepted') 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          {publication.status.includes('accepted') ? 'Accepted' : 'In Review'}
                        </span>
                      </div>

                      {/* Authors */}
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">{publication.authors}</span>
                      </div>

                      {/* Journal */}
                      <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium mb-3">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span className="text-sm">{publication.journal}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {publication.description}
                      </p>

                      {/* Status Details */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="font-medium text-sm">Status:</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
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
            <h3 className="text-3xl font-semibold mb-8 text-center gradient-text">
              Research Interests
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Computational Biology
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Developing computational methods to understand biological processes, particularly in aging and genomics
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Machine Learning in Biology
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Applying deep learning and AI techniques to solve complex biological and medical problems
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Aging & Longevity
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Investigating the molecular mechanisms of aging and developing predictive models for healthspan
                </p>
              </div>
            </div>
          </motion.div>

          {/* Personal Interests */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-center mb-8 gradient-text">
                Beyond Research
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Personal Interests
                  </h4>
                  <ul className="space-y-3">
                    {interests.map((interest, index) => (
                      <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Academic Involvement
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          IISAGE Initiative
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          Multi-institutional collaboration on aging research across 11 research labs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          Brown University Alumni
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          Active participant in university research communities and academic networks
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          Industry Leadership
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          Former President of Ecology Club, Varsity Lacrosse Captain, and leadership roles
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">
                Research Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Interested in collaborative research opportunities, academic partnerships, or discussing innovative approaches to computational biology? 
                I'm always open to exploring new research directions.
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">Discuss Research</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;