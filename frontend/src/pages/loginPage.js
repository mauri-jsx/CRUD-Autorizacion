// src/pages/LoginPage.js
import Swal from 'sweetalert2';
import { login } from '../api/user.js';

export function renderLoginPage() {
    document.body.innerHTML = `
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <form id="loginForm" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl mb-4">Login</h2>
        <input id="email" type="email" placeholder="Email" class="border p-2 mb-4 w-full" />
        <input id="password" type="password" placeholder="Contraseña" class="border p-2 mb-4 w-full" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Iniciar Sesión</button>
      </form>
    </div>
  `;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await login({ email, password });

        if (response.success) {
            localStorage.setItem('token', response.token); // Guarda el token
            Swal.fire('Login Exitoso', 'Redirigiendo al CRUD de tareas...', 'success').then(() => {
                window.location.pathname = '/home'; // Redirige a la página de tareas
            });
        } else {
            Swal.fire('Error', response.message || 'Ocurrió un error', 'error');
        }
    });
}
