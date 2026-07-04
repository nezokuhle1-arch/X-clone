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

// --- Mobile hamburger menu ---
function initMobileMenu() {
    const toggle = document.querySelector('.login-nav-toggle');
    const menu = document.getElementById('mobileMenu');

    if (!toggle || !menu) return;

    function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
    }

    function openMenu() {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
    }

    toggle.addEventListener('click', () => {
        if (menu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (!menu.classList.contains('is-open')) return;
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            closeMenu();
        }
    });
}

// --- Login form validation ---
function initLoginForm() {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameGroup = document.getElementById('usernameGroup');
    const passwordGroup = document.getElementById('passwordGroup');

    if (!form) return;

    function setError(group, hasError) {
        group.classList.toggle('has-error', hasError);
    }

    usernameInput.addEventListener('input', () => setError(usernameGroup, false));
    passwordInput.addEventListener('input', () => setError(passwordGroup, false));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let firstInvalid = null;

        if (!username) {
            setError(usernameGroup, true);
            firstInvalid = usernameInput;
        } else {
            setError(usernameGroup, false);
        }

        if (!password) {
            setError(passwordGroup, true);
            if (!firstInvalid) firstInvalid = passwordInput;
        } else {
            setError(passwordGroup, false);
        }

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        form.reset();
        alert('This is a static demo — no real login happens here.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initStaggeredFade();
    initMobileMenu();
    initLoginForm();
});
