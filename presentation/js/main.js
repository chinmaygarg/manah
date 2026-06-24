/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Reveal.js Initialization & Event Handlers
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  // ─── Store original slide backgrounds for theme toggling ───
  if (window.__themeManager) {
    window.__themeManager.storeOriginalBackgrounds();
  }

  // ─── Viewport Detection for Responsive Canvas ───
  function getSlideConfig() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var isPortrait = h > w;
    var isMobile = w <= 768;
    var isLandscapeMobile = !isPortrait && h <= 500;

    if (isMobile && isPortrait) {
      // Portrait phone — switch to portrait canvas
      document.body.classList.add('mobile-scroll');
      document.body.classList.remove('landscape-mobile');
      return { width: 1080, height: 1920, margin: 0.01, center: true };
    }
    if (isLandscapeMobile) {
      // Landscape phone — match canvas aspect ratio to viewport
      // so the slide fills the entire screen with zero black bars
      var canvasWidth = 1920;
      var canvasHeight = Math.round(canvasWidth * (h / w));
      document.body.classList.remove('mobile-scroll');
      document.body.classList.add('landscape-mobile');
      return { width: canvasWidth, height: canvasHeight, margin: 0.01, center: true };
    }
    // Tablet or desktop — standard 16:9
    document.body.classList.remove('mobile-scroll');
    document.body.classList.remove('landscape-mobile');
    return { width: 1920, height: 1080, margin: 0.02, center: true };
  }

  var slideConfig = getSlideConfig();

  // ─── Initialize Reveal.js ───
  Reveal.initialize({
    width: slideConfig.width,
    height: slideConfig.height,
    margin: slideConfig.margin,
    center: slideConfig.center,
    minScale: 0.2,
    maxScale: 2.0,

    // Navigation
    hash: true,
    history: true,
    controls: true,
    controlsLayout: 'bottom-right',
    progress: true,
    slideNumber: 'c/t',

    // Transitions (default — overridden per-slide via data-transition)
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',

    // Fragments
    fragments: true,

    // View
    embedded: false,
    help: true,
    showNotes: false,
    autoPlayMedia: false,
    preloadIframes: true,

    // Touch
    touch: true,
    loop: false,
    mouseWheel: false,
  }).then(function () {
    // ─── Apply saved theme after Reveal is ready ───
    if (window.__themeManager) {
      var saved = window.__themeManager.getSavedTheme();
      if (saved === 'light') {
        window.__themeManager.applyTheme('light');
      }
    }

    // ─── Track animated slides to avoid re-triggering ───
    var animatedSlides = {};

    // ─── Slide Change Handler ───
    Reveal.on('slidechanged', function (event) {
      var slide = event.currentSlide;
      var slideId = slide.id;

      if (slideId && !animatedSlides[slideId]) {
        animatedSlides[slideId] = true;
        setTimeout(function () {
          runSlideAnimation(slideId);
        }, 250);
      }

      // Resize charts on slide entry
      if (slideId) {
        initChartForSlide(slideId);
      }

      setTimeout(resizeAllCharts, 400);
    });

    // ─── Trigger first slide animation after access gate is unlocked ───
    var firstSlide = Reveal.getCurrentSlide();
    if (firstSlide && firstSlide.id) {
      animatedSlides[firstSlide.id] = true;
      // Store trigger function globally so access gate can call it
      window.__triggerCoverAnimation = function () {
        setTimeout(function () {
          runSlideAnimation(firstSlide.id);
        }, 400);
      };
      // If no access gate, trigger immediately
      var gate = document.getElementById('access-gate');
      if (!gate || gate.classList.contains('hidden')) {
        window.__triggerCoverAnimation();
      }
    }
  });

  // ─── Reconfigure Reveal.js on orientation change ───
  var resizeTimer;
  function handleViewportChange() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var newConfig = getSlideConfig();
      var currentWidth = Reveal.getConfig().width;
      var currentHeight = Reveal.getConfig().height;

      // Only reconfigure if dimensions actually changed
      if (newConfig.width !== currentWidth || newConfig.height !== currentHeight) {
        Reveal.configure({
          width: newConfig.width,
          height: newConfig.height,
          margin: newConfig.margin,
          center: newConfig.center,
        });
        // Force layout recalculation
        Reveal.layout();
        // Re-trigger chart resize after layout settles
        setTimeout(function () {
          if (typeof resizeAllCharts === 'function') {
            resizeAllCharts();
          }
        }, 500);
      }
    }, 300);
  }

  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('orientationchange', function () {
    // orientationchange fires before dimensions update, so delay
    setTimeout(handleViewportChange, 100);
  });

  // ─── Fullscreen Toggle ───
  var fsBtn = document.createElement('button');
  fsBtn.id = 'fullscreen-btn';
  fsBtn.setAttribute('aria-label', 'Toggle fullscreen');
  document.body.appendChild(fsBtn);

  function createSvgIcon(paths) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    paths.forEach(function (d) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    return svg;
  }

  var enterPaths = [
    'M8 3H5a2 2 0 0 0-2 2v3',
    'M21 8V5a2 2 0 0 0-2-2h-3',
    'M16 21h3a2 2 0 0 0 2-2v-3',
    'M3 16v3a2 2 0 0 0 2 2h3'
  ];
  var exitPaths = [
    'M4 14h6v6',
    'M20 10h-6V4',
    'M14 10l7-7',
    'M3 21l7-7'
  ];

  function updateFsIcon() {
    while (fsBtn.firstChild) { fsBtn.removeChild(fsBtn.firstChild); }
    fsBtn.appendChild(createSvgIcon(document.fullscreenElement ? exitPaths : enterPaths));
  }
  updateFsIcon();

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function () {});
    } else {
      document.exitFullscreen();
    }
  }

  fsBtn.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', updateFsIcon);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'f' || e.key === 'F') {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        toggleFullscreen();
      }
    }
  });

  // ─── Access Code Gate ───
  var accessGate = document.getElementById('access-gate');
  var accessInput = document.getElementById('access-code-input');
  var accessSubmit = document.getElementById('access-code-submit');
  var accessError = document.getElementById('access-error');
  var ACCESS_CODE = 'Manah505';

  function unlockPresentation() {
    var code = accessInput.value.trim();
    if (code === ACCESS_CODE) {
      accessGate.classList.add('hidden');
      document.documentElement.requestFullscreen().catch(function () {});
      // Trigger the cover slide M-A-N-A-H glow animation
      if (window.__triggerCoverAnimation) {
        window.__triggerCoverAnimation();
      }
    } else {
      accessError.textContent = 'Invalid access code';
      accessInput.value = '';
      accessInput.focus();
      accessInput.style.borderColor = '#ef4444';
      setTimeout(function () {
        accessInput.style.borderColor = '';
        accessError.textContent = '';
      }, 2000);
    }
  }

  accessSubmit.addEventListener('click', unlockPresentation);
  accessInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      unlockPresentation();
    }
  });

  // Focus the input on load
  setTimeout(function () { accessInput.focus(); }, 100);

  // ─── Preload Critical Images ───
  var criticalImages = [
    '../website/public/images/logo.avif',
    '../website/public/images/divisions/manah_dynamics_hero.webp',
    '../website/public/images/divisions/manah_aerospace_hero.webp',
    '../website/public/images/divisions/green_energy_hero.webp',
    '../website/public/images/hero/hero_construction_site.webp',
    '../website/public/images/hero/hero_main_infrastructure.webp',
    '../website/public/images/hero/hero_renewable_energy.webp',
    '../website/public/images/gallery/corporate_boardroom_meeting.webp',
  ];

  criticalImages.forEach(function (src) {
    var img = new Image();
    img.src = src;
  });
});
