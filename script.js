// DEFAULT TILE DATA SYSTEM
// PARKING TILES DATA SYSTEM
const PARKING_TILES = [
    {
        id: 'park-1',
        name: 'Titan Heavy Grid Grey',
        category: 'parking',
        size: '400x400 mm',
        finish: 'Structured Matte',
        badge: 'Heavy Duty',
        images: {
            tile: 'assets/images/prod-bathroom.png',
            room: 'assets/images/gallery-2.png',
            detail: 'assets/images/prod-bathroom.png'
        },
        desc: 'Ultra-durable textured grey parking tile with a checkered design, built to support heavy vehicle loads.'
    },
    {
        id: 'park-2',
        name: 'Vulcano Terra Cobble',
        category: 'parking',
        size: '400x400 mm',
        finish: 'Rustic Relief',
        badge: 'Anti-Skid',
        images: {
            tile: 'assets/images/prod-vitrified.png',
            room: 'assets/images/gallery-2.png',
            detail: 'assets/images/prod-vitrified.png'
        },
        desc: 'Rustic terracotta finish anti-skid tile, perfect for residential parking ramps, pathways, and driveways.'
    },
    {
        id: 'park-3',
        name: 'Sahara Gold Sandstone',
        category: 'parking',
        size: '400x400 mm',
        finish: 'Coarse Matte',
        badge: 'Premium',
        images: {
            tile: 'assets/images/prod-floor.png',
            room: 'assets/images/gallery-2.png',
            detail: 'assets/images/prod-floor.png'
        },
        desc: 'Textured golden sandstone pattern tile offering maximum skid resistance and rich aesthetic warmth.'
    },
    {
        id: 'park-4',
        name: 'Granite Rock Nero',
        category: 'parking',
        size: '500x500 mm',
        finish: 'Basalt Texture',
        badge: 'Extra Thick',
        images: {
            tile: 'assets/images/prod-kitchen.png',
            room: 'assets/images/gallery-2.png',
            detail: 'assets/images/prod-kitchen.png'
        },
        desc: 'Premium volcanic basalt design with deep grey tones and structured grip surface, engineered for high-traffic zones.'
    },
    {
        id: 'park-5',
        name: 'Castello Industrial Grey',
        category: 'parking',
        size: '500x500 mm',
        finish: 'Flamed Stone',
        badge: 'Best Seller',
        images: {
            tile: 'assets/images/prod-wall.png',
            room: 'assets/images/gallery-2.png',
            detail: 'assets/images/prod-wall.png'
        },
        desc: 'Cobble-stone finish porcelain parking slab, combining classical stone beauty with extreme industrial strength.'
    },
    {
        id: 'park-6',
        name: 'Adria Slate Earth',
        category: 'parking',
        size: '500x500 mm',
        finish: 'Structured Slate',
        badge: 'Oil Resistant',
        images: {
            tile: 'assets/images/prod-bathroom.png',
            room: 'assets/images/gallery-2.png',
            detail: 'assets/images/prod-bathroom.png'
        },
        desc: 'Structured slate texture tile in warm earth tones, resistant to oil spills, chemical wash, and tyre marks.'
    }
];

const DEFAULT_PRODUCTS = [
    {
        id: 'def-1',
        name: 'Carrara Gold Premium',
        category: 'vitrified',
        size: '800x1600 mm',
        finish: 'Mirror Polished',
        badge: 'Popular',
        images: {
            tile: 'assets/images/prod-vitrified.png',
            room: 'assets/images/gallery-1.png',
            detail: 'assets/images/prod-vitrified.png'
        },
        desc: 'A luxurious vitrified floor slab showcasing beautiful golden and soft gray veins on a deep sapphire and pristine white marble base.'
    },
    {
        id: 'def-2',
        name: 'Royal Statuario White',
        category: 'floor',
        size: '800x800 mm',
        finish: 'Super Glossy',
        badge: 'Best Seller',
        images: {
            tile: 'assets/images/prod-floor.png',
            room: 'assets/images/gallery-3.png',
            detail: 'assets/images/prod-floor.png'
        },
        desc: 'Exquisite white marble-look tiles with elegant, branching charcoal veins. Perfect for amplifying light and spatial aesthetics in living halls.'
    },
    {
        id: 'def-3',
        name: 'Ocean wave 3D',
        category: 'wall',
        size: '300x600 mm',
        finish: 'Satin Matte',
        badge: 'Trending',
        images: {
            tile: 'assets/images/prod-wall.png',
            room: 'assets/images/gallery-4.png',
            detail: 'assets/images/prod-wall.png'
        },
        desc: 'Textured designer wall tile featuring soft geometric wave reliefs. Ideal for creating contemporary statement walls in corridors and showers.'
    },
    {
        id: 'def-4',
        name: 'Azure Anti-skid Slate',
        category: 'bathroom',
        size: '600x600 mm',
        finish: 'Rustic Matte',
        badge: 'Durable',
        images: {
            tile: 'assets/images/prod-bathroom.png',
            room: 'assets/images/gallery-2.png',
            detail: 'assets/images/prod-bathroom.png'
        },
        desc: 'Deep blue and textured charcoal anti-slip surface. Specifically engineered to maintain wet grip, making it ideal for luxurious, safe bathrooms.'
    },
    {
        id: 'def-5',
        name: 'Glazed Emerald Subway',
        category: 'kitchen',
        size: '100x300 mm',
        finish: 'Glazed Glossy',
        badge: 'New',
        images: {
            tile: 'assets/images/prod-kitchen.png',
            room: 'assets/images/prod-kitchen.png',
            detail: 'assets/images/prod-kitchen.png'
        },
        desc: 'Vibrant dark emerald green glazed subway tiles. Excellent for herringbone kitchen backsplashes, offering high heat resistance and easy-clean properties.'
    }
];

const DEFAULT_GALLERY = [
    {
        id: 'gal-1',
        title: 'Minimalist Hotel Lobby',
        category: 'Vitrified Marble Slabs',
        image: 'assets/images/gallery-1.png'
    },
    {
        id: 'gal-2',
        title: 'Outdoor Swimming Deck',
        category: 'Rustic Slate Tiles',
        image: 'assets/images/gallery-2.png'
    },
    {
        id: 'gal-3',
        title: 'Corporate Headquarters Reception',
        category: 'Polished Flooring Slabs',
        image: 'assets/images/gallery-3.png'
    },
    {
        id: 'gal-4',
        title: 'Contemporary Master Suite Bathroom',
        category: 'Statuario Wall Coverings',
        image: 'assets/images/gallery-4.png'
    }
];

// STATE MANAGEMENT
let customTiles = [];
let currentCategoryFilter = 'all';
let uploadSingleBase64 = '';
let uploadRoomBase64 = '';
let uploadDetailBase64 = '';
let lightboxImagesArray = [];
let lightboxActiveIndex = 0;

// LOAD DYNAMIC CUSTOM ITEMS FROM LOCALSTORAGE
function loadCustomTiles() {
    const data = localStorage.getItem('sunton_custom_tiles');
    if (data) {
        try {
            customTiles = JSON.parse(data);
            // Migrate old items to directional views structure
            customTiles.forEach(tile => {
                if (!tile.images) {
                    tile.images = {
                        tile: tile.image || '',
                        room: '',
                        detail: ''
                    };
                } else if (Array.isArray(tile.images)) {
                    tile.images = {
                        tile: tile.images[0] || '',
                        room: tile.images[1] || '',
                        detail: tile.images[2] || ''
                    };
                }
            });
        } catch (e) {
            console.error('Failed parsing custom tile local storage data', e);
            customTiles = [];
        }
    } else {
        customTiles = [];
    }
}

// SAVE DYNAMIC CUSTOM ITEMS TO LOCALSTORAGE
function saveCustomTiles() {
    localStorage.setItem('sunton_custom_tiles', JSON.stringify(customTiles));
}

// INSTAGRAM CAROUSEL CONTROLLER FOR PRODUCT CARDS
window.slideCard = function(productId, direction, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const slider = document.getElementById(`slider-${productId}`);
    if (!slider) return;
    
    let activeIdx = parseInt(slider.getAttribute('data-active-index') || '0');
    const count = parseInt(slider.getAttribute('data-images-count') || '1');
    
    activeIdx = (activeIdx + direction + count) % count;
    slider.setAttribute('data-active-index', activeIdx);
    
    const track = slider.querySelector('.card-slider-track');
    if (track) {
        track.style.transform = `translateX(-${activeIdx * 100}%)`;
    }
    
    const dots = slider.querySelectorAll('.card-slider-dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
    });
};

// FULLSCREEN DETAIL LIGHTBOX SYSTEM
window.triggerLightboxZoom = function(productId, startIdx, event) {
    if (event) {
        event.stopPropagation();
    }
    
    const mergedCatalog = [...DEFAULT_PRODUCTS, ...customTiles, ...PARKING_TILES];
    const product = mergedCatalog.find(p => p.id.toString() === productId.toString());
    
    if (product) {
        openLightbox(product, startIdx);
    }
};

function openLightbox(product, startIdx) {
    const images = [product.images.tile, product.images.room, product.images.detail].filter(img => img);
    lightboxImagesArray = images;
    lightboxActiveIndex = startIdx;
    
    const track = document.getElementById('lightbox-slider-track');
    const prevBtn = document.getElementById('btn-prev-lightbox');
    const nextBtn = document.getElementById('btn-next-lightbox');
    const dotsContainer = document.getElementById('lightbox-dots-container');
    const lightbox = document.getElementById('lightbox-viewer');
    
    // Fill product detailed metadata inside modal text nodes
    document.getElementById('lightbox-product-badge').textContent = (product.category || 'Collection').toUpperCase();
    document.getElementById('lightbox-product-title').textContent = product.name;
    document.getElementById('lightbox-product-size').textContent = product.size || 'Custom Dimensions';
    document.getElementById('lightbox-product-finish').textContent = product.finish || 'Premium Texture';
    document.getElementById('lightbox-product-desc').textContent = product.desc || 'Stunning decorative coverage designed to inspire modern building facades.';
    
    // Bind Direct Inquiry form callback inside modal details panel
    document.getElementById('lightbox-btn-inquire').onclick = (e) => {
        e.preventDefault();
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        openInquiryModal(product.id, product.name);
    };
    
    // Fill track slides
    track.innerHTML = images.map(img => `<img src="${img}" alt="${product.name}">`).join('');
    
    const hasMultiple = images.length > 1;
    if (hasMultiple) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        
        // Build dot elements
        dotsContainer.innerHTML = images.map((_, idx) => `
            <div class="lightbox-dot ${idx === startIdx ? 'active' : ''}" onclick="slideLightbox(${idx})"></div>
        `).join('');
        dotsContainer.style.display = 'flex';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        dotsContainer.style.display = 'none';
    }
    
    // Position slider track
    track.style.transform = `translateX(-${startIdx * 100}%)`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.slideLightbox = function(index) {
    const count = lightboxImagesArray.length;
    if (count <= 1) return;
    
    lightboxActiveIndex = (index + count) % count;
    
    const track = document.getElementById('lightbox-slider-track');
    if (track) {
        track.style.transform = `translateX(-${lightboxActiveIndex * 100}%)`;
    }
    
    const dots = document.querySelectorAll('.lightbox-dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === lightboxActiveIndex);
    });
};

// WIRE UP LIGHTBOX NAV ARROWS
document.getElementById('btn-prev-lightbox').addEventListener('click', (e) => {
    e.stopPropagation();
    slideLightbox(lightboxActiveIndex - 1);
});

document.getElementById('btn-next-lightbox').addEventListener('click', (e) => {
    e.stopPropagation();
    slideLightbox(lightboxActiveIndex + 1);
});

// INVENTORY & PRODUCT RENDERING
function renderCatalog() {
    const productsContainer = document.getElementById('products-catalog-container');
    if (!productsContainer) return;
    
    // Clear and build complete list
    productsContainer.innerHTML = '';
    
    const mergedCatalog = [...DEFAULT_PRODUCTS, ...customTiles, ...PARKING_TILES];
    
    const filteredCatalog = currentCategoryFilter === 'all'
        ? mergedCatalog
        : mergedCatalog.filter(p => p.category === currentCategoryFilter);
        
    if (filteredCatalog.length === 0) {
        productsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <p>No tile models found under this category.</p>
            </div>
        `;
        return;
    }
    
    filteredCatalog.forEach(p => {
        const isCustom = p.id.toString().startsWith('custom-');
        const badgeText = p.badge || (isCustom ? 'Custom Collection' : '');
        
        // Filter out empty slots to make active slider array
        const imagesArray = [p.images.tile, p.images.room, p.images.detail].filter(img => img);
        const hasMultiple = imagesArray.length > 1;
        
        const card = document.createElement('div');
        card.className = 'product-card reveal active';
        
        let imageMarkup = '';
        if (hasMultiple) {
            imageMarkup = `
                <div class="product-img-box" id="slider-${p.id}" data-active-index="0" data-images-count="${imagesArray.length}">
                    <div class="card-slider-container">
                        <div class="card-slider-track" style="transform: translateX(0%);">
                            ${imagesArray.map((img, idx) => `
                                <img src="${img}" alt="${p.name}" onclick="triggerLightboxZoom('${p.id}', ${idx}, event)" loading="lazy">
                            `).join('')}
                        </div>
                    </div>
                    <button class="card-slider-btn card-slider-btn-prev" onclick="slideCard('${p.id}', -1, event)" aria-label="Previous image">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button class="card-slider-btn card-slider-btn-next" onclick="slideCard('${p.id}', 1, event)" aria-label="Next image">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                    <div class="card-slider-dots">
                        ${imagesArray.map((_, idx) => `<div class="card-slider-dot ${idx === 0 ? 'active' : ''}"></div>`).join('')}
                    </div>
                    ${badgeText ? `<span class="product-badge ${isCustom ? 'badge-custom' : ''}">${badgeText}</span>` : ''}
                </div>
            `;
        } else {
            imageMarkup = `
                <div class="product-img-box" id="img-box-${p.id}" onclick="triggerLightboxZoom('${p.id}', 0, event)">
                    <img src="${imagesArray[0]}" alt="${p.name}" loading="lazy">
                    ${badgeText ? `<span class="product-badge ${isCustom ? 'badge-custom' : ''}">${badgeText}</span>` : ''}
                </div>
            `;
        }
        
        card.innerHTML = `
            ${imageMarkup}
            <div class="product-content">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-specs">
                    <span class="spec-item">Size: ${p.size}</span>
                    <span class="spec-item">Finish: ${p.finish}</span>
                </div>
                <p class="product-desc">${p.desc}</p>
                <button class="btn-inquire" onclick="openInquiryModal('${p.id}', '${p.name.replace(/'/g, "\\'")}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Request Bulk Pricing
                </button>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}

function renderGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = '';
    
    // Default gallery items
    DEFAULT_GALLERY.forEach(item => {
        createGalleryElement(item.title, item.category, item.image);
    });
    
    // Add custom tile photos to inspiration gallery too
    customTiles.forEach(tile => {
        const images = tile.images || { tile: tile.image || '' };
        
        // Render Single Tile closeup in gallery
        createGalleryElement(tile.name, `${tile.finish} - ${tile.category.toUpperCase()}`, images.tile);
        
        // If there is a room installation setting uploaded, render that too!
        if (images.room) {
            createGalleryElement(`${tile.name} (Installation View)`, `${tile.finish} - ${tile.category.toUpperCase()}`, images.room);
        }
    });
}

function createGalleryElement(title, category, imageSrc) {
    const galleryContainer = document.getElementById('gallery-container');
    const item = document.createElement('div');
    item.className = 'gallery-item reveal active';
    item.innerHTML = `
        <img src="${imageSrc}" alt="${title}" loading="lazy">
        <div class="gallery-overlay">
            <div class="gallery-zoom-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
            <h4>${title}</h4>
            <p>${category}</p>
        </div>
    `;
    
    item.addEventListener('click', () => {
        // Create simulated product info object for gallery lightbox card display
        const mockProduct = {
            id: 'gallery-' + Date.now(),
            name: title,
            category: 'Inspiration Design',
            size: 'Installed Environment',
            finish: 'Showroom Preset',
            images: {
                tile: imageSrc,
                room: '',
                detail: ''
            },
            desc: `A professional real-world design setting demonstrating the beautiful placement of the ${title} tile lines inside premium architecture layouts.`
        };
        openLightbox(mockProduct, 0);
    });
    
    galleryContainer.appendChild(item);
}

function renderInventoryList() {
    const inventoryList = document.getElementById('admin-inventory-list');
    if (!inventoryList) return;
    
    inventoryList.innerHTML = '';
    
    if (customTiles.length === 0) {
        inventoryList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.9rem;">
                No custom tile products uploaded yet.
            </div>
        `;
        return;
    }
    
    customTiles.forEach(tile => {
        const images = tile.images || { tile: tile.image || '' };
        let count = 0;
        if (images.tile) count++;
        if (images.room) count++;
        if (images.detail) count++;
        
        const item = document.createElement('div');
        item.className = 'inventory-item';
        item.innerHTML = `
            <img src="${images.tile}" alt="${tile.name}" class="inventory-img">
            <div class="inventory-info">
                <div class="inventory-name">${tile.name}</div>
                <div class="inventory-meta">${count} view(s) | ${tile.size} | ${tile.finish} | ${tile.category.toUpperCase()}</div>
            </div>
            <button class="btn-delete-tile" onclick="deleteCustomTile('${tile.id}')" title="Delete product">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
        `;
        inventoryList.appendChild(item);
    });
}

// DELETE CUSTOM TILES
window.deleteCustomTile = function(id) {
    if (confirm('Are you sure you want to delete this custom tile variant from the inventory catalog?')) {
        customTiles = customTiles.filter(t => t.id !== id);
        saveCustomTiles();
        renderCatalog();
        renderGallery();
        renderInventoryList();
        showToast('Tile deleted successfully', 'success');
    }
};

// TOAST STAT SYSTEM
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast-status');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    
    toast.className = `toast-notification ${type} show`;
    toastMsg.textContent = message;
    toastIcon.textContent = type === 'success' ? '✓' : '✗';
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// MANAGER PORTAL AUTHENTICATION
['btn-open-portal', 'btn-open-portal-mobile'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', () => {
            document.getElementById('manager-portal-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});

document.getElementById('btn-close-portal').addEventListener('click', () => {
    document.getElementById('manager-portal-modal').classList.remove('active');
    document.body.style.overflow = '';
    resetAuthPanel();
});

function resetAuthPanel() {
    document.getElementById('auth-panel').style.display = 'block';
    document.getElementById('dashboard-panel').style.display = 'none';
    document.getElementById('admin-passcode').value = '';
    document.getElementById('auth-error-msg').style.display = 'none';
}

document.getElementById('btn-submit-auth').addEventListener('click', () => {
    const inputPass = document.getElementById('admin-passcode').value;
    if (inputPass === 'sunton123') {
        document.getElementById('auth-panel').style.display = 'none';
        document.getElementById('dashboard-panel').style.display = 'block';
        document.getElementById('auth-error-msg').style.display = 'none';
        renderInventoryList();
    } else {
        document.getElementById('auth-error-msg').style.display = 'block';
    }
});

// PASSCODE LOGIN BY ENTER KEY
document.getElementById('admin-passcode').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('btn-submit-auth').click();
    }
});

// MULTI-SLOT FILE UPLOADER LOGIC
function wireSlotUploader(slotId, previewId) {
    const dropzone = document.getElementById(`dropzone-${slotId}`);
    const input = document.getElementById(`tile-image-input-${slotId}`);
    const preview = document.getElementById(previewId);
    
    if (!dropzone || !input || !preview) return;
    
    const dropzoneText = dropzone.querySelector('.file-upload-slot-text');
    const dropzoneIcon = dropzone.querySelector('.file-upload-icon-slot');
    
    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target.result;
                
                // Save to local file state variables
                if (slotId === 'single') uploadSingleBase64 = base64;
                if (slotId === 'room') uploadRoomBase64 = base64;
                if (slotId === 'detail') uploadDetailBase64 = base64;
                
                preview.src = base64;
                preview.style.display = 'block';
                
                if (dropzoneIcon) dropzoneIcon.style.display = 'none';
                if (dropzoneText) dropzoneText.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    });
    
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });
    
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            input.files = e.dataTransfer.files;
            processFile(e.dataTransfer.files[0]);
        }
    });
}

// RESET THE DYNAMIC FORM UPLOADER
function resetFormUploader() {
    document.getElementById('admin-upload-form').reset();
    uploadSingleBase64 = '';
    uploadRoomBase64 = '';
    uploadDetailBase64 = '';
    
    // Reset all previews
    const previewIds = ['preview-single', 'preview-room', 'preview-detail'];
    const slotIds = ['single', 'room', 'detail'];
    
    slotIds.forEach((slot, idx) => {
        const dropzone = document.getElementById(`dropzone-${slot}`);
        const preview = document.getElementById(previewIds[idx]);
        
        if (dropzone && preview) {
            preview.src = '';
            preview.style.display = 'none';
            
            const dropzoneText = dropzone.querySelector('.file-upload-slot-text');
            const dropzoneIcon = dropzone.querySelector('.file-upload-icon-slot');
            
            if (dropzoneIcon) dropzoneIcon.style.display = 'block';
            if (dropzoneText) dropzoneText.style.display = 'block';
        }
    });
}

// UPLOAD FORM SUBMIT
document.getElementById('admin-upload-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('tile-name').value;
    const category = document.getElementById('tile-category').value;
    const finish = document.getElementById('tile-finish').value;
    const size = document.getElementById('tile-size').value;
    const badge = document.getElementById('tile-status').value;
    const desc = document.getElementById('tile-desc').value;
    
    if (!uploadSingleBase64) {
        showToast('Please upload a Single Tile closeup image (*)', 'error');
        return;
    }
    
    const newTile = {
        id: 'custom-' + Date.now(),
        name,
        category,
        finish,
        size,
        badge: badge || 'Custom Collection',
        images: {
            tile: uploadSingleBase64,
            room: uploadRoomBase64,
            detail: uploadDetailBase64
        },
        desc
    };
    
    customTiles.push(newTile);
    saveCustomTiles();
    
    renderCatalog();
    renderGallery();
    renderInventoryList();
    
    resetFormUploader();
    
    let count = 1;
    if (newTile.images.room) count++;
    if (newTile.images.detail) count++;
    
    showToast('New tile with ' + count + ' directional view(s) published!', 'success');
});

// QUICK INQUIRY MODAL SYSTEM
window.openInquiryModal = function(id, name) {
    const modal = document.getElementById('inquiry-modal');
    document.getElementById('inquiry-product-id').value = id;
    document.getElementById('inquiry-tile-name').innerHTML = `Inquire: ${name}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

document.getElementById('btn-close-inquiry').addEventListener('click', () => {
    document.getElementById('inquiry-modal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('inquiry-form').reset();
});

document.getElementById('inquiry-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('inquiry-modal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('inquiry-form').reset();
    showToast('Inquiry submitted. Our sales coordinator will contact you shortly.', 'success');
});

// LIGHTBOX CLOSER
document.getElementById('btn-close-lightbox').addEventListener('click', () => {
    document.getElementById('lightbox-viewer').classList.remove('active');
    document.body.style.overflow = '';
});
document.getElementById('lightbox-viewer').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-viewer' || e.target.id === 'lightbox-slider-track') {
        document.getElementById('lightbox-viewer').classList.remove('active');
        document.body.style.overflow = '';
    }
});

// HOME HERO PAGE STICKY NAV BACKGROUND
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// SECTIONS ACTIVE NAV INDICATOR ON SCROLL
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 120)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// MOBILE MENU ACTION
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// TESTIMONIAL SLIDER IMPLEMENTATION
const testTrack = document.getElementById('testimonial-track');
const testSlides = document.querySelectorAll('.testimonial-slide');
const prevTestBtn = document.getElementById('btn-prev-test');
const nextTestBtn = document.getElementById('btn-next-test');
const dotsContainer = document.getElementById('slider-dots-container');

let testCurrentIdx = 0;
let testimonialInterval;

function initTestimonials() {
    if (!testSlides.length || !testTrack) return;
    
    // Create dots
    dotsContainer.innerHTML = '';
    testSlides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            gotoSlide(idx);
            resetTestimonialTimer();
        });
        dotsContainer.appendChild(dot);
    });
    
    // Slide controls
    prevTestBtn.addEventListener('click', () => {
        testCurrentIdx = (testCurrentIdx - 1 + testSlides.length) % testSlides.length;
        gotoSlide(testCurrentIdx);
        resetTestimonialTimer();
    });
    
    nextTestBtn.addEventListener('click', () => {
        testCurrentIdx = (testCurrentIdx + 1) % testSlides.length;
        gotoSlide(testCurrentIdx);
        resetTestimonialTimer();
    });
    
    startTestimonialTimer();
}

function gotoSlide(idx) {
    testCurrentIdx = idx;
    testTrack.style.transform = `translateX(-${idx * 100}%)`;
    
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, dotIdx) => {
        dot.className = `slider-dot ${dotIdx === idx ? 'active' : ''}`;
    });
}

// AUTOSCROLL SLIDER TIMER
function startTestimonialTimer() {
    testimonialInterval = setInterval(() => {
        testCurrentIdx = (testCurrentIdx + 1) % testSlides.length;
        gotoSlide(testCurrentIdx);
    }, 6000);
}

function resetTestimonialTimer() {
    clearInterval(testimonialInterval);
    startTestimonialTimer();
}

// FAQ ACCORDION HANDLERS
const faqHeaders = document.querySelectorAll('.faq-header');
faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isOpen = item.classList.contains('open');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-body').style.maxHeight = '0';
        });
        
        if (!isOpen) {
            item.classList.add('open');
            const body = item.querySelector('.faq-body');
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
});

// PRODUCTS FILTER CLICK ACTIONS
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentCategoryFilter = btn.getAttribute('data-filter');
        renderCatalog();
    });
});

// OUTSIDE LINK ACCELERATOR FOR FOOTER LINK FILTER
window.setProductFilter = function(category) {
    currentCategoryFilter = category;
    
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
    if (filterBtn) {
        filterButtons.forEach(b => b.classList.remove('active'));
        filterBtn.classList.add('active');
    }
    
    renderCatalog();
};

// BUSINESS CONTACT FORM SUBMISSION
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    
    // Show sending feedback
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>`;
    
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        e.target.reset();
        showToast('Your inquiry has been successfully sent. We will respond within 24 hours.', 'success');
    }, 1500);
});

// INTERSECTION OBSERVER FOR TRANSITIONS
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

function setupRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(r => revealObserver.observe(r));
}

// PARKING TILES FILTER & RENDER
window.filterParkingTiles = function(size, btnElement) {
    const buttons = document.querySelectorAll('.size-filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
        btnElement.classList.add('active');
    }
    renderParkingTiles(size);
};

function renderParkingTiles(size) {
    const container = document.getElementById('parking-tiles-container');
    if (!container) return;
    
    container.innerHTML = '';
    const filtered = PARKING_TILES.filter(tile => tile.size === size);
    
    filtered.forEach(p => {
        const imagesArray = [p.images.tile, p.images.room, p.images.detail].filter(img => img);
        const hasMultiple = imagesArray.length > 1;
        
        const card = document.createElement('div');
        card.className = 'product-card reveal active';
        
        let imageMarkup = '';
        if (hasMultiple) {
            imageMarkup = `
                <div class="product-img-box" id="slider-${p.id}" data-active-index="0" data-images-count="${imagesArray.length}">
                    <div class="card-slider-container">
                        <div class="card-slider-track" style="transform: translateX(0%);">
                            ${imagesArray.map((img, idx) => `
                                <img src="${img}" alt="${p.name}" onclick="triggerLightboxZoom('${p.id}', ${idx}, event)" loading="lazy">
                            `).join('')}
                        </div>
                    </div>
                    <button class="card-slider-btn card-slider-btn-prev" onclick="slideCard('${p.id}', -1, event)" aria-label="Previous image">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button class="card-slider-btn card-slider-btn-next" onclick="slideCard('${p.id}', 1, event)" aria-label="Next image">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                    <div class="card-slider-dots">
                        ${imagesArray.map((_, idx) => `<div class="card-slider-dot ${idx === 0 ? 'active' : ''}"></div>`).join('')}
                    </div>
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                </div>
            `;
        } else {
            imageMarkup = `
                <div class="product-img-box" id="img-box-${p.id}" onclick="triggerLightboxZoom('${p.id}', 0, event)">
                    <img src="${imagesArray[0]}" alt="${p.name}" loading="lazy">
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                </div>
            `;
        }
        
        card.innerHTML = `
            ${imageMarkup}
            <div class="product-content">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-specs">
                    <span class="spec-item">Size: ${p.size}</span>
                    <span class="spec-item">Finish: ${p.finish}</span>
                </div>
                <p class="product-desc">${p.desc}</p>
                <button class="btn-inquire" onclick="openInquiryModal('${p.id}', '${p.name.replace(/'/g, "\\'")}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Request Bulk Pricing
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// INIT APPLICATION
window.addEventListener('DOMContentLoaded', () => {
    loadCustomTiles();
    renderCatalog();
    renderParkingTiles('400x400 mm');
    renderGallery();
    initTestimonials();
    setupRevealAnimations();
    
    // Initialize slot upload listeners
    wireSlotUploader('single', 'preview-single');
    wireSlotUploader('room', 'preview-room');
    wireSlotUploader('detail', 'preview-detail');
});