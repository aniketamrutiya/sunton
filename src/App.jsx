import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ParkingSection from './components/ParkingSection';
import GalleryView from './components/GalleryView';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ManagerPortal from './components/ManagerPortal';
import InquiryModal from './components/InquiryModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [currentView, setView] = useState('home'); // 'home' | 'gallery'
  const [portalOpen, setPortalOpen] = useState(false);
  const [inquireOpen, setInquireOpen] = useState(false);
  const [inquireProduct, setInquireProduct] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProduct, setLightboxProduct] = useState(null);
  const [lightboxInitialIdx, setLightboxInitialIdx] = useState(0);

  // Toast Notification State
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' | 'error'

  // Custom tiles persistent state
  const [customTiles, setCustomTiles] = useState([]);

  useEffect(() => {
    // Load custom tiles from localStorage
    const saved = localStorage.getItem('sunton_custom_tiles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure legacy base64 format is compatible
        parsed.forEach(tile => {
          if (!tile.images) {
            tile.images = {
              tile: tile.image || '',
              room: '',
              detail: ''
            };
          }
          if (!tile.status) {
            tile.status = 'new'; // default legacy imports to show everywhere
          }
        });
        setCustomTiles(parsed);
      } catch (err) {
        console.error('Failed to parse custom tiles', err);
      }
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToastMsg(message);
    setToastType(type);
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 3500);
  };

  const handleAddTile = (newTile) => {
    const updated = [...customTiles, newTile];
    setCustomTiles(updated);
    localStorage.setItem('sunton_custom_tiles', JSON.stringify(updated));
  };

  const handleDeleteTile = (id) => {
    const updated = customTiles.filter(t => t.id !== id);
    setCustomTiles(updated);
    localStorage.setItem('sunton_custom_tiles', JSON.stringify(updated));
    showToast('Tile variant deleted from stock list.', 'success');
  };

  const handleOpenInquire = (product) => {
    setInquireProduct(product);
    setInquireOpen(true);
  };

  const handleOpenLightbox = (product, startIdx) => {
    setLightboxProduct(product);
    setLightboxInitialIdx(startIdx);
    setLightboxOpen(true);
  };

  return (
    <div>
      <Header 
        currentView={currentView} 
        setView={setView} 
        onOpenPortal={() => setPortalOpen(true)} 
      />

      {currentView === 'home' ? (
        /* Render Home page sections */
        <>
          <Hero setView={setView} />
          
          {/* Heavy Duty Parking Tiles Section */}
          <ParkingSection 
            customTiles={customTiles} 
            onOpenLightbox={handleOpenLightbox}
            onOpenInquire={handleOpenInquire}
          />

          {/* About Section */}
          <section className="section-padding" id="about">
            <div className="container">
              <div className="about-grid">
                <div className="about-content reveal active">
                  <h2 className="section-title">About Sunton Ceramic</h2>
                  <p>
                    Established with a vision to redefine modern architectural spaces, Sunton Ceramic is a leading tile manufacturer headquartered in Morbi, Gujarat—the tile hub of India. We utilize cutting-edge manufacturing lines, high-density raw clay deposits, and premium digital print glazing technology to supply standard-setting building surfaces globally.
                  </p>
                  <p>
                    Our products undergo strict quality checks measuring water absorption limits, load-bearing capacities, and chemical resistance thresholds. We serve architectural firms, hospitality builds, and real estate developers with prompt container shipments and custom dimension capabilities.
                  </p>
                </div>
                <div className="about-img-box reveal active">
                  <img src="assets/images/gallery-1.png" alt="Sunton Ceramics Showroom Display" loading="lazy" />
                </div>
              </div>
            </div>
          </section>

          <Testimonials />
          
          <ContactForm showToast={showToast} />

          {/* Dynamic Stats Banner */}
          <section className="stats-banner">
            <div className="container">
              <div className="stats-grid">
                <div className="stat-item reveal active">
                  <span className="stat-number">30M+</span>
                  <h4 className="stat-title">Sq. Mtr. Capacity</h4>
                  <p className="stat-desc">Annually produced vitrified slabs, floor, and wall tiles across our advanced production plants.</p>
                </div>
                <div className="stat-item reveal active">
                  <span className="stat-number">15+</span>
                  <h4 className="stat-title">Export Countries</h4>
                  <p className="stat-desc">Serving construction networks and premium architect groups globally on multiple continents.</p>
                </div>
                <div className="stat-item reveal active">
                  <span className="stat-number">400+</span>
                  <h4 className="stat-title">Tile Designs</h4>
                  <p className="stat-desc">Vast digital libraries covering marble replicas, stone reliefs, structured matte, and rustic rock textures.</p>
                </div>
                <div className="stat-item reveal active">
                  <span className="stat-number">3</span>
                  <h4 className="stat-title">Production Plants</h4>
                  <p className="stat-desc">Utilizing advanced Italian SACMI presses and digital print glazing machinery in Morbi, India.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="section-padding text-center" id="why-choose-us" style={{ background: 'var(--bg-white)' }}>
            <div className="container">
              <h2 className="section-title text-center">Why Choose Us</h2>
              <p className="section-subtitle">We don't just sell tiles; we construct foundations for beautiful lifestyles with solid corporate values.</p>
              
              <div className="why-grid">
                <div className="why-card reveal active">
                  <div className="why-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h3>Premium Quality</h3>
                  <p>High structural integrity, scratch-proof coatings, and stain-resistant finishes designed for decades of daily traffic.</p>
                </div>
                
                <div className="why-card reveal active">
                  <div className="why-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/></svg>
                  </div>
                  <h3>Wide Variety</h3>
                  <p>From polished Carrara marble formats to rustic wooden tiles and modern glazed bathroom slabs, we satisfy every architectural style.</p>
                </div>
                
                <div className="why-card reveal active">
                  <div className="why-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                  </div>
                  <h3>Durable & Strong</h3>
                  <p>Fired at extremely high temperatures (over 1200°C), resulting in low water absorption rates and superior strength.</p>
                </div>
                
                <div className="why-card reveal active">
                  <div className="why-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <h3>Advanced Tech</h3>
                  <p>Utilizing high-end SACMI hydraulic pressing machinery and advanced digital glaze printer lines imported from Italy.</p>
                </div>

                <div className="why-card reveal active">
                  <div className="why-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  </div>
                  <h3>Global Delivery</h3>
                  <p>Our dedicated shipping logistics ensure that domestic and export container shipments arrive safely and exactly on schedule.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Render Gallery view */
        <GalleryView 
          customTiles={customTiles} 
          onOpenLightbox={handleOpenLightbox} 
        />
      )}

      <Footer setView={setView} />

      {/* Modal Overlays */}
      <ManagerPortal 
        isOpen={portalOpen} 
        onClose={() => setPortalOpen(false)} 
        customTiles={customTiles}
        onAddTile={handleAddTile}
        onDeleteTile={handleDeleteTile}
        showToast={showToast}
      />

      <InquiryModal 
        isOpen={inquireOpen} 
        product={inquireProduct} 
        onClose={() => setInquireOpen(false)} 
        showToast={showToast}
      />

      <LightboxModal 
        isOpen={lightboxOpen} 
        product={lightboxProduct} 
        initialIndex={lightboxInitialIdx} 
        onClose={() => setLightboxOpen(false)} 
        onOpenInquire={handleOpenInquire}
      />

      {/* Toast Notification Alert */}
      <div className={`toast-notification ${toastType} ${toastShow ? 'show' : ''}`} id="toast-status">
        <span id="toast-icon">{toastType === 'success' ? '✓' : '✗'}</span>
        <span id="toast-message">{toastMsg}</span>
      </div>
    </div>
  );
}
