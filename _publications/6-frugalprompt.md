---
title: "FrugalPrompt: Reducing Contextual Overhead in Large Language Models via Token Attribution"
collection: publications
type: preprints
permalink: /publications/6-frugalprompt
excerpt: 
date: 2025-10-30
venue: 'LREC 2025'
paperurl: 'https://www.arxiv.org/abs/2510.16439'
pdfurl: 'https://www.arxiv.org/pdf/2510.16439'
codedata: 'https://github.com/Starscream-11813/Frugal-ICL'
doi: 'https://doi.org/10.48550/arXiv.2510.16439'
citation: 'S. R. Raiyan, M. F. Ishmam, A. A. Imran and M. A. Moni, “FrugalPrompt: Reducing Contextual Overhead in Large Language Models via Token Attribution,” arXiv preprint arXiv:2510.16439, 2025.'
authors: '<b>Syed Rifat Raiyan</b>, Md Farhan Ishmam, Abdullah Al Imran, Mohammad Ali Moni.'
bibtex: '@article{raiyan2025frugalprompt,<br>
      &emsp;&emsp;&emsp;&emsp;title={FrugalPrompt: Reducing Contextual Overhead in Large Language Models via Token Attribution},<br> 
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat and Ishmam, Md Farhan and Imran, Abdullah Al and Moni, Mohammad Ali},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2510.16439},<br>
      &emsp;&emsp;&emsp;&emsp;year={2025}<br>
}'
bibtexraw: "@article{raiyan2025frugalprompt,\\n
                  title={FrugalPrompt: Reducing Contextual Overhead in Large Language Models via Token Attribution},\\n 
                  author={Raiyan, Syed Rifat and Ishmam, Md Farhan and Imran, Abdullah Al and Moni, Mohammad Ali},\\n
                  journal={arXiv preprint arXiv:2510.16439},\\n
                  year={2025}\\n}"
bibtexprettify: "@article{raiyan2025frugalprompt,\n
      &emsp;&emsp;&emsp;&emsp;title={FrugalPrompt: Reducing Contextual Overhead in Large Language Models via Token Attribution},\n 
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat and Ishmam, Md Farhan and Imran, Abdullah Al and Moni, Mohammad Ali},\n
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2510.16439},\n
      &emsp;&emsp;&emsp;&emsp;year={2025}\n
}"

poster: 
slides: 
video: 
teaser: "frugal_prompt_teaser.png"
---
<u>Authors:</u> **Syed Rifat Raiyan**, Md Farhan Ishmam, Abdullah Al Imran, Mohammad Ali Moni.
<br>
<u>Abstract:</u> Large language models (LLMs) owe much of their stellar performance to expansive input contexts, yet such verbosity inflates monetary costs, carbon footprint, and inference-time latency. Much of this overhead manifests from the redundant low-utility tokens present in typical prompts, as only a fraction of tokens typically carries the majority of the semantic weight. We address this inefficiency by introducing FrugalPrompt, a novel prompt compression framework for LLMs, which retains only the most semantically significant tokens. Leveraging two state-of-the-art token attribution methods, GlobEnc and DecompX, we assign salience scores to every token in an input sequence, rank them to preserve the top-k% tokens in their original order, and obtain a sparse frugalized prompt. We evaluate the approach across four NLP tasks: Sentiment Analysis, Commonsense QA, Summarization, and Mathematical Reasoning, using a suite of frontier LLMs. For the first three tasks, a 20% prompt reduction incurs only a marginal loss in task performance, demonstrating that contemporary LLMs can reconstruct elided context from high-salience cues. In contrast, performance on mathematical reasoning deteriorates sharply, reflecting a stronger dependence on complete token continuity. Further analysis with bottom-k% and random-k% tokens reveals asymmetric performance patterns that may suggest potential task contamination effects, wherein models may resort to shallow memorized patterns from pretraining exposure for conventional NLP tasks. We posit that our work contributes to a more nuanced understanding of LLM behavior in performance-efficiency trade-offs, and delineate the boundary between tasks tolerant to contextual sparsity and those requiring exhaustive context. Our source code and models are available at <a href="https://github.com/Starscream-11813/Frugal-ICL">this https URL</a>.
<br>
<!-- [[PDF]](https://arxiv.org/ftp/arxiv/papers/2305/2305.06595.pdf) [[Code/Data]](https://github.com/mohsinulkabir14/BanglaBook) -->