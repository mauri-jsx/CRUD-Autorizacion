import './style.css';
import { renderHomePage } from './pages/HomePage.js';
import { renderLoginPage } from './pages/LoginPage.js';
import { renderRegisterPage } from './pages/RegisterPage.js';

// Función de enrutamiento
function router() {
  const path = window.location.pathname;

  if (path === '/') {
    renderHomePage();
  } else if (path === '/register') {
    renderRegisterPage();
  } else if (path === '/login') {
    renderLoginPage();
  } else if (path === '/home') {
    renderHomePage();
  } else {
    window.location.pathname = '/';
  }
}

// Configura los event listeners para los botones
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');

if (registerButton) {
  registerButton.addEventListener('click', () => {
    window.location.pathname = '/register';
  });
}

if (loginButton) {
  loginButton.addEventListener('click', () => {
    window.location.pathname = '/login';
  });
}

window.addEventListener('load', router);
window.addEventListener('popstate', router);

console.log('Script main.js cargado');
