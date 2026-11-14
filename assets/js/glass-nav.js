(function() {
  'use strict';

  // The floating glass nav (glass feature 7, _includes/glass-nav.html). On a
  // long page, once the masthead has scrolled away, scrolling back up brings
  // the pill down; scrolling on tucks it away. Its puck marks the current
  // section and flows to the one pointed at or focused, stretching across
  // the gap and settling, like a drop.

  var nav = document.querySelector('[data-glass-nav]');
  if (!nav) return;
  var links = nav.querySelector('.glass-nav__links');
  var puck = nav.querySelector('.glass-nav__puck');
  var backToTop = nav.querySelector('.glass-nav__top');
  var masthead = document.querySelector('.masthead');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var shown = false;
  var lastY = window.scrollY;
  var upward = 0;
  var ticking = false;
  var threshold = 0;
  var flow = null;

  function measure() {
    var bottom = masthead ? masthead.getBoundingClientRect().bottom + window.scrollY : 120;
    threshold = bottom + 140;
  }

  function current() {
    return links.querySelector('.glass-nav__link[aria-current]');
  }

  // Where the puck is now, even mid-flow, in the list's own coordinates.
  function puckNow() {
    var box = puck.getBoundingClientRect();
    var list = links.getBoundingClientRect();
    return { x: box.left - list.left + links.scrollLeft, w: box.width };
  }

  function place(link, animate) {
    if (!link) {
      puck.classList.remove('is-on');
      return;
    }
    var x = link.offsetLeft;
    var w = link.offsetWidth;
    var wasOn = puck.classList.contains('is-on');
    var from = wasOn ? puckNow() : null;
    if (flow) {
      flow.cancel();
      flow = null;
    }
    puck.style.translate = x + 'px 0';
    puck.style.width = w + 'px';
    puck.classList.add('is-on');
    if (!animate || !from || reduceMotion.matches || typeof puck.animate !== 'function') return;
    if (Math.abs(from.x - x) < 1 && Math.abs(from.w - w) < 1) return;
    var left = Math.min(from.x, x);
    var right = Math.max(from.x + from.w, x + w);
    flow = puck.animate([
      { translate: from.x + 'px 0', width: from.w + 'px', scale: '1 1' },
      { translate: left + 'px 0', width: (right - left) + 'px', scale: '1 0.84', offset: 0.42 },
      { translate: x + 'px 0', width: w + 'px', scale: '1 1' }
    ], { duration: 480, easing: 'cubic-bezier(0.3, 0.7, 0.2, 1)' });
    flow.onfinish = function() { flow = null; };
  }

  function scrollable() {
    links.classList.toggle('is-scrollable', links.scrollWidth > links.clientWidth + 1);
  }

  function show() {
    if (shown) return;
    shown = true;
    nav.classList.add('is-shown');
    nav.removeAttribute('inert');
    nav.removeAttribute('aria-hidden');
    scrollable();
    var link = current();
    if (link && links.scrollWidth > links.clientWidth) {
      links.scrollLeft = link.offsetLeft - (links.clientWidth - link.offsetWidth) / 2;
    }
    place(link, false);
  }

  function hide() {
    if (!shown || nav.contains(document.activeElement)) return;
    shown = false;
    nav.classList.remove('is-shown');
    nav.setAttribute('inert', '');
    nav.setAttribute('aria-hidden', 'true');
  }

  function update() {
    ticking = false;
    var y = window.scrollY;
    var delta = y - lastY;
    lastY = y;
    var long = document.documentElement.scrollHeight > window.innerHeight * 2.2;
    if (!long || y < threshold) {
      upward = 0;
      hide();
      return;
    }
    if (delta < 0) {
      upward -= delta;
      if (upward > 36) show();
    } else if (delta > 2) {
      upward = 0;
      hide();
    }
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  window.addEventListener('resize', function() {
    measure();
    if (shown) {
      scrollable();
      place(current(), false);
    }
  });

  links.addEventListener('pointerover', function(event) {
    var link = event.target.closest('.glass-nav__link');
    if (link) place(link, true);
  });
  links.addEventListener('pointerleave', function() { place(current(), true); });
  links.addEventListener('focusin', function(event) {
    var link = event.target.closest('.glass-nav__link');
    if (link) place(link, true);
  });
  links.addEventListener('focusout', function(event) {
    if (!links.contains(event.relatedTarget)) place(current(), true);
  });

  backToTop.addEventListener('click', function() {
    backToTop.blur();
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });

  // Ready, but tucked away (and inert) until called for.
  nav.hidden = false;
  nav.setAttribute('inert', '');
  nav.setAttribute('aria-hidden', 'true');
  measure();
  window.addEventListener('load', measure);
}());
