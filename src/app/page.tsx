"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { listing } from './mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroGallery from './components/HeroGallery';
import ReservationWidget from './components/ReservationWidget';
import { DefaultIcon, StarIcon } from './components/Icons';
import PhotoTour from './components/PhotoTour';
import Lightbox from './components/Lightbox';
import './page.css';

export default function Home() {
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allPhotos = [
    listing.images.main,
    ...listing.images.grid,
    ...listing.tourCategories.flatMap(c => c.photos)
  ];
  
  const uniquePhotos = Array.from(new Set(allPhotos));

  const handleOpenLightbox = (url: string) => {
    const idx = uniquePhotos.indexOf(url);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <>
      <Head>
        <title>{listing.title}</title>
      </Head>
      
      <Header />
      
      <main className="container">
        <HeroGallery 
          title={listing.title} 
          images={listing.images} 
          onShowAllPhotos={() => setIsPhotoTourOpen(true)} 
        />
        
        <div className="main-layout">
          {/* Left Column */}
          <div className="layout-left">
            {/* Host & Subtitle */}
            <div className="host-info-block">
              <div className="listing-subtitle">
                <h2>{listing.type}</h2>
                <span className="text-muted">{listing.subtitle}</span>
              </div>
              <img src={listing.host.image} alt={listing.host.name} className="host-avatar" />
            </div>
            
            <div className="divider"></div>
            
            {/* Highlights */}
            <div className="highlights-list">
              {listing.highlights.map((item, idx) => (
                <div key={idx} className="highlight-item">
                  <div className="highlight-icon">
                    <DefaultIcon />
                  </div>
                  <div className="highlight-text">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="divider"></div>
            
            {/* Description */}
            <div className="description-section">
              <p className="description-text">{listing.description}</p>
              <button className="show-more-btn">
                Show more
                <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ height: '12px', width: '12px', display: 'block', fill: 'currentcolor' }}><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg>
              </button>
            </div>
            
            <div className="divider"></div>
            
            {/* Amenities */}
            <div className="amenities-section">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {listing.amenities.slice(0, 10).map((amenity, idx) => (
                  <div key={idx} className="amenity-item">
                    <DefaultIcon />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
              <button className="btn-secondary">Show all 42 amenities</button>
            </div>
            
            <div className="divider"></div>
            
            {/* Calendar (Placeholder layout) */}
            <div className="calendar-section">
              <h2>7 nights in Candolim</h2>
              <span className="text-muted">Oct 14, 2024 - Oct 21, 2024</span>
              <div style={{ height: '320px', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-muted">Interactive Calendar Widget</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Reservation Widget */}
          <div className="layout-right">
            <ReservationWidget 
              price={listing.pricing.nightlyRate}
              currency={listing.pricing.currency}
              rating={listing.rating}
              reviewsCount={listing.reviewsCount}
            />
          </div>
        </div>
        
        <div className="divider" style={{ marginTop: '48px' }}></div>
        
        {/* Reviews Section */}
        <div className="reviews-section" id="reviews">
          <div className="reviews-header">
            <StarIcon />
            <h2 style={{ margin: 0 }}>{listing.rating} · {listing.reviewsCount} reviews</h2>
          </div>
          
          <div className="rating-grid">
            {Object.entries(listing.ratingBreakdown).map(([key, value]) => (
              <div key={key} className="rating-row">
                <span style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <div className="rating-bar-container">
                  <div className="rating-bar-bg">
                    <div className="rating-bar-fill" style={{ width: `${(value / 5) * 100}%` }}></div>
                  </div>
                  <span className="rating-value">{value.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="reviews-grid">
            {listing.reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-author">
                  <img src={review.image} alt={review.name} className="review-avatar" />
                  <div>
                    <h4>{review.name}</h4>
                    <div className="review-date">{review.date}</div>
                  </div>
                </div>
                <div className="review-text">{review.text}</div>
              </div>
            ))}
          </div>
          <button className="btn-secondary">Show all {listing.reviewsCount} reviews</button>
        </div>
        
        <div className="divider"></div>
        
        {/* Location Section */}
        <div className="location-section">
          <h2>Where you'll be</h2>
          <div style={{ height: '480px', background: 'var(--bg-light)', borderRadius: '12px', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <span className="text-muted">Map View Widget</span>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Overlays */}
      {isPhotoTourOpen && (
        <PhotoTour 
          categories={listing.tourCategories}
          onClose={() => setIsPhotoTourOpen(false)}
          onImageClick={handleOpenLightbox}
        />
      )}

      {lightboxIndex !== null && (
        <Lightbox 
          photos={uniquePhotos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
