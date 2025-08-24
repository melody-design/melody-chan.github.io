// Enhanced Lightbox with Video Support
document.addEventListener("DOMContentLoaded", function() {
    initLightbox();
});

let currentItems = [];
let currentIndex = 0;
let lightboxEl = null;

function initLightbox() {
    createLightboxHTML();
    bindLightboxTriggers();
    bindLightboxControls();
}

function createLightboxHTML() {
    lightboxEl = document.createElement('div');
    lightboxEl.className = 'lightbox';
    lightboxEl.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox" title="Close">&times;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous" title="Previous">&larr;</button>
        <button class="lightbox-nav lightbox-next" aria-label="Next" title="Next">&rarr;</button>
        <div class="lightbox-content" aria-live="polite"></div>
    `;
    document.body.appendChild(lightboxEl);
}

function bindLightboxTriggers() {
    document.querySelectorAll('[data-lightbox]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const group = trigger.getAttribute('data-lightbox');
            const type = trigger.getAttribute('data-type') || 'image';
            const href = trigger.getAttribute('href');

            // Build group items
            currentItems = [];
            const groupNodes = document.querySelectorAll(`[data-lightbox="${group}"]`);
            groupNodes.forEach((node, i) => {
                const nodeHref = node.getAttribute('href');
                const nodeType = node.getAttribute('data-type') || 'image';
                const alt = node.querySelector('img')?.getAttribute('alt') || node.getAttribute('aria-label') || '';
                currentItems.push({ src: nodeHref, alt, type: nodeType });
            });

            currentIndex = currentItems.findIndex(it => it.src === href);
            if (currentIndex < 0) currentIndex = 0;

            openLightbox();
            renderLightboxItem();
        });
    });
}

function bindLightboxControls() {
    // Close on background click
    lightboxEl.addEventListener('click', (e) => {
        if (e.target === lightboxEl) closeLightbox();
    });

    // Close button
    lightboxEl.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    // Navigation buttons
    lightboxEl.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
    lightboxEl.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightboxEl.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
        }
    });
}

function openLightbox() {
    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxEl.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
    stopAnyPlayingVideo();
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
}

function navigate(direction) {
    stopAnyPlayingVideo();
    currentIndex += direction;

    // Wrap around
    if (currentIndex < 0) currentIndex = currentItems.length - 1;
    if (currentIndex >= currentItems.length) currentIndex = 0;

    renderLightboxItem();
}

function renderLightboxItem() {
    const container = lightboxEl.querySelector('.lightbox-content');
    container.innerHTML = '';

    if (currentItems.length === 0) return;

    const item = currentItems[currentIndex];

    if (item.type === 'video') {
        const vid = document.createElement('video');
        vid.setAttribute('controls', '');
        vid.setAttribute('playsinline', '');
        vid.setAttribute('preload', 'metadata');

        // Add source
        const source = document.createElement('source');
        source.src = item.src;
        source.type = guessMimeType(item.src);
        vid.appendChild(source);

        // Fallback text
        vid.appendChild(document.createTextNode('Sorry, your browser doesn\'t support embedded videos.'));
        container.appendChild(vid);

        // Don\'t autoplay by default - respect user preferences
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt || '';
        container.appendChild(img);
    }

    updateNavVisibility();
    preloadAdjacent();
}

function stopAnyPlayingVideo() {
    const vid = lightboxEl.querySelector('video');
    if (vid && !vid.paused) {
        vid.pause();
        vid.currentTime = 0;
    }
}

function updateNavVisibility() {
    const showNav = currentItems.length > 1;
    lightboxEl.querySelector('.lightbox-prev').style.display = showNav ? 'flex' : 'none';
    lightboxEl.querySelector('.lightbox-next').style.display = showNav ? 'flex' : 'none';
}

function preloadAdjacent() {
    if (currentItems.length <= 1) return;

    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentItems.length - 1;
    const nextIndex = currentIndex + 1 < currentItems.length ? currentIndex + 1 : 0;

    [prevIndex, nextIndex].forEach(i => {
        const item = currentItems[i];
        if (item && item.type === 'image') {
            // Only preload images, not videos (bandwidth consideration)
            const img = new Image();
            img.src = item.src;
        }
    });
}

function guessMimeType(url) {
    const lower = url.split('?')[0].toLowerCase();
    if (lower.endsWith('.mp4')) return 'video/mp4';
    if (lower.endsWith('.webm')) return 'video/webm';
    if (lower.endsWith('.mov')) return 'video/quicktime';
    if (lower.endsWith('.avi')) return 'video/x-msvideo';
    if (lower.endsWith('.ogg')) return 'video/ogg';
    return 'video/mp4'; // Default fallback
}

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');

let isZoomed = false;
let isDragging = false;
let startX, startY, currentX = 0, currentY = 0, offsetX = 0, offsetY = 0;

// Toggle zoom on click
lightboxImg.addEventListener('click', () => {
  if (!isZoomed) {
    isZoomed = true;
    lightboxImg.classList.add('zoomed');
    lightboxImg.style.transform = `translate(0,0) scale(2)`; // zoom-in by 2x
  } else {
    isZoomed = false;
    offsetX = offsetY = currentX = currentY = 0;
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transform = `translate(0,0) scale(1)`; // back to fit
  }
  lightboxImg.style.cursor = isZoomed ? "grab" : "zoom-in";
});

// Start dragging
lightboxImg.addEventListener('mousedown', (e) => {
  if (!isZoomed) return;
  isDragging = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
  lightboxImg.style.cursor = "grabbing";
});

// Drag move
lightbox.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  offsetX = currentX;
  offsetY = currentY;
  lightboxImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(2)`;
});

// End dragging
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    lightboxImg.style.cursor = "grab";
  }
});
