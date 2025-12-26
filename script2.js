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
