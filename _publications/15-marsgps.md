---
title: "Beyond Symbolic Solving: Multi Chain-of-Thought Voting for Geometric Reasoning in Large Language Models"
collection: publications
type: preprints
permalink: /publications/15-marsgps
excerpt:
date: 2026-04-01
paperurl: 'https://arxiv.org/abs/2604.00890'
pdfurl: 'https://arxiv.org/pdf/2604.00890'
codedata: 'https://anonymous.4open.science/r/MARS-GPS-DE55'
doi: 'https://doi.org/10.48550/arXiv.2604.00890'
citation: 'M. A. B. Siddique, S. Hossain, S. A. Siam, S. R. Raiyan, H. Mahmud and M. K. Hasan, "Beyond Symbolic Solving: Multi Chain-of-Thought Voting for Geometric Reasoning in Large Language Models," arXiv preprint arXiv:2604.00890, 2026.'
authors: 'Md. Abu Bakor Siddique†, Shahrin Hossain†, Sadman Ahmed Siam†, <b>Syed Rifat Raiyan</b><sup class="author-dagger">‡</sup>, Hasan Mahmud, Md Kamrul Hasan.'
bibtex: '@article{siddique2026beyond,<br>
      &emsp;&emsp;&emsp;&emsp;title={Beyond Symbolic Solving: Multi Chain-of-Thought Voting for Geometric Reasoning in Large Language Models},<br>
      &emsp;&emsp;&emsp;&emsp;author={Siddique, Md. Abu Bakor and Hossain, Shahrin and Siam, Sadman Ahmed and Raiyan, Syed Rifat and Mahmud, Hasan and Hasan, Md Kamrul},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2604.00890},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026}<br>
}'
bibtexraw: "@article{siddique2026beyond,\\n
                  title={Beyond Symbolic Solving: Multi Chain-of-Thought Voting for Geometric Reasoning in Large Language Models},\\n
                  author={Siddique, Md. Abu Bakor and Hossain, Shahrin and Siam, Sadman Ahmed and Raiyan, Syed Rifat and Mahmud, Hasan and Hasan, Md Kamrul},\\n
                  journal={arXiv preprint arXiv:2604.00890},\\n
                  year={2026}\\n}"
bibtexprettify: "@article{siddique2026beyond,\n
      &emsp;&emsp;&emsp;&emsp;title={Beyond Symbolic Solving: Multi Chain-of-Thought Voting for Geometric Reasoning in Large Language Models},\n
      &emsp;&emsp;&emsp;&emsp;author={Siddique, Md. Abu Bakor and Hossain, Shahrin and Siam, Sadman Ahmed and Raiyan, Syed Rifat and Mahmud, Hasan and Hasan, Md Kamrul},\n
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2604.00890},\n
      &emsp;&emsp;&emsp;&emsp;year={2026}\n
}"

poster:
slides:
video:
teaser: "marsgps_teaser.png"
---
<u>Authors:</u> Md. Abu Bakor Siddique†, Shahrin Hossain†, Sadman Ahmed Siam†, **Syed Rifat Raiyan**<sup class="author-dagger">‡</sup>, Hasan Mahmud, Md Kamrul Hasan.
<br>
<small><span class="author-dagger">†</span> denotes equal contribution; <span class="author-dagger">‡</span> denotes corresponding author.</small>
<br>
<u>Abstract:</u> Geometric Problem Solving (GPS) remains at the heart of enhancing mathematical reasoning in large language models because it requires the combination of diagrammatic understanding, symbolic manipulation and logical inference. In existing literature, researchers have chiefly focused on synchronising the diagram descriptions with text literals and solving the problem. In this vein, they have either taken a neural, symbolic or neuro-symbolic approach. But this solves only the first two of the requirements, namely diagrammatic understanding and symbolic manipulation, while leaving logical inference underdeveloped. The logical inference is often limited to one chain-of-thought (CoT). To address this weakness in hitherto existing models, this paper proposes MARS-GPS, that generates multiple parallel reasoning rollouts augmented with Python code execution for numerical verification, ranks them using token-level entropy as a confidence signal, and aggregates answers through a multi-stage voting and self-verification pipeline. Empirical results show that MARS-GPS with 8 parallel rollouts achieves 88.8% on Geometry3K, a nearly +11% improvement over the prior state-of-the-art, with accuracy scaling consistently as the number of rollouts increases from 1 to 16 (+6.0% on ablation subset). We provide our code and data in an anonymous repository: <a href="https://anonymous.4open.science/r/MARS-GPS-DE55">this https URL</a>.
<br>
