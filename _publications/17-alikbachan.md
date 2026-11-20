---
title: "One Framework to Diagnose Them All: A Stratified Benchmark for Bengali LLM Hallucination"
collection: publications
type: notpreprints
status: accepted
permalink: /publications/17-alikbachan
excerpt:
date: 2026-11-19
venue: 'Findings of the Association for Computational Linguistics: EACL 2027'
venueyear: 2027
paperurl: 'https://arxiv.org/abs/2611.26336'
pdfurl: 'https://arxiv.org/pdf/2611.26336'
codedata: 'https://github.com/Alikbachan/Alikbachan'
huggingface: 'https://huggingface.co/datasets/Alikbachan/Alikbachan'
kaggle: 'https://www.kaggle.com/competitions/bengali-hallucination'
projectpage: 'https://alikbachan.github.io/'
doi: 'https://doi.org/10.48550/arXiv.2611.26336'
citation: 'A. S. Sushmit, S. E. S. Adib, A. A. J. Gem, A. S. Ruhan, M. N. Ansary, B. K. Sarkar, S. R. Raiyan, A. Abrar, A. B. Hasan, A. Sakhawat, M. S. Hossain, A. A. Sani, A. Mizan, S. Chakma, Q. A. R. Adib, W. Haque, S. K. Sen, S. Tahmid and M. M. O. Rashid, "One Framework to Diagnose Them All: A Stratified Benchmark for Bengali LLM Hallucination," arXiv preprint arXiv:2611.26336, 2026.'
authors: 'Asif Shahriyar Sushmit†, Shefayat E Shams Adib†, Abdullah Al Jubaer Gem†, Ahmed Shafin Ruhan†, MD. Nazmuddoha Ansary†, Biplab Kumar Sarkar†, <b>Syed Rifat Raiyan</b>†<sup class="author-dagger">‡</sup>, Ajwad Abrar, Abdullah Bin Hasan, Adib Sakhawat, M. Sakeef Hossain, Ahmed Alfey Sani, Arefin Mizan, Sourab Chakma, Quazi Adibur Rahman Adib, Wassie Haque, Sanjay Kumar Sen, Saad Tahmid, Mohammad Mamun Or Rashid.'
bibtex: '@article{sushmit2026alikbachan,<br>
      &emsp;&emsp;&emsp;&emsp;title={One Framework to Diagnose Them All: A Stratified Benchmark for Bengali {LLM} Hallucination},<br>
      &emsp;&emsp;&emsp;&emsp;author={Sushmit, Asif Shahriyar and Adib, Shefayat E Shams and Gem, Abdullah Al Jubaer and Ruhan, Ahmed Shafin and Ansary, MD. Nazmuddoha and Sarkar, Biplab Kumar and Raiyan, Syed Rifat and Abrar, Ajwad and Hasan, Abdullah Bin and Sakhawat, Adib and Hossain, M. Sakeef and Sani, Ahmed Alfey and Mizan, Arefin and Chakma, Sourab and Adib, Quazi Adibur Rahman and Haque, Wassie and Sen, Sanjay Kumar and Tahmid, Saad and Rashid, Mohammad Mamun Or},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2611.26336},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026}<br>
}'
bibtexraw: "@article{sushmit2026alikbachan,\\n
                  title={One Framework to Diagnose Them All: A Stratified Benchmark for Bengali {LLM} Hallucination},\\n
                  author={Sushmit, Asif Shahriyar and Adib, Shefayat E Shams and Gem, Abdullah Al Jubaer and Ruhan, Ahmed Shafin and Ansary, MD. Nazmuddoha and Sarkar, Biplab Kumar and Raiyan, Syed Rifat and Abrar, Ajwad and Hasan, Abdullah Bin and Sakhawat, Adib and Hossain, M. Sakeef and Sani, Ahmed Alfey and Mizan, Arefin and Chakma, Sourab and Adib, Quazi Adibur Rahman and Haque, Wassie and Sen, Sanjay Kumar and Tahmid, Saad and Rashid, Mohammad Mamun Or},\\n
                  journal={arXiv preprint arXiv:2611.26336},\\n
                  year={2026}\\n}"
bibtexprettify: "@article{sushmit2026alikbachan,\n
      &emsp;&emsp;&emsp;&emsp;title={One Framework to Diagnose Them All: A Stratified Benchmark for Bengali {LLM} Hallucination},\n
      &emsp;&emsp;&emsp;&emsp;author={Sushmit, Asif Shahriyar and Adib, Shefayat E Shams and Gem, Abdullah Al Jubaer and Ruhan, Ahmed Shafin and Ansary, MD. Nazmuddoha and Sarkar, Biplab Kumar and Raiyan, Syed Rifat and Abrar, Ajwad and Hasan, Abdullah Bin and Sakhawat, Adib and Hossain, M. Sakeef and Sani, Ahmed Alfey and Mizan, Arefin and Chakma, Sourab and Adib, Quazi Adibur Rahman and Haque, Wassie and Sen, Sanjay Kumar and Tahmid, Saad and Rashid, Mohammad Mamun Or},\n
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2611.26336},\n
      &emsp;&emsp;&emsp;&emsp;year={2026}\n
}"

poster:
slides:
video:
teaser: "alikbachan_teaser.png"
---
<u>Authors:</u> Asif Shahriyar Sushmit†, Shefayat E Shams Adib†, Abdullah Al Jubaer Gem†, Ahmed Shafin Ruhan†, MD. Nazmuddoha Ansary†, Biplab Kumar Sarkar†, **Syed Rifat Raiyan**†<sup class="author-dagger">‡</sup>, Ajwad Abrar, Abdullah Bin Hasan, Adib Sakhawat, M. Sakeef Hossain, Ahmed Alfey Sani, Arefin Mizan, Sourab Chakma, Quazi Adibur Rahman Adib, Wassie Haque, Sanjay Kumar Sen, Saad Tahmid, Mohammad Mamun Or Rashid.
<br>
<small><span class="author-dagger">†</span> denotes equal contribution; <span class="author-dagger">‡</span> denotes corresponding author.</small>
<br>
<u>Abstract:</u> Hallucination research in low-resource languages fragments easily: each newly named failure mode prompts its own dataset, spending scarce annotators on incomparable resources. We argue for consolidation and test it at community scale. *Alikbachan* is a Bengali hallucination-detection benchmark stratified along three crossed axes: a human-validated cultural-distance band, six task types, and a five-family, 32-mode hallucination taxonomy. It comprises a harvested 2,516-item test set (Phase 1) and a quota-constructed, gold-labeled 5,000-item set (Phase 2). The stratification is diagnostic. Four zero-shot LLM judges vary by over 30 macro-F1 points across strata, and the item-level predictions of 99 Phase-1 and 32 Phase-2 competition systems reproduce the profile: discourse-level omission defeats judges and most teams alike, whereas only a minority over-flag negative controls. The judges’ verdict probabilities rank items well (ROC-AUC 0.74–0.95) but are overconfident (ECE 0.04–0.29). An open competition on *Alikbachan* drew 222 teams and 3,566 submissions, and a single-prompt 32B judge reaches the 57th percentile. Of the 25 teams in both phases, 24 regress on Phase 2 (mean −17.6 points) while every zero-shot judge improves, and Phase-1 rank barely predicts Phase-2 rank (Spearman *ρ* = 0.35), so a Phase-1 leaderboard alone would have crowned a different winner.
<br>
