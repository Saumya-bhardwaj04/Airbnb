import React, { useEffect, useState } from 'react';
import './Lightbox.css';

interface LightboxProps {
  photos: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="lightbox-overlay">
      <div className="lightbox-header">
        <button className="lightbox-close-btn flex items-center gap-2" onClick={onClose}>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }} aria-hidden="true" role="presentation" focusable="false"><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path></g></svg>
          <span>Close</span>
        </button>
        <div className="lightbox-counter">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      <div className="lightbox-content flex items-center justify-between">
        <button className="lightbox-nav-btn" onClick={handlePrev} aria-label="Previous image">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }} aria-hidden="true" role="presentation" focusable="false"><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path></g></svg>
        </button>
        
        <div className="lightbox-image-container">
          <img src={photos[currentIndex]} alt={`Gallery view ${currentIndex + 1}`} className="lightbox-image" />
        </div>

        <button className="lightbox-nav-btn" onClick={handleNext} aria-label="Next image">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }} aria-hidden="true" role="presentation" focusable="false"><g fill="none"><path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path></g></svg>
        </button>
      </div>
    </div>
  );
}
