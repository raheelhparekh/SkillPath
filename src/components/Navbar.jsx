import React from 'react';
import './Navbar.css';

export default function Navbar() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // Matches navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Skill<span className="navbar-logo-accent">path</span>
        </div>
        <div className="navbar-links">
          <button className="navbar-link-btn" onClick={() => handleScroll('hero-section')}>Hero</button>
          <button className="navbar-link-btn" onClick={() => handleScroll('courses-catalog')}>Courses</button>
          <button className="navbar-link-btn" onClick={() => handleScroll('footer-section')}>Footer</button>
        </div>
      </div>
    </nav>
  );
}
