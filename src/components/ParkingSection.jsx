import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { PARKING_TILES } from '../data/tilesData';

export default function ParkingSection({ customTiles, onOpenLightbox, onOpenInquire }) {
  const [selectedSize, setSelectedSize] = useState('400x400 mm');

  // Filter static default parking tiles by size
  const staticTiles = PARKING_TILES.filter(t => t.size.replace(/\s+/g, '') === selectedSize.replace(/\s+/g, ''));

  // Filter user-uploaded custom tiles that are marked as "New" status AND match the selected size
  // Note: custom tiles are designated as 'new' status by the user uploader field
  const uploadedNewTiles = customTiles.filter(t => 
    t.status === 'new' && 
    t.size.replace(/\s+/g, '') === selectedSize.replace(/\s+/g, '')
  );

  // Combine them for display
  const displayTiles = [...staticTiles, ...uploadedNewTiles];

  return (
    <section className="section-padding" id="parking" style={{ background: 'var(--bg-light)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container text-center">
        <h2 className="section-title">Heavy Duty Parking Tiles</h2>
        <p className="section-subtitle">
          Engineered to endure high stress, vehicle loads, and harsh weather. Choose size for configurations.
        </p>
        
        <div className="products-filter">
          <button 
            type="button"
            className={`size-btn ${selectedSize === '400x400 mm' ? 'active' : ''} size-filter-btn`} 
            onClick={() => setSelectedSize('400x400 mm')}
          >
            400 x 400 mm
          </button>
          <button 
            type="button"
            className={`size-btn ${selectedSize === '500x500 mm' ? 'active' : ''} size-filter-btn`} 
            onClick={() => setSelectedSize('500x500 mm')}
          >
            500 x 500 mm
          </button>
        </div>
        
        {displayTiles.length > 0 ? (
          <div className="products-grid" id="parking-tiles-container">
            {displayTiles.map((tile) => (
              <ProductCard 
                key={tile.id}
                product={tile}
                onOpenLightbox={onOpenLightbox}
                onOpenInquire={onOpenInquire}
              />
            ))}
          </div>
        ) : (
          <div style={{ padding: '3rem', color: 'var(--text-muted)' }}>
            <p>No tile models uploaded under this size configuration yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
