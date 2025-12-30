document.addEventListener('DOMContentLoaded', () => {
    const snow = document.querySelector('.snow');
    const FLAKES = window.innerWidth < 768 ? 50 : 110;

    for (let i = 0; i < FLAKES; i++) {
        const flake = document.createElement('div');
        flake.className = 'flake';
        flake.textContent = '❄';
        resetFlake(flake, true);
        snow.appendChild(flake);
        flake.addEventListener('animationend', () => resetFlake(flake));
    }

    function resetFlake(flake, initial = false) {
        flake.style.animation = 'none';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.top = initial ? Math.random() * -100 + 'vh' : '-10px';
        flake.style.fontSize = 6 + Math.random() * 10 + 'px';
        flake.style.opacity = 0.3 + Math.random() * 0.7;
        const duration = 9 + Math.random() * 10;
        void flake.offsetWidth;
        flake.style.animation = `fall ${duration}s linear`;
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
    wrapper.addEventListener('touchstart', startVideo, { once: true, passive: false });

    video.addEventListener('click', e => e.stopPropagation());
    video.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });

    window.addEventListener('load', () => {
        const nav = performance.getEntriesByType('navigation')[0];
        if (nav?.type === 'reload' && location.pathname.endsWith('secret.html')) {
            location.href = 'index.html';
        }
    });

    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('contextmenu', e => e.preventDefault());
});

