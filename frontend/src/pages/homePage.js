import { renderHeader } from "../components/HeaderPage.js";

export function renderHomePage() {
  renderHeader();

  document.body.innerHTML += `
    <main class="p-4">
      <h1>Bienvenido a la Página de Inicio</h1>
      <!-- Resto del contenido -->
    </main>
  `;
}
