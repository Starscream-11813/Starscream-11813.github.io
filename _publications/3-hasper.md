---
title: "HaSPeR: An Image Repository for Hand Shadow Puppet Recognition"
collection: publications
type: notpreprints
permalink: /publications/3-hasper
excerpt: 
date: 2025-07-14
venue: 'Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV) Workshops (WCCA Oral)'
paperurl: 'https://www.arxiv.org/abs/2408.10360'
pdfurl: 'https://www.arxiv.org/pdf/2408.10360'
codedata: 'https://github.com/Starscream-11813/HaSPeR'
doi: 'https://doi.org/10.48550/arXiv.2408.10360'
citation: 'S. R. Raiyan, Z. Z. Amio, and S. Ahmed, “HaSPeR: An Image Repository for Hand Shadow Puppet Recognition,” arXiv preprint arXiv:2408.10360, 2024.'
authors: '<b>Syed Rifat Raiyan</b>, Zibran Zarif Amio, Sabbir Ahmed.'
bibtex: '@misc{raiyan2024hasper,<br>
      &emsp;&emsp;&emsp;&emsp;title={HaSPeR: An Image Repository for Hand Shadow Puppet Recognition},<br> 
      &emsp;&emsp;&emsp;&emsp;author={Syed Rifat Raiyan and Zibran Zarif Amio and Sabbir Ahmed},<br>
      &emsp;&emsp;&emsp;&emsp;year={2024},<br>
      &emsp;&emsp;&emsp;&emsp;eprint={2408.10360},<br>
      &emsp;&emsp;&emsp;&emsp;archivePrefix={arXiv},<br>
      &emsp;&emsp;&emsp;&emsp;primaryClass={cs.CV}<br>
}'
bibtexraw: "@misc{raiyan2024hasper,\\n
                  title={HaSPeR: An Image Repository for Hand Shadow Puppet Recognition},\\n 
                  author={Syed Rifat Raiyan and Zibran Zarif Amio and Sabbir Ahmed},\\n
                  year={2024},\\n
                  eprint={2408.10360},\\n
                  archivePrefix={arXiv},\\n
                  primaryClass={cs.CV}\\n}"
bibtexprettify: "@misc{raiyan2024hasper,\n
      &emsp;&emsp;&emsp;&emsp;title={HaSPeR: An Image Repository for Hand Shadow Puppet Recognition},\n 
      &emsp;&emsp;&emsp;&emsp;author={Syed Rifat Raiyan and Zibran Zarif Amio and Sabbir Ahmed},\n
      &emsp;&emsp;&emsp;&emsp;year={2024},\n
      &emsp;&emsp;&emsp;&emsp;eprint={2408.10360},\n
      &emsp;&emsp;&emsp;&emsp;archivePrefix={arXiv},\n
      &emsp;&emsp;&emsp;&emsp;primaryClass={cs.CV}\n
}"
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

poster: "https://starscream-11813.github.io/files/hasper_poster3.pdf"
slides: "https://starscream-11813.github.io/files/HaSPeR_OralPresentation.pdf"
video: "https://drive.google.com/file/d/1jqyhQShNlnk2KD6Ngo_nXvLra-8geXt1/view?usp=sharing"
teaser: "hasper_teaser.PNG"
---
<u>Authors:</u> **Syed Rifat Raiyan**, Zibran Zarif Amio, Sabbir Ahmed.
<br>
<!-- <u>Abstract:</u> Hand shadow puppetry, also known as shadowgraphy or ombromanie, is a form of theatrical art and storytelling where hand shadows are projected onto flat surfaces to create illusions of living creatures. The skilled performers create these silhouettes by hand positioning, finger movements, and dexterous gestures to resemble shadows of animals and objects. Due to the lack of practitioners and a seismic shift in people's entertainment standards, this art form is on the verge of extinction. To facilitate its preservation and proliferate it to a wider audience, we introduce <span style="font-variant:small-caps;">HaSPeR</span>, a novel dataset consisting of 8,340 images of hand shadow puppets across 11 classes extracted from both professional and amateur hand shadow puppeteer clips. We provide a detailed statistical analysis of the dataset and employ a range of pretrained image classification models to establish baselines. Our findings show a substantial performance superiority of traditional convolutional models over attention-based transformer architectures. We also find that lightweight models, such as MobileNetV2, suited for mobile applications and embedded devices, perform comparatively well. We surmise that such low-latency architectures can be useful in developing ombromanie teaching tools, and we create a prototype application to explore this surmission. Keeping the best-performing model InceptionV3 under the limelight, we conduct comprehensive feature-spatial, explainability, and error analyses to gain insights into its decision-making process. To the best of our knowledge, this is the first documented dataset and research endeavor to preserve this dying art for future generations, with computer vision approaches. Our code and data are publicly available. -->
<u>Abstract:</u> Hand shadow puppetry, also known as shadowgraphy or ombromanie, is a form of theatrical art and storytelling where hand shadows are projected onto flat surfaces to create illusions of living creatures. The skilled performers create these silhouettes by hand positioning, finger movements, and dexterous gestures to resemble shadows of animals and objects. Due to the lack of practitioners and a seismic shift in people’s entertainment standards, this art form is on the verge of extinction. To facilitate its preservation and proliferate it to a wider audience, we introduce <span style="font-variant:small-caps;">HaSPeR</span>, a novel dataset consisting of 15,000 images of hand shadow puppets across 15 classes extracted from both professional and amateur hand shadow puppeteer clips. We provide a detailed statistical analysis of the dataset and employ a range of pretrained image classification models to establish baselines. Our findings show a substantial performance superiority of skip-connected convolutional models over attention-based transformer architectures. We also find that lightweight models, such as MobileNetV2, suited for mobile applications and embedded devices, perform comparatively well. We surmise that such low-latency architectures can be useful in developing ombromanie teaching tools, and we create a prototype application to explore this surmission. Keeping the best-performing model ResNet34 under the limelight, we conduct comprehensive feature-spatial, explainability, and error analyses to gain insights into its decision-making process and explore architectural improvements. To the best of our knowledge, this is the first documented dataset and research endeavor to preserve this dying art for future generations, with computer vision approaches. Our code and data are publicly available at <a href="https://github.com/Starscream-11813/HaSPeR">this https URL</a>.
<br>
<!-- [[PDF]](https://arxiv.org/ftp/arxiv/papers/2305/2305.06595.pdf) [[Code/Data]](https://github.com/mohsinulkabir14/BanglaBook) -->