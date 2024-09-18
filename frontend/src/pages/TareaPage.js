// src/pages/TareaPage.js
import { logout } from '../api/user.js';

export function renderTareaPage() {
  const profileName = localStorage.getItem('profileName');

  document.body.innerHTML = `
    <div class="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 class="text-2xl">Bienvenido, ${profileName}</h1>
      <button id="logoutButton" class="bg-red-500 px-4 py-2 rounded">Logout</button>
    </div>
    <div class="p-6">
      <h2 class="text-xl mb-4">CRUD de Tareas</h2>
      <!-- Aquí puedes agregar el contenido del CRUD de tareas -->
    </div>
  `;

  document.getElementById('logoutButton').addEventListener('click', () => {
    logout(); // Llama a la función de logout
  });
}
