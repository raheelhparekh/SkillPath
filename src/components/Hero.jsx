import React from 'react';
import './Hero.css';

export default function Hero({ ctaText = "Explore Courses", accentColor }) {
  const handleScroll = () => {
    const courseSection = document.getElementById('courses-catalog');
    if (courseSection) {
      // Calculate offset for smooth scrolling
      const offset = 70;
      const elementPosition = courseSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero-section" className="hero-section">
      <div className="container hero-container">
        <div className="hero-badge">Next Gen Cohort Learning</div>
        <h1 className="hero-headline">
          Master the Skills <span className="gradient-text">That Matter.</span>
        </h1>
        <p className="hero-subtitle">
          Join cohort-based developer courses taught by top industry leaders. Real projects, live instruction, and a community that supports your growth.
        </p>
        <button 
          className="hero-cta-btn" 
          style={{ background: `linear-gradient(135deg, var(--accent-violet), ${accentColor || 'var(--accent-indigo)'})` }}
          onClick={handleScroll}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}
