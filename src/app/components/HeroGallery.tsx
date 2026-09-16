import React from 'react';
import { ShareIcon, SaveIcon, DefaultIcon } from './Icons';
import './HeroGallery.css';

interface HeroGalleryProps {
  title: string;
  images: {
    main: string;
    grid: string[];
  };
  onShowAllPhotos: () => void;
}

export default function HeroGallery({ title, images, onShowAllPhotos }: HeroGalleryProps) {
  return (
    <div className="hero-section">
      {/* Title Bar */}
      <div className="hero-header flex justify-between items-center">
        <h1 className="hero-title">{title}</h1>
        <div className="hero-actions flex gap-4">
          <button className="action-btn">
            <ShareIcon />
            <span className="text-bold text-underline">Share</span>
          </button>
          <button className="action-btn">
            <SaveIcon />
            <span className="text-bold text-underline">Save</span>
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="gallery-container">
        <div className="gallery-main" onClick={onShowAllPhotos}>
          <img src={images.main} alt="Main view" className="gallery-img" />
        </div>
        <div className="gallery-grid">
          {images.grid.map((img, idx) => (
            <div 
              key={idx} 
              className={`gallery-item ${idx === 1 ? 'top-right' : ''} ${idx === 3 ? 'bottom-right' : ''}`}
              onClick={onShowAllPhotos}
            >
              <img src={img} alt={`View ${idx + 1}`} className="gallery-img" />
            </div>
          ))}
        </div>
        
        {/* Show all photos button */}
        <button className="show-all-btn flex items-center gap-2" onClick={onShowAllPhotos}>
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '16px', width: '16px', fill: 'currentcolor' }} aria-hidden="true" role="presentation" focusable="false"><path d="M14 2a2 2 0 0 1 1.995 1.85L16 4v10a2 2 0 0 1-1.85 1.995L14 16H6a2 2 0 0 1-1.995-1.85L4 14v-1H2a2 2 0 0 1-1.995-1.85L0 11V3a2 2 0 0 1 1.85-1.995L2 1h10zm0 2H2v8h2V4a2 2 0 0 1 1.85-1.995L6 2h8zM6 4v10h8V4H6z"></path></svg>
          <span className="text-bold" style={{ fontSize: '14px' }}>Show all photos</span>
        </button>
      </div>
    </div>
  );
}
