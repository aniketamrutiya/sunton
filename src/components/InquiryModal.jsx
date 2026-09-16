import React, { useState } from 'react';

export default function InquiryModal({ isOpen, product, onClose, showToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qty, setQty] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    setName('');
    setEmail('');
    setQty('');
    setNotes('');
    showToast('Inquiry submitted. Our sales coordinator will contact you shortly.', 'success');
  };

  return (
    <div className="inquiry-modal active" id="inquiry-modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="inquiry-card">
        <div className="manager-header" style={{ background: 'var(--primary)' }}>
          <h3 id="inquiry-tile-name">Inquire: {product.name}</h3>
          <button className="btn-close-manager" onClick={onClose} aria-label="Close Inquiry">&times;</button>
        </div>
        <div style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} id="inquiry-form">
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Fill out this quick form to request a sample, get custom sizes, or obtain bulk pricing quotations for this tile.
            </p>
            
            <div className="form-group">
              <label htmlFor="inquiry-name-input">Full Name *</label>
              <input 
                type="text" 
                id="inquiry-name-input" 
                className="form-control" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="inquiry-email-input">Email Address *</label>
              <input 
                type="email" 
                id="inquiry-email-input" 
                className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="inquiry-qty-input">Approx. Quantity Required (Sq. Meters)</label>
              <input 
                type="number" 
                id="inquiry-qty-input" 
                className="form-control" 
                placeholder="e.g. 500"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="inquiry-notes-input">Additional Notes / Delivery Location</label>
              <textarea 
                id="inquiry-notes-input" 
                className="form-control" 
                style={{ minHeight: '80px' }} 
                placeholder="Details about your delivery address or custom requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Submit Direct Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
