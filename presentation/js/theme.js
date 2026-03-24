/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Theme Manager (Dark / Light)
   ═══════════════════════════════════════════════════════════ */

(function () {
  var STORAGE_KEY = 'manah-presentation-theme';

  var DARK_TO_LIGHT_BG = {
    '#0A1628': '#F5F5F0',
    '#0a1628': '#F5F5F0',
    '#060E1A': '#E8E8E0',
    '#060e1a': '#E8E8E0',
  };

  var LIGHT_TO_DARK_BG = {};
  Object.keys(DARK_TO_LIGHT_BG).forEach(function (k) {
    LIGHT_TO_DARK_BG[DARK_TO_LIGHT_BG[k]] = k;
  });

  // ─── Store original background colors ───
  function storeOriginalBackgrounds() {
    var slides = document.querySelectorAll('.reveal .slides > section[data-background-color]');
    slides.forEach(function (slide) {
      if (!slide.dataset.originalBgColor) {
        slide.dataset.originalBgColor = slide.getAttribute('data-background-color');
      }
    });
  }

  // ─── Slides that keep their dark background in both themes ───
  var THEME_LOCKED_SLIDES = ['slide-cover'];

  // ─── Swap slide background colors ───
  function applySlideBackgrounds(theme) {
    var slides = document.querySelectorAll('.reveal .slides > section[data-original-bg-color]');
    slides.forEach(function (slide) {
      // Skip slides that should always stay dark
      if (THEME_LOCKED_SLIDES.indexOf(slide.id) !== -1) return;

      var orig = slide.dataset.originalBgColor;
      if (theme === 'light') {
        var lightBg = DARK_TO_LIGHT_BG[orig] || DARK_TO_LIGHT_BG[orig.toLowerCase()] || '#F5F5F0';
        slide.setAttribute('data-background-color', lightBg);
      } else {
        slide.setAttribute('data-background-color', orig);
      }
    });

    // Force Reveal.js to re-read data attributes
    if (typeof Reveal !== 'undefined' && Reveal.isReady()) {
      Reveal.sync();
    }
  }

  // ─── Apply theme ───
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }

    applySlideBackgrounds(theme);

    // Notify charts to refresh
    if (typeof window.__refreshChartsForTheme === 'function') {
      setTimeout(window.__refreshChartsForTheme, 200);
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) { /* ignore */ }

    updateToggleIcon(theme);
  }

  // ─── Toggle ───
  function toggleTheme() {
    var current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  }

  // ─── Get saved theme ───
  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  // ─── Toggle Button ───
  var toggleBtn = null;

  function createSvgIcon(paths) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
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

  // Sun icon (shown in dark mode — click to go light)
  var sunPaths = [
    'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  ];

  // Moon icon (shown in light mode — click to go dark)
  var moonPaths = [
    'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  ];

  function updateToggleIcon(theme) {
    if (!toggleBtn) return;
    while (toggleBtn.firstChild) { toggleBtn.removeChild(toggleBtn.firstChild); }
    toggleBtn.appendChild(createSvgIcon(theme === 'light' ? moonPaths : sunPaths));
  }

  function createToggleButton() {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Toggle light/dark theme');
    toggleBtn.addEventListener('click', toggleTheme);
    document.body.appendChild(toggleBtn);
  }

  // ─── Public API ───
  window.__themeManager = {
    storeOriginalBackgrounds: storeOriginalBackgrounds,
    applyTheme: applyTheme,
    toggleTheme: toggleTheme,
    getSavedTheme: getSavedTheme,
  };

  // ─── Init on DOM ready ───
  function init() {
    createToggleButton();

    var saved = getSavedTheme();
    if (saved === 'light') {
      document.body.classList.add('light-theme');
    }
    updateToggleIcon(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
