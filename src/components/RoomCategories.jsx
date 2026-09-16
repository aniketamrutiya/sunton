import React from 'react';

const CATEGORIES = [
  {
    name: 'Bathroom Tiles',
    desc: 'Stain resistant & moisture proof finishes.',
    img: 'assets/images/prod-bathroom.png'
  },
  {
    name: 'Kitchen Tiles',
    desc: 'Thermal resistant & easy clean surfaces.',
    img: 'assets/images/prod-kitchen.png'
  },
  {
    name: 'Living & Floor',
    desc: 'Polished vitrified formats for high traffic.',
    img: 'assets/images/prod-floor.png'
  },
  {
    name: 'Vitrified Slabs',
    desc: 'Seamless joint-free premium grand sizing.',
    img: 'assets/images/prod-vitrified.png'
  },
  {
    name: 'Wall Tiles',
    desc: 'Elegant digital glazed textures for accents.',
    img: 'assets/images/prod-wall.png'
  }
];

export default function RoomCategories() {
  return (
    <section className="categories-section" id="room-categories">
      <div className="container">
        <h2 className="section-title text-center">Shop by Room Category</h2>
        <p className="section-subtitle text-center">
          Browse our tailored ceramic tiles, vitrified slabs, and architectural designs configured for specific living spaces.
        </p>

        <div className="categories-grid">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className="category-card reveal active">
              <img src={cat.img} alt={cat.name} loading="lazy" />
              <div className="category-card-overlay">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
