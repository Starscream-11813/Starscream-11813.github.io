(function() {
  'use strict';

  // The figure loupe (glass feature 2, _sass/_glass-lenses.scss). Over a
  // paper's thumbnail, a mouse gets a glass magnifier that glides after it and
  // shows the figure at 2.2 times. It magnifies the full-size figure (where
  // the thumbnail links) once that has loaded, and the thumbnail until then.
  // Animated teasers (videos), touch, and keyboard keep the zoom chip.

  var ZOOM = 2.2;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var loupe = null;
  var active = null;
  var frame = 0;
  var settle = 0;
  var target = { x: 0, y: 0 };
  var current = { x: 0, y: 0 };
  var loaded = {};

  function build() {
    loupe = document.createElement('div');
    loupe.className = 'glass-loupe';
    loupe.setAttribute('aria-hidden', 'true');
    loupe.innerHTML =
      '<span class="glass-loupe__badge"><svg viewBox="0 0 16 16" focusable="false">' +
      '<circle cx="6.8" cy="6.8" r="4.4"/><path d="M10.1 10.1 13.6 13.6M6.8 4.9v3.8M4.9 6.8h3.8"/>' +
      '</svg></span>';
    document.body.appendChild(loupe);
  }

  // Where the figure lies on screen. It fills its box from the top
  // (object-fit: cover; object-position: center top), and the box may be
  // mid-way through its hover zoom.
  function figure(img) {
    var box = img.getBoundingClientRect();
    var scale = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight);
    var width = img.naturalWidth * scale;
    return {
      left: box.left + (box.width - width) / 2,
      top: box.top,
      width: width,
      height: img.naturalHeight * scale
    };
  }

  function render() {
    frame = 0;
    if (!active) return;
    var ease = reduceMotion.matches ? 1 : 0.3;
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    var shape = figure(active.img);
    var half = loupe.offsetWidth / 2;
    loupe.style.translate = current.x + 'px ' + current.y + 'px';
    loupe.style.backgroundSize = (shape.width * ZOOM) + 'px ' + (shape.height * ZOOM) + 'px';
    loupe.style.backgroundPosition =
      (half - (current.x - shape.left) * ZOOM) + 'px ' + (half - (current.y - shape.top) * ZOOM) + 'px';
    var moving = Math.abs(target.x - current.x) > 0.2 || Math.abs(target.y - current.y) > 0.2;
    if (moving || window.performance.now() < settle) schedule();
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  function use(link) {
    loupe.style.backgroundImage = 'url("' + link.href + '")';
  }

  function show(link, img, event) {
    if (!loupe) build();
    active = { link: link, img: img };
    link.classList.add('is-loupe');
    if (loaded[link.href]) {
      use(link);
    } else {
      loupe.style.backgroundImage = 'url("' + (img.currentSrc || img.src) + '")';
      var full = new Image();
      full.onload = function() {
        loaded[link.href] = true;
        if (active && active.link === link) use(link);
      };
      full.src = link.href;
    }
    target.x = current.x = event.clientX;
    target.y = current.y = event.clientY;
    // Follow the thumbnail through its hover zoom.
    settle = window.performance.now() + 500;
    loupe.classList.add('is-on');
    schedule();
  }

  function hide() {
    if (!active) return;
    active.link.classList.remove('is-loupe');
    active = null;
    if (loupe) loupe.classList.remove('is-on');
  }

  function canShow(img, event) {
    return event.pointerType !== 'touch' && finePointer.matches &&
      img.complete && img.naturalWidth > 0;
  }

  function attach(link) {
    var img = link.querySelector('img.pub-thumb__media');
    if (!img) return;
    link.addEventListener('pointerenter', function(event) {
      if (canShow(img, event)) show(link, img, event);
    });
    link.addEventListener('pointermove', function(event) {
      if (!active) {
        if (canShow(img, event)) show(link, img, event);
        return;
      }
      if (active.link !== link) return;
      target.x = event.clientX;
      target.y = event.clientY;
      schedule();
    });
    link.addEventListener('pointerleave', function() {
      if (active && active.link === link) hide();
    });
    // The viewer takes over on a click.
    link.addEventListener('click', hide);
  }

  function initialize() {
    Array.prototype.forEach.call(document.querySelectorAll('.pubs a.pub-thumb'), attach);
    // A fixed loupe would drift from its figure as the page scrolls; it
    // returns with the next movement.
    window.addEventListener('scroll', hide, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
}());
