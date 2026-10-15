(function () {
  'use strict';

  // Behavior for the Talks page: a viewer for each talk's video, slides,
  // poster, and paper, opened from its buttons and previews. Each material
  // loads only when it is shown, and closing the viewer stops it.
  var ORDER = ['video', 'slides', 'poster', 'paper'];
  var LABELS = { video: 'Video', slides: 'Slides', poster: 'Poster', paper: 'Paper' };
  var ICONS = { video: 'fa-video-camera', slides: 'fa-file-powerpoint-o', poster: 'fa-picture-o', paper: 'fa-file-pdf-o' };
  var smallScreen = window.matchMedia ? window.matchMedia('(max-width: 700px), (pointer: coarse)') : { matches: false };

  // Google Drive and YouTube links become their players; a PDF is shown as is.
  function embedUrl(url) {
    var drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (drive) { return 'https://drive.google.com/file/d/' + drive[1] + '/preview'; }
    var youtube = url.match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([\w-]+)/);
    if (youtube) { return 'https://www.youtube.com/embed/' + youtube[1]; }
    return url;
  }

  // A wide PDF (slides, a landscape poster) opens whole; a tall one fits its width.
  function frameUrl(url, wide) {
    var embed = embedUrl(url);
    if (embed !== url || url.indexOf('#') >= 0) { return embed; }
    return url + (wide ? '#view=Fit' : '#view=FitH');
  }

  // Phones do not show a PDF inside a page, so there it opens in a new tab.
  function playsInPage(url) {
    return !smallScreen.matches || embedUrl(url) !== url;
  }

  // A talk's materials, in the usual order, from the links that open them, with
  // each one's shape (width over height) where its preview gives it.
  function materialsOf(talk) {
    var found = {};
    var ratios = {};
    Array.prototype.forEach.call(talk.querySelectorAll('[data-talk-open]'), function (link) {
      var kind = link.getAttribute('data-talk-open');
      if (!found[kind]) { found[kind] = link.getAttribute('href'); }
      if (!ratios[kind] && link.hasAttribute('data-talk-ratio')) { ratios[kind] = parseFloat(link.getAttribute('data-talk-ratio')); }
    });
    return ORDER.filter(function (kind) { return found[kind]; }).map(function (kind) {
      return { kind: kind, href: found[kind], ratio: ratios[kind] || (kind === 'video' || kind === 'slides' ? 16 / 9 : 0.75) };
    });
  }

  var viewer = null;
  var shown = null;

  function buildViewer() {
    viewer = document.createElement('dialog');
    viewer.className = 'talk-viewer';
    viewer.innerHTML =
      '<div class="talk-viewer__bar">' +
        '<div class="talk-viewer__tabs" role="tablist" aria-label="Materials"></div>' +
        '<a class="talk-viewer__open" target="_blank" rel="noopener"><span>Open in a new tab</span> <i class="fas fa-external-link-alt" aria-hidden="true"></i></a>' +
        '<button class="talk-viewer__close" type="button" aria-label="Close"><i class="fas fa-times" aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="talk-viewer__stage"></div>' +
      '<p class="talk-viewer__caption"></p>';
    document.body.appendChild(viewer);
    var tabs = viewer.querySelector('.talk-viewer__tabs');
    tabs.addEventListener('click', function (event) {
      var tab = event.target.closest('[data-kind]');
      if (tab) { showMaterial(tab.getAttribute('data-kind')); }
    });
    // Left and right arrows (and Home and End) move between the tabs.
    tabs.addEventListener('keydown', function (event) {
      var steps = { ArrowLeft: -1, ArrowRight: 1, Home: -Infinity, End: Infinity };
      if (!(event.key in steps)) { return; }
      var all = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));
      var index = all.indexOf(document.activeElement);
      if (index < 0) { return; }
      var step = steps[event.key];
      var next = step === -Infinity ? 0 : step === Infinity ? all.length - 1 : (index + step + all.length) % all.length;
      event.preventDefault();
      all[next].focus();
      showMaterial(all[next].getAttribute('data-kind'));
    });
    viewer.querySelector('.talk-viewer__close').addEventListener('click', function () { viewer.close(); });
    viewer.addEventListener('click', function (event) {
      if (event.target === viewer) { viewer.close(); }
    });
    // Closing removes the player, which stops a video that is playing.
    viewer.addEventListener('close', function () {
      viewer.querySelector('.talk-viewer__stage').replaceChildren();
    });
  }

  function showMaterial(kind) {
    var item = shown.materials.filter(function (material) { return material.kind === kind; })[0];
    if (!item) { return; }
    Array.prototype.forEach.call(viewer.querySelectorAll('.talk-viewer__tab'), function (tab) {
      var active = tab.getAttribute('data-kind') === kind;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });
    // The viewer takes the material's shape (see _sass/_talks.scss).
    viewer.style.setProperty('--talk-ratio', String(item.ratio));
    var stage = viewer.querySelector('.talk-viewer__stage');
    var frame = document.createElement('iframe');
    frame.className = 'talk-frame talk-frame--' + kind;
    frame.src = frameUrl(item.href, item.ratio > 1.15);
    frame.title = LABELS[kind] + ': ' + shown.title;
    frame.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
    frame.setAttribute('allowfullscreen', '');
    stage.replaceChildren(frame);
    viewer.querySelector('.talk-viewer__open').href = item.href;
  }

  function openViewer(link) {
    if (typeof HTMLDialogElement === 'undefined') { return false; }
    var talk = link.closest('[data-talk]');
    if (!talk || !playsInPage(link.getAttribute('href'))) { return false; }
    if (!viewer) { buildViewer(); }
    shown = {
      title: talk.getAttribute('data-talk-title') || '',
      materials: materialsOf(talk).filter(function (material) { return playsInPage(material.href); })
    };
    viewer.setAttribute('aria-label', shown.title);
    viewer.querySelector('.talk-viewer__tabs').innerHTML = shown.materials.map(function (material) {
      return '<button class="talk-viewer__tab talk-viewer__tab--' + material.kind + '" type="button" role="tab" data-kind="' + material.kind + '">' +
        '<i class="fa ' + ICONS[material.kind] + '" aria-hidden="true"></i> ' + LABELS[material.kind] + '</button>';
    }).join('');
    var caption = viewer.querySelector('.talk-viewer__caption');
    caption.textContent = shown.title;
    caption.title = shown.title;
    viewer.showModal();
    // The material shares the screen's height with the tabs and the caption.
    viewer.style.setProperty('--talk-chrome', (viewer.querySelector('.talk-viewer__bar').offsetHeight + caption.offsetHeight) + 'px');
    showMaterial(link.getAttribute('data-talk-open'));
    viewer.querySelector('.talk-viewer__tab[aria-selected="true"]').focus();
    return true;
  }

  // Capture runs ahead of the theme's own link handling.
  document.addEventListener('click', function (event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { return; }
    var open = event.target.closest('[data-talk-open]');
    if (open && openViewer(open)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
}());
