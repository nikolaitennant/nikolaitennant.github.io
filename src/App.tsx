import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-terminal-900 dark:bg-terminal-900 light:bg-gray-50">
        <Navigation />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Publications />
          <Projects />
          <Skills />
          <Contact />
          <Resume />
        </motion.main>
        
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;