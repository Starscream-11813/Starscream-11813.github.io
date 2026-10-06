(function () {
  'use strict';

  function initializeMap(root) {
    var controls = Array.prototype.slice.call(root.querySelectorAll('[data-map-control]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[data-map-panel]'));
    var edges = Array.prototype.slice.call(root.querySelectorAll('[data-map-edge]'));
    var announcement = root.querySelector('[data-map-announcement]');
    var selected = controls.length ? controls[0].getAttribute('data-map-control') : null;
    var active = null;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (!selected || !panels.length) { return; }
    var brainRegions = Array.prototype.slice.call(root.querySelectorAll('[data-brain-region]'));

    function show(key, announce) {
      if (!panels.some(function (panel) { return panel.getAttribute('data-map-panel') === key; })) { return; }
      var changed = active !== key;
      active = key;
      root.setAttribute('data-map-active', key);
      brainRegions.forEach(function (region) {
        region.classList.toggle('is-active', region.getAttribute('data-brain-region') === key);
      });

      controls.forEach(function (control) {
        var controlKey = control.getAttribute('data-map-control');
        control.classList.toggle('is-previewed', controlKey === key);
        control.classList.remove('is-connected');
        control.setAttribute('aria-expanded', controlKey === key ? 'true' : 'false');
        control.setAttribute('aria-pressed', controlKey === selected ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        var visible = panel.getAttribute('data-map-panel') === key;
        panel.hidden = !visible;
        panel.setAttribute('aria-hidden', visible ? 'false' : 'true');
        if (visible) { panel.removeAttribute('inert'); } else { panel.setAttribute('inert', ''); }
        // Keep native details open for enhanced panels, including when printing.
        panel.open = true;
        if (visible && announce && announcement) {
          var title = panel.querySelector('.research-map__panel-title').textContent;
          var count = panel.querySelectorAll('.research-map__paper').length;
          announcement.textContent = title + (count ? ': ' + count + ' related paper' + (count === 1 ? '' : 's') + '.' : ': work in progress.');
        }
      });

      edges.forEach(function (edge) {
        var from = edge.getAttribute('data-from');
        var to = edge.getAttribute('data-to');
        var connected = from === key || to === key;
        edge.classList.toggle('is-active', connected);
        edge.classList.remove('is-tracing');
        if (connected) {
          var other = from === key ? to : from;
          controls.forEach(function (control) {
            if (control.getAttribute('data-map-control') === other) { control.classList.add('is-connected'); }
          });
          if (changed && edge.getAttribute('data-kind') === 'shared') {
            // Restart only on a new view; no continuously looping motion.
            void edge.getBoundingClientRect();
            edge.classList.add('is-tracing');
          }
        }
      });
    }

    controls.forEach(function (control) {
      var key = control.getAttribute('data-map-control');
      control.addEventListener('pointerenter', function (event) {
        if (!finePointer.matches || event.pointerType === 'touch') { return; }
        // Do not hide a panel while someone is keyboard-focused on one of its links.
        var focusedPanel = document.activeElement && document.activeElement.closest('[data-map-panel]');
        if (focusedPanel && root.contains(focusedPanel)) { return; }
        show(key, false);
      });
      control.addEventListener('focus', function () { show(key, true); });
      control.addEventListener('click', function () {
        selected = key;
        show(key, true);
      });
      control.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          // Keyboard input resumes the focused region after a mouse preview.
          show(key, true);
          var panel = panels.filter(function (item) { return item.getAttribute('data-map-panel') === key; })[0];
          if (!panel) { return; }
          var links = panel.querySelectorAll('.research-map__paper');
          var destination = links.length ? links[event.key === 'ArrowDown' ? 0 : links.length - 1] : panel.querySelector('.research-map__panel-content');
          destination.focus();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          var step = event.key === 'ArrowLeft' ? -1 : 1;
          controls[(controls.indexOf(control) + step + controls.length) % controls.length].focus();
        }
      });
    });

    root.addEventListener('pointerleave', function () {
      var focused = document.activeElement;
      var focusedControl = focused && focused.closest('[data-map-control]');
      // Preserve keyboard exploration or a focused PDF, not an unrelated mouse
      // preview merely because the previously clicked control retains focus.
      if (root.contains(focused) && (!focusedControl || focusedControl.getAttribute('data-map-control') === active)) { return; }
      show(selected, false);
    });
    root.addEventListener('focusout', function (event) {
      if (!root.contains(event.relatedTarget)) { show(selected, false); }
    });
    root.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        var selectedControl = controls.filter(function (control) { return control.getAttribute('data-map-control') === selected; })[0];
        if (selectedControl) { selectedControl.focus(); }
        show(selected, false);
      }
    });

    root.classList.add('is-enhanced');
    active = selected;
    show(selected, false);
  }

  function initialize() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-research-map]'), initializeMap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
}());
