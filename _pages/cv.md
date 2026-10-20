---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
cv_updated: 2023-07-13
cv_file: /files/CVRifat_v7_Redacted2.pdf
---

{% include base_path %}
{%- comment -%}
  When the CV changes, update cv_updated (and cv_file) above. The date shows
  as "13th July, 2023", followed by how long ago that was ("3 years, 99 days
  ago"), worked out here at build time and again in the visitor's browser.
  Styles are in _sass/_cv.scss.
{%- endcomment -%}
{%- assign cv_day = page.cv_updated | date: '%-d' | plus: 0 -%}
{%- assign cv_day_100 = cv_day | modulo: 100 -%}
{%- assign cv_day_10 = cv_day | modulo: 10 -%}
{%- if cv_day_100 >= 11 and cv_day_100 <= 13 -%}{%- assign cv_suffix = 'th' -%}
{%- elsif cv_day_10 == 1 -%}{%- assign cv_suffix = 'st' -%}
{%- elsif cv_day_10 == 2 -%}{%- assign cv_suffix = 'nd' -%}
{%- elsif cv_day_10 == 3 -%}{%- assign cv_suffix = 'rd' -%}
{%- else -%}{%- assign cv_suffix = 'th' -%}{%- endif -%}
{%- assign cv_year = page.cv_updated | date: '%Y' | plus: 0 -%}
{%- assign cv_monthday = page.cv_updated | date: '%m%d' | plus: 0 -%}
{%- assign cv_years = site.time | date: '%Y' | plus: 0 | minus: cv_year -%}
{%- assign cv_now_monthday = site.time | date: '%m%d' | plus: 0 -%}
{%- if cv_now_monthday < cv_monthday -%}{%- assign cv_years = cv_years | minus: 1 -%}{%- endif -%}
{%- capture cv_anniversary %}{{ cv_year | plus: cv_years }}-{{ page.cv_updated | date: '%m-%d' }}{% endcapture -%}
{%- assign cv_anniversary_s = cv_anniversary | date: '%s' | plus: 0 -%}
{%- assign cv_now_s = site.time | date: '%s' | plus: 0 -%}
{%- assign cv_days = cv_now_s | minus: cv_anniversary_s | divided_by: 86400 -%}
<div class="cv">
  <div class="cv-card">
    <p class="cv-updated"><span>Last update: <time datetime="{{ page.cv_updated | date: '%Y-%m-%d' }}">{{ cv_day }}{{ cv_suffix }} {{ page.cv_updated | date: '%B, %Y' }}</time></span>
      <span class="cv-age" data-cv-since="{{ page.cv_updated | date: '%Y-%m-%d' }}" title="Time since this CV was last updated"><i class="fas fa-hourglass-half" aria-hidden="true"></i> <span data-cv-age>{% if cv_years > 0 %}<b>{{ cv_years }}</b> year{% if cv_years != 1 %}s{% endif %}, {% endif %}<b>{{ cv_days }}</b> day{% if cv_days != 1 %}s{% endif %} ago</span></span></p>
    <p>You can download a PDF copy of my CV <a href="{{ page.cv_file | relative_url }}">here</a>.</p>
    <p class="cv-note"><i class="fas fa-lock" aria-hidden="true"></i> Redacted information are available upon request.</p>
  </div>
  <div class="cv-frame">
    <iframe src="{{ page.cv_file | relative_url }}" title="CV of Syed Rifat Raiyan (PDF)"></iframe>
  </div>
</div>

<script>
(function () {
  /* How long ago the CV was updated, in whole years and the days since the
     last anniversary, counted from the visitor's own date. */
  var badge = document.querySelector('[data-cv-since]');
  var out = document.querySelector('[data-cv-age]');
  if (!badge || !out) { return; }
  var parts = badge.getAttribute('data-cv-since').split('-');
  var since = Date.UTC(+parts[0], +parts[1] - 1, +parts[2]);
  var now = new Date();
  var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  var start = new Date(since);
  var years = now.getFullYear() - start.getUTCFullYear();
  var anniversary = Date.UTC(start.getUTCFullYear() + years, start.getUTCMonth(), start.getUTCDate());
  if (anniversary > today) {
    years -= 1;
    anniversary = Date.UTC(start.getUTCFullYear() + years, start.getUTCMonth(), start.getUTCDate());
  }
  var days = Math.round((today - anniversary) / 86400000);
  if (years < 0) { return; }
  function unit(n, word) { return '<b>' + n + '</b> ' + word + (n === 1 ? '' : 's'); }
  out.innerHTML = (years > 0 ? unit(years, 'year') + ', ' : '') + unit(days, 'day') + ' ago';
}());
</script>
