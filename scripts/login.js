// login.js
export function toggleLogin() {
    const modal = document.querySelector('.login__modal');
    // FIX: Change '.header__login-btn' to '.btn_join'
    const openBtn = document.querySelector('.btn_join'); 
    const closeBtn = document.querySelector('.login__close');
    const submit = document.querySelector('.login__submit');

    // Safety check: only add listeners if elements exist
    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    if (submit) {
        submit.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "member-page.html"; 
        });
    }
}