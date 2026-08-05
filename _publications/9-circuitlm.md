---
title: "CircuitLM: A Multi-Agent LLM-Aided Design Framework for Generating Circuit Schematics from Natural Language Prompts"
collection: publications
type: notpreprints
permalink: /publications/9-circuitlm
excerpt:
pptmode: 'Oral Presentation'
date: 2026-03-17
venue: '2026 IEEE International Conference on LLM-Aided Design (ICLAD)'
paperurl: 'https://arxiv.org/abs/2601.04505'
pdfurl: 'https://arxiv.org/pdf/2601.04505'
codedata: 'https://github.com/Khandakar227/CircuitLM'
doi: 'https://doi.org/10.48550/arXiv.2601.04505'
citation: 'K. S. A. Hasan, S. R. Raiyan, H. M. Alvee and W. Sadik, "CircuitLM: A Multi-Agent LLM-Aided Design Framework for Generating Circuit Schematics from Natural Language Prompts," 2026 IEEE International Conference on LLM-Aided Design (ICLAD), 2026.'
authors: 'Khandakar Shakib Al Hasan, <b>Syed Rifat Raiyan</b>, Hasin Mahtab Alvee, Wahid Sadik.'
bibtex: '@inproceedings{hasan2026circuitlm,<br>
      &emsp;&emsp;&emsp;&emsp;title={{CircuitLM}: A Multi-Agent {LLM}-Aided Design Framework for Generating Circuit Schematics from Natural Language Prompts},<br>
      &emsp;&emsp;&emsp;&emsp;author={Hasan, Khandakar Shakib Al and Raiyan, Syed Rifat and Alvee, Hasin Mahtab and Sadik, Wahid},<br>
      &emsp;&emsp;&emsp;&emsp;booktitle={2026 IEEE International Conference on LLM-Aided Design (ICLAD)},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026},<br>
      &emsp;&emsp;&emsp;&emsp;url={https://arxiv.org/abs/2601.04505}<br>
}'
bibtexraw: "@inproceedings{hasan2026circuitlm,\\n
                  title={{CircuitLM}: A Multi-Agent {LLM}-Aided Design Framework for Generating Circuit Schematics from Natural Language Prompts},\\n
                  author={Hasan, Khandakar Shakib Al and Raiyan, Syed Rifat and Alvee, Hasin Mahtab and Sadik, Wahid},\\n
                  booktitle={2026 IEEE International Conference on LLM-Aided Design (ICLAD)},\\n
                  year={2026},\\n
                  url={https://arxiv.org/abs/2601.04505}\\n}"
bibtexprettify: "@inproceedings{hasan2026circuitlm,\n
      &emsp;&emsp;&emsp;&emsp;title={{CircuitLM}: A Multi-Agent {LLM}-Aided Design Framework for Generating Circuit Schematics from Natural Language Prompts},\n
      &emsp;&emsp;&emsp;&emsp;author={Hasan, Khandakar Shakib Al and Raiyan, Syed Rifat and Alvee, Hasin Mahtab and Sadik, Wahid},\n
      &emsp;&emsp;&emsp;&emsp;booktitle={2026 IEEE International Conference on LLM-Aided Design (ICLAD)},\n
      &emsp;&emsp;&emsp;&emsp;year={2026},\n
      &emsp;&emsp;&emsp;&emsp;url={https://arxiv.org/abs/2601.04505}\n
}"

poster:
slides: "https://starscream-11813.github.io/files/CircuitLM_presentation.pdf"
video:
teaser: "circuitlm_teaser.png"
---
<u>Authors:</u> Khandakar Shakib Al Hasan, **Syed Rifat Raiyan**, Hasin Mahtab Alvee, Wahid Sadik.
<br>
<u>Abstract:</u> Generating accurate circuit schematics from high-level natural language descriptions remains a persistent challenge in electronic design automation (EDA), as large language models (LLMs) frequently hallucinate components, violate strict physical constraints, and produce non-machine-readable outputs. To address this, we present CircuitLM, a multi-agent pipeline that translates user prompts into structured, visually interpretable $\texttt{CircuitJSON}$ schematics. The framework mitigates hallucination and ensures physical viability by grounding generation in a curated, embedding-powered component knowledge base through five sequential stages: (i) component identification, (ii) canonical pinout retrieval, (iii) chain-of-thought reasoning, (iv) JSON schematic synthesis, and (v) interactive force-directed visualization. We evaluate the system on a dataset of 100 unique circuit-design prompts using five state-of-the-art LLMs. To systematically assess performance, we deploy a rigorous dual-layered evaluation methodology: a deterministic Electrical Rule Checking (ERC) engine categorizes topological faults by strict severity (Critical, Major, Minor, Warning), while an LLM-as-a-judge meta-evaluator identifies complex, context-aware design flaws that bypass standard rule-based checkers. Ultimately, this work demonstrates how targeted retrieval combined with deterministic and semantic verification can bridge natural language to structurally viable, schematic-ready hardware and safe circuit prototyping. Our code and data are publicly available at <a href="https://github.com/Khandakar227/CircuitLM">this https URL</a>.
<br>
