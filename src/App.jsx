import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseGrid from './components/CourseGrid';
import Footer from './components/Footer';
import DesignerPanel from './components/DesignerPanel';

function App() {
  const [customProps, setCustomProps] = useState({
    accentColor: '#6366f1',
    ctaText: 'Enroll Now',
    showRefundable: true,
    fallbackCurrency: 'US'
  });

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Hero ctaText={customProps.ctaText} accentColor={customProps.accentColor} />
        <CourseGrid 
          ctaText={customProps.ctaText} 
          showRefundable={customProps.showRefundable} 
          fallbackCurrency={customProps.fallbackCurrency} 
          accentColor={customProps.accentColor} 
        />
      </main>
      <Footer />
      <DesignerPanel customProps={customProps} onChange={setCustomProps} />
    </div>
  );
}

export default App;
