import React, { useState } from 'react';

const FAQ_DATA = [
  {
    question: 'What is the minimum water absorption rate of your vitrified tiles?',
    answer: 'Our vitrified tiles possess an extremely low water absorption rate of less than 0.5% (typically averaging around 0.05%). This classifies them as fully vitrified/impervious tiles, offering outstanding resistance to frost, humidity, and staining.'
  },
  {
    question: 'Do you offer custom sizes and finishes for large scale commercial projects?',
    answer: 'Yes. For orders exceeding 5,000 square meters, we can adjust standard mold dimensions and print proprietary glaze patterns or design finishes customized by your design team. Contact our corporate project office for detailed consultations.'
  },
  {
    question: 'What is the difference between glossy, satin, and rustic tile finishes?',
    answer: `• Glossy / Polished: Features a highly reflective, mirror-like surface. Great for visual spaciousness but can be slippery when wet. Ideal for living rooms and lobbies.\n• Satin / Matte: Soft, non-reflective surface that feels smooth to touch. Excellent slip resistance and hides water marks well. Ideal for bedrooms and dry zones.\n• Rustic / Structured: Features textured finishes mimicking natural split stone or wood. Very high slip resistance, excellent for outdoor decks, wet rooms, and shower floors.`
  },
  {
    question: 'How do you pack tiles to avoid breakage during maritime shipping?',
    answer: 'Our tiles are packed in heavy-duty corrugated cartons fitted with plastic corner guards. The cartons are securely stacked on certified ISPM-15 heat-treated wooden pallets, wrapped in multiple layers of stretch film, and strapped down tightly. This robust packaging minimizes vibrations and prevents shifting inside container vessels.'
  },
  {
    question: 'Can I visit your showroom or manufacturing facility in Morbi?',
    answer: 'Absolutely. We welcome architects, dealers, and corporate clients to visit our state-of-the-art manufacturing plant and executive showroom in Morbi, Gujarat. Please coordinate with our customer relationships team to schedule a plant tour and showroom presentation.'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleOpen = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="section-padding" id="faq">
      <div className="container">
        <h2 className="section-title text-center">Frequently Asked Questions</h2>
        <p className="section-subtitle">Find immediate answers to questions regarding installations, sizing, custom designs, and shipment logistics.</p>
        
        <div className="faq-accordion">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`faq-item reveal active ${isOpen ? 'open' : ''}`}>
                <div className="faq-header" onClick={() => toggleOpen(idx)} style={{ cursor: 'pointer' }}>
                  <span className="faq-question">{item.question}</span>
                  <div className="faq-toggle">{isOpen ? '−' : '+'}</div>
                </div>
                <div 
                  className="faq-body"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out'
                  }}
                >
                  <div className="faq-content" style={{ whiteSpace: 'pre-line' }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
