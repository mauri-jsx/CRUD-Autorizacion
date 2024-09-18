import Swal from 'sweetalert2';
import { login } from '../api/user.js';
import { loginSchema } from '../api/schemas.js';

export function renderLoginPage() {
  document.body.innerHTML = `
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <form id="loginForm" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl mb-4">Login</h2>
        <input id="email" type="email" placeholder="Email" class="border p-2 mb-4 w-full" />
        <input id="password" type="password" placeholder="Contraseña" class="border p-2 mb-4 w-full" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Iniciar Sesión</button>
        <p class="mt-4">¿No tienes una cuenta? <a id="registerLink" class="text-blue-500 cursor-pointer">Regístrate aquí</a></p>
      </form>
    </div>
  `;

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación con Zod
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(err => err.message).join('\n');
      Swal.fire('Error', errorMessages, 'error');
      return;
    }

    try {
      const response = await login({ email, password });

      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('profileName', response.name);
        console.log('Redirigiendo a /tareas');
        Swal.fire('Login Exitoso', 'Redirigiendo al CRUD de tareas...', 'success').then(() => {
          window.location.pathname = '/tareas';
        });
      } else {
        Swal.fire('Error', response.message || 'Ocurrió un error', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'Ocurrió un error', 'error');
    }
  });

  document.getElementById('registerLink').addEventListener('click', () => {
    window.location.pathname = '/register';
  });
}
