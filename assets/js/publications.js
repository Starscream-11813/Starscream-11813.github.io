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

  // The theme filter above the list (themes: in _data/publication_extras.yml).
  // A verb shows only the papers on that theme, and choosing it again, or
  // "all", shows every paper; ?theme=reason links straight to one. Where the
  // browser can, cards slide to their new places while the rest fade.
  function initializeFilter() {
    var filter = document.querySelector('[data-pub-filter]');
    if (!filter) { return; }
    var buttons = Array.prototype.slice.call(filter.querySelectorAll('[data-pub-theme]'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.pubs .pub-card'));
    var years = Array.prototype.slice.call(document.querySelectorAll('.pubs .pubs-year'));
    var themes = buttons.map(function (button) { return button.getAttribute('data-pub-theme'); });

    function apply(theme) {
      var total = 0;
      cards.forEach(function (card) {
        var own = (card.getAttribute('data-themes') || '').split(' ');
        card.hidden = Boolean(theme) && own.indexOf(theme) === -1;
        if (!card.hidden) { total += 1; }
      });
      years.forEach(function (year) {
        var shown = year.querySelectorAll('.pub-card:not([hidden])').length;
        var count = year.querySelector('.pubs-year__count');
        year.hidden = shown === 0;
        if (count) { count.textContent = shown + ' paper' + (shown === 1 ? '' : 's'); }
      });
      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-pub-theme') === theme ? 'true' : 'false');
      });
      return total;
    }

    function choose(theme) {
      var total;
      var run = function () { total = apply(theme); };
      if (document.startViewTransition && !(reduceMotion && reduceMotion.matches)) {
        var root = document.documentElement;
        var moving = cards.concat(years.map(function (year) { return year.querySelector('.pubs-year__title'); }));
        moving.forEach(function (element, index) { element.style.viewTransitionName = 'pub-filter-' + index; });
        root.classList.add('is-filtering');
        var transition = document.startViewTransition(run);
        var done = function () {
          moving.forEach(function (element) { element.style.viewTransitionName = ''; });
          root.classList.remove('is-filtering');
        };
        transition.finished.then(done, done);
        transition.updateCallbackDone.then(function () { announce(message(theme, total)); }, function () {});
      } else {
        run();
        announce(message(theme, total));
      }
      var url = new URL(window.location.href);
      if (theme) { url.searchParams.set('theme', theme); } else { url.searchParams.delete('theme'); }
      window.history.replaceState(window.history.state, '', url);
    }

    function message(theme, total) {
      var papers = total + ' paper' + (total === 1 ? '' : 's');
      return theme ? 'Showing ' + papers + ' on how LLMs ' + theme + '.' : 'Showing all ' + papers + '.';
    }

    filter.addEventListener('click', function (event) {
      var button = event.target.closest('[data-pub-theme]');
      if (!button) { return; }
      var theme = button.getAttribute('data-pub-theme');
      if (theme && button.getAttribute('aria-pressed') === 'true') { theme = ''; }
      choose(theme);
    });

    filter.hidden = false;
    var asked = new URLSearchParams(window.location.search).get('theme');
    if (asked && themes.indexOf(asked) !== -1) { apply(asked); }
  }

  function initialize() {
    initializeVideos();
    initializeFilter();
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
