import React, { useState } from 'react';
import { DEFAULT_GALLERY } from '../data/tilesData';

export default function GalleryView({ customTiles, onOpenLightbox }) {
  const [selectedSize, setSelectedSize] = useState('400x400 mm');

  // Filter custom uploaded tiles matching this size category
  // Include both "New" and "Old" tiles in the gallery listing
  const uploadedMatchingTiles = customTiles.filter(t => 
    t.size.replace(/\s+/g, '') === selectedSize.replace(/\s+/g, '')
  );

  // Default initial presets to showcase in the gallery
  // Map these presets to default sizes to populate the initial catalog gallery views
  const staticGallery = DEFAULT_GALLERY.filter((item, idx) => {
    if (selectedSize === '400x400 mm') {
      return idx % 2 === 0; // split standard presets evenly for initial showcases
    } else {
      return idx % 2 !== 0;
    }
  });

  const handleTileZoom = (tile, imageSrc) => {
    if (onOpenLightbox) {
      // Create a mock product object to load in the lightbox viewer
      onOpenLightbox({
        ...tile,
        images: {
          tile: imageSrc,
          room: '',
          detail: ''
        }
      }, 0);
    }
  };

  return (
    <section className="section-padding" id="gallery" style={{ background: 'var(--bg-white)', minHeight: '80vh', paddingTop: '120px' }}>
      <div className="container">
        <h2 className="section-title text-center">Inspiration Gallery</h2>
        <p className="section-subtitle text-center">
          See how our ceramic, vitrified, and parking collections look inside luxury residences and workspaces. Filter by size.
        </p>

        {/* Size Selection Tabs */}
        <div className="products-filter" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
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

        <div className="gallery-grid" id="gallery-container">
          {/* Render Static/Default Gallery Presets */}
          {staticGallery.map((preset) => (
            <div 
              key={preset.id} 
              className="gallery-item reveal active"
              onClick={() => handleTileZoom({
                name: preset.title,
                category: preset.category,
                finish: 'Showroom Preset',
                desc: 'A professional installation setting demonstrating the placement of Sunton Ceramic tiles.'
              }, preset.image)}
            >
              <img src={preset.image} alt={preset.title} loading="lazy" />
              <div className="gallery-overlay">
                <div className="gallery-zoom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
                <h4>{preset.title}</h4>
                <p>{preset.category} | {selectedSize}</p>
              </div>
            </div>
          ))}

          {/* Render User Uploaded Tiles for this size */}
          {uploadedMatchingTiles.map((tile) => {
            const images = [tile.images?.tile, tile.images?.room, tile.images?.detail].filter(img => img);
            return images.map((imgSrc, idx) => (
              <div 
                key={`${tile.id}-${idx}`} 
                className="gallery-item reveal active"
                onClick={() => handleTileZoom(tile, imgSrc)}
              >
                <img src={imgSrc} alt={tile.name} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="gallery-zoom-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                  <h4>{tile.name} {idx > 0 ? `(View ${idx + 1})` : ''}</h4>
                  <p>{tile.finish} | {tile.size} ({tile.status.toUpperCase()})</p>
                </div>
              </div>
            ));
          })}
        </div>

        {staticGallery.length === 0 && uploadedMatchingTiles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No gallery photos found for this size configuration.
          </div>
        )}
      </div>
    </section>
  );
}
