import React from 'react';
import './SkeletonCard.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="shimmer skeleton-badge"></div>
        <div className="shimmer skeleton-badge"></div>
      </div>
      <div className="skeleton-body">
        <div className="shimmer skeleton-title"></div>
        <div className="shimmer skeleton-text"></div>
        <div className="shimmer skeleton-text-short"></div>
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-price-block">
          <div className="shimmer skeleton-price-label"></div>
          <div className="shimmer skeleton-price-value"></div>
        </div>
        <div className="shimmer skeleton-btn"></div>
      </div>
    </div>
  );
}
