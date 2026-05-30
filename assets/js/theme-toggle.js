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
    var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    var buttons = document.querySelectorAll('[data-theme-toggle]');

    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].setAttribute('aria-label', label);
      buttons[i].setAttribute('title', label);
      buttons[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeColor(theme);
    updateButtons(theme);

    if (persist) {
      setStoredTheme(theme);
    }
  }

  function toggleTheme() {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
  }

  document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('[data-theme-toggle]');

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
