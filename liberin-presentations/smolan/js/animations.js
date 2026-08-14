/* ═══════════════════════════════════════════════════════════
   LIBERIN CAPABILITIES DECK — GSAP Entrance Animations
   Light / blue theme. Self-contained IIFE. GSAP 3.12.5 loaded
   globally as `gsap` before this file. If GSAP is missing, every
   path no-ops gracefully — CSS already renders content visible.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function hasGsap() {
    return typeof window.gsap !== 'undefined' && window.gsap;
  }

  /* ─── safeFrom: guarantees a visible end state even if interrupted ─── */
  function safeFrom(targets, vars, position, timeline) {
    if (!hasGsap()) return timeline || null;
    if (!targets) return timeline || null;
    if (targets.length !== undefined && targets.length === 0) return timeline || null;

    vars = vars || {};
    var tl = timeline || gsap.timeline();
    var fromVars = {
      opacity: (vars.opacity !== undefined ? vars.opacity : 0),
      y: vars.y || 0, x: vars.x || 0,
      scale: (vars.scale !== undefined ? vars.scale : 1)
    };
    var toVars = {
      opacity: 1, y: 0, x: 0, scale: 1,
      duration: vars.duration || 0.6,
      ease: vars.ease || 'power3.out',
      stagger: vars.stagger || 0,
      clearProps: 'transform,opacity',
      onInterrupt: function () { gsap.set(targets, { opacity: 1, clearProps: 'transform,opacity' }); }
    };
    tl.fromTo(targets, fromVars, toVars, position != null ? position : '+=0');
    return tl;
  }

  /* ─── animateCounter: reads data-value/data-decimals/data-prefix/data-suffix ─── */
  function animateCounter(el) {
    if (!el) return;
    var target = parseFloat(el.getAttribute('data-value'));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute('data-decimals'), 10);
    if (isNaN(decimals)) decimals = 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';

    function format(value) {
      var out;
      if (decimals > 0) { out = value.toFixed(decimals); }
      else {
        var rounded = Math.round(value);
        out = (rounded >= 1000) ? rounded.toLocaleString('en-US') : String(rounded);
      }
      return prefix + out + suffix;
    }

    if (!hasGsap()) return;
    var proxy = { val: 0 };
    gsap.to(proxy, {
      val: target, duration: 1.3, ease: 'power2.out',
      onUpdate: function () { el.textContent = format(proxy.val); },
      onComplete: function () { el.textContent = format(target); }
    });
  }

  /* ─── animateBars: .bar-fill elements with data-pct, width 0 -> pct% ─── */
  function animateBars(section, tl, position) {
    var fills = section.querySelectorAll('.bar-fill');
    if (!fills.length) return;
    if (!hasGsap()) {
      fills.forEach(function (el) { el.style.width = (el.getAttribute('data-pct') || 0) + '%'; });
      return;
    }
    fills.forEach(function (el) {
      var pct = parseFloat(el.getAttribute('data-pct')) || 0;
      tl.fromTo(el, { width: '0%' }, { width: pct + '%', duration: 1, ease: 'power2.out' }, position != null ? position : '-=0.2');
    });
  }

  /* ─── animateRings: .ring-fill circles with data-pct, stroke-dashoffset draw-in ─── */
  function animateRings(section, tl, position) {
    var rings = section.querySelectorAll('.ring-fill');
    if (!rings.length) return;
    rings.forEach(function (el) {
      var pct = parseFloat(el.getAttribute('data-pct')) || 0;
      var r = parseFloat(el.getAttribute('r')) || 30;
      var circumference = 2 * Math.PI * r;
      var target = circumference * (1 - pct / 100);
      el.style.strokeDasharray = circumference;
      if (!hasGsap()) { el.style.strokeDashoffset = target; return; }
      tl.fromTo(el, { strokeDashoffset: circumference }, { strokeDashoffset: target, duration: 1.1, ease: 'power2.out' }, position != null ? position : '-=0.3');
    });
  }

  function animateHead(section, tl) {
    var head = section.querySelector('.slide-head');
    if (!head) return;
    var kids = head.children;
    if (kids.length === 0) return;
    safeFrom(kids, { opacity: 1, y: 20, duration: 0.55, stagger: 0.08 }, 0, tl);
  }

  function animateStagger(section, tl, position) {
    var containers = section.querySelectorAll('[data-stagger]');
    for (var i = 0; i < containers.length; i++) {
      var kids = containers[i].children;
      if (kids.length === 0) continue;
      safeFrom(kids, { opacity: 1, y: 22, duration: 0.5, stagger: 0.06 }, position != null ? position : '-=0.25', tl);
    }
  }

  function runCounters(section) {
    var counts = section.querySelectorAll('.count');
    for (var i = 0; i < counts.length; i++) animateCounter(counts[i]);
  }

  /* ─── Bespoke timelines keyed by slide id ─── */
  var BESPOKE = {

    'slide-cover': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;
      var wm = section.querySelector('[data-anim="wm"]');
      var logo = wm ? wm.querySelector('.wm-logo') : null;
      var title = section.querySelector('[data-anim="title"]');
      var lead = section.querySelector('.lead');
      var pillWrap = section.querySelector('[data-anim="pills"]');
      var pills = pillWrap ? pillWrap.children : null;
      var kpiWrap = section.querySelector('[data-anim="kpis"]');
      var kpis = kpiWrap ? kpiWrap.querySelectorAll('.kpi') : null;
      var banner = section.querySelector('.hero-banner img');

      if (hasGsap() && banner) {
        tl.fromTo(banner, { opacity: 0, scale: 1.08 }, { opacity: 0.5, scale: 1, duration: 1.1, ease: 'power2.out' }, 0);
      }
      safeFrom(logo, { opacity: 0, scale: 0.88, duration: 0.7, ease: 'back.out(1.6)' }, 0.1, tl);
      safeFrom(title, { y: 40, duration: 0.8, ease: 'power3.out' }, hasGsap() ? '-=0.35' : 0, tl);
      safeFrom(lead, { y: 24, duration: 0.55 }, '-=0.45', tl);
      safeFrom(pills, { y: 14, duration: 0.4, stagger: 0.06 }, '-=0.25', tl);
      safeFrom(kpis, { y: 26, duration: 0.5, stagger: 0.09 }, '-=0.2', tl);

      if (hasGsap()) { tl.call(function () { runCounters(section); }); }
      else { runCounters(section); }
      return tl;
    },

    'slide-who-we-are': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;
      animateHead(section, tl);
      var nodes = section.querySelectorAll('.sf-node');
      var lines = section.querySelectorAll('.sf-line');
      if (hasGsap() && nodes.length) {
        tl.fromTo(nodes, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, clearProps: 'transform,opacity' }, '-=0.15');
        tl.fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 0.32, stagger: 0.1, transformOrigin: 'left center', clearProps: 'transform' }, '-=0.45');
      }
      animateStagger(section, tl, '-=0.1');
      runCounters(section);
      return tl;
    },

    'slide-trusted-by': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;
      animateHead(section, tl);
      var plates = section.querySelectorAll('.logo-plate');
      if (hasGsap() && plates.length) {
        tl.fromTo(plates, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.035, ease: 'back.out(1.5)', clearProps: 'transform,opacity' }, '-=0.15');
      }
      return tl;
    },

    'slide-ai-platform': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;
      animateHead(section, tl);
      var hubs = section.querySelectorAll('.hub');
      var arrows = section.querySelectorAll('.flow-mid svg');
      var labels = section.querySelectorAll('.flow-mid .lbl');
      if (hubs.length >= 2) {
        safeFrom(hubs[0], { x: -46, duration: 0.6 }, '-=0.15', tl);
        safeFrom(hubs[1], { x: 46, duration: 0.6 }, '<', tl);
      }
      safeFrom(labels, { y: 8, duration: 0.32, stagger: 0.08 }, '-=0.2', tl);
      safeFrom(arrows, { scale: 0.7, duration: 0.4, stagger: 0.1 }, '-=0.25', tl);
      animateStagger(section, tl, '-=0.1');
      return tl;
    },

    'slide-delivery': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;
      animateHead(section, tl);
      animateStagger(section, tl, '-=0.2');
      var steps = section.querySelectorAll('.ps-step');
      safeFrom(steps, { y: 14, duration: 0.4, stagger: 0.06 }, '-=0.15', tl);
      return tl;
    },

    'slide-team': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;
      animateHead(section, tl);
      var groups = section.querySelectorAll('.team-grid');
      groups.forEach(function (g, i) {
        safeFrom(g.children, { y: 20, scale: 0.94, duration: 0.45, stagger: 0.05 }, i === 0 ? '-=0.15' : '-=0.25', tl);
      });
      return tl;
    },

    'slide-case-studies': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;
      animateHead(section, tl);
      animateStagger(section, tl, '-=0.2');
      return tl;
    }
  };

  function genericAnimation(section) {
    var tl = hasGsap() ? gsap.timeline() : null;
    animateHead(section, tl);
    animateStagger(section, tl, '-=0.25');
    animateBars(section, tl, '-=0.2');
    animateRings(section, tl, '-=0.2');
    runCounters(section);
    return tl;
  }

  function runSlideAnimation(slideId) {
    if (!slideId) return;
    var section = document.getElementById(slideId);
    if (!section) return;

    if (!hasGsap()) { runCounters(section); return; }

    try {
      var fn = BESPOKE[slideId] || genericAnimation;
      fn(section);
      setTimeout(function () {
        var els = section.querySelectorAll('.sb, .sb *');
        for (var i = 0; i < els.length; i++) {
          if (els[i].style && els[i].style.opacity !== '' && els[i].style.opacity !== '1') {
            els[i].style.opacity = '';
          }
        }
      }, 1600);
    } catch (err) {
      if (window.console && console.error) console.error('runSlideAnimation failed for ' + slideId + ':', err);
      gsap.set(section.querySelectorAll('.slide-head, .slide-head *, [data-stagger] > *, .kpi, .tile, .card, .pillar, .step, .hub, .logo-plate, .team-card, .product-card, .case-block, .usecase-card'),
        { opacity: 1, clearProps: 'transform,opacity' });
      runCounters(section);
    }
  }

  window.runSlideAnimation = runSlideAnimation;
  window.animateCounter = animateCounter;
  window.safeFrom = safeFrom;
})();
