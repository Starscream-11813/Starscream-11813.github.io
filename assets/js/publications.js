(function () {
  'use strict';

  // Behavior for the Publications page: copy buttons in the citation panels,
  // a viewer for full-size teaser figures, and animated thumbnails that rest
  // offscreen or when reduced motion is preferred.
  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function announce(message) {
    var region = document.querySelector('[data-pub-status]');
    if (!region) { return; }
    region.textContent = '';
    window.setTimeout(function () { region.textContent = message; }, 30);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (error) { reject(error); }
      area.remove();
    });
  }

  // Copies the entry or citation shown in the button's block, exactly as shown.
  function copyBlock(button) {
    var block = button.closest('.pub-cite__block');
    var source = block.querySelector('code, .pub-cite__text');
    var kind = source.tagName === 'CODE' ? 'BibTeX entry' : 'IEEE citation';
    var label = button.querySelector('.pub-cite__copy-label');
    var icon = button.querySelector('i');
    copyText(source.textContent.trim()).then(function () {
      button.classList.add('is-copied');
      label.textContent = 'Copied!';
      icon.className = 'fas fa-check';
      announce(kind + ' copied to the clipboard.');
      window.clearTimeout(button._reset);
      button._reset = window.setTimeout(function () {
        button.classList.remove('is-copied');
        label.textContent = 'Copy';
        icon.className = 'fas fa-copy';
      }, 1800);
    }, function () {
      announce('Copying failed; select the ' + kind + ' instead.');
    });
  }

  // A modal viewer for full-size teasers, built the first time it is needed.
  var viewer = null;

  function buildViewer() {
    viewer = document.createElement('dialog');
    viewer.className = 'pub-viewer';
    viewer.setAttribute('aria-label', 'Teaser figure');
    viewer.innerHTML = '<figure class="pub-viewer__figure"><img class="pub-viewer__image" alt=""><figcaption class="pub-viewer__caption"></figcaption></figure>' +
      '<button class="pub-viewer__close" type="button" aria-label="Close"><i class="fas fa-times" aria-hidden="true"></i></button>';
    document.body.appendChild(viewer);
    viewer.querySelector('.pub-viewer__close').addEventListener('click', function () { viewer.close(); });
    viewer.addEventListener('click', function (event) {
      if (event.target === viewer) { viewer.close(); }
    });
    viewer.addEventListener('close', function () {
      viewer.querySelector('.pub-viewer__image').removeAttribute('src');
    });
  }

  function openViewer(link) {
    if (typeof HTMLDialogElement === 'undefined') { return false; }
    if (!viewer) { buildViewer(); }
    var image = viewer.querySelector('.pub-viewer__image');
    var caption = link.getAttribute('data-pub-caption') || '';
    image.src = link.getAttribute('href');
    image.alt = caption ? 'Teaser figure: ' + caption : 'Teaser figure';
    viewer.querySelector('.pub-viewer__caption').textContent = caption;
    viewer.showModal();
    return true;
  }

  // Capture runs ahead of the theme's own link handling.
  document.addEventListener('click', function (event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { return; }
    var copy = event.target.closest('[data-pub-copy]');
    if (copy) {
      copyBlock(copy);
      return;
    }
    var zoom = event.target.closest('[data-pub-zoom]');
    if (zoom && openViewer(zoom)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  // Animated thumbnails play only while visible, and never with reduced motion.
  function initializeVideos() {
    var videos = Array.prototype.slice.call(document.querySelectorAll('.pub-thumb video'));
    if (!videos.length) { return; }
    function settle(video, visible) {
      if (visible && !(reduceMotion && reduceMotion.matches)) {
        var playing = video.play();
        if (playing && playing.catch) { playing.catch(function () {}); }
      } else {
        video.pause();
      }
    }
    if (reduceMotion && reduceMotion.matches) {
      videos.forEach(function (video) { video.removeAttribute('autoplay'); video.pause(); });
    }
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { settle(entry.target, entry.isIntersecting); });
      });
      videos.forEach(function (video) { observer.observe(video); });
    }
  }

  function initialize() {
    initializeVideos();
    // Copying needs this script, so the copy buttons appear only once it can.
    Array.prototype.forEach.call(document.querySelectorAll('[data-pub-copy]'), function (button) {
      button.hidden = false;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
}());
