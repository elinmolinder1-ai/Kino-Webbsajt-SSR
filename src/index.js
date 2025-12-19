import './scss/main.scss';
import './scripts/menu.js';

const menuButton = document.querySelector('.header__menu-button');
const navContainer = document.querySelector('.header__nav');
const closeButton = document.querySelector('.header__nav-close');

if (menuButton && navContainer && closeButton) {
  menuButton.addEventListener('click', () => {
    navContainer.classList.add('mobileactive');
  });
  
  closeButton.addEventListener('click', () => {
    navContainer.classList.remove('mobileactive');
  });
}