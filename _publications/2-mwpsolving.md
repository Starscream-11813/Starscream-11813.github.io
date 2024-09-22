---
title: "Math Word Problem Solving by Generating Linguistic Variants of Problem Statements"
collection: publications
permalink: /publications/2-mwpsolving
excerpt: 
date: 2023-07-09
venue: 'Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (Volume 4: Student Research Workshop)'
paperurl: 'https://arxiv.org/abs/2306.13899'
pdfurl: 'https://arxiv.org/pdf/2306.13899.pdf'
codedata: 'https://github.com/Starscream-11813/Variational-Mathematical-Reasoning'
doi: 'https://doi.org/10.18653/v1/2023.acl-srw.49'
citation: 'S. R. Raiyan, Md. N. Faiyaz, S. Md. J. Kabir, M. Kabir, H. Mahmud, and M. K. Hasan, “Math Word Problem Solving by Generating Linguistic Variants of Problem Statements,” arXiv preprint arXiv:2306.13899, 2023.'
authors: '<b>Syed Rifat Raiyan</b>, Md. Nafis Faiyaz, Shah Md. Jawad Kabir, Mohsinul Kabir, Hasan Mahmud, Md Kamrul Hasan.'
bibtex: '@misc{raiyan2023math,<br>
      &emsp;&emsp;&emsp;&emsp;title={Math Word Problem Solving by Generating Linguistic Variants of Problem Statements},<br> 
      &emsp;&emsp;&emsp;&emsp;author={Syed Rifat Raiyan and Md. Nafis Faiyaz and Shah Md. Jawad Kabir and Mohsinul Kabir and Hasan Mahmud and Md Kamrul Hasan},<br>
      &emsp;&emsp;&emsp;&emsp;year={2023},<br>
      &emsp;&emsp;&emsp;&emsp;eprint={2306.13899},<br>
      &emsp;&emsp;&emsp;&emsp;archivePrefix={arXiv},<br>
      &emsp;&emsp;&emsp;&emsp;primaryClass={cs.CL}<br>
}'
bibtexraw: "@misc{raiyan2023math,\n
                  title={Math Word Problem Solving by Generating Linguistic Variants of Problem Statements},\n 
                  author={Syed Rifat Raiyan and Md. Nafis Faiyaz and Shah Md. Jawad Kabir and Mohsinul Kabir and Hasan Mahmud and Md Kamrul Hasan},\n
                  year={2023},\n
                  eprint={2306.13899},\n
                  archivePrefix={arXiv},\n
                  primaryClass={cs.CL}\n}"
# '@inproceedings{raiyan-etal-2023-math,<br>
#     &emsp;&emsp;&emsp;&emsp;title = "Math Word Problem Solving by Generating Linguistic Variants of Problem Statements",<br>
#     &emsp;&emsp;&emsp;&emsp;author = "Raiyan, Syed Rifat  and<br>
#     &emsp;&emsp;&emsp;&emsp;  Faiyaz, Md Nafis  and<br>
#     &emsp;&emsp;&emsp;&emsp;  Kabir, Shah Md. Jawad  and<br>
#     &emsp;&emsp;&emsp;&emsp;  Kabir, Mohsinul  and<br>
#     &emsp;&emsp;&emsp;&emsp;  Mahmud, Hasan  and<br>
#     &emsp;&emsp;&emsp;&emsp;  Hasan, Md Kamrul",<br>
#     &emsp;&emsp;&emsp;&emsp;booktitle = "Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (Volume 4: Student Research Workshop)",<br>
#     &emsp;&emsp;&emsp;&emsp;month = jul,<br>
#     &emsp;&emsp;&emsp;&emsp;year = "2023",<br>
#     &emsp;&emsp;&emsp;&emsp;address = "Toronto, Canada",<br>
#     &emsp;&emsp;&emsp;&emsp;publisher = "Association for Computational Linguistics",<br>
#     &emsp;&emsp;&emsp;&emsp;url = "https://aclanthology.org/2023.acl-srw.49",<br>
#     &emsp;&emsp;&emsp;&emsp;pages = "362--378",<br>
#     &emsp;&emsp;&emsp;&emsp;abstract = "The art of mathematical reasoning stands as a fundamental pillar of intellectual progress and is a central catalyst in cultivating human ingenuity. Researchers have recently published a plethora of works centered around the task of solving Math Word Problems (MWP) {---} a crucial stride towards general AI. These existing models are susceptible to dependency on shallow heuristics and spurious correlations to derive the solution expressions. In order to ameliorate this issue, in this paper, we propose a framework for MWP solvers based on the generation of linguistic variants of the problem text. The approach involves solving each of the variant problems and electing the predicted expression with the majority of the votes. We use DeBERTa (Decoding-enhanced BERT with disentangled attention) as the encoder to leverage its rich textual representations and enhanced mask decoder to construct the solution expressions. Furthermore, we introduce a challenging dataset, ParaMAWPS, consisting of paraphrased, adversarial, and inverse variants of selectively sampled MWPs from the benchmark Mawps dataset. We extensively experiment on this dataset along with other benchmark datasets using some baseline MWP solver models. We show that training on linguistic variants of problem statements and voting on candidate predictions improve the mathematical reasoning and robustness of the model. We make our code and data publicly available.",<br>
# }'

poster: "https://drive.google.com/file/d/1FfexZxsKqL0mw2cUy7hTr4vhp7WBjhRW/view?usp=sharing"
slides: "https://drive.google.com/file/d/1R-lB53BeaM-7XE0EoBZ5qfy-BSc61gup/view?usp=sharing"
video: "https://drive.google.com/file/d/1cw0vTJtkPChXC_bSkMBVbZPYThmf-p_5/view?usp=sharing"
teaser: "ACLMWP.PNG"
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