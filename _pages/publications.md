---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

  You can also find my articles on <a href="https://scholar.google.com/citations?user=4L_7vaoAAAAJ&hl=en&oi=ao">my <span style="color:#4285F4">G</span><span style="color:#DB4437">o</span><span style="color:#F4B400">o</span><span style="color:#4285F4">g</span><span style="color:#0F9D58">l</span><span style="color:#DB4437">e</span> Scholar profile</a>.
  <br>
  † denotes equal contribution.
<div class="container">
		<h3 id="Publications" style="">Selected Publications</h3>
		<hr>
		<!-- <font color="black">(* indicate equal contribution)</font><br><hr> -->
		All publications can be found on my <a href="https://scholar.google.com/citations?user=IyucsdQAAAAJ&hl=en" target="_blank">Google Scholar</a> page.
		<br>
		<br>
		<!-- VDebugger -->
		<div class="row">
			<div class="col-md-3">
				<img src="images/android-chrome-192x192.png" style="" alt="">
			</div>
			<div class="col-md-9">
				<b>
					<font color="black">
						VDebugger: Harnessing Execution Feedback for Debugging Visual Programs
					</font>
				</b><br>
				Xueqing Wu, Zongyu Lin, Songyan Zhao, Te-Lin Wu, <b>Pan Lu</b>, Nanyun Peng, Kai-Wei Chang
				<br>
				<b><a href="https://arxiv.org/abs/2406.13444" target="_blank">arXiv:2406.13444&nbsp;</a></b>
				<a href="https://shirley-wu.github.io/vdebugger/" target="_blank"> <small>[Project]&nbsp;</small></a>
				<a href="https://arxiv.org/abs/2406.13444" target="_blank"> <small>[Paper]&nbsp;</small></a>
				<a href="https://arxiv.org/pdf/2406.13444.pdf" target="_blank"> <small>[PDF]&nbsp;</small></a>
				<a href="https://github.com/shirley-wu/vdebugger/" target="_blank"> <small>[Code]&nbsp;</small></a>
				<a href="https://huggingface.co/VDebugger" target="_blank"> <small>[Model]&nbsp;</small></a>
				<a href="https://huggingface.co/VDebugger" target="_blank"> <small>[Data]&nbsp;</small></a>
				<a href="https://x.com/lupantech/status/1805396589785268557" target="_blank"> <small>[Twitter]&nbsp;</small></a>
				<!-- <a href="https://huggingface.co/papers/240X.XXXXX" target="_blank"> <small>[Daily Papers]&nbsp;</small></a> -->
				<a href="bibs/arxiv24_vdebugger.txt" target="_blank"> <small>[BibTex]</small></a><br>
			</div>
		</div>
  </div>
{% include base_path %}
{% for post in site.publications reversed %}
  {% include archive-single.html %}
  <hr>
{% endfor %}
