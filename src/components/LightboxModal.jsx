import React, { useState, useEffect } from 'react';

export default function LightboxModal({ isOpen, product, initialIndex, onClose, onOpenInquire }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (product) {
      setActiveIdx(initialIndex);
    }
  }, [product, initialIndex]);

  if (!isOpen || !product) return null;

  const imagesArray = [
    product.images?.tile,
    product.images?.room,
    product.images?.detail
  ].filter(img => img);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % imagesArray.length);
  };

  const handleInquireRedirect = () => {
    onClose();
    if (onOpenInquire) {
      onOpenInquire(product);
    }
  };

  return (
    <div 
      className="lightbox active" 
      id="lightbox-viewer"
      onClick={(e) => {
        if (e.target.id === 'lightbox-viewer' || e.target.id === 'lightbox-slider-track-wrap') {
          onClose();
        }
      }}
    >
      <div className="lightbox-card">
        <button className="lightbox-close" onClick={onClose} aria-label="Close Lightbox">&times;</button>
        
        {/* Left Column: Image Slider Area */}
        <div className="lightbox-slider-section">
          <div className="lightbox-slider-container" id="lightbox-slider-track-wrap">
            <div 
              className="lightbox-slider-track" 
              style={{ transform: `translateX(-${activeIdx * 100}%)`, display: 'flex', transition: 'transform 0.4s ease-out' }}
            >
              {imagesArray.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={product.name} 
                  style={{ width: '100%', flexShrink: 0, objectFit: 'contain', background: '#091522' }} 
                />
              ))}
            </div>
          </div>
          {imagesArray.length > 1 && (
            <>
              <button className="lightbox-nav-btn lightbox-nav-btn-prev" onClick={handlePrev} aria-label="Previous image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="lightbox-nav-btn lightbox-nav-btn-next" onClick={handleNext} aria-label="Next image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div className="lightbox-dots">
                {imagesArray.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`slider-dot ${idx === activeIdx ? 'active' : ''}`}
                    onClick={() => setActiveIdx(idx)}
                    style={{ cursor: 'pointer' }}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Right Column: Details Info Area */}
        <div className="lightbox-details-section">
          <span className="lightbox-badge" id="lightbox-product-badge">
            {(product.category || 'Collection').toUpperCase()}
          </span>
          <h3 className="lightbox-title" id="lightbox-product-title">{product.name}</h3>
          <div className="lightbox-specs">
            <div className="lightbox-spec-item">
              <strong>Size:</strong> <span id="lightbox-product-size">{product.size || 'Custom'}</span>
            </div>
            <div className="lightbox-spec-item">
              <strong>Finish:</strong> <span id="lightbox-product-finish">{product.finish || 'Matte'}</span>
            </div>
          </div>
          <p className="lightbox-desc" id="lightbox-product-desc" style={{ flexGrow: 1, margin: '1.5rem 0' }}>
            {product.desc || 'Stunning decorative coverage designed to inspire modern building facades.'}
          </p>
          <button 
            className="btn btn-primary" 
            id="lightbox-btn-inquire" 
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={handleInquireRedirect}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Request Bulk Pricing
          </button>
        </div>
      </div>
    </div>
  );
}
