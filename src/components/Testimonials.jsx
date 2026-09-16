import React, { useState, useEffect, useRef } from 'react';

const TESTIMONIALS_DATA = [
  {
    quote: '"Sunton\'s vitrified collection transformed our corporate lobby design. The gloss finish has a mirror-like depth that is incredibly resistant to heavy foot traffic. Highly recommended!"',
    avatar: 'RV',
    name: 'Rajesh Varma',
    role: 'Principal Architect, Varma & Associates'
  },
  {
    quote: '"The level of service and variety of patterns they offer is unparalleled. We ordered customized kitchen backsplash tiles for a high-end luxury residential tower, and the precision was flawless."',
    avatar: 'SM',
    name: 'Sarah Miller',
    role: 'Interior Design Consultant, LuxeLiving Group'
  },
  {
    quote: '"Morbi produces great tiles, but Sunton stands out for their technological standards and quality control. Fired at over 1200 degrees, these tiles do not chip or stain even in heavy commercial kitchens."',
    avatar: 'AK',
    name: 'Amit Patel',
    role: 'Director of Procurement, Zenith Builders'
  }
];

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
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

  const handlePrev = () => {
    stopTimer();
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    startTimer();
  };

  const handleNext = () => {
    stopTimer();
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    startTimer();
  };

  const handleDotClick = (idx) => {
    stopTimer();
    setCurrentIdx(idx);
    startTimer();
  };

  return (
    <section className="section-padding testimonials-section">
      <div className="container">
        <h2 className="section-title text-center">What Our Clients Say</h2>
        <p className="section-subtitle">Read reviews from leading architects, interior designers, and corporate builders who trust Sunton.</p>
        
        <div className="testimonial-slider-container">
          <div className="testimonial-track" style={{ transform: `translateX(-${currentIdx * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div key={idx} className="testimonial-slide">
                <div className="testimonial-quote">{t.quote}</div>
                <div className="testimonial-avatar">{t.avatar}</div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            ))}
          </div>
          
          <div className="slider-controls">
            <button className="slider-btn" onClick={handlePrev} aria-label="Previous slide">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className="slider-dots">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <div 
                  key={idx}
                  className={`slider-dot ${idx === currentIdx ? 'active' : ''}`}
                  onClick={() => handleDotClick(idx)}
                ></div>
              ))}
            </div>
            <button className="slider-btn" onClick={handleNext} aria-label="Next slide">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
