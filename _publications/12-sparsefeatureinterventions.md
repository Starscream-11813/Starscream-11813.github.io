---
title: "Statistically Grounded Sparse-Feature Interventions for Activation-Space Control in Large Language Models"
collection: publications
type: preprints
permalink: /publications/12-sparsefeatureinterventions
excerpt:
date: 2026-06-05
paperurl: 'https://arxiv.org/abs/2607.19364'
pdfurl: 'https://arxiv.org/pdf/2607.19364'
codedata: 'https://github.com/Oshayer-Siddique/LLM-Steering-Using-SAE'
doi: 'https://doi.org/10.48550/arXiv.2607.19364'
citation: 'O. Siddique, J. M. A. U. Alam, M. J. R. Rafy, S. R. Raiyan, H. Mahmud and M. K. Hasan, "Statistically Grounded Sparse-Feature Interventions for Activation-Space Control in Large Language Models," arXiv preprint arXiv:2607.19364, 2026.'
authors: 'Oshayer Siddique†, J. M Areeb Uzair Alam†, Md Jobayer Rahman Rafy†, <b>Syed Rifat Raiyan</b>†, Hasan Mahmud, Md Kamrul Hasan.'
bibtex: '@article{siddique2026statistically,<br>
      &emsp;&emsp;&emsp;&emsp;title={Statistically Grounded Sparse-Feature Interventions for Activation-Space Control in Large Language Models},<br>
      &emsp;&emsp;&emsp;&emsp;author={Siddique, Oshayer and Alam, J. M Areeb Uzair and Rafy, Md Jobayer Rahman and Raiyan, Syed Rifat and Mahmud, Hasan and Hasan, Md Kamrul},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2607.19364},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026}<br>
}'
bibtexraw: "@article{siddique2026statistically,\\n
                  title={Statistically Grounded Sparse-Feature Interventions for Activation-Space Control in Large Language Models},\\n
                  author={Siddique, Oshayer and Alam, J. M Areeb Uzair and Rafy, Md Jobayer Rahman and Raiyan, Syed Rifat and Mahmud, Hasan and Hasan, Md Kamrul},\\n
                  journal={arXiv preprint arXiv:2607.19364},\\n
                  year={2026}\\n}"
bibtexprettify: "@article{siddique2026statistically,\n
      &emsp;&emsp;&emsp;&emsp;title={Statistically Grounded Sparse-Feature Interventions for Activation-Space Control in Large Language Models},\n
      &emsp;&emsp;&emsp;&emsp;author={Siddique, Oshayer and Alam, J. M Areeb Uzair and Rafy, Md Jobayer Rahman and Raiyan, Syed Rifat and Mahmud, Hasan and Hasan, Md Kamrul},\n
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2607.19364},\n
      &emsp;&emsp;&emsp;&emsp;year={2026}\n
}"

poster:
slides:
video:
teaser: "sparse_feature_interventions_teaser.png"
---
<u>Authors:</u> Oshayer Siddique†, J. M Areeb Uzair Alam†, Md Jobayer Rahman Rafy†, **Syed Rifat Raiyan**†, Hasan Mahmud, Md Kamrul Hasan.
<br>
<u>Abstract:</u> Activation steering offers a lightweight alternative to fine-tuning for behavioral control of large language models, but SAE-based steering methods often rely on learned steering objectives or single-criterion feature selection. We introduce a transparent SAE-feature steering pipeline that first applies a six-condition reliability filter, then ranks sparse features through an unweighted Borda consensus over three complementary statistics: F-test, KSG mutual information, and Cohen's $d$. The resulting steering direction is constructed as a Cohen's-$d$-weighted combination of SAE decoder rows, providing an optimization-free direction motivated by Fisher-LDA under approximate SAE-feature decorrelation. Across three Gemma-family models, four behavioral domains, and 356 layer-strength configurations, the method produces measurable domain-specific shifts while revealing a substantial gap between raw attribute movement and quality-preserving generation. In the strongest configuration, logical-correctness steering reaches a primary-score delta of $+1.16$ in Gemma 2 9B; however, our broader finding is that usable steering is highly localized by model, domain, layer, and strength. These results argue that activation-steering evaluations should report quality-conditioned success alongside raw behavioral shift. Our code and data are available at <a href="https://github.com/Oshayer-Siddique/LLM-Steering-Using-SAE">this https URL</a>.
<br>
