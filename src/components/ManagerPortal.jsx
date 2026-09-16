import React, { useState } from 'react';

export default function ManagerPortal({ isOpen, onClose, customTiles, onAddTile, onDeleteTile, showToast }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [size, setSize] = useState('400x400 mm');
  const [status, setStatus] = useState('new'); // 'new' | 'old'
  const [finish, setFinish] = useState('Structured Matte');
  const [category, setCategory] = useState('parking');
  const [desc, setDesc] = useState('');

  // Base64 file uploads
  const [imgSingle, setImgSingle] = useState('');
  const [imgRoom, setImgRoom] = useState('');
  const [imgDetail, setImgDetail] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'sunton123') {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasscode('');
    } else {
      setAuthError(true);
    }
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setter(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e, setter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setter(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleResetForm = () => {
    setName('');
    setSize('400x400 mm');
    setStatus('new');
    setFinish('Structured Matte');
    setCategory('parking');
    setDesc('');
    setImgSingle('');
    setImgRoom('');
    setImgDetail('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imgSingle) {
      showToast('Please upload a Single Tile closeup image (*)', 'error');
      return;
    }

    const newTile = {
      id: 'custom-' + Date.now(),
      name,
      category,
      finish,
      size,
      status, // 'new' | 'old'
      badge: status === 'new' ? 'New Collection' : 'Classic',
      images: {
        tile: imgSingle,
        room: imgRoom,
        detail: imgDetail
      },
      desc
    };

    onAddTile(newTile);
    handleResetForm();
    
    let views = 1;
    if (newTile.images.room) views++;
    if (newTile.images.detail) views++;
    showToast(`New tile variant published with ${views} view(s)!`, 'success');
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setAuthError(false);
    setPasscode('');
    handleResetForm();
    onClose();
  };

  const renderUploadSlot = (slotId, label, required, stateVal, stateSetter) => {
    return (
      <div className="form-group">
        <label>{label} {required && '*'}</label>
        <div 
          className="file-upload-slot"
          id={`dropzone-${slotId}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stateSetter)}
          onClick={() => document.getElementById(`file-input-${slotId}`).click()}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          {stateVal ? (
            <img 
              src={stateVal} 
              alt="Preview" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} 
            />
          ) : (
            <>
              <div className="file-upload-icon-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div className="file-upload-slot-text">Drag photo or click here</div>
            </>
          )}
          <input 
            type="file"
            id={`file-input-${slotId}`}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => handleFileChange(e, stateSetter)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="manager-modal active" id="manager-portal-modal">
      <div className="manager-card" style={{ maxWidth: isAuthenticated ? '1000px' : '450px' }}>
        <div className="manager-header" style={{ background: 'var(--primary)' }}>
          <h3>SUNTON Admin Portal</h3>
          <button className="btn-close-manager" onClick={handleClose} aria-label="Close Portal">&times;</button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div style={{ padding: '2.5rem 2rem' }}>
            <form onSubmit={handleLogin} id="auth-panel">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
                Enter the administrator passcode to access inventory management.
              </p>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="admin-passcode">Security Passcode</label>
                <input 
                  type="password" 
                  id="admin-passcode" 
                  className="form-control"
                  placeholder="••••••••" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required 
                  autoFocus
                />
                {authError && (
                  <div className="error-message" id="auth-error-msg" style={{ display: 'block', color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Incorrect passcode. Access denied.
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary" id="btn-submit-auth" style={{ width: '100%' }}>
                Authorize Access
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Panel */
          <div className="dashboard-grid" id="dashboard-panel">
            {/* Left Column: Publish Form */}
            <div className="upload-section">
              <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Publish New Tile Variant</h4>
              <form onSubmit={handleSubmit} id="admin-upload-form">
                
                <div className="form-group">
                  <label htmlFor="tile-name">Tile Model Name *</label>
                  <input 
                    type="text" 
                    id="tile-name" 
                    className="form-control" 
                    placeholder="e.g. Vulcano Charcoal Textured"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="tile-category">Primary Category</label>
                    <select 
                      id="tile-category" 
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="parking">Parking Tiles</option>
                      <option value="vitrified">Vitrified Slabs</option>
                      <option value="floor">Floor Tiles</option>
                      <option value="wall">Wall Tiles</option>
                      <option value="bathroom">Bathroom Tiles</option>
                      <option value="kitchen">Kitchen Tiles</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="tile-finish">Texture Finish</label>
                    <input 
                      type="text" 
                      id="tile-finish" 
                      className="form-control" 
                      placeholder="e.g. Rustic Rock Relief"
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="tile-size">Dimensions</label>
                    <select 
                      id="tile-size" 
                      className="form-control"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="400x400 mm">400 x 400 mm</option>
                      <option value="500x500 mm">500 x 500 mm</option>
                      <option value="800x1600 mm">800x1600 mm</option>
                      <option value="800x800 mm">800x800 mm</option>
                      <option value="600x600 mm">600x600 mm</option>
                      <option value="300x600 mm">300x600 mm</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="tile-status">Status (Index Page Parking Placement)</label>
                    <select 
                      id="tile-status" 
                      className="form-control"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="new">New (Show on Index & Gallery)</option>
                      <option value="old">Old (Show on Gallery Only)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="tile-desc">Product Specifications & Description</label>
                  <textarea 
                    id="tile-desc" 
                    className="form-control" 
                    placeholder="Provide chemical resistance details, vehicle load capabilities, etc."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Upload Slots Zone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {renderUploadSlot('single', 'Tile Closeup *', true, imgSingle, setImgSingle)}
                  {renderUploadSlot('room', 'Room View', false, imgRoom, setImgRoom)}
                  {renderUploadSlot('detail', 'Detail View', false, imgDetail, setImgDetail)}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                  Publish Tile Variant
                </button>
              </form>
            </div>

            {/* Right Column: Inventory List */}
            <div className="inventory-panel">
              <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Current Tile Stock Listing</h4>
              <div className="inventory-list" id="admin-inventory-list">
                {customTiles.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No custom tile products uploaded yet.
                  </div>
                ) : (
                  customTiles.map((tile) => (
                    <div key={tile.id} className="inventory-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                      <img 
                        src={tile.images?.tile} 
                        alt={tile.name} 
                        className="inventory-img" 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                      />
                      <div className="inventory-info" style={{ flex: 1 }}>
                        <div className="inventory-name" style={{ fontWeight: '600', fontSize: '0.9rem' }}>{tile.name}</div>
                        <div className="inventory-meta" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {tile.size} | {tile.finish} | {tile.category.toUpperCase()} | {tile.status.toUpperCase()}
                        </div>
                      </div>
                      <button 
                        type="button"
                        className="btn-delete-tile" 
                        onClick={() => {
                          if (window.confirm('Delete this tile variant from inventory?')) {
                            onDeleteTile(tile.id);
                          }
                        }}
                        title="Delete product"
                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
