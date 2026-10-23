---
title: "SAE-StatSteer: Statistical Consensus Feature Selection for Optimization-Free Activation Steering of Large Language Models"
collection: publications
type: preprints
permalink: /publications/12-sparsefeatureinterventions
excerpt:
date: 2026-06-05
paperurl: 'https://arxiv.org/abs/2607.19364'
pdfurl: 'https://arxiv.org/pdf/2607.19364'
codedata: 'https://github.com/Oshayer-Siddique/SAE-STATSTEER'
doi: 'https://doi.org/10.48550/arXiv.2607.19364'
citation: 'O. Siddique, J. M. A. U. Alam, M. J. R. Rafy, S. R. Raiyan, H. Mahmud and M. K. Hasan, "SAE-StatSteer: Statistical Consensus Feature Selection for Optimization-Free Activation Steering of Large Language Models," arXiv preprint arXiv:2607.19364, 2026.'
authors: 'Oshayer Siddique†, J. M Areeb Uzair Alam†, Md Jobayer Rahman Rafy†, <b>Syed Rifat Raiyan</b>†, Hasan Mahmud, Md Kamrul Hasan.'
bibtex: '@article{siddique2026saestatsteer,<br>
      &emsp;&emsp;&emsp;&emsp;title={SAE-StatSteer: Statistical Consensus Feature Selection for Optimization-Free Activation Steering of Large Language Models},<br>
      &emsp;&emsp;&emsp;&emsp;author={Siddique, Oshayer and Alam, J. M Areeb Uzair and Rafy, Md Jobayer Rahman and Raiyan, Syed Rifat and Mahmud, Hasan and Hasan, Md Kamrul},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2607.19364},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026}<br>
}'
bibtexraw: "@article{siddique2026saestatsteer,\\n
                  title={SAE-StatSteer: Statistical Consensus Feature Selection for Optimization-Free Activation Steering of Large Language Models},\\n
                  author={Siddique, Oshayer and Alam, J. M Areeb Uzair and Rafy, Md Jobayer Rahman and Raiyan, Syed Rifat and Mahmud, Hasan and Hasan, Md Kamrul},\\n
                  journal={arXiv preprint arXiv:2607.19364},\\n
                  year={2026}\\n}"
bibtexprettify: "@article{siddique2026saestatsteer,\n
      &emsp;&emsp;&emsp;&emsp;title={SAE-StatSteer: Statistical Consensus Feature Selection for Optimization-Free Activation Steering of Large Language Models},\n
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
<u>Abstract:</u> Activation steering adds a residual-stream direction at inference time, providing lightweight behavioral control without fine-tuning. Sparse autoencoders (SAEs) can make such interventions auditable by decomposing dense activations into an approximately monosemantic feature basis. We introduce SAE-StatSteer, a transparent, optimization-free pipeline. It first filters features through six reliability conditions, then ranks the survivors by an unweighted Borda consensus over three statistics, an $F$-test, KSG mutual information, and Cohen's $d$, and finally combines the selected SAE decoder rows using Cohen's-$d$ weights. We evaluate three Gemma-family models across four behavioral domains against seven dense or SAE-based baselines. Our quality-conditioned protocol requires attribute movement while preserving relevance, richness, and coherence. Raw success systematically overstates usable control because strong shifts often degrade generation quality, and effective steering is not governed by a universal layer or strength. SAE-StatSteer remains competitive with optimization-based methods while exposing every selection and weighting decision for audit. These results motivate reporting quality-conditioned success alongside raw behavioral shift. Our code and data are available at <a href="https://github.com/Oshayer-Siddique/SAE-STATSTEER">https://github.com/Oshayer-Siddique/SAE-STATSTEER</a>.
<br>
