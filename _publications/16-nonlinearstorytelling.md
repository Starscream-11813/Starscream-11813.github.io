---
title: "Can LLMs Tell Stories Out of Order? A Corpus and Benchmark for Nonlinear Narrative Generation"
collection: publications
type: preprints
permalink: /publications/16-nonlinearstorytelling
excerpt:
date: 2026-10-15
paperurl: 'https://arxiv.org/abs/2610.21468'
pdfurl: 'https://arxiv.org/pdf/2610.21468'
codedata: 'https://github.com/Starscream-11813/LLM-nonlinear-storytelling'
projectpage: 'https://nonlinear-narrative.github.io/'
doi: 'https://doi.org/10.48550/arXiv.2610.21468'
citation: 'S. R. Raiyan, M. Tariquzzaman, M. F. Ishmam and T. Huang, "Can LLMs Tell Stories Out of Order? A Corpus and Benchmark for Nonlinear Narrative Generation," arXiv preprint arXiv:2610.21468, 2026.'
authors: '<b>Syed Rifat Raiyan</b>†, Md. Tariquzzaman†, Md Farhan Ishmam<sup class="author-dagger">‡</sup>, Tenghao Huang.'
bibtex: '@article{raiyan2026can,<br>
      &emsp;&emsp;&emsp;&emsp;title={Can {LLMs} Tell Stories Out of Order? A Corpus and Benchmark for Nonlinear Narrative Generation},<br>
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat and Tariquzzaman, Md. and Ishmam, Md Farhan and Huang, Tenghao},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2610.21468},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026}<br>
}'
bibtexraw: "@article{raiyan2026can,\\n
                  title={Can {LLMs} Tell Stories Out of Order? A Corpus and Benchmark for Nonlinear Narrative Generation},\\n
                  author={Raiyan, Syed Rifat and Tariquzzaman, Md. and Ishmam, Md Farhan and Huang, Tenghao},\\n
                  journal={arXiv preprint arXiv:2610.21468},\\n
                  year={2026}\\n}"
bibtexprettify: "@article{raiyan2026can,\n
      &emsp;&emsp;&emsp;&emsp;title={Can {LLMs} Tell Stories Out of Order? A Corpus and Benchmark for Nonlinear Narrative Generation},\n
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat and Tariquzzaman, Md. and Ishmam, Md Farhan and Huang, Tenghao},\n
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2610.21468},\n
      &emsp;&emsp;&emsp;&emsp;year={2026}\n
}"

poster:
slides:
video:
teaser: "nonlinear_storytelling_teaser.png"
---
<u>Authors:</u> **Syed Rifat Raiyan**†, Md. Tariquzzaman†, Md Farhan Ishmam<sup class="author-dagger">‡</sup>, Tenghao Huang.
<br>
<small><span class="author-dagger">†</span> denotes equal contribution; <span class="author-dagger">‡</span> denotes corresponding author.</small>
<br>
<u>Abstract:</u> Every story has two orders: the order in which its events happen and the order in which they are told. A story is nonlinear when the two differ. We introduce a benchmark of 83 published works that measures whether language models can tell nonlinear stories. For each work, we annotate one list of events in both orders, together with a story graph of causal dependencies, character knowledge, and the questions the telling raises and resolves. Given events in chronological order, all 19 models tell them, on average, more chronologically than the published works do; asked for a specific structure, they land within the human range about half the time. We then compare a model’s stories of the same events under different conditions, using both an automated judge and 71 human readers. Both prefer the chronological story a model writes by default to the nonlinear one it writes on request, which readers find harder to follow in 81% of decisive judgments. Readers also prefer stories written from the story graph to stories constrained to the published telling order (72% of decisive judgments), a difference the judge does not detect. Our results suggest that following an instruction to reorder a story is not yet the same as telling it well out of order.
<br>
