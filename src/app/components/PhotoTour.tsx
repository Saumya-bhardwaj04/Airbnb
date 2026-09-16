import React, { useEffect } from 'react';
import './PhotoTour.css';

interface PhotoTourProps {
  categories: any[];
  onClose: () => void;
  onImageClick: (url: string) => void;
}

export default function PhotoTour({ categories, onClose, onImageClick }: PhotoTourProps) {
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="photo-tour-overlay">
      <div className="photo-tour-header">
        <button className="back-btn" onClick={onClose} aria-label="Close photo tour">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }} aria-hidden="true" role="presentation" focusable="false"><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path></g></svg>
        </button>
      </div>

      <div className="photo-tour-content">
        <div className="photo-tour-container">
          {categories.map((category) => (
            <div key={category.id} className="category-section">
              <div className="category-grid">
                {category.photos.map((photo: string, index: number) => (
                  <div 
                    key={index} 
                    className={`category-photo-wrapper ${index % 3 === 0 ? 'full-width' : 'half-width'}`}
                    onClick={() => onImageClick(photo)}
                  >
                    <img src={photo} alt={`${category.name} ${index + 1}`} className="category-photo" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
