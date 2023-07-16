---
permalink: /
title: "Home"
excerpt: "About me"
author_profile: true
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
Hello! <span class="emoji wave" role="img" aria-label="hand wave"></span><br>
I am Syed Rifat Raiyan.
<div id="pronounceLink" style="display:block;"><p><a href="#" onclick="$('#pronounce').toggle(); return false;"><i>How to pronounce?</i></a></p></div>
<div id="pronounce" style="display: none;" class="alert">
	<p>Here is a standard Bangla pronunciation:<br>
        <audio controls="">
            <source src="audio/Syed-Rifat-Raiyan.mp3" type="audio/mpeg">
        </audio>
    </p>
</div>
<br>
In May of 2023, I attained my Bachelor of Science (B.Sc.) degree with Honors from the Department of Computer Science and Engineering (CSE) at Islamic University of Technology (IUT).