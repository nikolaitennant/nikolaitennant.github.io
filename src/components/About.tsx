import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, MapPin, Users, Calendar } from 'lucide-react';
import { personalInfo, experience, education } from '../data/portfolio';

const About: React.FC = () => {
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
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate about bridging the gap between cutting-edge research and practical applications
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Bio Section */}
            <motion.div variants={fadeInVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                My Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {personalInfo.bio}
              </p>
              
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-primary-600 mr-2" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Citizenship</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{personalInfo.citizenship}</p>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                <span>Currently based in {personalInfo.location}</span>
              </div>
            </motion.div>

            {/* Stats/Highlights */}
            <motion.div variants={fadeInVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Key Highlights
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.0</div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">MSc GPA</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">2nd</div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Hackathon Place</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">2+</div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Publications</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">£620k+</div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Value Driven</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div variants={fadeInVariants} className="mb-16">
            <h3 className="text-3xl font-semibold text-center mb-12 gradient-text">
              Professional Experience
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-accent-400"></div>
              
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInVariants}
                    className="relative flex items-start"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                    
                    {/* Content */}
                    <div className="ml-20 bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 card-hover">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {exp.title}
                          </h4>
                          <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium mb-2">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex flex-col lg:text-right text-gray-500 dark:text-gray-400">
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
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
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
            <h3 className="text-3xl font-semibold text-center mb-12 gradient-text">
              Education
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={fadeInVariants}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium mb-2">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {edu.school}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {edu.location} • {edu.period}
                      </div>
                    </div>
                    {edu.gpa && (
                      <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        <span className="text-green-700 dark:text-green-300 font-semibold">
                          GPA: {edu.gpa}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {edu.relevant && (
                    <div>
                      <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Relevant Coursework:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevant.map((course) => (
                          <span
                            key={course}
                            className="px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded text-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {edu.achievements && (
                    <div className="mt-4">
                      <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Achievements:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.slice(0, 6).map((achievement) => (
                          <span
                            key={achievement}
                            className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-sm"
                          >
                            {achievement}
                          </span>
                        ))}
                        {edu.achievements.length > 6 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm">
                            +{edu.achievements.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;