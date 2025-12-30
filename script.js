document.addEventListener('DOMContentLoaded', () => {

    const text = 'С Новым годом, MavAlliance!';
    const title = document.getElementById('typing-title');
    title.textContent = '';
    let i = 0;
    (function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i++);
            setTimeout(type, 80);
        }
    })();

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

    const cards = document.querySelectorAll('.card');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const indicators = document.getElementById('indicators');
    let current = 0;

    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'indicator';
        dot.onclick = () => showCard(i);
        indicators.appendChild(dot);
    });

    function animateElement(el, delay = 0) {
        el.style.opacity = 0;
        el.style.transform = 'scale(0.95)';
        setTimeout(() => {
            el.style.transition = 'all 0.4s ease';
            el.style.opacity = 1;
            el.style.transform = 'scale(1)';
        }, delay);
    }

    function showCard(i) {
        cards.forEach((c, idx) => {
            c.classList.toggle('active', idx === i);
            indicators.children[idx].classList.toggle('active', idx === i);
        });
        current = i;

        if (i === 0) {
            const texts = cards[0].querySelectorAll('p, h1');
            texts.forEach((el, idx) => animateElement(el, idx * 150));
        }

        if (i === 1) {
            const avatars = cards[1].querySelectorAll('.avatar');
            avatars.forEach((avatar, idx) => animateElement(avatar, idx * 150));
        }
    }

    prev.onclick = () => showCard((current - 1 + cards.length) % cards.length);
    next.onclick = () => showCard((current + 1) % cards.length);
    showCard(0);

    document.querySelectorAll('.avatar-img').forEach(box => {
        const img = box.querySelector('img');
        if (img && img.complete && img.naturalWidth !== 0) {
            box.classList.add('has-image');
        }
        img?.addEventListener('load', () => box.classList.add('has-image'));
    });

    const modal = document.getElementById('memberModal');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalName = document.getElementById('modalName');
    const modalText = document.getElementById('modalText');
    const modalClose = document.getElementById('modalClose');

    const easterModal = document.getElementById('easterModal');
    const easterAvatar = document.getElementById('easterAvatar');
    const easterName = document.getElementById('easterName');
    const easterText = document.getElementById('easterText');
    const easterClose = document.getElementById('easterClose');

    let mavTapCount = 0;
    let mavTapTimer = null;

    function openEaster() {
        easterAvatar.style.background = `url('Zsero.jpg') center/cover no-repeat`;
        easterName.textContent = 'Zsero';
        easterText.textContent =
            'Самый захеченный участник MavAlliance, с позором ливнувший с сервера, но оставшийся в наших сердцах навсегда. как тот кто купил скинчик на нюрсу и ещё большое количество рофлов)';
        easterModal.classList.add('active');
    }

    document.querySelectorAll('.avatar').forEach(a => {
        a.addEventListener('click', (e) => {

            if (e.altKey && a.dataset.name === 'MavEneus') {
                e.preventDefault();
                e.stopPropagation();
                openEaster();
                return;
            }

            if (a.dataset.name === 'MavEneus' && !e.altKey) {
                mavTapCount++;
                clearTimeout(mavTapTimer);
                mavTapTimer = setTimeout(() => mavTapCount = 0, 1200);
                if (mavTapCount === 2) {
                    openEaster();
                    mavTapCount = 0;
                    return;
                }
            }

            const img = a.querySelector('.avatar-img img');
            modalAvatar.innerHTML = '';
            if (img) modalAvatar.appendChild(img.cloneNode(true));
            else modalAvatar.textContent = a.querySelector('.avatar-img').dataset.letter;

            modalName.textContent = a.dataset.name;
            modalText.textContent = a.dataset.text;
            modal.classList.add('active');
        });
    });

    modalClose.onclick = () => modal.classList.remove('active');
    modal.onclick = e => { if (e.target === modal) modal.classList.remove('active'); };

    easterClose.onclick = () => easterModal.classList.remove('active');
    easterModal.onclick = e => { if (e.target === easterModal) easterModal.classList.remove('active'); };

    document.querySelectorAll('.nomination-link').forEach(link => {
        link.addEventListener('click', () => {
            const name = link.textContent.trim();
            const avatar = [...document.querySelectorAll('.avatar')].find(a => a.dataset.name === name);
            if (avatar) avatar.click();
        });
    });

    const trigger = document.getElementById('nominationTrigger');
    const secretBtn = document.getElementById('secretBtn');
    if (trigger && secretBtn) {
        secretBtn.style.display = 'none';
        let clickCount = 0;
        trigger.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 5) {
                secretBtn.style.display = 'inline-block';
                clickCount = 0;
            }
        });
        secretBtn.addEventListener('click', () => {
            window.location.href = 'secret.html';
            secretBtn.style.display = 'none';
        });
    }

    const solImages = [
        'sol daze`.jpg','soldaze.jpg','soldaze2.jpg','soldaze3.jpg','soldaze4.jpg',
        'soldaze5.jpg','soldaze6.jpg','soldaze7.jpg','soldaze8.jpg','soldaze9.jpg','soldaze10.jpg'
    ];
    let solIndex = 0;
    const solAvatar = [...document.querySelectorAll('.avatar')].find(a => a.dataset.name === 'Sol Daze`');

    if (solAvatar) {
        solAvatar.addEventListener('click', () => {
            solIndex = (solIndex + 1) % solImages.length;
            const newSrc = solImages[solIndex];

            const imgEl = solAvatar.querySelector('.avatar-img img');
            if (imgEl) imgEl.src = newSrc;

            modalAvatar.innerHTML = '';
            if (imgEl) modalAvatar.appendChild(imgEl.cloneNode(true));
            modalName.textContent = solAvatar.dataset.name;
            modalText.textContent = solAvatar.dataset.text;
            modal.classList.add('active');
        });
    }

});

const flash = document.getElementById('flashOverlay');

document.querySelectorAll('.avatar').forEach(avatar => {
    avatar.addEventListener('click', () => {
        const name = avatar.dataset.name;

        if (name === 'Анастэйша🔪') {
            flash.classList.remove('active'); 
            void flash.offsetWidth;            
            flash.classList.add('active');
        }
    });
});
