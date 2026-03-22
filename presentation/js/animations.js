/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — GSAP Animations
   Uses gsap.fromTo() for safety — never leaves elements invisible.
   ═══════════════════════════════════════════════════════════ */

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

    /* Reset letters and labels for re-trigger */
    gsap.set(letters, { color: 'rgba(255,255,255,0.12)', textShadow: 'none', scale: 1 });
    gsap.set(labels, { opacity: 0, y: 8 });

    letters.forEach(function (letter, i) {
      /* Each letter glows gold then fades back */
      tl.to(letter, {
        color: '#C8A96E',
        textShadow: '0 0 20px rgba(200,169,110,0.6), 0 0 40px rgba(200,169,110,0.3), 0 0 80px rgba(200,169,110,0.15)',
        scale: 1.08,
        duration: 0.4,
        ease: 'power2.out'
      }, 1.2 + i * 0.3);

      tl.to(letter, {
        color: 'rgba(255,255,255,0.15)',
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
    safeFrom(section.querySelectorAll('.photo-mosaic img'), { scale: 0.9, duration: 0.3, stagger: 0.06 }, '-=0.2', tl);
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
