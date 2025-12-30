const snowContainer = document.querySelector('.snow');

if (snowContainer) {
    const flakesCount = 40;

    for (let i = 0; i < flakesCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'flake';
        flake.textContent = '❄';

        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.fontSize = 12 + Math.random() * 14 + 'px';
        flake.style.opacity = Math.random();
        flake.style.animationDuration = 6 + Math.random() * 6 + 's';
        flake.style.animationDelay = Math.random() * 5 + 's';

        snowContainer.appendChild(flake);
    }
}

const wrapper = document.querySelector('.video-wrapper');
const video = document.getElementById('secret-video');

let started = false;

function startVideo(e) {
    if (started) return;
    started = true;

    e.preventDefault();
    e.stopPropagation();

    video.style.display = 'block';

    wrapper.style.pointerEvents = 'none';

    video.style.pointerEvents = 'auto';

    const p = video.play();
    if (p) {
        p.catch(() => {
            video.controls = true;
        });
    }
}

wrapper.addEventListener('click', startVideo, { once: true });
wrapper.addEventListener('touchstart', startVideo, {
    once: true,
    passive: false
});

video.addEventListener('click', e => e.stopPropagation());
video.addEventListener('touchstart', e => e.stopPropagation(), {
    passive: true
});

window.addEventListener('load', () => {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav?.type === 'reload' && location.pathname.endsWith('secret.html')) {
        location.href = 'index.html';
    }
});

document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('contextmenu', e => e.preventDefault());


