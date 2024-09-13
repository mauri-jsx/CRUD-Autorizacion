import Swal from "sweetalert2";
import { login } from "../api/user.js";

export function renderHeader() {
  const token = localStorage.getItem("token");

  const headerHtml = `
    <header class="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div class="flex items-center">
        <a href="/" class="text-xl font-bold">Inicio</a>
        ${
          token
            ? `
          <a href="/profile" class="ml-4">Perfil</a>
          <a href="/tareas" class="ml-4">Tareas</a>
          <button id="logoutButton" class="ml-4 bg-red-500 px-4 py-2 rounded">Cerrar Sesión</button>
        `
            : `
          <a href="/login" class="ml-4">Login</a>
          <a href="/register" class="ml-4">Registro</a>
        `
        }
      </div>
    </header>
  `;

  // Asegúrate de que el encabezado se inserte al inicio del body
  if (document.body) {
    document.body.insertAdjacentHTML("afterbegin", headerHtml);

    if (token) {
      document
        .getElementById("logoutButton")
        .addEventListener("click", async () => {
          await fetch("http://localhost:4000/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.removeItem("token");
          window.location.pathname = "/login";
        });
    }
  } else {
    console.error("No se pudo encontrar el elemento body");
  }
}
