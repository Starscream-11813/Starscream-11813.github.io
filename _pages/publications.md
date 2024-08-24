---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

  You can also find my articles on <a href="https://scholar.google.com/citations?user=4L_7vaoAAAAJ&hl=en&oi=ao">my <span style="color:#4285F4">G</span><span style="color:#DB4437">o</span><span style="color:#F4B400">o</span><span style="color:#4285F4">g</span><span style="color:#0F9D58">l</span><span style="color:#DB4437">e</span> Scholar profile</a>.
  <br>
  † denotes equal contribution.

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
