/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — GSAP Animations
   Uses gsap.fromTo() for safety — never leaves elements invisible.
   ═══════════════════════════════════════════════════════════ */

/* ─── Project Background Slideshow ─── */
(function() {
  var intervalMs = 3000;
  document.querySelectorAll('.project-bg-slideshow').forEach(function(slideshow) {
    var imgs = slideshow.querySelectorAll('.project-bg-img');
    if (imgs.length <= 1) return;
    var current = 0;
    setInterval(function() {
      imgs[current].classList.remove('active');
      current = (current + 1) % imgs.length;
      imgs[current].classList.add('active');
    }, intervalMs);
  });
})();

/* ─── Project Footprints Gallery Transitions ─── */
(function() {
  document.querySelectorAll('.gallery-slot').forEach(function(slot, index) {
    var imgs = slot.querySelectorAll('.gallery-img');
    if (imgs.length <= 1) return;
    var current = 0;
    var delay = 3000 + (index * 800);
    setInterval(function() {
      imgs[current].classList.remove('active');
      current = (current + 1) % imgs.length;
      imgs[current].classList.add('active');
    }, delay);
  });
})();

/* ─── Counter Animation ─── */
function animateCounter(element, target, duration, prefix, suffix) {
  var p = prefix || '';
  var s = suffix || '';
  var isFloat = target % 1 !== 0;
  var obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: duration || 1.5,
    ease: 'power2.out',
    onUpdate: function () {
      var display = isFloat ? obj.val.toFixed(1) : Math.round(obj.val);
      element.textContent = p + display.toLocaleString() + s;
    },
  });
}

/* ─── Safe animate helper — always ensures end state is visible ─── */
function safeFrom(targets, vars, position, timeline) {
  if (!targets || (targets.length !== undefined && targets.length === 0)) return;
  var tl = timeline || gsap.timeline();
  var endVars = { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1, clearProps: 'all' };
  tl.fromTo(targets,
    { opacity: 0, y: vars.y || 0, x: vars.x || 0, scale: vars.scale || 1, scaleX: vars.scaleX || 1 },
    Object.assign({}, endVars, { duration: vars.duration || 0.6, ease: vars.ease || 'power3.out', stagger: vars.stagger || 0 }),
    position || '+=0'
  );
  return tl;
}

/* ─── Slide Animation Timelines ─── */
var SLIDE_ANIMATIONS = {
  /* Slide 1: Cover */
  'slide-cover': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('.cover-logo'), { scale: 0.8, duration: 0.8 }, 0, tl);
    safeFrom(section.querySelector('.cover-headline'), { y: 40, duration: 0.8 }, '-=0.4', tl);
    safeFrom(section.querySelector('.cover-subtitle'), { y: 30, duration: 0.6 }, '-=0.3', tl);

    /* M-A-N-A-H letter glow — staggered one by one */
    var letters = section.querySelectorAll('.cover-division-letter');
    var labels = section.querySelectorAll('.cover-division-item .cover-division');

    /* Theme-aware colors */
    var isLight = document.body.classList.contains('light-theme');
    var letterBase = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.12)';
    var letterFade = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)';
    var glowColor = isLight ? '#9A7B3C' : '#C8A96E';
    var glowShadow = isLight
      ? '0 0 20px rgba(154,123,60,0.5), 0 0 40px rgba(154,123,60,0.25), 0 0 80px rgba(154,123,60,0.1)'
      : '0 0 20px rgba(200,169,110,0.6), 0 0 40px rgba(200,169,110,0.3), 0 0 80px rgba(200,169,110,0.15)';

    /* Reset letters and labels for re-trigger */
    gsap.set(letters, { color: letterBase, textShadow: 'none', scale: 1 });
    gsap.set(labels, { opacity: 0, y: 8 });

    letters.forEach(function (letter, i) {
      /* Each letter glows gold then fades back */
      tl.to(letter, {
        color: glowColor,
        textShadow: glowShadow,
        scale: 1.08,
        duration: 0.4,
        ease: 'power2.out'
      }, 1.2 + i * 0.3);

      tl.to(letter, {
        color: letterFade,
        textShadow: 'none',
        scale: 1,
        duration: 0.6,
        ease: 'power2.inOut'
      }, 1.2 + i * 0.3 + 0.4);

      /* Label fades in as letter glows */
      tl.to(labels[i], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, 1.2 + i * 0.3 + 0.2);
    });

    return tl;
  },

  /* Slide 2: Challenge */
  'slide-challenge': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('.badge'), { y: -20, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.7 }, '-=0.2', tl);
    safeFrom(section.querySelectorAll('p'), { y: 20, duration: 0.5, stagger: 0.12 }, '-=0.3', tl);
    safeFrom(section.querySelector('.split-image, .slide-image'), { x: 60, duration: 0.8 }, '-=0.5', tl);
    return tl;
  },

  /* Slide 3: Who We Are */
  'slide-whoweare': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.7 }, 0, tl);
    safeFrom(section.querySelector('.gold-line'), { scaleX: 0, duration: 0.5 }, '-=0.3', tl);
    safeFrom(section.querySelectorAll('p'), { y: 20, duration: 0.5, stagger: 0.15 }, '-=0.2', tl);
    safeFrom(section.querySelectorAll('.card'), { y: 20, duration: 0.4, stagger: 0.1 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 4: At a Glance — Counter animations */
  'slide-glance': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);

    var cards = section.querySelectorAll('.stat-card');
    safeFrom(cards, { y: 30, duration: 0.4, stagger: 0.08 }, '-=0.2', tl);

    // Animate counters after cards are visible
    tl.call(function () {
      cards.forEach(function (card) {
        var counterEl = card.querySelector('.stat-number');
        if (counterEl) {
          var target = parseFloat(counterEl.dataset.target);
          var prefix = counterEl.dataset.prefix || '';
          var suffix = counterEl.dataset.suffix || '';
          animateCounter(counterEl, target, 1.5, prefix, suffix);
        }
      });
    });

    return tl;
  },

  /* Slide 5: Group Structure */
  'slide-structure': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelector('.org-node-primary'), { scale: 0.8, duration: 0.5 }, '-=0.2', tl);
    var nodes = section.querySelectorAll('.org-node-secondary, .card');
    safeFrom(nodes, { y: 20, duration: 0.4, stagger: 0.12 }, '-=0.1', tl);
    return tl;
  },

  /* Slide 6: Dynamics Intro */
  'slide-dynamics': function (s) { return divisionIntroAnim(s); },

  /* Slide 7: Sectors Grid */
  'slide-sectors': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.sector-item'), { y: 25, duration: 0.3, stagger: 0.05 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 8: Track Record */
  'slide-track-record': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.numbered-list li'), { x: -30, duration: 0.4, stagger: 0.12 }, '-=0.2', tl);
    safeFrom(section.querySelector('.slide-image'), { x: 40, duration: 0.6 }, '-=0.4', tl);
    return tl;
  },

  /* Slide 9: Project Footprints */
  'slide-footprints': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.photo-mosaic .mosaic-item'), { scale: 0.9, duration: 0.3, stagger: 0.06 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 10: Tech & Mfg */
  'slide-tech-mfg': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.card'), { y: 20, duration: 0.3, stagger: 0.08 }, '-=0.2', tl);
    safeFrom(section.querySelector('.slide-image'), { x: 40, duration: 0.6 }, '-=0.4', tl);
    return tl;
  },

  /* Slide 11: Products */
  'slide-products': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.card'), { y: 25, duration: 0.3, stagger: 0.08 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 12: Pipeline */
  'slide-pipeline': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    tl.call(function () { initChartForSlide('slide-pipeline'); });
    return tl;
  },

  /* Slide 13: Aerospace Intro */
  'slide-aerospace': function (s) { return divisionIntroAnim(s); },

  /* Slide 14: MRO Services */
  'slide-mro-services': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.card'), { y: 30, duration: 0.4, stagger: 0.12 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 15: Certifications */
  'slide-certifications': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.cert-item'), { x: -30, duration: 0.3, stagger: 0.1 }, '-=0.2', tl);
    safeFrom(section.querySelector('.slide-image'), { x: 40, duration: 0.6 }, '-=0.4', tl);
    return tl;
  },

  /* Slide 16: MRO Map */
  'slide-mro-map': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    tl.call(function () { initChartForSlide('slide-mro-map'); });
    return tl;
  },

  /* Slide 17: Green Energy */
  'slide-green-energy': function (s) { return divisionIntroAnim(s); },

  /* Slide 18: Green H2 Progress */
  'slide-green-progress': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.milestone-card'), { x: -30, duration: 0.4, stagger: 0.15 }, '-=0.2', tl);
    safeFrom(section.querySelector('.slide-image'), { x: 40, duration: 0.6 }, '-=0.4', tl);
    return tl;
  },

  /* Slide 19: Financials */
  'slide-financials': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    tl.call(function () { initChartForSlide('slide-financials'); });
    return tl;
  },

  /* Slide 20: Partnerships */
  'slide-partnerships': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.logo-grid > *'), { duration: 0.2, stagger: 0.05 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 21: Expansions */
  'slide-expansions': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.expansion-item, .card'), { y: 20, duration: 0.3, stagger: 0.08 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 22: Leadership */
  'slide-leadership': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.leader-card'), { y: 30, duration: 0.4, stagger: 0.12 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 23: ESG */
  'slide-esg': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.esg-pillar'), { y: 30, duration: 0.4, stagger: 0.15 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 24: Locations */
  'slide-locations': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { y: 30, duration: 0.5 }, 0, tl);
    safeFrom(section.querySelectorAll('.location-card, .card'), { x: -20, duration: 0.3, stagger: 0.1 }, '-=0.2', tl);
    return tl;
  },

  /* Slide 25: Thank You */
  'slide-thankyou': function (section) {
    var tl = gsap.timeline();
    safeFrom(section.querySelector('h2'), { scale: 0.9, duration: 0.8 }, 0, tl);
    safeFrom(section.querySelector('.gold-line'), { scaleX: 0, duration: 0.5 }, '-=0.3', tl);
    safeFrom(section.querySelectorAll('p'), { y: 20, duration: 0.4, stagger: 0.12 }, '-=0.2', tl);
    safeFrom(section.querySelector('.cta-btn'), { y: 20, duration: 0.5 }, '-=0.2', tl);
    return tl;
  },
};

/* ─── Helper: Division Intro Animation ─── */
function divisionIntroAnim(section) {
  var tl = gsap.timeline();
  safeFrom(section.querySelector('.badge'), { y: -20, duration: 0.4 }, 0, tl);
  safeFrom(section.querySelector('h2'), { y: 30, duration: 0.6 }, '-=0.1', tl);
  safeFrom(section.querySelector('.gold-line'), { scaleX: 0, duration: 0.5 }, '-=0.3', tl);
  safeFrom(section.querySelectorAll('p'), { y: 20, duration: 0.4, stagger: 0.12 }, '-=0.2', tl);
  return tl;
}

/* ─── Trigger Animation on Slide Entry ─── */
function runSlideAnimation(slideId) {
  var section = document.getElementById(slideId);
  if (!section) return;

  var animFn = SLIDE_ANIMATIONS[slideId];
  if (animFn) {
    animFn(section);
  }
}

/* ═══════════════════════════════════════════════════════════
   Background Decorations — Golden SVG shapes & text watermarks
   Injected into slides with plain solid backgrounds.
   All SVG is internally generated (no user input) and parsed
   via DOMParser for safe DOM insertion.
   ═══════════════════════════════════════════════════════════ */

(function () {
  var DECORATED_SLIDES = [
    'slide-challenge',
    'slide-glance',
    'slide-structure',
    'slide-sectors',
    'slide-track-record',
    'slide-footprints',
    'slide-tech-mfg',
    'slide-products',
    'slide-pipeline',
    'slide-mro-services',
    'slide-certifications',
    'slide-mro-map',
    'slide-green-progress',
    'slide-financials',
    'slide-investment-focus',
    'slide-leadership',
    'slide-locations',
    'slide-thankyou'
  ];

  var GOLD = '#C8A96E';
  var SVG_NS = 'http://www.w3.org/2000/svg';

  /* ─── Safe SVG parser — converts markup string to DOM node ─── */
  var parser = new DOMParser();
  function parseSvg(markup) {
    var doc = parser.parseFromString(markup, 'image/svg+xml');
    return doc.documentElement;
  }

  /* ─── SVG shape generators (return SVG markup strings) ─── */

  function hexagon(size) {
    var s = size || 60;
    var h = s * 0.866;
    var points = [
      (s * 0.5) + ',' + 0,
      s + ',' + (h * 0.5),
      s + ',' + (h * 1.5),
      (s * 0.5) + ',' + (h * 2),
      0 + ',' + (h * 1.5),
      0 + ',' + (h * 0.5)
    ].join(' ');
    return '<svg xmlns="' + SVG_NS + '" width="' + s + '" height="' + Math.round(h * 2) + '" viewBox="0 0 ' + s + ' ' + Math.round(h * 2) + '">' +
      '<polygon points="' + points + '" fill="none" stroke="' + GOLD + '" stroke-width="1.5"/></svg>';
  }

  function diamond(size) {
    var s = size || 50;
    var half = s / 2;
    var points = half + ',0 ' + s + ',' + half + ' ' + half + ',' + s + ' 0,' + half;
    return '<svg xmlns="' + SVG_NS + '" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +
      '<polygon points="' + points + '" fill="none" stroke="' + GOLD + '" stroke-width="1.2"/></svg>';
  }

  function circle(size) {
    var s = size || 50;
    var r = s / 2 - 1;
    return '<svg xmlns="' + SVG_NS + '" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +
      '<circle cx="' + (s / 2) + '" cy="' + (s / 2) + '" r="' + r + '" fill="none" stroke="' + GOLD + '" stroke-width="1"/></svg>';
  }

  function crosshair(size) {
    var s = size || 40;
    var mid = s / 2;
    return '<svg xmlns="' + SVG_NS + '" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +
      '<line x1="' + mid + '" y1="4" x2="' + mid + '" y2="' + (s - 4) + '" stroke="' + GOLD + '" stroke-width="1"/>' +
      '<line x1="4" y1="' + mid + '" x2="' + (s - 4) + '" y2="' + mid + '" stroke="' + GOLD + '" stroke-width="1"/></svg>';
  }

  function angularBracket(size) {
    var s = size || 60;
    return '<svg xmlns="' + SVG_NS + '" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +
      '<polyline points="' + (s * 0.3) + ',4 4,' + (s / 2) + ' ' + (s * 0.3) + ',' + (s - 4) + '" fill="none" stroke="' + GOLD + '" stroke-width="1.2" stroke-linecap="round"/>' +
      '<polyline points="' + (s * 0.7) + ',4 ' + (s - 4) + ',' + (s / 2) + ' ' + (s * 0.7) + ',' + (s - 4) + '" fill="none" stroke="' + GOLD + '" stroke-width="1.2" stroke-linecap="round"/></svg>';
  }

  function dotGrid(size) {
    var s = size || 80;
    var dots = '';
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        dots += '<circle cx="' + (10 + col * 20) + '" cy="' + (10 + row * 20) + '" r="2" fill="' + GOLD + '"/>';
      }
    }
    return '<svg xmlns="' + SVG_NS + '" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' + dots + '</svg>';
  }

  function textWatermark(text) {
    var t = text || 'MANAH';
    return '<svg xmlns="' + SVG_NS + '" width="320" height="100" viewBox="0 0 320 100">' +
      '<text x="160" y="70" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="72" fill="' + GOLD + '" letter-spacing="0.15em">' + t + '</text></svg>';
  }

  /* ─── Decoration config ─── */
  var DRIFT_ANIMS = ['driftA', 'driftB', 'driftC', 'driftD'];

  var SHAPE_POOL = [
    function () { return hexagon(55); },
    function () { return hexagon(40); },
    function () { return diamond(45); },
    function () { return diamond(35); },
    function () { return circle(50); },
    function () { return circle(35); },
    function () { return crosshair(36); },
    function () { return angularBracket(50); },
    function () { return dotGrid(70); }
  ];

  function seededPick(arr, seed) {
    return arr[seed % arr.length];
  }

  /* ─── Generate non-overlapping edge positions ─── */
  function generatePlacements(count, seed) {
    var positions = [];
    var zones = [
      { x: 3, y: 8 },
      { x: 82, y: 5 },
      { x: 88, y: 75 },
      { x: 5, y: 78 },
      { x: 75, y: 40 },
      { x: 8, y: 45 },
      { x: 45, y: 85 },
      { x: 55, y: 3 }
    ];
    for (var i = 0; i < count; i++) {
      var zone = zones[(seed * 3 + i * 2) % zones.length];
      positions.push({
        x: zone.x + ((seed + i) % 7) - 3,
        y: zone.y + ((seed * 2 + i) % 5) - 2
      });
    }
    return positions;
  }

  /* ─── Inject decorations into each qualifying slide ─── */
  function injectDecorations() {
    DECORATED_SLIDES.forEach(function (slideId, slideIndex) {
      var section = document.getElementById(slideId);
      if (!section) return;
      if (section.querySelector('.slide-bg-decor')) return;

      var container = document.createElement('div');
      container.className = 'slide-bg-decor';

      var shapeCount = 3 + (slideIndex % 3);
      var placements = generatePlacements(shapeCount, slideIndex);

      placements.forEach(function (pos, i) {
        var shapeFn = seededPick(SHAPE_POOL, slideIndex * 7 + i * 3);
        var svgNode = parseSvg(shapeFn());
        var wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:absolute;' +
          'left:' + pos.x + '%;top:' + pos.y + '%;' +
          'opacity:0.04;' +
          'animation:' + seededPick(DRIFT_ANIMS, slideIndex + i) + ' ' + (18 + (i * 4)) + 's ease-in-out infinite;' +
          'animation-delay:' + (i * 2.5) + 's;';
        wrapper.appendChild(document.adoptNode(svgNode));
        container.appendChild(wrapper);
      });

      /* Text watermark on every other slide */
      if (slideIndex % 2 === 0) {
        var textSvg = parseSvg(textWatermark('MANAH'));
        var textEl = document.createElement('div');
        textEl.style.cssText = 'position:absolute;left:50%;top:50%;' +
          'transform:translate(-50%,-50%) rotate(-12deg);' +
          'opacity:0.025;' +
          'animation:driftText 30s ease-in-out infinite;' +
          'animation-delay:3s;';
        textEl.appendChild(document.adoptNode(textSvg));
        container.appendChild(textEl);
      }

      /* Ensure slide content stays above decorations */
      var children = section.children;
      for (var c = 0; c < children.length; c++) {
        if (!children[c].classList.contains('slide-bg-decor') && children[c].tagName !== 'ASIDE') {
          children[c].style.position = children[c].style.position || 'relative';
          children[c].style.zIndex = children[c].style.zIndex || '1';
        }
      }

      section.insertBefore(container, section.firstChild);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectDecorations);
  } else {
    injectDecorations();
  }
})();
