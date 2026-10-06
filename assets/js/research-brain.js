(function () {
  'use strict';

  // Occasional impulses along the brain's circuit traces, and the cue that lets
  // the liquid aura move. Sparse timers drive short Web Animations; there is no
  // render loop, and nothing fires offscreen, in a background tab, or when
  // reduced motion is preferred.
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function initializeBrain(root) {
    var svg = root.querySelector('.research-brain');
    if (!svg || typeof svg.animate !== 'function' || !svg.querySelector('.research-brain__trace')) { return; }

    var traces = null;
    var byRegion = {};
    var visible = false;
    var timer = null;
    var live = 0; // Running animations, to keep overlapping impulses rare.
    var started = false;
    var lastRegion = root.getAttribute('data-map-active');
    var lastCascade = 0;

    function measure() {
      // Defer layout queries until the drawing is first visible.
      traces = Array.prototype.map.call(svg.querySelectorAll('.research-brain__trace'), function (path) {
        var group = path.closest('[data-brain-region]');
        var length = path.getTotalLength();
        var trace = {
          path: path,
          group: group,
          region: group.getAttribute('data-brain-region'),
          kind: path.classList.contains('research-brain__trace--bus') ? 'bus' : (path.classList.contains('research-brain__trace--leader') ? 'leader' : 'trace'),
          length: length,
          end: path.getPointAtLength(length)
        };
        (byRegion[trace.region] = byRegion[trace.region] || []).push(trace);
        return trace;
      });
    }

    function running() {
      return visible && !document.hidden && !(reduceMotion && reduceMotion.matches);
    }

    function addShape(group, name, attributes) {
      var element = document.createElementNS(SVG_NS, name);
      Object.keys(attributes).forEach(function (key) { element.setAttribute(key, attributes[key]); });
      element.setAttribute('aria-hidden', 'true');
      group.appendChild(element);
      return element;
    }

    function play(element, keyframes, options) {
      live += 1;
      var animation = element.animate(keyframes, options);
      animation.onfinish = animation.oncancel = function () {
        live -= 1;
        element.remove();
      };
    }

    function flash(trace, point, delay, scale) {
      var ring = addShape(trace.group, 'circle', { 'class': 'research-brain__flash', cx: point.x, cy: point.y, r: 2.2 });
      play(ring, [
        { transform: 'scale(0.5)', opacity: 0 },
        { transform: 'scale(1)', opacity: 0.85, offset: 0.18 },
        { transform: 'scale(' + scale + ')', opacity: 0 }
      ], { duration: 820, delay: delay, easing: 'cubic-bezier(0.2, 0.6, 0.35, 1)', fill: 'both' });
    }

    function ripple(trace, delay) {
      // A signal leaving the chip sends one faint outline outward from it.
      var chip = svg.querySelector('.research-brain__chip');
      if (!chip) { return; }
      var ring = addShape(chip.parentNode, 'rect', {
        'class': 'research-brain__core-ripple',
        x: chip.getAttribute('x'),
        y: chip.getAttribute('y'),
        width: chip.getAttribute('width'),
        height: chip.getAttribute('height'),
        rx: chip.getAttribute('rx')
      });
      chip.parentNode.insertBefore(ring, chip.parentNode.firstChild);
      ring.style.color = window.getComputedStyle(trace.group).color;
      play(ring, [
        { transform: 'scale(1)', opacity: 0 },
        { opacity: 0.5, offset: 0.15 },
        { transform: 'scale(1.12, 1.3)', opacity: 0 }
      ], { duration: 1300, delay: delay, easing: 'cubic-bezier(0.2, 0.6, 0.35, 1)', fill: 'both' });
    }

    function spark(trace, delay) {
      // A short bright head leads a longer soft glow; both share one front.
      var tail = 18;
      var head = 7;
      var travel = trace.length + tail;
      // A steady pace reads as a signal travelling, whatever the trace length.
      var duration = Math.max(420, Math.min(1600, travel * 9));
      [['research-brain__spark research-brain__spark--glow', tail], ['research-brain__spark', head]].forEach(function (layer) {
        var path = addShape(trace.group, 'path', { 'class': layer[0], d: trace.path.getAttribute('d') });
        path.style.strokeDasharray = layer[1] + ' ' + (travel + layer[1]);
        play(path, [
          { strokeDashoffset: layer[1], opacity: 0 },
          { opacity: 1, offset: 0.1 },
          { opacity: 1, offset: 0.78 },
          { strokeDashoffset: layer[1] - travel, opacity: 0 }
        ], { duration: duration, delay: delay, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'both' });
      });
      flash(trace, trace.end, delay + duration * (trace.length / travel) * 0.92, 2.6);
      if (trace.kind === 'bus') { ripple(trace, delay); }
    }

    function pick(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    function fireRandom() {
      var active = root.getAttribute('data-map-active');
      var pool = active && byRegion[active] && Math.random() < 0.45 ? byRegion[active] : traces;
      spark(pick(pool), 0);
    }

    function cascade(region) {
      // Exploring an area briefly wakes a few of its pathways.
      var list = (byRegion[region] || []).slice();
      for (var index = 0; index < Math.min(3, list.length); index += 1) {
        var swap = index + Math.floor(Math.random() * (list.length - index));
        var trace = list[swap];
        list[swap] = list[index];
        list[index] = trace;
        spark(trace, index * 110);
      }
    }

    function schedule() {
      window.clearTimeout(timer);
      if (!running()) { return; }
      // The first impulse comes soon after the drawing appears, then rarely.
      var delay = started ? 1600 + Math.random() * 2600 : 700 + Math.random() * 500;
      timer = window.setTimeout(function () {
        started = true;
        if (running() && live < 8) { fireRandom(); }
        schedule();
      }, delay);
    }

    new MutationObserver(function () {
      var region = root.getAttribute('data-map-active');
      if (region === lastRegion) { return; }
      lastRegion = region;
      var now = Date.now();
      if (!traces || !running() || now - lastCascade < 600 || live > 6) { return; }
      lastCascade = now;
      cascade(region);
    }).observe(root, { attributes: true, attributeFilter: ['data-map-active'] });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[entries.length - 1].isIntersecting;
        root.classList.toggle('is-onscreen', visible);
        if (visible && !traces) { measure(); }
        schedule();
      }).observe(svg);
    } else {
      measure();
      visible = true;
      root.classList.add('is-onscreen');
      schedule();
    }
    document.addEventListener('visibilitychange', schedule);
    if (reduceMotion) {
      if (reduceMotion.addEventListener) { reduceMotion.addEventListener('change', schedule); } else if (reduceMotion.addListener) { reduceMotion.addListener(schedule); }
    }
  }

  function initialize() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-research-map]'), initializeBrain);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
}());
