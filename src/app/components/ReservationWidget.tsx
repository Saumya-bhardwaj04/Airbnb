import React from 'react';
import { StarIcon } from './Icons';
import './ReservationWidget.css';

interface ReservationWidgetProps {
  price: number;
  currency: string;
  rating: number;
  reviewsCount: number;
}

export default function ReservationWidget({ price, currency, rating, reviewsCount }: ReservationWidgetProps) {
  return (
    <div className="reservation-card">
      <div className="reservation-header flex justify-between items-center">
        <div className="price-container">
          <span className="price-amount">{currency}{price}</span>
          <span className="price-label"> night</span>
        </div>
        <div className="rating-container flex items-center gap-1">
          <StarIcon />
          <span className="text-bold">{rating}</span>
          <span className="text-muted">·</span>
          <a href="#reviews" className="reviews-link text-muted text-underline">
            {reviewsCount} reviews
          </a>
        </div>
      </div>

      <div className="booking-inputs">
        <div className="dates-picker flex">
          <div className="check-in border-right">
            <div className="input-label">CHECK-IN</div>
            <div className="input-value text-muted">Add date</div>
          </div>
          <div className="check-out">
            <div className="input-label">CHECKOUT</div>
            <div className="input-value text-muted">Add date</div>
          </div>
        </div>
        <div className="guests-picker">
          <div className="input-label">GUESTS</div>
          <div className="input-value">1 guest</div>
          <svg className="chevron-down" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }} aria-hidden="true" role="presentation" focusable="false"><g fill="none"><path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932"></path></g></svg>
        </div>
      </div>

      <button className="btn-primary reserve-btn">
        Check availability
      </button>

      <div className="disclaimer text-muted text-center" style={{ marginTop: '16px', fontSize: '14px' }}>
        You won't be charged yet
      </div>

      <div className="price-breakdown">
        <div className="price-row flex justify-between">
          <span className="text-underline">{currency}{price} x 5 nights</span>
          <span>{currency}{price * 5}</span>
        </div>
        <div className="price-row flex justify-between">
          <span className="text-underline">Cleaning fee</span>
          <span>{currency}500</span>
        </div>
        <div className="price-row flex justify-between">
          <span className="text-underline">Airbnb service fee</span>
          <span>{currency}650</span>
        </div>
      </div>

      <div className="divider" style={{ margin: '16px 0' }}></div>

      <div className="price-total flex justify-between text-bold" style={{ fontSize: '16px' }}>
        <span>Total before taxes</span>
        <span>{currency}{(price * 5) + 500 + 650}</span>
      </div>
    </div>
  );
}
