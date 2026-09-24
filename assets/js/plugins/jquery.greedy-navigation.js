/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

var breaks = [];
var compactNav = window.matchMedia('(max-width: 1199px)');
var wasCompact = false;

function closeNav() {
  $hlinks.addClass('hidden');
  $btn.removeClass('close').attr('aria-expanded', 'false').attr('aria-label', 'Open navigation');
}

function updateNav() {

  // Keep the name visible and put ALL destinations in one predictable touch menu.
  // Select only list items: the legacy markup also contains inline style elements.
  if (compactNav.matches) {
    $vlinks.children('li').not('.masthead__menu-item--lg').appendTo($hlinks);
    $btn.removeClass('hidden').attr('count', $hlinks.children('li').length);
    breaks = [];
    if (!wasCompact) closeNav();
    wasCompact = true;
    return;
  }

  if (wasCompact) {
    $hlinks.children('li').appendTo($vlinks);
    $btn.addClass('hidden');
    closeNav();
    wasCompact = false;
  }

  var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

  // The visible list is overflowing the nav
  if($vlinks.width() > availableSpace) {

    // Record the width of the list
    breaks.push($vlinks.width());

    // Move item to the hidden list
    $vlinks.children('li').not('.masthead__menu-item--lg').last().prependTo($hlinks);

    // Show the dropdown btn
    if($btn.hasClass('hidden')) {
      $btn.removeClass('hidden');
    }

  // The visible list is not overflowing
  } else {

    // There is space for another item in the nav
    if(availableSpace > breaks[breaks.length-1]) {

      // Move the item to the visible list
      $hlinks.children('li').first().appendTo($vlinks);
      breaks.pop();
    }

    // Hide the dropdown btn if hidden list is empty
    if(breaks.length < 1) {
      $btn.addClass('hidden');
      closeNav();
    }
  }

  // Keep counter updated
  $btn.attr("count", breaks.length);

  // Recur if the visible list is still overflowing the nav
  if($vlinks.width() > availableSpace && $vlinks.children('li').length > 1) {
    updateNav();
  }

}

// Window listeners

$(window).resize(function() {
  updateNav();
});

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
  var expanded = !$hlinks.hasClass('hidden');
  $(this).attr('aria-expanded', String(expanded)).attr('aria-label', expanded ? 'Close navigation' : 'Open navigation');
});

$(document).on('click', function(event) {
  if (compactNav.matches && !$(event.target).closest('#site-nav').length) closeNav();
}).on('keydown', function(event) {
  if (event.key === 'Escape' && !$hlinks.hasClass('hidden')) {
    closeNav();
    $btn.focus();
  }
});

if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateNav);

updateNav();
