---
title: "FrugalPrompt: Reducing Contextual Overhead in Large Language Models via Token Attribution"
collection: publications
type: notpreprints
permalink: /publications/6-frugalprompt
excerpt: 
date: 2026-01-01
venue: 'Proceedings of the 3rd Workshop on Language Understanding in the Human-Machine Era (LUHME 2026)'
pptmode: 'Poster Presentation'
anthology: 'https://aclanthology.org/2026.luhme-1.20/'
paperurl: 'https://www.arxiv.org/abs/2510.16439'
pdfurl: 'https://aclanthology.org/2026.luhme-1.20.pdf'
codedata: 'https://github.com/Starscream-11813/Frugal-ICL'
projectpage: 'https://frugalprompt.github.io/'
doi: 'https://doi.org/10.18653/2026.luhme-1.20'
citation: 'S. R. Raiyan, M. F. Ishmam, A. Al Imran, and M. A. Moni, “FrugalPrompt: Reducing Contextual Overhead in Large Language Models via Token Attribution,” in Proceedings of the 3rd Workshop on Language Understanding in the Human-Machine Era (LUHME 2026), Budapest, Hungary, Oct. 2026, pp. 256–271.'
authors: '<b>Syed Rifat Raiyan</b>†, Md Farhan Ishmam†, Abdullah Al Imran, Mohammad Ali Moni.'
bibtex: '@inproceedings{raiyan2025frugalprompt,<br>
      &emsp;&emsp;&emsp;&emsp;title={{FrugalPrompt}: Reducing Contextual Overhead in Large Language Models via Token Attribution},<br>
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat and Ishmam, Md Farhan and Al Imran, Abdullah and Moni, Mohammad Ali},<br>
      &emsp;&emsp;&emsp;&emsp;booktitle={Proceedings of the 3rd Workshop on Language Understanding in the Human-Machine Era (LUHME 2026)},<br>
      &emsp;&emsp;&emsp;&emsp;month=oct,<br>
      &emsp;&emsp;&emsp;&emsp;year={2026},<br>
      &emsp;&emsp;&emsp;&emsp;address={Budapest, Hungary},<br>
      &emsp;&emsp;&emsp;&emsp;publisher={Association for Computational Linguistics},<br>
      &emsp;&emsp;&emsp;&emsp;url={https://aclanthology.org/2026.luhme-1.20/},<br>
      &emsp;&emsp;&emsp;&emsp;doi={10.18653/2026.luhme-1.20},<br>
      &emsp;&emsp;&emsp;&emsp;pages={256--271}<br>
}'
bibtexraw: "@inproceedings{raiyan2025frugalprompt,\\n
                  title={{FrugalPrompt}: Reducing Contextual Overhead in Large Language Models via Token Attribution},\\n
                  author={Raiyan, Syed Rifat and Ishmam, Md Farhan and Al Imran, Abdullah and Moni, Mohammad Ali},\\n
                  booktitle={Proceedings of the 3rd Workshop on Language Understanding in the Human-Machine Era (LUHME 2026)},\\n
                  month=oct,\\n
                  year={2026},\\n
                  address={Budapest, Hungary},\\n
                  publisher={Association for Computational Linguistics},\\n
                  url={https://aclanthology.org/2026.luhme-1.20/},\\n
                  doi={10.18653/2026.luhme-1.20},\\n
                  pages={256--271}\\n}"
bibtexprettify: "@inproceedings{raiyan2025frugalprompt,\n
      &emsp;&emsp;&emsp;&emsp;title={{FrugalPrompt}: Reducing Contextual Overhead in Large Language Models via Token Attribution},\n
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat and Ishmam, Md Farhan and Al Imran, Abdullah and Moni, Mohammad Ali},\n
      &emsp;&emsp;&emsp;&emsp;booktitle={Proceedings of the 3rd Workshop on Language Understanding in the Human-Machine Era (LUHME 2026)},\n
      &emsp;&emsp;&emsp;&emsp;month=oct,\n
      &emsp;&emsp;&emsp;&emsp;year={2026},\n
      &emsp;&emsp;&emsp;&emsp;address={Budapest, Hungary},\n
      &emsp;&emsp;&emsp;&emsp;publisher={Association for Computational Linguistics},\n
      &emsp;&emsp;&emsp;&emsp;url={https://aclanthology.org/2026.luhme-1.20/},\n
      &emsp;&emsp;&emsp;&emsp;doi={10.18653/2026.luhme-1.20},\n
      &emsp;&emsp;&emsp;&emsp;pages={256--271}\n
}"

poster: 
slides: 
video: 
teaser: "frugal_prompt_teaser2.png"
---
<u>Authors:</u> **Syed Rifat Raiyan**†, Md Farhan Ishmam†, Abdullah Al Imran, Mohammad Ali Moni.
<br>
<!-- <u>Abstract:</u> Large language models (LLMs) owe much of their stellar performance to expansive input contexts, yet such verbosity inflates monetary costs, carbon footprint, and inference-time latency. Much of this overhead manifests from the redundant low-utility tokens present in typical prompts, as only a fraction of tokens typically carries the majority of the semantic weight. We address this inefficiency by introducing FrugalPrompt, a novel prompt compression framework for LLMs, which retains only the most semantically significant tokens. Leveraging two state-of-the-art token attribution methods, GlobEnc and DecompX, we assign salience scores to every token in an input sequence, rank them to preserve the top-k% tokens in their original order, and obtain a sparse frugalized prompt. We evaluate the approach across four NLP tasks: Sentiment Analysis, Commonsense QA, Summarization, and Mathematical Reasoning, using a suite of frontier LLMs. For the first three tasks, a 20% prompt reduction incurs only a marginal loss in task performance, demonstrating that contemporary LLMs can reconstruct elided context from high-salience cues. In contrast, performance on mathematical reasoning deteriorates sharply, reflecting a stronger dependence on complete token continuity. Further analysis with bottom-k% and random-k% tokens reveals asymmetric performance patterns that may suggest potential task contamination effects, wherein models may resort to shallow memorized patterns from pretraining exposure for conventional NLP tasks. We posit that our work contributes to a more nuanced understanding of LLM behavior in performance-efficiency trade-offs, and delineate the boundary between tasks tolerant to contextual sparsity and those requiring exhaustive context. Our source code and models are available at <a href="https://github.com/Starscream-11813/Frugal-ICL">this https URL</a>. -->
<u>Abstract:</u> Human communication heavily relies on laconism and inferential pragmatics, allowing listeners to successfully reconstruct rich meaning from sparse, telegraphic speech. In contrast, large language models (LLMs) owe much of their stellar performance to expansive input contexts, yet such verbosity inflates monetary costs, carbon footprint, and inference-time latency. This overhead manifests from the redundant low-utility tokens present in typical prompts, as only a fraction of tokens typically carries the majority of the semantic weight. Inspired by the aforementioned cognitive psycholinguistic processes, we address this inefficiency by introducing FrugalPrompt, a novel prompt compression framework for LLMs, which retains only the most semantically significant tokens. Leveraging two state-of-the-art token attribution methods, GlobEnc and DecompX, we assign salience scores to every token in an input sequence, rank them to retain the top-k% tokens, and obtain a sparse frugalized prompt. We establish the theoretical stability of our approach and provide strong empirical results across a suite of four NLP tasks to study the trade-off between the portion of retained tokens and performance. Experimental findings across retention settings reveal asymmetric performance patterns that suggest potential task contamination effects. We posit that our work contributes to a more nuanced understanding of LLM behavior in performance-efficiency trade-offs and delineates the boundary between tasks tolerant of contextual sparsity and those requiring exhaustive context. Our source code and models are available at <a href="https://github.com/Starscream-11813/Frugal-ICL">this https URL</a>.
<br>
<!-- [[PDF]](https://arxiv.org/ftp/arxiv/papers/2305/2305.06595.pdf) [[Code/Data]](https://github.com/mohsinulkabir14/BanglaBook) -->
