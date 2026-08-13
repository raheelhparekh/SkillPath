import React from 'react';
import './CourseCard.css';

export default function CourseCard({ course, currency, ctaText = "Enroll Now", accentColor, showRefundable = true }) {
  // Format price using JavaScript Intl API
  const formatPrice = () => {
    if (currency === "IN") {
      const amount = (course.pricePaise || 0) / 100;
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(amount);
    } else {
      const amount = (course.priceUsdCents || 0) / 100;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    }
  };

  return (
    <div className="course-card" style={{ '--card-hover-border': accentColor }}>
      <div className="course-card-header">
        <span className="course-category-badge" style={{ color: accentColor, borderColor: `${accentColor}30`, background: `${accentColor}10` }}>
          {course.mainCategory || "Catalog"}
        </span>
        {showRefundable && course.refundable && (
          <span className="course-refundable-badge">✓ Refundable</span>
        )}
      </div>

      <div className="course-card-body">
        <h3 className="course-title">{course.courseName}</h3>
        <p className="course-desc" title={course.description}>
          {course.description}
        </p>
      </div>

      <div className="course-card-footer">
        <div className="course-price-container">
          <span className="course-price-label">Price</span>
          <span className="course-price-value">{formatPrice()}</span>
        </div>
        <button 
          className="course-enroll-btn"
          style={{ 
            borderColor: accentColor, 
            color: accentColor 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, var(--accent-violet), ${accentColor || 'var(--accent-indigo)'})`;
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = 'transparent';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = accentColor || 'var(--accent-indigo)';
            e.currentTarget.style.borderColor = accentColor || 'rgba(255, 255, 255, 0.1)';
          }}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
