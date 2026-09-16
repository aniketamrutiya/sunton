import React, { useState } from 'react';

export default function ContactForm({ showToast }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('Pricing Request');
  const [msg, setMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setName('');
      setContact('');
      setSubject('Pricing Request');
      setMsg('');
      showToast('Your inquiry has been successfully sent. We will respond within 24 hours.', 'success');
    }, 1500);
  };

  return (
    <section className="section-padding" id="contact" style={{ background: 'var(--bg-white)' }}>
      <div className="container">
        <h2 className="section-title text-center">Get in Touch</h2>
        <p className="section-subtitle">Reach out to our global sales coordinators for pricing inquiries, product samples, or project quotations.</p>
        
        <div className="contact-grid">
          {/* Left Column Info */}
          <div className="contact-info reveal active">
            <div className="info-item">
              <div className="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="info-details">
                <h4>Corporate Office & Factory</h4>
                <p>Survey No. 412/P1, Morbi-2 Bypass Road, Morbi - 363642, Gujarat, India</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="info-details">
                <h4>Phone & Support</h4>
                <p>+91 2822 294801 (Office)<br />+91 98765 43210 (Sales Coordinator)</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="info-details">
                <h4>Email Support</h4>
                <p>info@suntonceramics.com<br />exports@suntonceramics.com</p>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="contact-form-box reveal active">
            <form onSubmit={handleSubmit} id="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name *</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  className="form-control" 
                  placeholder="e.g. Ramesh Shah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-email">Email or Phone Number *</label>
                <input 
                  type="text" 
                  id="contact-email" 
                  className="form-control" 
                  placeholder="e.g. ramesh@gmail.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-subject">Inquiry Subject</label>
                <select 
                  id="contact-subject" 
                  className="form-control"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="Pricing Request">Bulk Pricing Quotation</option>
                  <option value="Sample Request">Physical Sample Request</option>
                  <option value="Dealership Inquiry">Dealership & Distribution</option>
                  <option value="Custom Order">Custom Manufacture Query</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-msg">Message details *</label>
                <textarea 
                  id="contact-msg" 
                  className="form-control" 
                  placeholder="Describe your project sizes, specifications, and delivery locations..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Sending...
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin-icon" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                      <line x1="12" y1="2" x2="12" y2="6"/>
                      <line x1="12" y1="18" x2="12" y2="22"/>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                      <line x1="2" y1="12" x2="6" y2="12"/>
                      <line x1="18" y1="12" x2="22" y2="12"/>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                    </svg>
                  </>
                ) : (
                  'Send Business Inquiry'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
