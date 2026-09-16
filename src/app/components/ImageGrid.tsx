import React from 'react';

interface ImageGridProps {
  images: {
    main: string;
    grid: string[];
  };
  onShowAll: () => void;
  onImageClick: (index: number) => void;
}

export default function ImageGrid({ images, onShowAll, onImageClick }: ImageGridProps) {
  return (
    <div className="image-grid">
      <div className="grid-col-left">
        <img 
          src={images.main} 
          alt="Main property view" 
          className="grid-image"
          style={{ borderTopLeftRadius: 'var(--radius-lg)', borderBottomLeftRadius: 'var(--radius-lg)' }}
          onClick={() => onImageClick(0)}
        />
      </div>
      <div className="grid-col-right">
        {images.grid.map((img, index) => {
          const isTopRight = index === 1;
          const isBottomRight = index === 3;
          
          let style: React.CSSProperties = {};
          if (isTopRight) style.borderTopRightRadius = 'var(--radius-lg)';
          if (isBottomRight) style.borderBottomRightRadius = 'var(--radius-lg)';
          
          return (
            <div key={index} style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img 
                src={img} 
                alt={`Property view ${index + 1}`} 
                className="grid-image"
                style={style}
                onClick={() => onImageClick(index + 1)}
              />
            </div>
          );
        })}
        
        <button className="btn-overlay show-all-btn" onClick={onShowAll}>
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="M3 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5-1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5-1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM3 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5-1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5-1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM3 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5-1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5-1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
          Show all photos
        </button>
      </div>
    </div>
  );
}
