---
title: "Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models"
layout: publication-project
collection: publications
type: preprints
permalink: /publications/10-ivellm
excerpt:
date: 2026-04-13
paperurl: 'https://arxiv.org/abs/2604.12076'
pdfurl: 'https://arxiv.org/pdf/2604.12076'
codedata: 'https://github.com/Starscream-11813/IVE-LLM'
aipodcast: 'https://www.youtube.com/watch?v=uUr5XvRIprE'
doi: 'https://doi.org/10.48550/arXiv.2604.12076'
citation: 'S. R. Raiyan, "Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models," arXiv preprint arXiv:2604.12076, 2026.'
authors: '<b>Syed Rifat Raiyan</b>.'
bibtex: '@article{raiyan2026narrative,<br>
      &emsp;&emsp;&emsp;&emsp;title={Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models},<br>
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat},<br>
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2604.12076},<br>
      &emsp;&emsp;&emsp;&emsp;year={2026}<br>
}'
bibtexraw: "@article{raiyan2026narrative,\\n
                  title={Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models},\\n
                  author={Raiyan, Syed Rifat},\\n
                  journal={arXiv preprint arXiv:2604.12076},\\n
                  year={2026}\\n}"
bibtexprettify: "@article{raiyan2026narrative,\n
      &emsp;&emsp;&emsp;&emsp;title={Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models},\n
      &emsp;&emsp;&emsp;&emsp;author={Raiyan, Syed Rifat},\n
      &emsp;&emsp;&emsp;&emsp;journal={arXiv preprint arXiv:2604.12076},\n
      &emsp;&emsp;&emsp;&emsp;year={2026}\n
}"

poster:
slides:
video:
teaser: "ivellm_teaser.png"
---
<style>
  .ive-project {
    margin-top: 0;
    color: #25252a;
  }

  .ive-project a {
    color: #5d4ab8;
  }

  .ive-lede {
    margin: 1rem 0 1.4rem;
    padding: 0.95rem 1rem;
    border-left: 3px solid #7c3aed;
    background: #fbfaf7;
    font-size: 1.03rem;
    line-height: 1.65;
  }

  .ive-section {
    margin: 2rem 0;
  }

  .ive-section h2 {
    margin: 0 0 0.75rem;
    color: #1f2333;
    font-size: 1.35rem;
  }

  .ive-section h3 {
    margin: 0 0 0.45rem;
    color: #2b2d42;
    font-size: 1rem;
  }

  .ive-section p,
  .ive-section li {
    color: #3d3d43;
    line-height: 1.65;
  }

  .ive-media {
    width: 100%;
    aspect-ratio: 16 / 9;
    min-height: 320px;
    border: 1px solid #d9d6ce;
    border-radius: 7px;
    overflow: hidden;
    background: #faf9f5;
    box-shadow: 0 10px 24px rgba(31, 35, 51, 0.08);
  }

  .ive-media iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  .ive-caption {
    margin-top: 0.45rem;
    color: #66666d;
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .ive-stat-grid,
  .ive-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
  }

  .ive-stat,
  .ive-card {
    border: 1px solid #ddd8cc;
    border-radius: 7px;
    background: #fbfaf7;
    padding: 0.9rem;
  }

  .ive-stat strong {
    display: block;
    color: #6d4fc2;
    font-size: 1.3rem;
    line-height: 1.15;
    white-space: nowrap;
  }

  .ive-stat span {
    display: block;
    margin-top: 0.3rem;
    color: #4a4a50;
    font-size: 0.86rem;
    line-height: 1.35;
  }

  .ive-card {
    background: #ffffff;
  }

  .ive-card p {
    margin-bottom: 0;
    font-size: 0.9rem;
  }

  .ive-two-column {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 1rem;
  }

  .ive-callout {
    border-left: 3px solid #0f766e;
    background: #f3fbf8;
    padding: 0.9rem 1rem;
    border-radius: 0 7px 7px 0;
  }

  .ive-bibtex {
    overflow-x: auto;
    border: 1px solid #ddd8cc;
    border-radius: 7px;
    background: #f8f7f3;
    padding: 0.9rem 1rem;
    color: #25252a;
    font-size: 0.84rem;
    line-height: 1.5;
  }

  @media (max-width: 760px) {
    .ive-two-column {
      grid-template-columns: 1fr;
    }

    .ive-media {
      min-height: 220px;
    }
  }
</style>

<div class="ive-project">
  <p class="ive-lede">
    <em>Narrative over Numbers</em> asks whether large language models inherit one of the more stubborn quirks of human moral psychology: the tendency to care more about a vivid individual than an equivalent statistical group. The short answer is yes, but the interesting answer is that alignment and reasoning do not merely dampen the bias. Sometimes they reshape it, sometimes they amplify it, and occasionally they flip it.
  </p>

  <section class="ive-section">
    <h2>Abstract</h2>
    <p>The Identifiable Victim Effect (IVE)--the tendency to allocate greater resources to a specific, narratively described victim than to a statistically characterized group facing equivalent hardship--is one of the most robust findings in moral psychology and behavioral economics. As large language models (LLMs) assume consequential roles in humanitarian triage, automated grant evaluation, and content moderation, a critical question arises: do these systems inherit the affective irrationalities present in human moral reasoning? We present the first systematic, large-scale empirical investigation of the IVE in LLMs, comprising $N=51{,}955$ validated API trials across 16 frontier models spanning nine organizational lineages. Using a suite of ten experiments--porting and extending canonical paradigms from Small et al. (2007) and Kogut and Ritov (2005)--we find that the IVE is prevalent but strongly modulated by alignment training. Instruction-tuned models exhibit extreme IVE ($d=1.56$), while reasoning-specialized models invert the effect (down to $d=-0.85$). The pooled effect ($d=0.223$, $p=2 \times 10^{-6}$) is approximately twice the single-victim human meta-analytic baseline ($d \approx 0.10$) reported by Lee and Feeley (2016)--and likely exceeds the overall human pooled effect by a larger margin, given that the group-victim human effect is near zero. Standard Chain-of-Thought (CoT) prompting--contrary to its role as a deliberative corrective--nearly triples the IVE effect size (from $d=0.15$ to $d=0.41$), while only utilitarian CoT reliably eliminates it. We further document psychophysical numbing, perfect quantity neglect, and marginal in-group/out-group cultural bias, with implications for AI deployment in humanitarian and ethical decision-making contexts. Our code and data are publicly available at <a href="https://github.com/Starscream-11813/IVE-LLM">this https URL</a>.</p>
  </section>

  <section class="ive-section">
    <figure>
      <div class="ive-media">
        <iframe src="{{ '/images/IVE%20Teaser_standalone.html' | relative_url }}" title="Identifiable Victim Effect in LLMs teaser animation" loading="lazy" allowfullscreen></iframe>
      </div>
      <figcaption class="ive-caption">A compact visual tour of the paper's central question: when moral choice is framed as a person versus a statistic, what do LLMs do?</figcaption>
    </figure>
  </section>

  <section class="ive-section">
    <h2>At a Glance</h2>
    <div class="ive-stat-grid">
      <div class="ive-stat">
        <strong>51,955</strong>
        <span>validated API trials</span>
      </div>
      <div class="ive-stat">
        <strong>16</strong>
        <span>frontier LLMs audited</span>
      </div>
      <div class="ive-stat">
        <strong>10</strong>
        <span>IVE experiments</span>
      </div>
      <div class="ive-stat">
        <strong><em>d</em> = 0.223</strong>
        <span>pooled IVE effect</span>
      </div>
    </div>
  </section>

  <section class="ive-section">
    <h2>Core Question</h2>
    <div class="ive-two-column">
      <div>
        <p>The paper ports and extends classic identifiable-victim paradigms to modern LLMs. Each model is placed in allocation settings where a vivid individual and a statistical group face equivalent hardship. The experiment then asks whether narrative specificity changes the model's resource allocation.</p>
      </div>
      <div class="ive-callout">
        <p>The twist is not simply that LLMs show the bias. The more useful finding is that model family, alignment style, and prompting regime all change the direction and strength of the effect.</p>
      </div>
    </div>
  </section>

  <section class="ive-section">
    <h2>Key Findings</h2>
    <div class="ive-card-grid">
      <div class="ive-card">
        <h3>Alignment Matters</h3>
        <p>Instruction-tuned models show a strong identifiable-victim preference, while reasoning-specialized systems can invert the effect.</p>
      </div>
      <div class="ive-card">
        <h3>Reasoning Is Not Neutral</h3>
        <p>Standard Chain-of-Thought prompting nearly triples the IVE effect size instead of reliably correcting it.</p>
      </div>
      <div class="ive-card">
        <h3>Utility Framing Helps</h3>
        <p>Only utilitarian CoT consistently removes the bias, suggesting that the form of deliberation matters more than deliberation by itself.</p>
      </div>
      <div class="ive-card">
        <h3>Bias Has Texture</h3>
        <p>The study also documents psychophysical numbing, quantity neglect, and marginal cultural in-group/out-group effects.</p>
      </div>
    </div>
  </section>

  <section class="ive-section">
    <h2>Why It Matters</h2>
    <p>Humanitarian triage, grant review, and moderation pipelines often involve emotionally asymmetric cases: one story may be vivid, while another arrives as a number. If LLMs are used in such settings, their moral behavior cannot be audited only through accuracy, helpfulness, or general preference alignment. We also need to ask whether they preserve, amplify, or suppress human affective distortions when the stakes are not merely linguistic.</p>
  </section>

  <section class="ive-section">
    <h2>BibTeX</h2>
    <pre class="ive-bibtex"><code>@article{raiyan2026narrative,
  title={Narrative over Numbers: The Identifiable Victim Effect and its Amplification Under Alignment and Reasoning in Large Language Models},
  author={Raiyan, Syed Rifat},
  journal={arXiv preprint arXiv:2604.12076},
  year={2026}
}</code></pre>
  </section>
</div>
