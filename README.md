# Melody Chan - Portfolio Website

A minimal, responsive portfolio website with video support, built for GitHub Pages deployment.

## 🚀 Quick Start

1. **Fork or download** this repository
2. **Replace placeholder content** with your own projects and information
3. **Add your images and videos** to the `/assets/` folders
4. **Deploy to GitHub Pages**: 
   - Go to your repository Settings
   - Navigate to Pages section  
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Your site will be available at `https://yourusername.github.io/repository-name`

## 📁 File Structure

```
/
├── index.html              # Work grid (homepage)
├── about/
│   └── index.html         # About page
├── contact/
│   └── index.html         # Contact page  
├── work/
│   ├── project-one/
│   │   └── index.html     # Mixed media project example
│   └── project-two/
│       └── index.html     # Video-focused project example
├── assets/
│   ├── css/
│   │   ├── base.css       # Reset, variables, typography
│   │   ├── layout.css     # Grids, spacing, header/footer
│   │   ├── components.css # Cards, forms, buttons, video, lightbox
│   │   └── utilities.css  # Helper classes
│   ├── js/
│   │   ├── main.js        # Page transitions, forms, scroll
│   │   └── lightbox.js    # Image & video lightbox functionality
│   ├── img/
│   │   ├── thumbnails/    # Project thumbnail images (800x600px)
│   │   ├── projects/      # Full-size images & video posters
│   │   ├── favicon.ico
│   │   └── og-image.jpg
│   ├── video/             # MP4/WebM video files
│   ├── icons/             # SVG social icons
│   └── fonts/             # Custom fonts (optional)
└── README.md
```

## 🎥 Video Support

### Inline Videos
Add videos directly to project pages:
```html
<section class="video">
  <figure class="video__figure">
    <video class="video__media" controls playsinline preload="metadata" poster="/assets/img/projects/poster.jpg">
      <source src="/assets/video/demo.mp4" type="video/mp4">
      <source src="/assets/video/demo.webm" type="video/webm">
      Sorry, your browser doesn't support embedded videos.
    </video>
    <figcaption class="video__caption">Video description</figcaption>
  </figure>
</section>
```

### Video Lightbox
Open videos in the same lightbox as images:
```html
<a href="/assets/video/demo.mp4" data-lightbox="project1" data-type="video" aria-label="Play video">
  <img src="/assets/img/projects/video-poster.jpg" alt="Play video">
</a>
```

### Video Files
- **Formats**: MP4 (primary), WebM (alternative)
- **Size**: Keep under 20-40MB for web
- **Resolution**: 1080p max, consider 720p for longer videos
- **Poster images**: Always include for better UX

## ✏️ Customization Guide

### Adding a New Project

1. **Create project folder**: Copy `/work/project-one/` and rename to `/work/your-project-slug/`
2. **Add media**:
   - Thumbnail: `/assets/img/thumbnails/your-project.jpg` (800x600px)
   - Project images: `/assets/img/projects/your-project-*.jpg`
   - Videos: `/assets/video/your-project-*.mp4` (with WebM alternatives)
   - Video posters: `/assets/img/projects/your-project-*-poster.jpg`
3. **Update homepage**: Add your project card to `/index.html` in the work grid
4. **Edit project page**: Update content in `/work/your-project-slug/index.html`

### Project Layout Options

**Mixed Media (like Project One):**
- Hero image or video
- Two-column intro with fixed alignment
- Inline video component
- Mixed image/video gallery with lightbox

**Video-Focused (like Project Two):**
- Hero video (autoplay, muted, loop)
- Video-centric content sections
- Video thumbnail gallery for lightbox
- Multiple video formats and variations

### Updating Content

- **Contact info**: Edit email/phone in `/contact/index.html`
- **Social links**: Update LinkedIn/Instagram URLs in about and contact pages
- **Bio**: Edit the about section in `/about/index.html`
- **Site title**: Update "Melody Chan" references across all HTML files

## 🎯 Features

- ✅ **Responsive design** (mobile-first)
- ✅ **Video support** (inline + lightbox)
- ✅ **Mixed media lightbox** (images + videos in same gallery)
- ✅ **Fast page transitions** with CSS crossfade
- ✅ **Contact form** with validation + mailto
- ✅ **Back-to-top button** appears on scroll
- ✅ **Accessible** with proper ARIA labels and semantic HTML
- ✅ **SEO optimized** with meta tags and structured markup
- ✅ **GitHub Pages ready** (no build process required)

## 🔧 Technical Notes

- **Pure HTML/CSS/JS** - No frameworks or build tools
- **Modern browser support** - Uses CSS Grid, Flexbox, IntersectionObserver
- **Performance optimized** - Lazy loading, optimized media, minimal JS
- **Mobile responsive** - 3-column → 2-column → 1-column grid
- **Accessibility** - Keyboard navigation, screen reader support, focus management
- **Video formats** - MP4/WebM support with fallbacks

## 📝 Browser Support

- Chrome/Edge 88+
- Firefox 85+  
- Safari 14+
- Mobile browsers (iOS 14+, Android Chrome 88+)

## 🚨 Before Going Live

- [ ] Replace all "Melody Chan" references with your name
- [ ] Update contact information (email, phone, social links)
- [ ] Add your own project images and videos
- [ ] Create video poster images for all videos
- [ ] Replace favicon.ico and og-image.jpg
- [ ] Test contact form mailto functionality
- [ ] Verify all internal links work
- [ ] Test video playback on multiple devices
- [ ] Check video file sizes and loading performance
- [ ] Run accessibility audit

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

**Need help?** Check the README files in each assets folder for detailed guidance on file formats and specifications.
