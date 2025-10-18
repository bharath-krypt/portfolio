import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Element not found:', sectionId);
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bharath Kumar
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="nav-right desktop-nav">
          <motion.ul
            className="nav-links"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
            <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </motion.ul>
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="mobile-nav">
          <ThemeToggle />
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? '0%' : '100%'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links">
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
            <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navigation;
