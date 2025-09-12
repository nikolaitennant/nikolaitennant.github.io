import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';

const Resume: React.FC = () => {
  const [showPDF, setShowPDF] = useState(false);

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
    <section id="resume" className="section-padding bg-gradient-to-br from-terminal-900 via-red-950/25 to-gray-900/20 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono text-red-400">
              <span className="text-red-500">{'>'}</span> Resume
            </h2>
            <p className="text-xl text-terminal-300 max-w-3xl mx-auto font-mono mb-8">
              Complete professional overview - research engineer and computational biologist
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Show PDF Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPDF(!showPDF)}
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 font-mono border border-red-500"
              >
                {showPDF ? <ChevronUp className="w-5 h-5 mr-2" /> : <ChevronDown className="w-5 h-5 mr-2" />}
                {showPDF ? 'Hide Resume' : 'Show Resume'}
              </motion.button>

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 font-mono border border-red-500"
                onClick={() => {
                  const element = document.createElement('a');
                  element.href = '/resume.pdf';
                  element.download = 'Nikolai_Tennant_CV.pdf';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </motion.button>
            </div>
          </motion.div>

          {/* PDF Display */}
          {showPDF && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="max-w-4xl mx-auto">
                <iframe
                  src="/resume.pdf"
                  width="100%"
                  height="800px"
                  className="border border-red-500/30 rounded-lg shadow-2xl"
                  title="Resume PDF"
                />
                <p className="text-center text-terminal-400 font-mono text-sm mt-4">
                  Updated September 12, 2025
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;