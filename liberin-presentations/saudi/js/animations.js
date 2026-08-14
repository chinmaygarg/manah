/* ═══════════════════════════════════════════════════════════
   LIBERIN — Saudi Arabia Investor Deck · GSAP Entrance Animations
   Emerald + platinum theme. Plain browser script (ES5-ish),
   self-contained IIFE. GSAP 3.12.5 is loaded globally as `gsap`
   before this file. If GSAP is missing, every path no-ops
   gracefully — the deck's CSS already renders content visible.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var EMERALD = '#10B981';

  /* ─── Is GSAP available? ─── */
  function hasGsap() {
    return typeof window.gsap !== 'undefined' && window.gsap;
  }

  /* ─── safeFrom(targets, vars) ───────────────────────────────
     Wraps gsap.from but guarantees the end state is visible even
     if the tween is interrupted (fromTo + clearProps). No-ops
     safely when there are no targets or GSAP is absent.           */
  function safeFrom(targets, vars, position, timeline) {
    if (!hasGsap()) return timeline || null;
    if (!targets) return timeline || null;
    if (targets.length !== undefined && targets.length === 0) return timeline || null;

    vars = vars || {};
    var tl = timeline || gsap.timeline();

    var fromVars = {
      opacity: (vars.opacity !== undefined ? vars.opacity : 0),
      y: vars.y || 0,
      x: vars.x || 0,
      scale: (vars.scale !== undefined ? vars.scale : 1)
    };
    var toVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: vars.duration || 0.6,
      ease: vars.ease || 'power3.out',
      stagger: vars.stagger || 0,
      clearProps: 'transform,opacity',
      onInterrupt: function () {
        gsap.set(targets, { opacity: 1, clearProps: 'transform,opacity' });
      }
    };

    tl.fromTo(targets, fromVars, toVars, position != null ? position : '+=0');
    return tl;
  }

  /* ─── animateCounter(el) ────────────────────────────────────
     Reads data-value (float), data-decimals (default 0),
     data-prefix, data-suffix. Counts up from 0 over ~1.4s.
     Thousands separators when decimals=0 and value>=1000.
     The element's existing static text is the fallback.           */
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
      if (decimals > 0) {
        out = value.toFixed(decimals);
      } else {
        var rounded = Math.round(value);
        out = (rounded >= 1000) ? rounded.toLocaleString('en-US') : String(rounded);
      }
      return prefix + out + suffix;
    }

    if (!hasGsap()) return; /* static final text already shown */

    var proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: function () { el.textContent = format(proxy.val); },
      onComplete: function () { el.textContent = format(target); }
    });
  }

  /* ─── Generic building blocks (scoped to the entering slide) ─── */

  /* Fade + rise the direct children of the .slide-head, first. */
  function animateHead(section, tl) {
    var head = section.querySelector('.slide-head');
    if (!head) return;
    var kids = head.children;
    if (kids.length === 0) return;
    /* opacity:1 → slide in via transform only; content is never
       hidden even if the timeline never plays. */
    safeFrom(kids, { opacity: 1, y: 22, duration: 0.6, stagger: 0.09 }, 0, tl);
  }

  /* Stagger the direct children of any [data-stagger] container. */
  function animateStagger(section, tl, position) {
    var containers = section.querySelectorAll('[data-stagger]');
    for (var i = 0; i < containers.length; i++) {
      var kids = containers[i].children;
      if (kids.length === 0) continue;
      safeFrom(kids, { opacity: 1, y: 24, duration: 0.5, stagger: 0.08 }, position != null ? position : '-=0.25', tl);
    }
  }

  /* Fire animateCounter on every .count inside the slide. */
  function runCounters(section) {
    var counts = section.querySelectorAll('.count');
    for (var i = 0; i < counts.length; i++) {
      animateCounter(counts[i]);
    }
  }

  /* ─── Bespoke timelines (keyed by slide id) ─── */
  var BESPOKE = {

    /* 1 · COVER — premium wordmark reveal, hero rise, KPI stagger. */
    'slide-cover': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;

      var wm = section.querySelector('[data-anim="wm"]');
      var mark = wm ? wm.querySelector('.wm-mark') : null;
      var title = section.querySelector('[data-anim="title"]');
      var lead = section.querySelector('.lead');
      var kpiWrap = section.querySelector('[data-anim="kpis"]');
      var kpis = kpiWrap ? kpiWrap.querySelectorAll('.kpi') : null;

      if (hasGsap()) {
        /* Wordmark: scale + fade with a subtle emerald glow feel. */
        if (mark) {
          tl.fromTo(mark,
            { opacity: 0, scale: 0.6, filter: 'drop-shadow(0 0 0 rgba(16,163,122,0))' },
            { opacity: 1, scale: 1,
              filter: 'drop-shadow(0 0 22px rgba(16,163,122,0.65))',
              duration: 0.9, ease: 'back.out(1.6)' }, 0);
          tl.to(mark, {
            filter: 'drop-shadow(0 0 16px rgba(16,163,122,0.5))',
            duration: 0.7, ease: 'power2.inOut'
          }, 0.9);
        }
        safeFrom(wm ? wm.querySelector('.wm-logo') : null,
          { opacity: 0, scale: 0.85, duration: 0.85, ease: 'back.out(1.5)' }, 0, tl);
      }

      /* Hero title y-rise + opacity, then supporting lead. */
      safeFrom(title, { y: 44, duration: 0.85, ease: 'power3.out' }, hasGsap() ? '-=0.4' : 0, tl);
      safeFrom(lead, { y: 26, duration: 0.6 }, '-=0.5', tl);

      /* KPI cards stagger in. */
      safeFrom(kpis, { y: 30, duration: 0.5, stagger: 0.1 }, '-=0.3', tl);

      /* Count-up once the KPI cards have landed. */
      if (hasGsap()) {
        tl.call(function () { runCounters(section); });
      } else {
        runCounters(section);
      }
      return tl;
    },

    /* 12 · THE MODEL — hubs in from the sides, flow arrows draw
       in the middle, then a subtle repeating pulse on the arrows. */
    'slide-model': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;

      animateHead(section, tl);

      var hubs = section.querySelectorAll('.hub');
      var flow = section.querySelector('.flow');
      var arrows = section.querySelectorAll('.flow svg');
      var labels = section.querySelectorAll('.flow .lbl');

      if (hubs.length >= 2) {
        safeFrom(hubs[0], { x: -60, duration: 0.7 }, '-=0.2', tl);
        safeFrom(hubs[1], { x: 60, duration: 0.7 }, '<', tl);
      } else {
        safeFrom(hubs, { y: 30, duration: 0.6, stagger: 0.1 }, '-=0.2', tl);
      }

      /* Flow arrows + labels fade/scale in between the hubs. */
      safeFrom(labels, { y: 10, duration: 0.4, stagger: 0.08 }, '-=0.2', tl);
      safeFrom(arrows, { scale: 0.7, duration: 0.5, stagger: 0.12 }, '-=0.3', tl);

      /* Trailing lead + subtle repeating pulse on the arrows. */
      safeFrom(section.querySelector('.model + .lead, .sb > .lead'),
        { y: 20, duration: 0.5 }, '-=0.2', tl);

      if (hasGsap() && arrows.length) {
        tl.call(function () {
          gsap.to(arrows, {
            opacity: 0.45,
            duration: 1.1,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.25, from: 'start' }
          });
        });
      }
      return tl;
    },

    /* 14 · MARKET ENTRY — tiles stagger, then KSA map markers
       scale in from 0 (the dots keep their CSS pulse). */
    'slide-entry': function (section) {
      var tl = hasGsap() ? gsap.timeline() : null;

      animateHead(section, tl);
      animateStagger(section, tl, '-=0.25');
      runCounters(section);

      var nodes = section.querySelectorAll('.ksa-node');
      if (hasGsap() && nodes.length) {
        tl.fromTo(nodes,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)',
            stagger: 0.12, clearProps: 'transform,opacity' },
          '-=0.1');
      }
      return tl;
    }
  };

  /* ─── Generic timeline — applies to every non-bespoke slide ─── */
  function genericAnimation(section) {
    var tl = hasGsap() ? gsap.timeline() : null;
    animateHead(section, tl);
    animateStagger(section, tl, '-=0.25');
    runCounters(section);
    return tl;
  }

  /* ─── Public entry point (called by main.js, once per slide) ─── */
  function runSlideAnimation(slideId) {
    if (!slideId) return;
    var section = document.getElementById(slideId);
    if (!section) return;

    /* If GSAP is missing, ensure counters show their final text
       and bail — CSS already keeps everything visible. */
    if (!hasGsap()) {
      runCounters(section);
      return;
    }

    try {
      var fn = BESPOKE[slideId] || genericAnimation;
      fn(section);
      /* Safety net (independent of the GSAP ticker): whatever the
         timeline does, strip any leftover inline opacity shortly
         after entry so content can never be stuck invisible. */
      setTimeout(function () {
        var els = section.querySelectorAll('.sb, .sb *');
        for (var i = 0; i < els.length; i++) {
          if (els[i].style && els[i].style.opacity !== '' && els[i].style.opacity !== '1') {
            els[i].style.opacity = '';
          }
        }
      }, 1600);
    } catch (err) {
      /* Never let an animation error hide content. */
      if (window.console && console.error) {
        console.error('runSlideAnimation failed for ' + slideId + ':', err);
      }
      gsap.set(section.querySelectorAll('.slide-head, .slide-head *, [data-stagger] > *, .kpi, .tile, .card, .phase, .hub, .ksa-node'),
        { opacity: 1, clearProps: 'transform,opacity' });
      runCounters(section);
    }
  }

  /* Expose globally. main.js calls the bare identifier
     `runSlideAnimation(slideId)`, which resolves through the global
     (window) object — so assigning it here makes it a top-level
     global as required. Helpers are exposed for reuse/testing. */
  window.runSlideAnimation = runSlideAnimation;
  window.animateCounter = animateCounter;
  window.safeFrom = safeFrom;
})();
