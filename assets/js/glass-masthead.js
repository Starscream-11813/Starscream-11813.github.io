(function() {
  'use strict';

  // A glass puck in the masthead's menu (glass feature 8,
  // _sass/_glass-masthead.scss). It sits behind the section pointed at or
  // focused, rests under the current section (the one whose address this page
  // is under), and flows between them like a drop: stretching across the gap,
  // squashing a little and settling with a small give, while the light split
  // in its rim sways. Sections the menu has folded away (narrow windows) are
  // left to the menu's own list.

  var nav = document.getElementById('site-nav');
  var list = nav && nav.querySelector('.visible-links');
  if (!list) return;
  var ITEM = '.masthead__menu-item:not(.masthead__menu-item--lg) > a';
  var PAD = 15;       // px of glass either side of a name
  var SHIFT = 1;      // px lower than the line box: centred on the petite caps
  var SQUASH = 0.84;  // its height mid-flow
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var puck = document.createElement('span');
  puck.className = 'glass-puck';
  puck.setAttribute('aria-hidden', 'true');
  // First in the menu, so the links (positioned, later) draw over it.
  nav.insertBefore(puck, nav.firstChild);
  var height = puck.offsetHeight || 34;
  var flow = null;
  var at = null;

  function links() {
    return Array.prototype.slice.call(list.querySelectorAll(ITEM));
  }

  // The section this page belongs to: the longest link path it starts with.
  function current() {
    var here = window.location.pathname.replace(/\/+$/, '') || '/';
    var best = null;
    var length = 0;
    links().forEach(function(link) {
      var path = link.pathname.replace(/\/+$/, '') || '/';
      if (path === '/') return;
      if ((here === path || here.indexOf(path + '/') === 0) && path.length > length) {
        best = link;
        length = path.length;
      }
    });
    return best;
  }

  function mark() {
    var section = current();
    links().forEach(function(link) {
      link.classList.toggle('is-puck-current', link === section);
    });
  }

  function shape(link) {
    return {
      x: link.offsetLeft - PAD,
      y: link.offsetTop + (link.offsetHeight - height) / 2 + SHIFT,
      w: link.offsetWidth + 2 * PAD
    };
  }

  // Once the puck comes to rest, a band of light crosses it.
  function glint() {
    if (reduceMotion.matches || typeof puck.animate !== 'function') return;
    puck.animate([
      { opacity: 1, backgroundPosition: '160% 0' },
      { opacity: 1, backgroundPosition: '-60% 0' }
    ], { duration: 1100, easing: 'cubic-bezier(0.3, 0.5, 0.3, 1)', pseudoElement: '::before' });
  }

  function place(link, animate) {
    if (!link) {
      puck.classList.remove('is-on');
      at = null;
      return;
    }
    var to = shape(link);
    var wasOn = puck.classList.contains('is-on');
    var from = null;
    if (wasOn && at) {
      var box = puck.getBoundingClientRect();
      var base = nav.getBoundingClientRect();
      from = { x: box.left - base.left, w: box.width };
    }
    if (flow) {
      flow.cancel();
      flow = null;
    }
    puck.style.translate = to.x + 'px ' + to.y + 'px';
    puck.style.width = to.w + 'px';
    if (!wasOn && !animate) {
      // As the page loads: there at once, without growing in.
      puck.classList.add('is-instant', 'is-on');
      getComputedStyle(puck, '::after').clipPath;
      puck.classList.remove('is-instant');
    } else {
      puck.classList.add('is-on');
    }
    at = to;
    if (!wasOn) {
      if (animate) glint();
      return;
    }
    if (!animate || !from || reduceMotion.matches || typeof puck.animate !== 'function') return;
    if (Math.abs(from.x - to.x) < 1 && Math.abs(from.w - to.w) < 1) return;
    // One animation carries the move and the sway of the light inside: it
    // lags as the glass sets off (-1 against the motion) and runs on a
    // little as it stops.
    var left = Math.min(from.x, to.x);
    var right = Math.max(from.x + from.w, to.x + to.w);
    var way = to.x > from.x ? 1 : -1;
    var end = to.x + 'px ' + to.y + 'px';
    flow = puck.animate([
      { translate: from.x + 'px ' + to.y + 'px', width: from.w + 'px', scale: '1 1', '--puck-sway': '0', easing: 'cubic-bezier(0.45, 0, 0.3, 1)' },
      { translate: left + 'px ' + to.y + 'px', width: (right - left) + 'px', scale: '1 ' + SQUASH, '--puck-sway': String(-way), offset: 0.4, easing: 'cubic-bezier(0.3, 0, 0.2, 1)' },
      { translate: end, width: to.w + 'px', scale: '1 1.04', '--puck-sway': String(way * 0.35), offset: 0.78, easing: 'ease-in-out' },
      { translate: end, width: to.w + 'px', scale: '1 1', '--puck-sway': '0' }
    ], { duration: 560 });
    flow.onfinish = function() {
      flow = null;
      glint();
    };
  }

  function settle(animate) {
    mark();
    place(current(), animate);
  }

  list.addEventListener('pointerover', function(event) {
    var link = event.target.closest(ITEM);
    if (link) place(link, true);
  });
  list.addEventListener('pointerleave', function() {
    puck.style.removeProperty('--puck-light');
    settle(true);
  });
  list.addEventListener('focusin', function(event) {
    var link = event.target.closest(ITEM);
    if (link) place(link, true);
  });
  list.addEventListener('focusout', function(event) {
    if (!list.contains(event.relatedTarget)) settle(true);
  });

  // The glass's highlight drifts toward the pointer (the CSS eases it along),
  // measured once a frame at most.
  var pointerX = 0;
  var frame = 0;
  list.addEventListener('pointermove', function(event) {
    if (event.pointerType !== 'mouse' || !at) return;
    pointerX = event.clientX;
    if (frame) return;
    frame = requestAnimationFrame(function() {
      frame = 0;
      var box = puck.getBoundingClientRect();
      if (!box.width) return;
      var share = Math.min(0.82, Math.max(0.18, (pointerX - box.left) / box.width));
      puck.style.setProperty('--puck-light', (share * 100).toFixed(1) + '%');
    });
  });

  // The menu folds sections away as the window narrows, and the fonts settle
  // after load: place the puck again, without flowing.
  if ('ResizeObserver' in window) {
    new ResizeObserver(function() { settle(false); }).observe(nav);
  } else {
    window.addEventListener('resize', function() { settle(false); });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function() { settle(false); });
  settle(false);
}());
