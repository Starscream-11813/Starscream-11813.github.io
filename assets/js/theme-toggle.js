(function() {
  var storageKey = 'site-theme';
  var lightThemeColor = '#ffffff';
  var darkThemeColor = '#1e1f31';
  var mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function storedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function systemTheme() {
    return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || storedTheme() || systemTheme();
  }

  function updateThemeColor(theme) {
    var meta = document.getElementById('theme-color-meta') || document.querySelector('meta[name="theme-color"]');

    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? darkThemeColor : lightThemeColor);
    }
  }

  function updateButtons(theme) {
    var hint = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    var buttons = document.querySelectorAll('[data-theme-toggle]');

    /* The button is named "Dark mode"; aria-pressed says whether it is on. */
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].setAttribute('title', hint);
      buttons[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* Plays the toggle's shooting star (see _theme-toggle.scss) once per switch. */
  function markSwitching(button) {
    button.classList.remove('is-switching');
    void button.offsetWidth;
    button.classList.add('is-switching');
    window.setTimeout(function() {
      button.classList.remove('is-switching');
    }, 1400);
  }

  function syncSisyphusAnimations(theme) {
    var frames = document.querySelectorAll('[data-sisyphus-animation]');

    for (var i = 0; i < frames.length; i += 1) {
      if (frames[i].contentWindow) {
        frames[i].contentWindow.postMessage({ sisyphusTheme: theme }, window.location.origin);
      }
    }
  }

  function bindSisyphusAnimations() {
    var frames = document.querySelectorAll('[data-sisyphus-animation]');

    for (var i = 0; i < frames.length; i += 1) {
      frames[i].addEventListener('load', function() {
        syncSisyphusAnimations(currentTheme());
      });
    }
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeColor(theme);
    updateButtons(theme);
    syncSisyphusAnimations(theme);

    if (persist) {
      setStoredTheme(theme);
    }
  }

  /* The new theme spreads over the page in a circle from the toggle, where the
     browser can animate a view transition and the reader allows motion. */
  function toggleTheme(event) {
    var button = event.currentTarget;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    var change = function() {
      applyTheme(next, true);
      markSwitching(button);
    };

    if (!document.startViewTransition || prefersReducedMotion()) {
      change();
      return;
    }

    var box = button.getBoundingClientRect();
    var x = box.left + box.width / 2;
    var y = box.top + box.height / 2;
    var radius = Math.sqrt(Math.pow(Math.max(x, window.innerWidth - x), 2) + Math.pow(Math.max(y, window.innerHeight - y), 2));
    var root = document.documentElement;
    var done = function() {
      root.classList.remove('is-theme-switching');
    };

    /* Marks this transition as a theme switch, not a page change, for the
       styles in _theme-toggle.scss. */
    root.classList.add('is-theme-switching');
    var transition = document.startViewTransition(change);

    transition.ready.then(function() {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 700, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(function() {});
    transition.finished.then(done, done);
  }

  /* A page loaded ahead of time (on hover; see head.html) or kept for the Back
     button may have been made before the theme last changed; it takes up the
     current choice as it is shown. */
  function syncWithStorage() {
    var theme = storedTheme() || systemTheme();

    if (theme !== document.documentElement.getAttribute('data-theme')) {
      applyTheme(theme, false);
    }
  }

  if (document.prerendering) {
    document.addEventListener('prerenderingchange', syncWithStorage, { once: true });
  }

  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      syncWithStorage();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('[data-theme-toggle]');

    bindSisyphusAnimations();
    applyTheme(currentTheme(), false);

    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', toggleTheme);
    }
  });

  if (mediaQuery) {
    var syncSystemTheme = function(event) {
      if (!storedTheme()) {
        applyTheme(event.matches ? 'dark' : 'light', false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', syncSystemTheme);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(syncSystemTheme);
    }
  }
}());
