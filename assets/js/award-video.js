(function() {
  'use strict';

  // Award announcements (see _includes/award-video.html): the small play
  // button beside an award note opens its video in a small window that grows
  // out of the button and shrinks back into it. Without this script, or in a
  // browser without <dialog>, the button simply opens the video in a new tab.
  if (typeof HTMLDialogElement !== 'function') return;

  var dialog, media, video, context, titleText, reason, reasonText;
  var opener = null;
  var source = '';
  var closing = false;
  var pressedOnBackdrop = false;
  var running = [];
  var warmed = {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function build() {
    dialog = document.createElement('dialog');
    dialog.className = 'award-video';
    dialog.setAttribute('aria-labelledby', 'award-video-title award-video-context');
    dialog.innerHTML =
      '<div class="award-video__box">' +
        '<div class="award-video__header">' +
          '<span class="award-video__heading">' +
            '<span class="award-video__context" id="award-video-context"></span>' +
            '<span class="award-video__title" id="award-video-title"><span class="award-video__title-text"></span> ' +
              '<span class="trophy" aria-hidden="true">🏆</span></span>' +
          '</span>' +
          '<button class="award-video__close" type="button" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="award-video__media"><video controls playsinline preload="auto" aria-label="Announcement video"></video></div>' +
        '<div class="award-video__reason"><span class="award-video__reason-label">Reason</span><p></p></div>' +
      '</div>';
    document.body.appendChild(dialog);

    media = dialog.querySelector('.award-video__media');
    video = dialog.querySelector('video');
    context = dialog.querySelector('.award-video__context');
    titleText = dialog.querySelector('.award-video__title-text');
    reason = dialog.querySelector('.award-video__reason');
    reasonText = reason.querySelector('p');

    dialog.querySelector('.award-video__close').addEventListener('click', close);
    // Escape asks to close; let the window shrink away first.
    dialog.addEventListener('cancel', function(event) {
      event.preventDefault();
      close();
    });
    // A click on the dimmed page outside closes it, but not a drag that only
    // ends there (say, along the video's timeline).
    dialog.addEventListener('pointerdown', function(event) {
      pressedOnBackdrop = event.target === dialog;
    });
    dialog.addEventListener('click', function(event) {
      if (event.target === dialog && pressedOnBackdrop) close();
      pressedOnBackdrop = false;
    });
    dialog.addEventListener('close', function() {
      video.pause();
      stopAnimations();
      closing = false;
      if (opener && opener.isConnected && (document.activeElement === document.body || dialog.contains(document.activeElement))) {
        opener.focus({ preventScroll: true });
      }
    });
    video.addEventListener('loadedmetadata', function() {
      if (video.videoWidth && video.videoHeight) {
        media.style.aspectRatio = video.videoWidth + ' / ' + video.videoHeight;
      }
    });
  }

  function stopAnimations() {
    running.forEach(function(animation) { animation.cancel(); });
    running = [];
  }

  // The transform that puts the window, shrunk, over the play button.
  function overButton() {
    var button = opener.getBoundingClientRect();
    var box = dialog.getBoundingClientRect();
    var dx = button.left + button.width / 2 - (box.left + box.width / 2);
    var dy = button.top + button.height / 2 - (box.top + box.height / 2);
    var scale = Math.max(button.width / box.width, 0.04);
    return 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')';
  }

  function animate(frames, backdropFrames, options) {
    stopAnimations();
    running.push(dialog.animate(frames, options));
    try {
      running.push(dialog.animate(backdropFrames, {
        duration: options.duration, fill: options.fill, pseudoElement: '::backdrop'
      }));
    } catch (error) { /* Animating ::backdrop isn't supported; it just appears. */ }
    return running[0];
  }

  function canAnimate() {
    return !reduceMotion.matches && typeof dialog.animate === 'function' && opener && opener.isConnected;
  }

  function open(trigger) {
    if (!dialog) build();
    if (dialog.open) return;
    opener = trigger;

    if (source !== trigger.href) {
      source = trigger.href;
      media.style.aspectRatio = '';
      video.poster = trigger.getAttribute('data-award-poster') || '';
      video.src = source;
    }
    context.textContent = trigger.getAttribute('data-award-context') || '';
    titleText.textContent = trigger.getAttribute('data-award-title') || 'Award';
    reasonText.textContent = trigger.getAttribute('data-award-reason') || '';
    reason.hidden = !reasonText.textContent;

    closing = false;
    dialog.showModal();
    if (video.ended) video.currentTime = 0;
    // The click that opened the window lets it play with sound.
    var playing = video.play();
    if (playing && playing.catch) playing.catch(function() { /* It waits on its play button. */ });

    if (canAnimate()) {
      animate(
        [{ transform: overButton(), opacity: 0 }, { opacity: 1, offset: 0.35 }, { transform: 'none', opacity: 1 }],
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 340, easing: 'cubic-bezier(0.22, 1.12, 0.36, 1)' }
      );
    }
  }

  function close() {
    if (!dialog || !dialog.open || closing) return;
    closing = true;
    video.pause();
    if (!canAnimate()) {
      dialog.close();
      return;
    }
    animate(
      [{ transform: 'none', opacity: 1 }, { opacity: 1, offset: 0.55 }, { transform: overButton(), opacity: 0 }],
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 230, easing: 'cubic-bezier(0.55, 0, 0.75, 0.2)', fill: 'forwards' }
    ).onfinish = function() {
      if (dialog.open) dialog.close();
    };
  }

  function triggerFrom(event) {
    var target = event.target;
    return target && target.closest ? target.closest('a[data-award-video]') : null;
  }

  document.addEventListener('click', function(event) {
    var trigger = triggerFrom(event);
    // Modified clicks keep the link's own behaviour (a new tab or window).
    if (!trigger || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open(trigger);
  });

  // Fetch the poster as the pointer or focus nears a button, so the window
  // never opens on an empty frame.
  function warm(event) {
    var trigger = triggerFrom(event);
    var poster = trigger && trigger.getAttribute('data-award-poster');
    if (!poster || warmed[poster]) return;
    warmed[poster] = true;
    new Image().src = poster;
  }
  document.addEventListener('pointerover', warm);
  document.addEventListener('focusin', warm);
}());
