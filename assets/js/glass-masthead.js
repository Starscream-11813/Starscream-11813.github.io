(function() {
  'use strict';

  // A glass puck in the masthead's menu (glass feature 8,
  // _sass/_glass-masthead.scss). It sits behind the section pointed at or
  // focused, rests under the current section (the one whose address this page
  // is under), and flows between them like a drop: stretching across the gap,
  // squashing a little, settling. Sections the menu has folded away (narrow
  // windows) are left to the menu's own list.

  var nav = document.getElementById('site-nav');
  var list = nav && nav.querySelector('.visible-links');
  if (!list) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var puck = document.createElement('span');
  puck.className = 'glass-puck';
  puck.setAttribute('aria-hidden', 'true');
  // First in the menu, so the links (positioned, later) draw over it.
  nav.insertBefore(puck, nav.firstChild);
  var flow = null;
  var at = null;

  function links() {
    return Array.prototype.slice.call(
      list.querySelectorAll('.masthead__menu-item:not(.masthead__menu-item--lg) > a'));
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
    var height = 36;
    return {
      x: link.offsetLeft - 14,
      y: link.offsetTop + (link.offsetHeight - height) / 2,
      w: link.offsetWidth + 28
    };
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
      from = { x: box.left - base.left, y: at.y, w: box.width };
    }
    if (flow) {
      flow.cancel();
      flow = null;
    }
    puck.style.translate = to.x + 'px ' + to.y + 'px';
    puck.style.width = to.w + 'px';
    puck.classList.add('is-on');
    at = to;
    if (!animate || !from || reduceMotion.matches || typeof puck.animate !== 'function') return;
    if (Math.abs(from.x - to.x) < 1 && Math.abs(from.w - to.w) < 1) return;
    var left = Math.min(from.x, to.x);
    var right = Math.max(from.x + from.w, to.x + to.w);
    flow = puck.animate([
      { translate: from.x + 'px ' + to.y + 'px', width: from.w + 'px', scale: '1 1' },
      { translate: left + 'px ' + to.y + 'px', width: (right - left) + 'px', scale: '1 0.84', offset: 0.42 },
      { translate: to.x + 'px ' + to.y + 'px', width: to.w + 'px', scale: '1 1' }
    ], { duration: 480, easing: 'cubic-bezier(0.3, 0.7, 0.2, 1)' });
    flow.onfinish = function() { flow = null; };
  }

  function settle(animate) {
    mark();
    place(current(), animate);
  }

  list.addEventListener('pointerover', function(event) {
    var link = event.target.closest('.masthead__menu-item:not(.masthead__menu-item--lg) > a');
    if (link) place(link, true);
  });
  list.addEventListener('pointerleave', function() { settle(true); });
  list.addEventListener('focusin', function(event) {
    var link = event.target.closest('.masthead__menu-item:not(.masthead__menu-item--lg) > a');
    if (link) place(link, true);
  });
  list.addEventListener('focusout', function(event) {
    if (!list.contains(event.relatedTarget)) settle(true);
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
