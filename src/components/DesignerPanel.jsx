import React, { useState } from 'react';
import './DesignerPanel.css';

export default function DesignerPanel({ customProps, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    { name: 'Indigo (Default)', color: '#6366f1' },
    { name: 'Violet', color: '#8b5cf6' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Emerald', color: '#10b981' }
  ];

  const updateProp = (key, value) => {
    onChange({
      ...customProps,
      [key]: value
    });

    // If color changes, update the document CSS variables dynamically so all page components adapt instantly!
    if (key === 'accentColor') {
      document.documentElement.style.setProperty('--accent-indigo', value);
      document.documentElement.style.setProperty('--accent-violet', value + 'dd'); // slight opacity reduction for gradient depth
    }
  };

  return (
    <div className={`designer-panel ${isOpen ? 'open' : ''}`}>
      {/* Toggle Button */}
      <button className="panel-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕ Close Panel' : '⚙️ Customise Theme'}
      </button>

      {isOpen && (
        <div className="panel-content">
          <div className="panel-header">
            <h4>Framer Canvas Props</h4>
            <p>Simulate Framer property panels directly in the browser.</p>
          </div>

          <div className="panel-body">
            {/* 1. Accent Color */}
            <div className="control-group">
              <label className="control-label">Accent/Brand Color</label>
              <div className="color-presets">
                {presets.map((preset) => (
                  <button
                    key={preset.color}
                    className={`preset-swatch ${customProps.accentColor === preset.color ? 'active' : ''}`}
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                    onClick={() => updateProp('accentColor', preset.color)}
                  />
                ))}
              </div>
              <div className="picker-wrapper">
                <span className="picker-label">Custom:</span>
                <input
                  type="color"
                  value={customProps.accentColor}
                  onChange={(e) => updateProp('accentColor', e.target.value)}
                  className="color-picker-input"
                />
              </div>
            </div>

            {/* 2. CTA Button Text */}
            <div className="control-group">
              <label className="control-label">CTA Button Text</label>
              <input
                type="text"
                value={customProps.ctaText}
                onChange={(e) => updateProp('ctaText', e.target.value)}
                placeholder="e.g. Enroll Now"
                className="panel-input"
              />
            </div>

            {/* 3. Show Refundable Badge */}
            <div className="control-group toggle-group">
              <label className="control-label" style={{ margin: 0 }}>Show Refundable Badge</label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={customProps.showRefundable}
                  onChange={(e) => updateProp('showRefundable', e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            {/* 4. Default Fallback Currency */}
            <div className="control-group">
              <label className="control-label">Fallback Currency</label>
              <select
                value={customProps.fallbackCurrency}
                onChange={(e) => updateProp('fallbackCurrency', e.target.value)}
                className="panel-select"
              >
                <option value="US">USD ($)</option>
                <option value="IN">INR (₹)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
