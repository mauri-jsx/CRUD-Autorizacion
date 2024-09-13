import "./style.css";
import { renderLoginPage } from "./pages/LoginPage.js";
import { renderRegisterPage } from "./pages/RegistePage.js";
import { renderHomePage } from "./pages/HomePage.js";
import { renderProfilePage } from "./pages/ProfilePage.js";
import { renderTareasPage } from "./pages/TareaPage.js";
import { renderHeader } from "./components/HeaderPage.js";

function logout() {
  localStorage.removeItem("token");
  window.location.pathname = "/login";
}

function router() {
  // Renderiza el encabezado en todas las páginas
  renderHeader();

  const token = localStorage.getItem("token");

  if (token) {
    // Usuario autenticado
    if (window.location.pathname === "/profile") {
      renderProfilePage();
    } else if (window.location.pathname === "/tareas") {
      renderTareasPage();
    } else if (window.location.pathname === "/logout") {
      logout();
    } else if (
      window.location.pathname === "/register" ||
      window.location.pathname === "/login"
    ) {
      // Redirigir a home si el usuario está autenticado y intenta acceder a login o register
      window.location.pathname = "/";
    } else {
      renderHomePage();
    }
  } else {
    // Usuario no autenticado
    if (window.location.pathname === "/register") {
      renderRegisterPage();
    } else if (window.location.pathname === "/login") {
      renderLoginPage();
    } else {
      // Redirigir a login si la ruta no es válida
      window.location.pathname = "/login";
    }
  }
}

// Añadir el evento de carga y popstate para manejar la navegación
window.addEventListener("load", router);
window.addEventListener("popstate", router);
