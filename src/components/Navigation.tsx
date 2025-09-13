import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home', shortLabel: 'Home' },
    { href: '#about', label: 'About', shortLabel: 'About' },
    { href: '#publications', label: 'Research & Publications', shortLabel: 'Research' },
    { href: '#projects', label: 'Personal Projects', shortLabel: 'Projects' },
    { href: '#skills', label: 'Skills', shortLabel: 'Skills' },
    { href: '#contact', label: 'Contact', shortLabel: 'Contact' },
    { href: '#resume', label: 'CV', shortLabel: 'CV', isResume: true }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      // Use a more robust scroll method that doesn't get interrupted
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80; // Account for fixed nav height
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-terminal-900/90 backdrop-blur-md border-b border-primary-500/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-center py-2 md:py-4">
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`font-mono transition-colours duration-200 relative group ${
                  item.isResume 
                    ? 'text-red-400 hover:text-red-300' 
                    : 'text-terminal-300 hover:text-primary-400'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                  item.isResume ? 'text-red-300' : 'text-primary-400'
                }`}>{'>'}</span>
                <span className="ml-1">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tablet Navigation - Shorter Labels */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`font-mono transition-colours duration-200 relative group text-sm ${
                  item.isResume 
                    ? 'text-red-400 hover:text-red-300' 
                    : 'text-terminal-300 hover:text-primary-400'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                  item.isResume ? 'text-red-300' : 'text-primary-400'
                }`}>{'>'}</span>
                <span className="ml-1">{item.shortLabel}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-4 top-2">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg hover:bg-terminal-800 transition-colours duration-200"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-terminal-300" />
              ) : (
                <Menu className="w-5 h-5 text-terminal-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-terminal-800/95 backdrop-blur-md border-t border-primary-500/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left px-4 py-2.5 font-mono transition-colours duration-200 text-sm ${
                      item.isResume 
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' 
                        : 'text-terminal-300 hover:text-primary-400 hover:bg-terminal-700'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={`mr-2 ${item.isResume ? 'text-red-300' : 'text-primary-400'}`}>{'>'}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;