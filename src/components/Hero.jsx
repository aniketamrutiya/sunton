import React, { useState, useEffect, useRef } from 'react';

const HERO_SLIDES = [
  {
    img: 'assets/images/hero-bg.png',
    title: 'Redefine Spaces with Luxury Ceramics',
    desc: 'Manufacturing high-density vitrified slabs, digital printed wall tiles, and premium building surfaces.'
  },
  {
    img: 'assets/images/gallery-1.png',
    title: 'Premium Finishes For Exquisite Living',
    desc: 'Uncompromising structural durability, scratch-proof coatings, and stain-resistant glazes.'
  },
  {
    img: 'assets/images/gallery-2.png',
    title: 'Engineered For High Stress & Loading',
    desc: 'Heavy duty parking tiles designed to withstand vehicle traffic and harsh environmental weather.'
  }
];

export default function Hero({ setView }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    stopTimer();
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    startTimer();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    stopTimer();
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    startTimer();
  };

  const handleDotClick = (idx, e) => {
    e.stopPropagation();
    stopTimer();
    setActiveSlide(idx);
    startTimer();
  };

  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      {/* Background Slideshow */}
      <div className="hero-slides">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.65), rgba(17, 17, 17, 0.4)), url(${slide.img})`
            }}
          />
        ))}
      </div>

      {/* Main Logo underneath absolute navbar spacing */}
      <div className="hero-logo">
        <img src="assets/images/logo.png" alt="Sunton Logo" />
      </div>

      <div className="container">
        <div className="hero-content">
          <h1>{HERO_SLIDES[activeSlide].title}</h1>
          <p>{HERO_SLIDES[activeSlide].desc}</p>
          <div className="hero-btns">
            <button 
              className="btn btn-primary"
              onClick={() => handleScrollTo('#parking')}
            >
              Explore Collection
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setView('gallery')}
            >
              Gallery Showcase
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleScrollTo('#contact')}
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        type="button" 
        className="hero-control-btn hero-control-btn-prev" 
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button 
        type="button" 
        className="hero-control-btn hero-control-btn-next" 
        onClick={handleNext}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="hero-dots">
        {HERO_SLIDES.map((_, idx) => (
          <div 
            key={idx}
            className={`hero-dot ${idx === activeSlide ? 'active' : ''}`}
            onClick={(e) => handleDotClick(idx, e)}
          />
        ))}
      </div>
    </section>
  );
}
