import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer-section" className="footer-section">
      <div className="container footer-container">
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Contact Support</a>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Skillpath. All rights reserved. Made for developer showcase.
        </p>
      </div>
    </footer>
  );
}
