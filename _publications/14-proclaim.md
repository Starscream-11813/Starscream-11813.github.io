---
title: "Courtroom-Style Multi-Agent Debate with Progressive RAG and Role-Switching for Controversial Claim Verification"
collection: publications
type: preprints
permalink: /publications/14-proclaim
excerpt:
date: 2026-03-30
paperurl: 'https://arxiv.org/abs/2603.28488'
pdfurl: 'https://arxiv.org/pdf/2603.28488'
codedata: 'https://github.com/mnc13/PROClaim'
doi: 'https://doi.org/10.48550/arXiv.2603.28488'
citation: 'M. N. Chowdhury, N. J. Beg, U. H. Khan, S. R. Raiyan, M. K. Hasan and H. Mahmud, "Courtroom-Style Multi-Agent Debate with Progressive RAG and Role-Switching for Controversial Claim Verification," arXiv preprint arXiv:2603.28488, 2026.'
authors: 'Masnun Nuha Chowdhury†, Nusrat Jahan Beg†, Umme Hunny Khan, <b>Syed Rifat Raiyan</b><sup class="author-dagger">‡</sup>, Md Kamrul Hasan, Hasan Mahmud.'
bibtex: '@article{chowdhury2026courtroom,<br>
      &emsp;&emsp;&emsp;&emsp;title={Courtroom-Style Multi-Agent Debate with Progressive {RAG} and Role-Switching for Controversial Claim Verification},<br>
      &emsp;&emsp;&emsp;&emsp;author={Chowdhury, Masnun Nuha and Beg, Nusrat Jahan and Khan, Umme Hunny and Raiyan, Syed Rifat and Hasan, Md Kamrul and Mahmud, Hasan},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2603.28488},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026}<br>
}'
bibtexraw: "@article{chowdhury2026courtroom,\\n
                  title={Courtroom-Style Multi-Agent Debate with Progressive {RAG} and Role-Switching for Controversial Claim Verification},\\n
                  author={Chowdhury, Masnun Nuha and Beg, Nusrat Jahan and Khan, Umme Hunny and Raiyan, Syed Rifat and Hasan, Md Kamrul and Mahmud, Hasan},\\n
                  journal={arXiv preprint arXiv:2603.28488},\\n
                  year={2026}\\n}"
bibtexprettify: "@article{chowdhury2026courtroom,\n
      &emsp;&emsp;&emsp;&emsp;title={Courtroom-Style Multi-Agent Debate with Progressive {RAG} and Role-Switching for Controversial Claim Verification},\n
      &emsp;&emsp;&emsp;&emsp;author={Chowdhury, Masnun Nuha and Beg, Nusrat Jahan and Khan, Umme Hunny and Raiyan, Syed Rifat and Hasan, Md Kamrul and Mahmud, Hasan},\n
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2603.28488},\n
      &emsp;&emsp;&emsp;&emsp;year={2026}\n
}"

poster:
slides:
video:
teaser: "proclaim_teaser.png"
---
<u>Authors:</u> Masnun Nuha Chowdhury†, Nusrat Jahan Beg†, Umme Hunny Khan, **Syed Rifat Raiyan**<sup class="author-dagger">‡</sup>, Md Kamrul Hasan, Hasan Mahmud.
<br>
<small><span class="author-dagger">†</span> denotes equal contribution; <span class="author-dagger">‡</span> denotes corresponding author.</small>
<br>
<u>Abstract:</u> Large language models (LLMs) remain unreliable for high-stakes claim verification due to hallucinations and shallow reasoning. While retrieval-augmented generation (RAG) and multi-agent debate (MAD) address this, they are limited by one-pass retrieval and unstructured debate dynamics. We propose a courtroom-style multi-agent framework, PROClaim, that reformulates verification as a structured, adversarial deliberation. Our approach integrates specialized roles (e.g., Plaintiff, Defense, Judge) with Progressive RAG (P-RAG) to dynamically expand and refine the evidence pool during the debate. Furthermore, we employ evidence negotiation, self-reflection, and heterogeneous multi-judge aggregation to enforce calibration, robustness, and diversity. In zero-shot evaluations on the Check-COVID benchmark, PROClaim achieves 81.7% accuracy, outperforming standard multi-agent debate by 10.0 percentage points, with P-RAG driving the primary performance gains (+7.5 pp). We show that the majority of this improvement stems from P-RAG’s dynamic coupling of retrieval to the evolving debate, rather than from any single component in isolation; the remaining courtroom mechanisms serve to stabilize and de-bias this process, together providing a robust foundation for reliable claim verification.
<br>
