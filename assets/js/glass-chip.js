(function() {
  'use strict';

  // The map's quartz chip (glass feature 1, _sass/_glass-chip.scss). A glint
  // crosses the glass whenever a signal leaves the chip (research-brain.js
  // marks each with a ripple outline on the chip), and now and then on its
  // own; a caustic inside drifts toward the pointer. The drawing repaints
  // whole, so this only moves things in response to something.

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function clamp(value) {
    return Math.max(-1, Math.min(1, value));
  }

  function initialize(map) {
    var svg = map.querySelector('.research-brain');
    var core = svg && svg.querySelector('.research-brain__core');
    // Two glints: a pastel one for light glass, a white one for dark (CSS
    // shows the theme's); both move together.
    var glints = svg ? svg.querySelectorAll('.research-brain__chip-glint') : [];
    var caustic = svg && svg.querySelector('.research-brain__chip-caustic');
    if (!core || !glints.length || !caustic) return;
    var lastGlint = 0;

    function shine(delay) {
      if (reduceMotion.matches || document.hidden || !map.classList.contains('is-onscreen')) return;
      var now = window.performance.now();
      if (now - lastGlint < 1400) return;
      lastGlint = now;
      Array.prototype.forEach.call(glints, function(glint) {
        glint.animate([
          { transform: 'translateX(0px) skewX(-20deg)', opacity: 0 },
          { opacity: 1, offset: 0.22 },
          { opacity: 0.9, offset: 0.7 },
          { transform: 'translateX(200px) skewX(-20deg)', opacity: 0 }
        ], { duration: 1150, delay: delay, easing: 'cubic-bezier(0.45, 0, 0.25, 1)' });
      });
    }

    new MutationObserver(function(records) {
      records.forEach(function(record) {
        Array.prototype.forEach.call(record.addedNodes, function(node) {
          if (node.classList && node.classList.contains('research-brain__core-ripple')) shine(90);
        });
      });
    }).observe(core, { childList: true });

    (function idle() {
      window.setTimeout(function() {
        shine(0);
        idle();
      }, 9000 + Math.random() * 6000);
    }());

    // The caustic leans toward the pointer, easing after it.
    var drawing = map.querySelector('.research-map__drawing') || svg;
    var target = { x: 0, y: 0 };
    var current = { x: 0, y: 0 };
    var frame = 0;

    function step() {
      frame = 0;
      var ease = reduceMotion.matches ? 1 : 0.12;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      caustic.setAttribute('transform', 'translate(' + current.x.toFixed(2) + ' ' + current.y.toFixed(2) + ')');
      if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
        frame = window.requestAnimationFrame(step);
      }
    }

    function aim(x, y) {
      target.x = x;
      target.y = y;
      if (!frame) frame = window.requestAnimationFrame(step);
    }

    drawing.addEventListener('pointermove', function(event) {
      if (event.pointerType === 'touch') return;
      var box = svg.getBoundingClientRect();
      // The chip's center, in the drawing's 640 x 400 units.
      var x = box.left + box.width * (320 / 640);
      var y = box.top + box.height * (172 / 400);
      aim(clamp((event.clientX - x) / (box.width * 0.45)) * 36, clamp((event.clientY - y) / (box.height * 0.45)) * 10);
    });
    drawing.addEventListener('pointerleave', function() { aim(0, 0); });
  }

  function start() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-research-map]'), initialize);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}());
