import React from 'react';
import { Logo, SearchIcon, GlobeIcon, MenuIcon, UserIcon } from './Icons';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container container">
        {/* Logo */}
        <div className="header-logo">
          <a href="/">
            <Logo />
          </a>
        </div>

        {/* Search Bar (Anywhere | Any week | Add guests) */}
        <div className="header-search">
          <button className="search-btn">
            <span className="search-text text-bold">Anywhere</span>
            <span className="search-divider"></span>
            <span className="search-text text-bold">Any week</span>
            <span className="search-divider"></span>
            <span className="search-text text-muted" style={{ fontWeight: 400 }}>Add guests</span>
            <div className="search-icon-wrapper">
              <SearchIcon />
            </div>
          </button>
        </div>

        {/* Profile / Host actions */}
        <div className="header-profile">
          <a href="#" className="host-link text-bold">Airbnb your home</a>
          <button className="globe-btn">
            <GlobeIcon />
          </button>
          <button className="profile-menu-btn">
            <MenuIcon />
            <div className="user-icon-wrapper">
              <UserIcon />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
