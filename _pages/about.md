---
permalink: /
title: "Home"
excerpt: "Research on large language models, reasoning, creativity, and social behavior at the intersection of human and machine cognition."
author_profile: true
research_topic_menus: true
research_map: true
redirect_from: 
  - /about/
  - /about.html
---
<style>
body {
    min-height: 100vh;
    background-color: #fff;
}

.emoji {
    font-size: normal;
    min-width: 1.4em;
}

.emoji::after {
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.clock::after {
    content: '🕛';
    animation-name: clock;
    animation-duration: 5s;
}

.mailbox::after {
    content: '📪';
    animation-name: mailbox;
    animation-duration: 2.5s;
}

.camera::after {
    content: '📷';
    --emoji: '📸';
    animation-name: twoFrames;
    animation-duration: 1.2s;
}

.hourglass::after {
    content: '⏳';
    --emoji: '⌛️';
    animation-name: twoFrames;
    animation-duration: 1.2s;
}

.earth::after {
    content: '🌎';
    --emoji-1: '🌍';
    --emoji-2: '🌏';
    animation-name: threeFrames;
    animation-duration: 1.5s;
}

.moon::after {
    content: '🌕';
    animation-name: moon;
    animation-duration: 1s;
}

.bomb::after {
    content: '💣';
    --emoji: '💥';
    animation-name: twoFrames;
    animation-duration: 2s;
}

.monkey::after {
    content: '🙈';
    --emoji-1: '🙉';
    --emoji-2: '🙊';
    animation-name: threeFrames;
    animation-duration: 2s;
}

.hearts::after {
    content: '💗';
    animation-name: hearts;
    animation-duration: 3s;
}

.wave::after {
    content: '✋';
    --emoji: '👋';
    animation-name: twoFrames;
    animation-duration: 1s;
}

.inbox::after {
    content: '📥';
    --emoji: '📤';
    animation-name: twoFrames;
    animation-duration: 1s;
}

.vomit::after {
    content: '🤢';
    --emoji: '🤮';
    animation-name: twoFrames;
    animation-duration: 1s;
}

@keyframes twoFrames {
    50% {
        content: var(--emoji);
    }
}

@keyframes threeFrames {
    33.333% {
        content: var(--emoji-1);
    }

    66.666% {
        content: var(--emoji-2);
    }
}

@keyframes mailbox {
    25% {
        content: '📫';
    }

    50% {
        content: '📬';
    }

    75% {
        content: '📭';
    }
}

@keyframes hearts {
    16.666% {
        content: '🧡';
    }

    33.333% {
        content: '💛';
    }

    50% {
        content: '💚';
    }

    66.666% {
        content: '💙';
    }

    83.333% {
        content: '💜';
    }
}

@keyframes moon {
    12.5% {
        content: '🌖';
    }

    25% {
        content: '🌗';
    }

    37.5% {
        content: '🌘 ';
    }

    50% {
        content: '🌑';
    }

    62.5% {
        content: '🌒';
    }

    75% {
        content: '🌓';
    }

    87.5% {
        content: '🌔';
    }
}

@keyframes clock {
    8.333% {
        content: '🕐';
    }

    16.666% {
        content: '🕑';
    }

    25% {
        content: '🕒';
    }

    33.333% {
        content: '🕓';
    }

    41.666% {
        content: '🕔';
    }

    50% {
        content: '🕕';
    }

    58.333% {
        content: '🕖';
    }

    66.666% {
        content: '🕗';
    }

    75% {
        content: '🕘';
    }

    83.333% {
        content: '🕙';
    }

    91.666% {
        content: '🕚';
    }
}
</style>
<style>
        /* Basic CSS for layout */
        .container {
            display: grid;
            grid-template-columns: 5fr 1fr;
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .content {
            font-size: 0.875em;
        }

        .news {
            margin-right: -220px;
            border-left: 2px solid #ccc;
            /* line-height: 450px; */
            padding-left: 20px;
            font-size: 0.8em;
            height: 550px; /* Adjust height as needed */
        }

        .news-content {
            max-height: 450px; /* Set the scrollable height */
            overflow-y: auto; /* Enable vertical scrolling */
            padding-right: 10px;
        }

        .emoji {
            display: inline-block;
        }

        .content .intellectual-influences {
            margin-top: 1.75rem;
            padding-top: 0.9rem;
            border-top: 1px solid var(--theme-border, #e7e1f3);
        }

        .content .intellectual-influences summary {
            cursor: pointer;
            color: var(--theme-muted, #62666b);
            font-size: 0.95em;
        }

        .content .intellectual-influences summary:focus-visible {
            outline: 2px solid var(--theme-accent, #6962d2);
            outline-offset: 4px;
        }

        .content .intellectual-influences p {
            margin: 0.75rem 0 0;
        }

        /* "How to pronounce?" opens a compact card: each name in Bangla, IPA,
           and an English-style respelling, a note, then the recording. */
        .content .name-pronunciation {
            margin: 0.1rem 0 1.1rem;
        }

        .content .name-pronunciation > summary {
            display: inline-flex;
            align-items: center;
            gap: 0.4em;
            color: var(--theme-link, #52adc8);
            font-style: italic;
            text-decoration: underline;
            text-underline-offset: 0.18em;
            cursor: pointer;
            list-style: none;
        }

        .content .name-pronunciation > summary::-webkit-details-marker {
            display: none;
        }

        .content .name-pronunciation > summary::after {
            content: "";
            width: 0.36em;
            height: 0.36em;
            border-right: 1.5px solid currentColor;
            border-bottom: 1.5px solid currentColor;
            transform: translateY(-0.12em) rotate(45deg);
            transition: transform 180ms ease;
        }

        .content .name-pronunciation[open] > summary::after {
            transform: translateY(0.1em) rotate(225deg);
        }

        .content .name-pronunciation > summary:focus-visible {
            outline: 2px solid var(--theme-accent, #6962d2);
            outline-offset: 3px;
            border-radius: 3px;
        }

        .content .name-pronunciation__card {
            width: 22rem;
            max-width: 100%;
            margin-top: 0.45rem;
            padding: 0.55rem 0.7rem 0.5rem;
            border: 1px solid var(--theme-border, #e5e0f0);
            border-radius: 10px;
            background: var(--theme-surface, #faf9fc);
        }

        /* One column per name and one row per form, labeled at the left;
           #main outranks the theme's phone rule that blocks out tables. */
        #main .content .name-pronunciation__gloss {
            display: table;
            width: 100%;
            margin: 0;
            border: 0;
            border-collapse: collapse;
            font-family: inherit;
            font-size: 1em;
            line-height: 1.3;
        }

        #main .content .name-pronunciation__gloss th,
        #main .content .name-pronunciation__gloss td {
            padding: 0.05rem 0.35rem;
            border: 0;
            text-align: center;
            white-space: nowrap;
        }

        #main .content .name-pronunciation__gloss th {
            padding-left: 0;
            color: var(--theme-muted, #77717f);
            font-size: 0.62em;
            font-weight: 400;
            letter-spacing: 0.08em;
            text-align: left;
            text-transform: uppercase;
        }

        .content .name-pronunciation__bangla td {
            font-family: Kalpurush, "Noto Sans Bengali", "Nirmala UI", serif;
            font-size: 1.15em;
            color: var(--theme-text-strong, #36333f);
        }

        .content .name-pronunciation__ipa td {
            font-family: "Charis SIL", "Doulos SIL", "Gentium Plus", "Noto Serif", "Segoe UI", "Lucida Sans Unicode", "DejaVu Sans", serif;
            font-size: 0.86em;
        }

        .content .name-pronunciation__respelling td {
            color: var(--theme-muted, #77717f);
            font-size: 0.86em;
            font-style: italic;
        }

        /* Listen and the player's time, timeline, volume, and menu share one pill. */
        .content .name-pronunciation__player {
            display: flex;
            align-items: center;
            margin-top: 0.55rem;
            border: 1px solid var(--theme-border-strong, #d6d0ea);
            border-radius: 999px;
            background: var(--theme-surface-raised, #fff);
            overflow: hidden;
        }

        .content .name-pronunciation__play {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            align-self: stretch;
            gap: 0.4em;
            padding: 0 0.7em 0 0.75em;
            border: 0;
            border-right: 1px solid var(--theme-border, #e5e0f0);
            background: transparent;
            color: var(--theme-link, #52adc8);
            font: inherit;
            font-size: 0.85em;
            cursor: pointer;
            transition: background-color 160ms ease;
        }

        .content .name-pronunciation__play[hidden] {
            display: none;
        }

        .content .name-pronunciation__play:hover,
        .content .name-pronunciation__play.is-playing {
            background: var(--theme-accent-soft, #eef8fb);
        }

        .content .name-pronunciation__play:focus-visible {
            outline: 2px solid var(--theme-accent, #6962d2);
            outline-offset: -2px;
        }

        .content .name-pronunciation__icon {
            width: 1.15em;
            height: 1.15em;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.8;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .content .name-pronunciation__icon .speaker {
            fill: currentColor;
            stroke: none;
        }

        .content .is-playing .name-pronunciation__icon .wave {
            animation: pronunciation-wave 0.45s ease-in-out infinite alternate;
        }

        .content .is-playing .name-pronunciation__icon .wave-outer {
            animation-delay: 0.2s;
        }

        @keyframes pronunciation-wave {
            from { opacity: 0.2; }
            to { opacity: 1; }
        }

        /* Wide enough for the time display, which the player drops when cramped. */
        #main .content .name-pronunciation__player audio {
            display: block;
            flex: 1 1 auto;
            width: auto;
            min-width: 12rem;
            height: 34px;
            background: transparent;
        }

        /* Chromium lets the player blend into the pill; Listen then plays it. */
        .content .name-pronunciation__player audio::-webkit-media-controls-enclosure {
            border-radius: 0;
            background: transparent;
        }

        .content .name-pronunciation__player audio::-webkit-media-controls-panel {
            padding-left: 6px;
            background: transparent;
        }

        .content .name-pronunciation__player.has-listen audio::-webkit-media-controls-play-button {
            display: none;
        }

        .content .name-pronunciation__notes {
            margin-top: 0.4rem;
            color: var(--theme-muted, #77717f);
            font-size: 0.74em;
            line-height: 1.45;
        }

        .content .name-pronunciation__credit {
            margin-top: 0.35rem;
            color: var(--theme-muted, #77717f);
            font-size: 0.74em;
            text-align: center;
        }

        /* Set like the sidebar's Google Scholar link. */
        .content .name-pronunciation__brand {
            font-family: "Product Sans", sans-serif;
        }

        .content .google-wordmark span:nth-child(1),
        .content .google-wordmark span:nth-child(4) { color: #4285f4; }
        .content .google-wordmark span:nth-child(2),
        .content .google-wordmark span:nth-child(6) { color: #db4437; }
        .content .google-wordmark span:nth-child(3) { color: #f4b400; }
        .content .google-wordmark span:nth-child(5) { color: #0f9d58; }

        @media (prefers-reduced-motion: reduce) {
            .content .name-pronunciation > summary::after,
            .content .name-pronunciation__play { transition: none; }
            .content .is-playing .name-pronunciation__icon .wave { animation: none; }
        }

        /* reason, create, behave: each word is a slowly drifting, iridescent
           liquid in its own hue, and every few seconds a glint of light runs
           through the three in turn, swelling its glow as it passes. Light mode
           keeps the letters in deeper tones for contrast and lets the bright
           palette carry the glint and the glow. */
        /* The site's Palatino has a true bold italic (see _sass/_fonts.scss). */
        .content .research-verb {
            --verb-delay: 0s;
            color: var(--verb-solid);
            font-family: "Site Palatino", Palatino, serif;
            font-style: italic;
            font-weight: 700;
        }

        /* Italic letters lean past their box; padding, undone by negative
           margins, keeps the gradient fill from clipping them. */
        .content .research-verb,
        .content .research-verb__glint {
            padding: 0 0.12em 0 0.06em;
            margin: 0 -0.12em 0 -0.06em;
        }

        @supports ((-webkit-background-clip: text) or (background-clip: text)) {
            .content .research-verb,
            .content .research-verb__glint {
                -webkit-background-clip: text;
                background-clip: text;
            }

            .content .research-verb {
                background-image: linear-gradient(100deg, var(--verb-flow));
                background-size: 300% 100%;
                background-position: 0% 0;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0 0 0.2em var(--verb-glow));
                animation: research-verb-flow 9s ease-in-out infinite alternate,
                    research-verb-halo 7.5s ease-in-out var(--verb-delay) infinite;
            }

            /* The glint rides a second layer, clear except for one bright band. */
            .content .research-verb__glint {
                background-image: linear-gradient(100deg, transparent 41%, var(--verb-glint) 50%, transparent 59%);
                background-size: 320% 100%;
                background-position: 0% 0;
                animation: research-verb-glint 7.5s ease-in-out var(--verb-delay) infinite;
            }
        }

        .content .research-verb--reason {
            --verb-solid: #0b77ad;
            --verb-flow: #0b77ad 0%, #1592cc 22%, #0a6f9f 45%, #2f7cc4 62%, #0b77ad 80%, #1592cc 100%;
            --verb-glint: rgba(138, 217, 251, 0.95);
            --verb-glow: rgba(116, 210, 250, 0.45);
            --verb-glow-peak: rgba(116, 210, 250, 0.85);
        }

        .content .research-verb--create {
            --verb-solid: #a03dc3;
            --verb-flow: #a03dc3 0%, #b84fd6 22%, #9536b8 45%, #ad46cf 62%, #a03dc3 80%, #b84fd6 100%;
            --verb-glint: rgba(242, 166, 255, 0.95);
            --verb-glow: rgba(236, 141, 255, 0.42);
            --verb-glow-peak: rgba(236, 141, 255, 0.85);
            --verb-delay: 0.45s;
        }

        .content .research-verb--behave {
            --verb-solid: #5445b5;
            --verb-flow: #5445b5 0%, #6e65ce 22%, #4b3ca8 45%, #8180de 62%, #5445b5 80%, #6e65ce 100%;
            --verb-glint: rgba(167, 168, 240, 0.95);
            --verb-glow: rgba(145, 148, 228, 0.45);
            --verb-glow-peak: rgba(129, 128, 222, 0.85);
            --verb-delay: 0.9s;
        }

        html[data-theme="dark"] .content .research-verb--reason {
            --verb-solid: #74d2fa;
            --verb-flow: #74d2fa 0%, #62c8f6 22%, #8ad9fb 45%, #9a9ff0 62%, #74d2fa 80%, #62c8f6 100%;
            --verb-glint: rgba(232, 249, 255, 0.95);
            --verb-glow: rgba(116, 210, 250, 0.4);
            --verb-glow-peak: rgba(116, 210, 250, 0.8);
        }

        html[data-theme="dark"] .content .research-verb--create {
            --verb-solid: #ec8dff;
            --verb-flow: #ec8dff 0%, #e27bf8 22%, #f2a6ff 45%, #c9a3ff 62%, #ec8dff 80%, #e27bf8 100%;
            --verb-glint: rgba(254, 236, 255, 0.95);
            --verb-glow: rgba(236, 141, 255, 0.38);
            --verb-glow-peak: rgba(236, 141, 255, 0.78);
        }

        html[data-theme="dark"] .content .research-verb--behave {
            --verb-solid: #a7a8f0;
            --verb-flow: #a7a8f0 0%, #9194e4 22%, #b8b9f5 45%, #8180de 62%, #a7a8f0 80%, #9194e4 100%;
            --verb-glint: rgba(240, 240, 255, 0.95);
            --verb-glow: rgba(167, 168, 240, 0.4);
            --verb-glow-peak: rgba(167, 168, 240, 0.8);
        }

        @keyframes research-verb-flow {
            from { background-position: 0% 0; }
            to { background-position: 100% 0; }
        }

        @keyframes research-verb-glint {
            0% { background-position: 100% 0; }
            34%, 100% { background-position: 0% 0; }
        }

        @keyframes research-verb-halo {
            0%, 34%, 100% { filter: drop-shadow(0 0 0.2em var(--verb-glow)); }
            17% { filter: drop-shadow(0 0 0.38em var(--verb-glow-peak)); }
        }

        /* Rest while the sentence is scrolled out of view. */
        .content .research-verbs.is-offscreen .research-verb,
        .content .research-verbs.is-offscreen .research-verb__glint {
            animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
            .content .research-verb,
            .content .research-verb__glint { animation: none; }
        }

        /* Printing and forced colors drop background clipping; keep solid text. */
        @media print, (forced-colors: active) {
            .content .research-verb,
            .content .research-verb__glint {
                background: none;
                -webkit-text-fill-color: currentColor;
                filter: none;
                animation: none;
            }
        }
</style>
<div class="container">
        <div class="content">
        Hello! <span class="emoji wave" role="img" aria-label="Waving hand"></span><br>
        I am Syed Rifat Raiyan.
        <details class="name-pronunciation">
        <summary>How to pronounce?</summary>
        <div class="name-pronunciation__card">
            <table class="name-pronunciation__gloss" aria-label="How to pronounce Syed Rifat Raiyan">
                <tr class="name-pronunciation__bangla"><th scope="row">Bangla</th><td lang="bn">সৈয়দ</td><td lang="bn">রিফাত</td><td lang="bn">রাইয়ান</td></tr>
                <tr class="name-pronunciation__ipa"><th scope="row"><abbr title="International Phonetic Alphabet">IPA</abbr></th><td>/soi̯.ɔd/</td><td>/ɾi.fat̪/</td><td>/ɾai̯.jan/</td></tr>
                <tr class="name-pronunciation__respelling"><th scope="row">Sounds like</th><td>soi-awd</td><td>ree-fahth</td><td>rye-yahn</td></tr>
            </table>
            <div class="name-pronunciation__notes">The <i>r</i> is a light tap, as in Spanish <i lang="es">pero</i>. Rifat ends in Bangla&rsquo;s soft ত (t̪), a <i>t</i> made against the teeth, close to the <i>th</i> of a British &ldquo;bath&rdquo;.</div>
            <div class="name-pronunciation__player">
                <button class="name-pronunciation__play" type="button" aria-pressed="false" hidden><svg class="name-pronunciation__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="speaker" d="M3.5 9.5H7l4.5-3.8v12.6L7 14.5H3.5z"/><path class="wave" d="M15 9.3a3.8 3.8 0 0 1 0 5.4"/><path class="wave wave-outer" d="M17.7 6.6a7.6 7.6 0 0 1 0 10.8"/></svg>Listen</button>
                <audio controls preload="none" src="{{ '/audio/Syed-Rifat-Raiyan.mp3' | relative_url }}" aria-label="Pronunciation of Syed Rifat Raiyan"></audio>
            </div>
            <div class="name-pronunciation__credit">Spoken by <span class="name-pronunciation__brand"><span class="google-wordmark"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span> Translate</span>&rsquo;s default Bangla voice</div>
        </div>
        </details>
        <script>
        (function () {
            var box = document.querySelector('.name-pronunciation');
            var audio = box && box.querySelector('audio');
            var button = box && box.querySelector('.name-pronunciation__play');
            if (!audio || !button) { return; }
            /* Listen plays and pauses; the player keeps its time, timeline,
               volume, and menu (download and playback speed) beside it.
               (Block comments only: the live site puts each page on one
               line, where a line comment would swallow the rest.) */
            button.hidden = false;
            button.parentNode.classList.add('has-listen');
            button.addEventListener('click', function () {
                if (!audio.paused && !audio.ended) { audio.pause(); return; }
                if (audio.ended) { audio.currentTime = 0; }
                var playing = audio.play();
                if (playing && playing.catch) { playing.catch(function () {}); }
            });
            function sync() {
                var on = !audio.paused && !audio.ended;
                button.classList.toggle('is-playing', on);
                button.setAttribute('aria-pressed', on ? 'true' : 'false');
            }
            ['play', 'playing', 'pause', 'ended'].forEach(function (name) { audio.addEventListener(name, sync); });
            box.addEventListener('toggle', function () {
                /* Fetch the clip's length only once someone opens the panel. */
                if (box.open && audio.readyState === 0 && audio.preload === 'none') {
                    audio.preload = 'metadata';
                    audio.load();
                }
                if (!box.open) { audio.pause(); }
            });
        }());
        </script>
        <p>I am a Lecturer in the Department of Computer Science and Engineering (CSE) at the Islamic University of Technology (IUT), where I also earned my B.Sc. with Honors in May 2023. I completed my undergraduate thesis being affiliated with the <a href="https://cse.iutoic-dhaka.edu/ssl">Systems and Software Lab (SSL)</a> under the supervision of <a href="https://cse.iutoic-dhaka.edu/profile/mohsinul/education">Mohsinul Kabir</a>.</p>

        <p class="research-verbs">My research examines how large language models (LLMs) <span class="research-verb research-verb--reason"><span class="research-verb__glint">reason</span></span>, <span class="research-verb research-verb--create"><span class="research-verb__glint">create</span></span>, and <span class="research-verb research-verb--behave"><span class="research-verb__glint">behave</span></span> in social settings. Underlying this work is a broader aim: to bridge the gap between human and machine cognition by understanding the capabilities these systems acquire, the mechanisms that support them, and the limits of their resemblance to human thought.</p>
        <script>
        (function () {
            /* The verbs' glow animates only while their sentence is on screen. */
            var sentence = document.querySelector('.research-verbs');
            if (!sentence || !('IntersectionObserver' in window)) { return; }
            new IntersectionObserver(function (entries) {
                sentence.classList.toggle('is-offscreen', !entries[entries.length - 1].isIntersecting);
            }).observe(sentence);
        }());
        </script>

        {% include research-map.html %}

        <p>One strand of my work concerns {% include research-topic.html topic="mathematical" text="mathematical" %} and {% include research-topic.html topic="scientific" text="scientific reasoning" %}: how reliably LLMs solve problems, including diagram-grounded geometry, and how their performance shifts with language, context, and inference-time strategies. Its creative counterpart is {% include research-topic.html topic="narrative" text="narrative generation" %}, where I study how LLMs tell stories out of chronological order, using an annotated corpus, story graphs, and human evaluation. Together, these directions span two complementary sides of cognition: structured problem-solving and creative expression.</p>

        <p>A second strand lies at the intersection of computational social science and responsible AI. Here I investigate how framing, language, and alignment shape models' {% include research-topic.html topic="political" text="political behavior" %} and {% include research-topic.html topic="moral" text="moral decision-making" %}, with particular attention to ethics, bias, and fairness.</p>

        <p>To understand what drives such behavior, I also look inside the models, using {% include research-topic.html topic="interpretability" text="mechanistic interpretability and activation-space interventions" %} to explain and steer it. Beyond individual models, I explore {% include research-topic.html topic="agentic" text="multi-agent systems and agentic AI" %}, studying how coordinated reasoning, progressive retrieval, and structured debate support reliable problem-solving and claim verification.</p>

        <p>Alongside these central directions, I pursue projects in Bangla NLP and computer vision, from language resources to visual understanding. My <a href="{{ '/publications/' | relative_url }}">publications</a> give a fuller account of these lines of inquiry.</p>

        <details class="intellectual-influences">
        <summary>Intellectual influences</summary>
        <p>Some people in academia that I follow/look up to:</p>
        <p>
        <a href="https://karpathy.ai/">Andrej Karpathy</a>, <a href="https://www.andrewng.org/">Andrew Ng</a>, <a href="https://www.maths.ox.ac.uk/people/andrew.wiles">Andrew Wiles</a>, <a href="https://autarkaw.com">Autar Kaw</a>, <a href="https://en.wikipedia.org/wiki/Bret_Weinstein">Bret Weinstein</a>, <a href="https://nlp.stanford.edu/~manning/">Christopher D. Manning</a>, <a href="https://www.cs.princeton.edu/~danqic/">Danqi Chen</a>, <a href="https://cs.harvard.edu/malan/">David J. Malan</a>, <a href="https://www-cs-faculty.stanford.edu/~knuth/">Donald E. Knuth</a>, <a href="http://erikdemaine.org/">Erik Demaine</a>, <a href="https://math.mit.edu/~gs/">Gilbert Strang</a>, <a href="https://www.3blue1brown.com/">Grant Sanderson</a>, <a href="http://www-formal.stanford.edu/jmc/index.html">John McCarthy</a>, <a href="https://jonathanhaidt.com/">Jonathan Haidt</a>, <a href="https://www.jordanbpeterson.com/">Jordan B Peterson</a>, <a href="https://web.archive.org/web/20260903035253/https://web.eecs.umich.edu/~justincj/">Justin Johnson</a>, <a href="https://scholar.google.com/citations?user=WgyrxUAAAAAJ&hl=en">Károly Zsolnai-Fehér</a>, <a href="https://www.math.mcgill.ca/lnchen/">Linan Chen</a>, <a href="https://chomsky.info/">Noam Chomsky</a>, <a href="https://web.archive.org/web/20230808013415/https://rebeccashafee.com/index.html">Rebecca Shafee</a>, <a href="https://en.wikipedia.org/wiki/Roger_Penrose">Roger Penrose</a>, <a href="https://people.csail.mit.edu/devadas/">Srinivas Devadas</a>, <a href="https://www.math.ucla.edu/~tao/">Terence Tao</a>.
        </p>
        </details>
</div>
<div class="news">
    <h2><img src="{{ '/images/quill-pen-cropped.svg' | relative_url }}" style="width: 25px; vertical-align: bottom">Chronicle</h2>
    <div class="news-content">
        <b>22nd September 2026:</b> Became a reviewer at <a href="https://dl.acm.org/journal/tist">ACM TIST</a> and <a href="https://www.tandfonline.com/journals/uaai20">Applied AI</a>.
        <br>
        <br>
        <b>8th September 2026:</b> LLM-Ideoplasticity has been accepted at <a href="https://2026.aaclnet.org/">IJCNLP-AACL 2026</a> (Main Conference) with 99.6th percentile ratings (Top 62 out of 17,087 <a href="https://openreview.net/group?id=aclweb.org/ACL/ARR/2026/May">ARR May 2026</a> submissions). Alhamdulillah!
        <br>
        <br>
        <b>31st August 2026:</b> FrugalPrompt has been accepted at the <a href="https://luhme.up.pt/">3rd LUHME Workshop at EMNLP 2026</a>. Alhamdulillah!
        <br>
        <br>
        <b>12th June 2026:</b> Became a reviewer at <a href="https://www.computer.org/csdl/journal/tp">IEEE Transactions on Pattern Analysis and Machine Intelligence</a>.
        <br>
        <br>
        <b>27th May 2026:</b> CircuitLM has been accepted for publication at the <a href="https://iclad.ai/">2026 IEEE International Conference on LLM-Aided Design (ICLAD)</a>. Alhamdulillah!
        <br>
        <br>
        <b>16th January 2026:</b> Won a silver medal at the <a href="https://www.uphysicsc.com/2025contest.html">2025 University Physics Competition</a>. Alhamdulillah! Kudos to my students Abrar Naguib, Md Niamul Al Zihan, and Shaheen Rahman Dibya.
        <br>
        <br>
        <b>25th October 2025:</b> PhysicsEval has been accepted for publication in the <a href="https://openreview.net/forum?id=HVoNaOfE8M">Findings of the ACL: IJCNLP-AACL 2025</a>. Alhamdulillah!
        <br>
        <br>
        <b>20th October 2025:</b> Presented at an international conference for the first time in-person — <a href="https://iccv.thecvf.com/">ICCV 2025</a> at Honolulu, Hawaii, USA.
        <br>
        <br>
        <b>24th August 2025:</b> Contributed to the writing of <a href="https://web.stanford.edu/~jurafsky/slp3/">Speech and Language Processing (3rd Edition)</a> by <a href="http://web.stanford.edu/people/jurafsky/">Dan Jurafsky</a> and <a href="https://home.cs.colorado.edu/~martin/">James H. Martin</a>. Thanks for the <a href="https://web.stanford.edu/~jurafsky/slp3/thanks.html#:~:text=Syed%20Hasany-,Syed%20Rifat%20Raiyan,-Taishi%20Nakashima">shoutout</a>!
        <br>
        <br>
        <b>16th August 2025:</b> Worked as problem setter for the <a href="https://codeforces.com/gym/629683">IUT Intra University Programming Contest 2025</a>. Links: [<a href="https://github.com/ir-rafio/AHIUPC-2025-Problemset/blob/main/Statements.pdf">Problemset</a>], [<a href="https://github.com/ir-rafio/AHIUPC-2025-Problemset/blob/main/Editorial.md">Editorial</a>], [<a href="https://codeforces.com/gym/106045">Replay</a>]
        <br>
        <br>
        <b>10th August 2025:</b> My CSE 6265 project's paper has been accepted for oral presentation at <a href="https://web.archive.org/web/20250803175015/http://acpr2025.com/">ACPR 2025</a>. Alhamdulillah!
        <br>
        <br>
        <b>14th July 2025:</b> My CSE 4836 project's paper has been accepted for oral presentation at <a href="https://openreview.net/forum?id=AAGhroilqL">ICCV 2025 WCCA</a>. Alhamdulillah!
        <br>
        <br>
        <b>25th May 2025:</b> Worked as contest coordinator and problem illustrator for the <a href="https://codeforces.com/gym/612054">Intra-IUT Junior Programming Contest (IJPC) 2025</a>. Links: [<a href="https://github.com/ir-rafio/IJPC-2025-Problemset/blob/main/Statements.pdf">Problemset</a>], [<a href="https://github.com/ir-rafio/IJPC-2025-Problemset/blob/main/Editorial.md">Editorial</a>], [<a href="https://codeforces.com/contestInvitation/14c968519bdf2a0c211cb165402c80ccef98c965">Invitation</a>]
        <br>
        <br>
        <b>17th July 2024:</b> Submitted my CSE 4836 project's paper to <a href="https://cis.ieee.org/publications/ieee-transactions-on-artificial-intelligence">IEEE TAI</a>. Preprint is available at <a href="https://www.arxiv.org/abs/2408.10360">arXiv</a>. Let's hope for the best!
        <br>
        <br>
        <b>2nd February 2024:</b> Became a reviewer at <a href="https://link.springer.com/journal/42979">Springer Nature Computer Science</a>.
        <br>
        <br>
        <b>16th August 2023:</b> Got my first-ever job — Lecturer at <a href="https://cse.iutoic-dhaka.edu/">IUT CSE</a>.
        <br>
        <br>
        <b>9th July 2023:</b> Virtually presented a poster of my B.Sc. thesis work at ACL 2023.
        <br>
        <br>
        <b>8th June 2023:</b> My B.Sc. thesis work on MWPs got accepted for publication in <a href="https://aclanthology.org/2023.acl-srw.49/">ACL-SRW 2023</a>. Alhamdulillah!
        <br>
        <br>
        <b>2nd May 2023:</b> My first-ever paper got accepted for publication in the <a href="https://aclanthology.org/2023.findings-acl.80/">Findings of ACL 2023</a>. Alhamdulillah!
    </div>
</div>
</div>
<br>
<div class="visitor-map" style="float: right;">
    <!-- <script type='text/javascript' id='clustrmaps' src='//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=500&t=tt&d=w_TeJiwbvCfFyZ0dPOrLIdVwWFumXWn3fCcf3Egyhho&co=71addc&cmo=deac7c&cmn=b4d27c&ct=ffffff'></script> -->
    <script>
    (function () {
        /* The visitor map (and the jQuery it brings) loads once the page has,
           so it no longer holds up the page; every visit still counts. A page
           loaded ahead of time on hover (see head.html) waits until it is
           actually opened, so hovering a link never counts as a visit. */
        var here = document.currentScript;
        function addMap() {
            var map = document.createElement('script');
            map.id = 'mapmyvisitors';
            map.src = 'https://mapmyvisitors.com/map.js?cl=ffffff&w=500&t=tt&d=3_Etu5zBzTNNRms36AvbqzeDMy6qEla9H_jwbeV6mR8&co=71addc&cmo=deac7c&cmn=b4d27c';
            here.parentNode.insertBefore(map, here.nextSibling);
        }
        function afterLoad() {
            if (document.readyState === 'complete') { addMap(); } else { window.addEventListener('load', addMap); }
        }
        if (document.prerendering) {
            document.addEventListener('prerenderingchange', afterLoad, { once: true });
        } else {
            afterLoad();
        }
    }());
    </script>
</div>
