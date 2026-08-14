/* ═══════════════════════════════════════════════════════════
   LIBERIN CAPABILITIES DECK — Reveal.js Initialization
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  // ─── Viewport Detection for Responsive Canvas ───
  function getSlideConfig() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var isPortrait = h > w;
    var isMobile = w <= 768;

    if (isMobile && isPortrait) {
      document.body.classList.add('mobile-scroll');
      document.body.classList.remove('landscape-mobile');
      return { width: 1080, height: 1920, margin: 0, center: true };
    }

    // Match the canvas aspect ratio to the real window/screen aspect ratio
    // (clamped to sane bounds) so Reveal's scale-to-fit fills edge to edge
    // with zero letterboxing, instead of forcing a fixed 16:9 canvas that
    // leaves bars whenever the actual window isn't exactly 16:9.
    var aspect = w / h;
    var clampedAspect = Math.max(1.2, Math.min(aspect, 2.6));
    var canvasWidth = 1920;
    var canvasHeight = Math.round(canvasWidth / clampedAspect);

    document.body.classList.remove('mobile-scroll');
    document.body.classList.toggle('landscape-mobile', !isPortrait && h <= 500 && w <= 900);
    return { width: canvasWidth, height: canvasHeight, margin: 0, center: true };
  }

  var slideConfig = getSlideConfig();

  Reveal.initialize({
    width: slideConfig.width,
    height: slideConfig.height,
    margin: slideConfig.margin,
    center: slideConfig.center,
    minScale: 0.2,
    maxScale: 2.0,

    hash: true,
    history: true,
    controls: true,
    controlsLayout: 'bottom-right',
    progress: true,
    slideNumber: 'c/t',

    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',

    fragments: true,
    embedded: false,
    help: true,
    showNotes: false,
    autoPlayMedia: false,
    preloadIframes: true,

    touch: true,
    loop: false,
    mouseWheel: false,
  }).then(function () {
    var animatedSlides = {};

    Reveal.on('slidechanged', function (event) {
      var slide = event.currentSlide;
      var slideId = slide.id;
      if (slideId && !animatedSlides[slideId]) {
        animatedSlides[slideId] = true;
        setTimeout(function () { runSlideAnimation(slideId); }, 250);
      }
    });

    var firstSlide = Reveal.getCurrentSlide();
    if (firstSlide && firstSlide.id) {
      animatedSlides[firstSlide.id] = true;
      setTimeout(function () { runSlideAnimation(firstSlide.id); }, 400);
    }
  });

  // ─── Reconfigure on orientation/resize ───
  var resizeTimer;
  function handleViewportChange() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var newConfig = getSlideConfig();
      var currentWidth = Reveal.getConfig().width;
      var currentHeight = Reveal.getConfig().height;
      if (newConfig.width !== currentWidth || newConfig.height !== currentHeight) {
        Reveal.configure({
          width: newConfig.width, height: newConfig.height,
          margin: newConfig.margin, center: newConfig.center,
        });
        Reveal.layout();
      }
    }, 300);
  }
  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('orientationchange', function () {
    setTimeout(handleViewportChange, 100);
  });

  // ─── Fullscreen Toggle ───
  var fsBtn = document.createElement('button');
  fsBtn.id = 'fullscreen-btn';
  fsBtn.setAttribute('aria-label', 'Toggle fullscreen');
  document.body.appendChild(fsBtn);

  function createSvgIcon(paths) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '20'); svg.setAttribute('height', '20');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    paths.forEach(function (d) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    return svg;
  }

  var enterPaths = ['M8 3H5a2 2 0 0 0-2 2v3', 'M21 8V5a2 2 0 0 0-2-2h-3', 'M16 21h3a2 2 0 0 0 2-2v-3', 'M3 16v3a2 2 0 0 0 2 2h3'];
  var exitPaths = ['M4 14h6v6', 'M20 10h-6V4', 'M14 10l7-7', 'M3 21l7-7'];

  function updateFsIcon() {
    while (fsBtn.firstChild) fsBtn.removeChild(fsBtn.firstChild);
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
    if ((e.key === 'f' || e.key === 'F') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      toggleFullscreen();
    }
  });
});
