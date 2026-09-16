import React from 'react';
import { GlobeIcon } from './Icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">AirCover</a></li>
              <li><a href="#">Anti-discrimination</a></li>
              <li><a href="#">Disability support</a></li>
              <li><a href="#">Cancellation options</a></li>
              <li><a href="#">Report neighborhood concern</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Hosting</h3>
            <ul>
              <li><a href="#">Airbnb your home</a></li>
              <li><a href="#">AirCover for Hosts</a></li>
              <li><a href="#">Hosting resources</a></li>
              <li><a href="#">Community forum</a></li>
              <li><a href="#">Hosting responsibly</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Airbnb</h3>
            <ul>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">New features</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Gift cards</a></li>
              <li><a href="#">Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2024 Airbnb, Inc.</span>
            <span className="footer-dot">·</span>
            <a href="#">Terms</a>
            <span className="footer-dot">·</span>
            <a href="#">Sitemap</a>
            <span className="footer-dot">·</span>
            <a href="#">Privacy</a>
            <span className="footer-dot">·</span>
            <a href="#">Your Privacy Choices</a>
          </div>
          <div className="footer-bottom-right">
            <button className="footer-lang-btn">
              <GlobeIcon />
              <span>English (US)</span>
            </button>
            <button className="footer-currency-btn">
              <span>$ USD</span>
            </button>
            <div className="social-links">
              {/* Placeholder for social icons */}
              <a href="#">fb</a>
              <a href="#">tw</a>
              <a href="#">ig</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
