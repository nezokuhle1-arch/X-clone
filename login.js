// --- Staggered character fade (vanilla StaggeredFade + useInView) ---
function initStaggeredFade() {
    const elements = document.querySelectorAll('.staggered-fade');

    elements.forEach((el) => {
        const text = el.dataset.text || el.textContent.trim();
        el.textContent = '';
        el.setAttribute('aria-label', text);

        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${i * 0.07}s`;
            el.appendChild(span);
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
}

const LOGIN_KEY = 'fakeTwitterLoggedIn';

// Already "logged in" — skip straight to the feed
if (localStorage.getItem(LOGIN_KEY) === 'true') {
    window.location.replace('index.html');
}

// --- Fake login: any click on Log in goes to the homepage ---
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem(LOGIN_KEY, 'true');
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initStaggeredFade();
    initLoginForm();
});

function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const usernameGroup = document.getElementById('usernameGroup');
    const passwordGroup = document.getElementById('passwordGroup');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let hasError = false;

        if (usernameInput.value.trim() === '') {
            usernameGroup.classList.add('has-error');
            hasError = true;
        } else {
            usernameGroup.classList.remove('has-error');
        }

        if (passwordInput.value.trim() === '') {
            passwordGroup.classList.add('has-error');
            hasError = true;
        } else {
            passwordGroup.classList.remove('has-error');
        }

        if (hasError) return;

        localStorage.setItem(LOGIN_KEY, 'true');
        window.location.href = 'index.html';
    });
}
