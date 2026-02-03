const currentPath = window.location.pathname;
const homePage = document.querySelector('#Home');
const favoritesPage = document.querySelector('#Favorites');

document.addEventListener('DOMContentLoaded', pageSwitch());

function pageSwitch() {
  homePage.classList.remove('header-nav-link-active');
  favoritesPage.classList.remove('header-nav-link-active');

  if (!currentPath.includes('favorites.html')) {
    homePage.classList.add('header-nav-link-active');
  } else {
    favoritesPage.classList.add('header-nav-link-active');
  }
}
