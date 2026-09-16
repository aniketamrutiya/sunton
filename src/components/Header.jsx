import React, { useState } from 'react';

export default function Header({ currentView, setView, onOpenPortal }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (view, hash) => {
    if (view && setView) {
      setView(view);
    }
    setMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center cursor-pointer gap-2"
          onClick={() => handleNavClick('home', '#home')}
        >
          <img 
            src="assets/images/logo.png" 
            alt="SUNTON CERAMICS Logo" 
            className="h-10 w-auto object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />

        </div>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${menuOpen ? 'active' : ''} flex items-center gap-6 text-sm font-semibold text-slate-700`}>
          <button 
            className={`nav-link hover:text-amber-600 transition-colors ${currentView === 'home' ? 'text-amber-600 font-bold' : ''}`}
            onClick={() => handleNavClick('home', '#home')}
          >
            Home
          </button>
          <button 
            className="nav-link hover:text-amber-600 transition-colors"
            onClick={() => handleNavClick('home', '#parking')}
          >
            Parking Tiles
          </button>
          <button 
            className={`nav-link hover:text-amber-600 transition-colors ${currentView === 'gallery' ? 'text-amber-600 font-bold' : ''}`}
            onClick={() => handleNavClick('gallery', null)}
          >
            Gallery
          </button>
          <button 
            className="nav-link hover:text-amber-600 transition-colors"
            onClick={() => handleNavClick('home', '#about')}
          >
            About Us
          </button>
          <button 
            className="nav-link hover:text-amber-600 transition-colors"
            onClick={() => handleNavClick('home', '#why-choose-us')}
          >
            Why Choose Us
          </button>
          <button 
            className="nav-link hover:text-amber-600 transition-colors"
            onClick={() => handleNavClick('home', '#contact')}
          >
            Contact Us
          </button>
        </nav>

        {/* Manager Portal Action & Hamburger */}
        <div className="flex items-center gap-3">
          <button 
            className="btn-admin-nav hidden sm:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-600 transition-all shadow-md active:scale-95"
            onClick={onOpenPortal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Manager Portal
          </button>

          <button 
            className="sm:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
