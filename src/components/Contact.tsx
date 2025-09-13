import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { personalInfo } from '../data/portfolio';

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

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xeoldnvk");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.03 });

  if (state.succeeded) {
    return (
      <section id="contact" className="section-padding bg-terminal-900 relative overflow-hidden" ref={ref}>
        <div className="container-custom">
          <div className="text-center py-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-green-400 mb-4 font-mono">Message Sent!</h2>
              <p className="text-xl text-terminal-300 font-mono">Thanks for reaching out. I'll get back to you soon.</p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
  
  // Terminal commands with scroll trigger
  const pingCommand = useScrollTriggeredTypewriter("$ ping nikolai@contact.net", 80, 500);
  const establishingCommand = useScrollTriggeredTypewriter("# Establishing connection...", 70, 500 + (pingCommand.displayedText.length > 0 ? 27 * 80 + 800 : 0));
  const responseCommand = useScrollTriggeredTypewriter("# Response time: <24hrs", 70, 500 + (pingCommand.displayedText.length > 0 ? 27 * 80 + 1600 : 0));

  useEffect(() => {
    if (isInView) {
      pingCommand.startTyping();
      setTimeout(() => establishingCommand.startTyping(), 500 + 27 * 80 + 800);
      setTimeout(() => responseCommand.startTyping(), 500 + 27 * 80 + 1600);
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


  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      colour: 'from-green-500 to-green-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      colour: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: null,
      colour: 'from-purple-500 to-purple-600'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@nikolaitennant',
      href: personalInfo.github,
      colour: 'from-gray-600 to-gray-700'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'nikolai-tennant',
      href: personalInfo.linkedin,
      colour: 'from-blue-600 to-blue-700'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-terminal-900 relative overflow-hidden" ref={ref}>
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/5 w-3 h-3 bg-primary-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '0s'}}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-bio-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '1s'}}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-accent-400 rounded-full float-animation pulse-glow" 
            style={{animationDelay: '2s'}}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
          ></motion.div>
        </motion.div>

        {/* Connection lines */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 3, delay: 1 }}
        >
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <motion.path
              d="M200,300 Q600,100 1000,400"
              stroke="rgba(34, 197, 94, 0.8)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.5 }}
            />
            <motion.path
              d="M100,600 Q500,200 900,500"
              stroke="rgba(239, 68, 68, 0.7)"
              strokeWidth="1.5"
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
      <div className="absolute top-8 left-8 text-primary-400 font-mono text-sm opacity-40 space-y-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="w-3 h-3 rounded-full bg-bio-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
        </div>
        <div>
          {pingCommand.displayedText}
        </div>
        <div className="text-xs text-accent-400 mt-1">
          {establishingCommand.displayedText}
        </div>
        <div className="text-xs text-bio-400 mt-1">
          {responseCommand.displayedText}
        </div>
      </div>
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.03 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 font-mono">
              <span className="text-primary-400">{'>'}</span> <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-lg sm:text-xl text-terminal-300 max-w-3xl mx-auto font-mono px-4">
              Available to discuss professional opportunities and technical projects.
            </p>
          </motion.div>

          {/* Two Column Layout: Contact Info + Form */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
              {/* Contact Methods */}
              <div className="space-y-3 md:space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.label}
                      variants={itemVariants}
                      className="group"
                    >
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-center p-3 md:p-4 bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl hover:bg-terminal-700 hover:border-primary-500/50 transition-all duration-300 group-hover:shadow-lg"
                        >
                          <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-r ${method.colour} text-white mr-3 md:mr-4`}>
                            <Icon className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-terminal-100 group-hover:text-primary-400 transition-colours font-mono">
                              {method.label}
                            </h4>
                            <p className="text-terminal-300 text-sm font-mono">
                              {method.value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center p-3 md:p-4 bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-xl">
                          <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-r ${method.colour} text-white mr-3 md:mr-4`}>
                            <Icon className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-terminal-100 font-mono">
                              {method.label}
                            </h4>
                            <p className="text-terminal-300 text-sm font-mono">
                              {method.value}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Response Time */}
              <motion.div 
                variants={itemVariants}
                className="bg-terminal-800/50 backdrop-blur-sm border border-accent-500/30 rounded-xl p-4 md:p-6"
              >
                <h4 className="font-semibold text-terminal-100 mb-2 font-mono text-sm md:text-base">
                  <span className="text-accent-400">{'>'}</span> Response Time
                </h4>
                <p className="text-terminal-300 text-xs md:text-sm font-mono">
                  I typically respond to messages within 24-48 hours. For urgent matters, 
                  feel free to reach out via phone or LinkedIn.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-terminal-800/50 backdrop-blur-sm border border-primary-500/30 rounded-2xl p-4 md:p-6 lg:p-8 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-semibold text-terminal-100 mb-4 md:mb-6 font-mono">
                  <span className="text-primary-400">{'>'}</span> Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs md:text-sm font-medium text-terminal-100 mb-1 md:mb-2 font-mono">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-terminal-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-400 bg-terminal-700 text-terminal-100 font-mono transition-colours text-sm md:text-base"
                        placeholder="Your Name"
                      />
                      <ValidationError 
                        prefix="Name" 
                        field="name"
                        errors={state.errors}
                        className="text-red-400 text-xs mt-1 font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs md:text-sm font-medium text-terminal-100 mb-1 md:mb-2 font-mono">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-terminal-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-400 bg-terminal-700 text-terminal-100 font-mono transition-colours text-sm md:text-base"
                        placeholder="your@email.com"
                      />
                      <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                        className="text-red-400 text-xs mt-1 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs md:text-sm font-medium text-terminal-100 mb-1 md:mb-2 font-mono">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      autoComplete="off"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-terminal-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-400 bg-terminal-700 text-terminal-100 font-mono transition-colours text-sm md:text-base"
                      placeholder="What's this about?"
                    />
                    <ValidationError 
                      prefix="Subject" 
                      field="subject"
                      errors={state.errors}
                      className="text-red-400 text-xs mt-1 font-mono"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label htmlFor="message" className="block text-xs md:text-sm font-medium text-terminal-100 mb-1 md:mb-2 font-mono">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      autoComplete="off"
                      className="w-full flex-1 px-3 md:px-4 py-2 md:py-3 border border-terminal-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-400 bg-terminal-700 text-terminal-100 font-mono transition-colours resize-none text-sm md:text-base"
                      placeholder="Tell me about your project, collaboration idea, or just say hello..."
                    />
                    <ValidationError 
                      prefix="Message" 
                      field="message"
                      errors={state.errors}
                      className="text-red-400 text-xs mt-1 font-mono"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 font-mono text-sm md:text-base bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed"
                    whileHover={!state.submitting ? { scale: 1.02, y: -2 } : undefined}
                    whileTap={!state.submitting ? { scale: 0.98 } : undefined}
                  >
                    {state.submitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;