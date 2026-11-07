---
title: "LLM-Ideoplasticity: Measuring Ideological Plasticity in the Political Behavior of LLMs as a Context-Conditioned Distribution"
collection: publications
type: notpreprints
permalink: /publications/11-llmideoplasticity
excerpt:
date: 2026-05-26
venue: 'Proceedings of the 15th International Joint Conference on Natural Language Processing and the 5th Conference of the Asia-Pacific Chapter of the Association for Computational Linguistics (Volume 1: Long Papers)'
pptmode: 'Oral Presentation'
note: 'Best Paper Award'
ranknote: '99.6th Percentile in ARR May 2026 (Top 62 / 17,087 submissions)'
anthology: 'https://aclanthology.org/2026.aacl-long.145/'
paperurl: 'https://arxiv.org/abs/2606.28335'
pdfurl: 'https://aclanthology.org/2026.aacl-long.145.pdf'
codedata: 'https://github.com/sakhadib/LLM-Ideoplasticity'
projectpage: 'https://sakhadib.github.io/LLM-Ideoplasticity/'
# The ACL Anthology lists no DOI for this paper yet (November 2026); once it does, point doi at it.
doi: 'https://doi.org/10.48550/arXiv.2606.28335'
citation: 'A. Sakhawat, S. R. Raiyan, T. Islam, T. Farhin, H. Mahmud, and M. K. Hasan, "LLM-Ideoplasticity: Measuring Ideological Plasticity in the Political Behavior of LLMs as a Context-Conditioned Distribution," in Proceedings of the 15th International Joint Conference on Natural Language Processing and the 5th Conference of the Asia-Pacific Chapter of the Association for Computational Linguistics (Volume 1: Long Papers), Hengqin, China, Nov. 2026, pp. 3167–3209.'
authors: 'Adib Sakhawat†, <b>Syed Rifat Raiyan</b>†, Tahsin Islam, Takia Farhin, Hasan Mahmud, Md Kamrul Hasan.'
bibtex: '@inproceedings{sakhawat2026llmideoplasticity,<br>
      &emsp;&emsp;&emsp;&emsp;title={{LLM-Ideoplasticity}: Measuring Ideological Plasticity in the Political Behavior of {LLMs} as a Context-Conditioned Distribution},<br>
      &emsp;&emsp;&emsp;&emsp;author={Sakhawat, Adib and Raiyan, Syed Rifat and Islam, Tahsin and Farhin, Takia and Mahmud, Hasan and Hasan, Md Kamrul},<br>
      &emsp;&emsp;&emsp;&emsp;booktitle={Proceedings of the 15th International Joint Conference on Natural Language Processing and the 5th Conference of the Asia-Pacific Chapter of the Association for Computational Linguistics (Volume 1: Long Papers)},<br>
      &emsp;&emsp;&emsp;&emsp;month=nov,<br>
      &emsp;&emsp;&emsp;&emsp;year={2026},<br>
      &emsp;&emsp;&emsp;&emsp;address={Hengqin, China},<br>
      &emsp;&emsp;&emsp;&emsp;publisher={Association for Computational Linguistics},<br>
      &emsp;&emsp;&emsp;&emsp;url={https://aclanthology.org/2026.aacl-long.145/},<br>
      &emsp;&emsp;&emsp;&emsp;pages={3167--3209}<br>
}'
bibtexraw: "@inproceedings{sakhawat2026llmideoplasticity,\\n
                  title={{LLM-Ideoplasticity}: Measuring Ideological Plasticity in the Political Behavior of {LLMs} as a Context-Conditioned Distribution},\\n
                  author={Sakhawat, Adib and Raiyan, Syed Rifat and Islam, Tahsin and Farhin, Takia and Mahmud, Hasan and Hasan, Md Kamrul},\\n
                  booktitle={Proceedings of the 15th International Joint Conference on Natural Language Processing and the 5th Conference of the Asia-Pacific Chapter of the Association for Computational Linguistics (Volume 1: Long Papers)},\\n
                  month=nov,\\n
                  year={2026},\\n
                  address={Hengqin, China},\\n
                  publisher={Association for Computational Linguistics},\\n
                  url={https://aclanthology.org/2026.aacl-long.145/},\\n
                  pages={3167--3209}\\n}"
bibtexprettify: "@inproceedings{sakhawat2026llmideoplasticity,\n
      &emsp;&emsp;&emsp;&emsp;title={{LLM-Ideoplasticity}: Measuring Ideological Plasticity in the Political Behavior of {LLMs} as a Context-Conditioned Distribution},\n
      &emsp;&emsp;&emsp;&emsp;author={Sakhawat, Adib and Raiyan, Syed Rifat and Islam, Tahsin and Farhin, Takia and Mahmud, Hasan and Hasan, Md Kamrul},\n
      &emsp;&emsp;&emsp;&emsp;booktitle={Proceedings of the 15th International Joint Conference on Natural Language Processing and the 5th Conference of the Asia-Pacific Chapter of the Association for Computational Linguistics (Volume 1: Long Papers)},\n
      &emsp;&emsp;&emsp;&emsp;month=nov,\n
      &emsp;&emsp;&emsp;&emsp;year={2026},\n
      &emsp;&emsp;&emsp;&emsp;address={Hengqin, China},\n
      &emsp;&emsp;&emsp;&emsp;publisher={Association for Computational Linguistics},\n
      &emsp;&emsp;&emsp;&emsp;url={https://aclanthology.org/2026.aacl-long.145/},\n
      &emsp;&emsp;&emsp;&emsp;pages={3167--3209}\n
}"

poster: "/files/LLM-Ideoplasticity_Poster.pdf"
slides: "/files/LLM-Ideoplasticity_Slides.pdf"
video: "/files/LLM-Ideoplasticity_Talk.mp4"
teaser: "llm_ideoplasticity_teaser.gif"
---
<u>Authors:</u> Adib Sakhawat†, **Syed Rifat Raiyan**†, Tahsin Islam, Takia Farhin, Hasan Mahmud, Md Kamrul Hasan.
<br>
<u>Abstract:</u> We argue, with systematic empirical evidence, that a large language model's political ideology is not a fixed point, but a conditional distribution $\mathbb{P}(\text{position}\mid\text{context})$ over a real political space. We evaluate nine current LLMs using a unified measurement framework anchored by VAA-CHES projection models, which map responses onto three validated dimensions (lrgen, lrecon, galtan) across six contextual axes. Our findings reveal high sensitivity to context: persuasive framing and under-represented languages displace coordinates by up to 0.57 and 0.52 units, respectively, while chain-of-thought reasoning often amplifies rather than dampens paraphrase instability. Despite this local plasticity, the model cohort occupies a remarkably narrow Overton envelope overall, occupying roughly one-third the spread of major European parties. Supported by a multi-trait multi-method (MTMM) analysis, we conclude that a single point cannot summarize LLM political behavior; it must be characterized as a shape. Our code and data are publicly available at <a href="https://github.com/sakhadib/LLM-Ideoplasticity">this https URL</a>.
<br>
