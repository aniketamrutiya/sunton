import React, { useState } from 'react';

export default function ProductCard({ product, onOpenLightbox, onOpenInquire }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const imagesArray = [
    product.images?.tile,
    product.images?.room,
    product.images?.detail
  ].filter(img => img);

  const hasMultiple = imagesArray.length > 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % imagesArray.length);
  };

  const handleDotClick = (idx, e) => {
    e.stopPropagation();
    setActiveIdx(idx);
  };

  const handleImageZoom = (idx, e) => {
    e.stopPropagation();
    if (onOpenLightbox) {
      onOpenLightbox(product, idx);
    }
  };

  const handleInquire = (e) => {
    e.stopPropagation();
    if (onOpenInquire) {
      onOpenInquire(product);
    }
  };

  return (
    <div className="product-card reveal active">
      {hasMultiple ? (
        <div 
          className="product-img-box" 
          id={`slider-${product.id}`}
        >
          <div className="card-slider-container">
            <div 
              className="card-slider-track" 
              style={{ transform: `translateX(-${activeIdx * 100}%)` }}
            >
              {imagesArray.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={product.name} 
                  onClick={(e) => handleImageZoom(idx, e)}
                  loading="lazy" 
                />
              ))}
            </div>
          </div>
          <button 
            type="button"
            className="card-slider-btn card-slider-btn-prev" 
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button 
            type="button"
            className="card-slider-btn card-slider-btn-next" 
            onClick={handleNext}
            aria-label="Next image"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <div className="card-slider-dots">
            {imagesArray.map((_, idx) => (
              <div 
                key={idx}
                className={`card-slider-dot ${idx === activeIdx ? 'active' : ''}`}
                onClick={(e) => handleDotClick(idx, e)}
              ></div>
            ))}
          </div>
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
        </div>
      ) : (
        <div 
          className="product-img-box" 
          onClick={(e) => handleImageZoom(0, e)}
        >
          <img src={imagesArray[0]} alt={product.name} loading="lazy" />
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
        </div>
      )}

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-specs">
          <span className="spec-item">Size: {product.size}</span>
          <span className="spec-item">Finish: {product.finish}</span>
        </div>
        <p className="product-desc">{product.desc}</p>
        <button className="btn-inquire" onClick={handleInquire}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Request Bulk Pricing
        </button>
      </div>
    </div>
  );
}
