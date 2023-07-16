---
title: "BanglaBook: A Large-scale Bangla Dataset for Sentiment Analysis from Book Reviews"
collection: publications
permalink: /publications/1-banglabook
excerpt: 
date: 2023-07-09
venue: 'Findings of the Association for Computational Linguistics: ACL 2023'
paperurl: 'https://arxiv.org/abs/2305.06595'
pdfurl: 'https://arxiv.org/ftp/arxiv/papers/2305/2305.06595.pdf'
codedata: 'https://github.com/mohsinulkabir14/BanglaBook'
citation: 'M. Kabir, O. B. Mahfuz, S. R. Raiyan, H. Mahmud, and M. K. Hasan, “BanglaBook: A Large-scale Bangla Dataset for Sentiment Analysis from Book Reviews,” arXiv preprint arXiv:2305.06595, 2023.'
authors: 'Mohsinul Kabir†, Obayed Bin Mahfuz†, <b>Syed Rifat Raiyan</b>†, Hasan Mahmud, and Md Kamrul Hasan.'
bibtex: '@inproceedings{raiyan-etal-2023-math,<br>
    &emsp;&emsp;&emsp;&emsp;title = "Math Word Problem Solving by Generating Linguistic Variants of Problem Statements",<br>
    &emsp;&emsp;&emsp;&emsp;author = "Raiyan, Syed Rifat  and<br>
    &emsp;&emsp;&emsp;&emsp;  Faiyaz, Md Nafis  and<br>
    &emsp;&emsp;&emsp;&emsp;  Kabir, Shah Md. Jawad  and<br>
    &emsp;&emsp;&emsp;&emsp;  Kabir, Mohsinul  and<br>
    &emsp;&emsp;&emsp;&emsp;  Mahmud, Hasan  and<br>
    &emsp;&emsp;&emsp;&emsp;  Hasan, Md Kamrul",<br>
    &emsp;&emsp;&emsp;&emsp;booktitle = "Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (Volume 4: Student Research Workshop)",<br>
    &emsp;&emsp;&emsp;&emsp;month = jul,<br>
    &emsp;&emsp;&emsp;&emsp;year = "2023",<br>
    &emsp;&emsp;&emsp;&emsp;address = "Toronto, Canada",<br>
    &emsp;&emsp;&emsp;&emsp;publisher = "Association for Computational Linguistics",<br>
    &emsp;&emsp;&emsp;&emsp;url = "https://aclanthology.org/2023.acl-srw.49",<br>
    &emsp;&emsp;&emsp;&emsp;pages = "362--378",<br>
    &emsp;&emsp;&emsp;&emsp;abstract = "The art of mathematical reasoning stands as a fundamental pillar of intellectual progress and is a central catalyst in cultivating human ingenuity. Researchers have recently published a plethora of works centered around the task of solving Math Word Problems (MWP) {---} a crucial stride towards general AI. These existing models are susceptible to dependency on shallow heuristics and spurious correlations to derive the solution expressions. In order to ameliorate this issue, in this paper, we propose a framework for MWP solvers based on the generation of linguistic variants of the problem text. The approach involves solving each of the variant problems and electing the predicted expression with the majority of the votes. We use DeBERTa (Decoding-enhanced BERT with disentangled attention) as the encoder to leverage its rich textual representations and enhanced mask decoder to construct the solution expressions. Furthermore, we introduce a challenging dataset, ParaMAWPS, consisting of paraphrased, adversarial, and inverse variants of selectively sampled MWPs from the benchmark Mawps dataset. We extensively experiment on this dataset along with other benchmark datasets using some baseline MWP solver models. We show that training on linguistic variants of problem statements and voting on candidate predictions improve the mathematical reasoning and robustness of the model. We make our code and data publicly available.",<br>
}'
# @misc{kabir2023banglabook,<br>
#             &emsp;&emsp;&emsp;&emsp;title={BanglaBook: A Large-scale Bangla Dataset for Sentiment Analysis from Book Reviews},<br>
#             &emsp;&emsp;&emsp;&emsp;author={Mohsinul Kabir and Obayed Bin Mahfuz and Syed Rifat Raiyan and Hasan Mahmud and Md Kamrul Hasan},<br>
#             &emsp;&emsp;&emsp;&emsp;year={2023},<br>
#             &emsp;&emsp;&emsp;&emsp;eprint={2305.06595},<br>
#             &emsp;&emsp;&emsp;&emsp;archivePrefix={arXiv},<br>
#             &emsp;&emsp;&emsp;&emsp;primaryClass={cs.CL}<br>
#             }'
poster: 
slides: "https://drive.google.com/file/d/1-UkYs_Rx11S7qKOfR-6rnO2VDp3W78vQ/view?usp=sharing"
video: "https://drive.google.com/file/d/1i7lnR2y3NdoglmYt31QR1R18mOOYtA76/view?usp=sharing"
---
<u>Authors:</u> Mohsinul Kabir†, Obayed Bin Mahfuz†, **Syed Rifat Raiyan**†, Hasan Mahmud, and Md Kamrul Hasan.
<br>
<u>Abstract:</u> The analysis of consumer sentiment, as expressed through reviews, can provide a wealth
of insight regarding the quality of a product. While the study of sentiment analysis
has been widely explored in many popular
languages, relatively less attention has been
given to the Bangla language, mostly due
to a lack of relevant data and cross-domain
adaptability. To address this limitation, we
present <span style="font-variant:small-caps;">BanglaBook</span>, a large-scale dataset
of Bangla book reviews consisting of 158,065
samples classified into three broad categories:
positive, negative, and neutral. We provide a
detailed statistical analysis of the dataset and
employ a range of machine learning models
to establish baselines including SVM, LSTM,
and Bangla-BERT. Our findings demonstrate
a substantial performance advantage of pretrained models over models that rely on manually crafted features, emphasizing the necessity for additional training resources in this domain. Additionally, we conduct an in-depth
error analysis by examining sentiment unigrams, which may provide insight into common classification errors in under-resourced
languages like Bangla.
<br>
<!-- [[PDF]](https://arxiv.org/ftp/arxiv/papers/2305/2305.06595.pdf) [[Code/Data]](https://github.com/mohsinulkabir14/BanglaBook) -->