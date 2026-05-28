---
title: "Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models"
collection: publications
type: preprints
permalink: /publications/10-ivellm
excerpt:
date: 2026-04-13
paperurl: 'https://arxiv.org/abs/2604.12076'
pdfurl: 'https://arxiv.org/pdf/2604.12076'
codedata: 'https://github.com/Starscream-11813/IVE-LLM'
aipodcast: 'https://www.youtube.com/watch?v=uUr5XvRIprE'
doi: 'https://doi.org/10.48550/arXiv.2604.12076'
citation: 'S. R. Raiyan, "Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models," arXiv preprint arXiv:2604.12076, 2026.'
authors: '<b>Syed Rifat Raiyan</b>.'
bibtex: '@article{raiyan2026narrative,<br>
      &emsp;&emsp;&emsp;&emsp;title={Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models},<br>
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2604.12076},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026}<br>
}'
bibtexraw: "@article{raiyan2026narrative,\\n
                  title={Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models},\\n
                  author={Raiyan, Syed Rifat},\\n
                  journal={arXiv preprint arXiv:2604.12076},\\n
                  year={2026}\\n}"
bibtexprettify: "@article{raiyan2026narrative,\n
      &emsp;&emsp;&emsp;&emsp;title={Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models},\n
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat},\n
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2604.12076},\n
      &emsp;&emsp;&emsp;&emsp;year={2026}\n
}"

poster:
slides:
video:
teaser: "ivellm_teaser.png"
---
<u>Authors:</u> **Syed Rifat Raiyan**.
<br>
<u>Abstract:</u> The Identifiable Victim Effect (IVE)--the tendency to allocate greater resources to a specific, narratively described victim than to a statistically characterized group facing equivalent hardship--is one of the most robust findings in moral psychology and behavioral economics. As large language models (LLMs) assume consequential roles in humanitarian triage, automated grant evaluation, and content moderation, a critical question arises: do these systems inherit the affective irrationalities present in human moral reasoning? We present the first systematic, large-scale empirical investigation of the IVE in LLMs, comprising $N=51{,}955$ validated API trials across 16 frontier models spanning nine organizational lineages. Using a suite of ten experiments--porting and extending canonical paradigms from Small et al. (2007) and Kogut and Ritov (2005)--we find that the IVE is prevalent but strongly modulated by alignment training. Instruction-tuned models exhibit extreme IVE ($d=1.56$), while reasoning-specialized models invert the effect (down to $d=-0.85$). The pooled effect ($d=0.223$, $p=2 \times 10^{-6}$) is approximately twice the single-victim human meta-analytic baseline ($d \approx 0.10$) reported by Lee and Feeley (2016)--and likely exceeds the overall human pooled effect by a larger margin, given that the group-victim human effect is near zero. Standard Chain-of-Thought (CoT) prompting--contrary to its role as a deliberative corrective--nearly triples the IVE effect size (from $d=0.15$ to $d=0.41$), while only utilitarian CoT reliably eliminates it. We further document psychophysical numbing, perfect quantity neglect, and marginal in-group/out-group cultural bias, with implications for AI deployment in humanitarian and ethical decision-making contexts. Our code and data are publicly available at <a href="https://github.com/Starscream-11813/IVE-LLM">this https URL</a>.
<br>
<div style="margin: 1.25rem 0 0; width: 100%; aspect-ratio: 16 / 9; min-height: 320px; border: 1px solid #d9d6ce; border-radius: 7px; overflow: hidden; background: #faf9f5;">
  <iframe src="{{ '/images/IVE%20Teaser_standalone.html' | relative_url }}" title="Identifiable Victim Effect in LLMs teaser animation" style="width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
</div>
<br>
