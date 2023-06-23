---
title: "Math Word Problem Solving by Generating Linguistic Variants of Problem Statements"
collection: publications
permalink: /publications/2-mwpsolving
excerpt: 
date: 2023-07-09
venue: 'Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics: Student Research Workshop (ACL-SRW)'
paperurl: 'TODO'
pdfurl: 'TODO'
codedata: 'https://github.com/Starscream-11813/Variational-Mathematical-Reasoning'
citation: 'TODO'
authors: '<b>Syed Rifat Raiyan</b>, Md. Nafis Faiyaz, Shah Md. Jawad Kabir, Mohsinul Kabir, Hasan Mahmud, Md Kamrul Hasan.'
bibtex: 'TODO'
---
<u>Authors:</u> **Syed Rifat Raiyan**, Md. Nafis Faiyaz, Shah Md. Jawad Kabir, Mohsinul Kabir, Hasan Mahmud, Md Kamrul Hasan.
<br>
<u>Abstract:</u> The art of mathematical reasoning stands as a
fundamental pillar of intellectual progress and
is a central catalyst in cultivating human ingenuity. Researchers have recently published
a plethora of works centered around the task
of solving Math Word Problems (MWP) — a
crucial stride towards general AI. These existing models are susceptible to dependency on
shallow heuristics and spurious correlations to
derive the solution expressions. In order to
ameliorate this issue, in this paper, we propose a framework for MWP solvers based
on the generation of linguistic variants of the
problem text. The approach involves solving
each of the variant problems and electing the
predicted expression with the majority of the
votes. We use DeBERTa (Decoding-enhanced
BERT with disentangled attention) as the encoder to leverage its rich textual representations and enhanced mask decoder to construct
the solution expressions. Furthermore, we introduce a challenging dataset, <span style="font-variant:small-caps;">ParaMAWPS</span>,
consisting of paraphrased, adversarial, and inverse variants of selectively sampled MWPs
from the benchmark <span style="font-variant:small-caps;">Mawps</span> dataset. We extensively experiment on this dataset along with
other benchmark datasets using some baseline
MWP solver models. We show that training on
linguistic variants of problem statements and
voting on candidate predictions improve the
mathematical reasoning and robustness of the
model. We make our code and data publicly
available.
<br>
<!-- [[PDF]](https://arxiv.org/ftp/arxiv/papers/2305/2305.06595.pdf) [[Code/Data]](https://github.com/mohsinulkabir14/BanglaBook) -->