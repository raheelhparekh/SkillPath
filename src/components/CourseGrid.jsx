import React, { useState, useEffect, useCallback } from 'react';
import { fetchCourses, fetchCountryCode } from '../api/courseApi';
import CourseCard from './CourseCard';
import SkeletonCard from './SkeletonCard';
import './CourseGrid.css';

export default function CourseGrid({ ctaText = "Enroll Now", showRefundable = true, fallbackCurrency = "US", accentColor }) {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState(null);

  const [country, setCountry] = useState(null);
  const [loadingCountry, setLoadingCountry] = useState(true);
  const [countryError, setCountryError] = useState(false);

  const [manualCurrency, setManualCurrency] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default'); // 'default' | 'price-asc' | 'price-desc'

  const loadData = useCallback(() => {
    setLoadingCourses(true);
    setCoursesError(null);
    setLoadingCountry(true);
    setCountryError(false);

    // Parallel fetch
    fetchCourses()
      .then((data) => {
        setCourses(data);
        setLoadingCourses(false);
      })
      .catch((err) => {
        setCoursesError(err.message || 'Failed to load courses.');
        setLoadingCourses(false);
      });

    fetchCountryCode()
      .then((code) => {
        setCountry(code);
        setLoadingCountry(false);
      })
      .catch(() => {
        setCountryError(true);
        setLoadingCountry(false);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const resolvedCurrency = manualCurrency || country || fallbackCurrency;

  // Filter and sort computation
  const filteredAndSorted = courses
    .filter((course) => {
      const term = searchQuery.toLowerCase();
      return (
        course.courseName.toLowerCase().includes(term) ||
        (course.mainCategory && course.mainCategory.toLowerCase().includes(term)) ||
        (course.description && course.description.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => {
      const getPrice = (item) => {
        return resolvedCurrency === 'IN' ? (item.pricePaise || 0) : (item.priceUsdCents || 0);
      };

      if (sortOrder === 'price-asc') {
        return getPrice(a) - getPrice(b);
      }
      if (sortOrder === 'price-desc') {
        return getPrice(b) - getPrice(a);
      }
      return 0;
    });

  return (
    <section id="courses-catalog" className="catalog-section">
      <div className="container">
        
        {/* Graceful Degradation Warning */}
        {countryError && !loadingCourses && (
          <div className="location-warning-banner">
            <span className="warning-icon">🌐</span>
            <div className="warning-text">
              <strong>Location services offline:</strong> Displaying fallback USD pricing. You can manually adjust the currency toggle.
            </div>
          </div>
        )}

        <div className="catalog-header">
          <div className="catalog-title-block">
            <h2 className="catalog-section-title">Explore Catalog</h2>
            <p className="catalog-section-subtitle">Find the perfect course to take your engineering skills to the next level.</p>
          </div>

          {/* Controls Bar: Currency switcher */}
          {(!loadingCountry || countryError) && !loadingCourses && courses.length > 0 && (
            <div className="currency-toggle-wrapper">
              <span className="toggle-label">Currency</span>
              <div className="currency-toggle">
                <button
                  className={`toggle-btn ${resolvedCurrency === 'US' ? 'active' : ''}`}
                  onClick={() => setManualCurrency('US')}
                >
                  USD ($)
                </button>
                <button
                  className={`toggle-btn ${resolvedCurrency === 'IN' ? 'active' : ''}`}
                  onClick={() => setManualCurrency('IN')}
                >
                  INR (₹)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search and Sort Filter Controls */}
        {!coursesError && !loadingCourses && courses.length > 0 && (
          <div className="filter-controls-row">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by title, description or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>

            <div className="sort-select-wrapper">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        {/* Course Grid Render States */}
        {loadingCourses ? (
          <div className="courses-responsive-grid">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : coursesError ? (
          <div className="catalog-error-card">
            <div className="error-icon">⚠️</div>
            <h3>Failed to Load Courses</h3>
            <p>{coursesError}</p>
            <button className="error-retry-btn" onClick={loadData}>
              Try Again
            </button>
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="catalog-empty-card">
            <h3>No Courses Found</h3>
            {searchQuery ? (
              <p>We couldn't find any courses matching "{searchQuery}". Try refining your search query.</p>
            ) : (
              <p>Our catalog is currently empty. Check back again later!</p>
            )}
            {searchQuery && (
              <button className="clear-filter-btn" onClick={() => setSearchQuery('')}>
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="courses-responsive-grid">
            {filteredAndSorted.map((course) => (
              <CourseCard
                key={course.courseCode || course.mangoId}
                course={course}
                currency={resolvedCurrency}
                ctaText={ctaText}
                accentColor={accentColor}
                showRefundable={showRefundable}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
