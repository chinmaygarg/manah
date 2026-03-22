/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Reveal.js Initialization & Event Handlers
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  // ─── Initialize Reveal.js ───
  Reveal.initialize({
    width: 1920,
    height: 1080,
    margin: 0.02,
    minScale: 0.2,
    maxScale: 2.0,

    // Navigation
    hash: true,
    history: true,
    center: true,
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

    // ─── Trigger first slide animation ───
    var firstSlide = Reveal.getCurrentSlide();
    if (firstSlide && firstSlide.id) {
      animatedSlides[firstSlide.id] = true;
      setTimeout(function () {
        runSlideAnimation(firstSlide.id);
      }, 600);
    }
  });

  // ─── Preload Critical Images ───
  var criticalImages = [
    '../website/public/images/logo.avif',
    '../website/public/images/divisions/manah_dynamics_hero.png',
    '../website/public/images/divisions/manah_aerospace_hero.png',
    '../website/public/images/divisions/green_energy_hero.png',
    '../website/public/images/hero/hero_construction_site.png',
    '../website/public/images/hero/hero_main_infrastructure.png',
    '../website/public/images/hero/hero_renewable_energy.png',
    '../website/public/images/gallery/corporate_boardroom_meeting.png',
  ];

  criticalImages.forEach(function (src) {
    var img = new Image();
    img.src = src;
  });
});
