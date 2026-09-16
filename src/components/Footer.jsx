import React from 'react';

export default function Footer({ setView }) {
  const handleNavClick = (viewName, hash) => {
    setView(viewName);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our corporate newsletter catalog!');
    e.target.reset();
  };

  return (
    <footer style={{ background: '#111111', color: 'white', padding: '6rem 0 3rem 0', borderTop: '4px solid var(--accent)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        
        {/* Company Info & Newsletter */}
        <div>
          <div className="footer-logo" style={{ marginBottom: '1.5rem' }}>
            <img 
              src="assets/images/logo.png" 
              alt="SUNTON Logo" 
              className="logo-img" 
              style={{ filter: 'brightness(0) invert(1)', height: '42px', width: 'auto' }} 
            />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#aaaaaa', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Sunton Ceramic Tiles is a global surfaces provider exporting high-durability glazed vitrified slabs and heavy duty tiles.
          </p>
          
          {/* Newsletter Input */}
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', maxWidth: '300px' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              style={{
                flex: 1,
                padding: '0.6rem 0.9rem',
                borderRadius: '4px',
                border: '1px solid #333',
                background: '#222',
                color: 'white',
                fontSize: '0.85rem'
              }}
            />
            <button 
              type="submit" 
              style={{
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.85rem',
                transition: '0.2s'
              }}
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Column 2: Wall Collections */}
        <div>
          <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Wall Collections</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#aaaaaa' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#parking')}>Bathroom Tiles</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#parking')}>Kitchen Glazed</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#parking')}>Digital Wall Tiles</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#parking')}>Elevation Stone Claddings</span>
          </div>
        </div>

        {/* Column 3: Floor Collections */}
        <div>
          <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Floor Collections</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#aaaaaa' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#parking')}>Vitrified Slabs</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#parking')}>Heavy Duty Parking (400x400)</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#parking')}>Heavy Duty Parking (500x500)</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#parking')}>GVT / PGVT Glossy Slabs</span>
          </div>
        </div>

        {/* Column 4: Quick Resources */}
        <div>
          <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Resources</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#aaaaaa' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home')}>Home Overview</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('gallery')}>Inspiration Gallery</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#about')}>About Sunton</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home', '#contact')}>Contact Sales</span>
          </div>
        </div>

        {/* Column 5: Corporate Info */}
        <div>
          <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Corporate Office</h4>
          <p style={{ fontSize: '0.85rem', color: '#aaaaaa', lineHeight: '1.6', marginBottom: '1rem' }}>
            Survey No. 412/P1, Morbi-2 Bypass Road, Morbi - 363642, Gujarat, India
          </p>
          <div style={{ fontSize: '0.85rem', color: '#aaaaaa', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div><strong style={{ color: 'white' }}>Office:</strong> +91 2822 294801</div>
            <div><strong style={{ color: 'white' }}>Support:</strong> +91 98765 43210</div>
            <div><strong style={{ color: 'white' }}>Inquiries:</strong> info@suntonceramics.com</div>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', textAlign: 'center', fontSize: '0.825rem', color: '#777777' }}>
        <p>&copy; {new Date().getFullYear()} Sunton Ceramic Tiles Industry. All Rights Reserved. Manufactured in Morbi, Gujarat, India.</p>
      </div>
    </footer>
  );
}
