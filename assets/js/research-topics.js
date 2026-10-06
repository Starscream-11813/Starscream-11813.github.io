(function() {
  'use strict';

  function initializeResearchTopics() {
    var roots = document.querySelectorAll('[data-research-topic]');
    var active = null;
    var closeTimer = null;
    var positioning = false;
    var hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    function cancelClose() {
      window.clearTimeout(closeTimer);
    }

    function close(returnFocus) {
      cancelClose();
      if (!active) return;
      var previous = active;
      active = null;
      previous.panel.hidden = true;
      previous.trigger.setAttribute('aria-expanded', 'false');
      if (returnFocus) previous.trigger.focus();
    }

    function position() {
      if (!active) return;
      var rect = active.trigger.getBoundingClientRect();
      var panel = active.panel;
      var margin = 12;
      var gap = 8;
      var viewportWidth = document.documentElement.clientWidth;
      var viewportHeight = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewportHeight) {
        close(false);
        return;
      }
      panel.style.maxHeight = Math.max(100, viewportHeight - 2 * margin) + 'px';
      var size = panel.getBoundingClientRect();
      var left = Math.max(margin, Math.min(rect.left, viewportWidth - size.width - margin));
      var top = rect.bottom + gap;
      if (top + size.height > viewportHeight - margin) top = rect.top - size.height - gap;
      top = Math.max(margin, Math.min(top, viewportHeight - size.height - margin));
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
    }

    function open(topic, pinned) {
      cancelClose();
      if (active && active !== topic) close(false);
      active = topic;
      active.pinned = pinned;
      topic.panel.hidden = false;
      topic.trigger.setAttribute('aria-expanded', 'true');
      position();
    }

    function scheduleClose(topic) {
      cancelClose();
      if (active !== topic || topic.pinned || topic.panel.contains(document.activeElement)) return;
      closeTimer = window.setTimeout(function() {
        if (active === topic && !topic.pinned) close(false);
      }, 180);
    }

    function adjacentFocus(topic, direction) {
      var candidates = document.querySelectorAll('a[href], button:not([disabled]), summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]');
      var focusable = Array.prototype.filter.call(candidates, function(element) {
        return !topic.panel.contains(element) && element.getClientRects().length && !element.closest('[hidden]');
      });
      var index = focusable.indexOf(topic.trigger);
      close(false);
      var next = focusable[index + direction];
      if (next) next.focus();
    }

    Array.prototype.forEach.call(roots, function(root) {
      var trigger = root.querySelector('.research-topic__trigger');
      var panel = root.querySelector('.research-topic-popover');
      if (!trigger || !panel || !panel.querySelector('a')) return;
      var topic = { trigger: trigger, panel: panel, pinned: false };
      // Reparenting avoids clipping by columns and keeps positioning viewport-relative.
      document.body.appendChild(panel);
      trigger.setAttribute('role', 'button');

      trigger.addEventListener('pointerenter', function(event) {
        if (hoverQuery.matches && event.pointerType !== 'touch') {
          if (active && active !== topic && active.panel.contains(document.activeElement)) return;
          if (active === topic) cancelClose();
          else open(topic, false);
        }
      });
      trigger.addEventListener('pointerleave', function() { scheduleClose(topic); });
      panel.addEventListener('pointerenter', cancelClose);
      panel.addEventListener('pointerleave', function() { scheduleClose(topic); });

      trigger.addEventListener('click', function(event) {
        event.preventDefault();
        if (active === topic && topic.pinned) close(false);
        else open(topic, true);
      });
      trigger.addEventListener('keydown', function(event) {
        if (event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          open(topic, true);
          var links = panel.querySelectorAll('a');
          links[event.key === 'ArrowUp' ? links.length - 1 : 0].focus();
        } else if (event.key === 'Tab' && active === topic) {
          if (event.shiftKey) close(false);
          else {
            event.preventDefault();
            topic.pinned = true;
            panel.querySelector('a').focus();
          }
        }
      });
      panel.addEventListener('keydown', function(event) {
        var links = Array.prototype.slice.call(panel.querySelectorAll('a'));
        var index = links.indexOf(document.activeElement);
        if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && index !== -1) {
          event.preventDefault();
          var direction = event.key === 'ArrowDown' ? 1 : -1;
          links[(index + direction + links.length) % links.length].focus();
        } else if (event.key === 'Tab' && !event.shiftKey && index === links.length - 1) {
          event.preventDefault();
          adjacentFocus(topic, 1);
        } else if (event.key === 'Tab' && event.shiftKey && document.activeElement === panel.querySelector('button')) {
          event.preventDefault();
          close(true);
        }
      });
      panel.querySelector('button').addEventListener('click', function() { close(true); });
    });

    document.addEventListener('pointerdown', function(event) {
      if (active && !active.trigger.contains(event.target) && !active.panel.contains(event.target)) close(false);
    });
    document.addEventListener('focusin', function(event) {
      if (active && event.target !== active.trigger && !active.panel.contains(event.target)) close(false);
    });
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && active) {
        event.preventDefault();
        close(true);
      }
    });
    function requestPosition() {
      if (!active || positioning) return;
      positioning = true;
      window.requestAnimationFrame(function() {
        positioning = false;
        position();
      });
    }
    window.addEventListener('resize', requestPosition);
    window.addEventListener('scroll', requestPosition, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeResearchTopics);
  else initializeResearchTopics();
}());
