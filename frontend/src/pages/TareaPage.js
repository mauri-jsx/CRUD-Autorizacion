import { logout } from '../api/user.js';
import { getTareas, createTarea, deleteTarea, updateTarea, getTareaById } from '../api/tarea.js';
import Swal from 'sweetalert2';

export function renderTareaPage() {
  const profileName = localStorage.getItem('profileName') || 'Usuario';

  document.body.innerHTML = `
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div class="w-full max-w-3xl p-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg rounded-lg">
        <div class="flex justify-between items-center">
          <div class="border border-gray-600 p-3 rounded-lg">
            <h1 class="text-xl font-medium tracking-wide">Bienvenido, ${profileName}</h1>
          </div>
          <button id="logoutButton" class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ml-6">Cerrar Sesión</button>
        </div>
      </div>
      <div class="w-full max-w-3xl p-8 bg-white shadow-md rounded-lg mt-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">CRUD de Tareas</h2>
        <form id="tareaForm" class="mb-6">
          <input type="text" id="titulo" placeholder="Título" class="border p-2 mb-4 w-full" required />
          <textarea id="descripcion" placeholder="Descripción" class="border p-2 mb-4 w-full"></textarea>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Crear Tarea</button>
        </form>
        <ul id="tareasList" class="space-y-4"></ul>
      </div>
    </div>
  `;

  const tareaForm = document.getElementById('tareaForm');
  const tareasList = document.getElementById('tareasList');

  // Función para renderizar la lista de tareas
  async function renderTareas() {
    try {
      const tareas = await getTareas();
      tareasList.innerHTML = '';
      tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = 'bg-gray-100 p-4 rounded-lg shadow-md';
        li.innerHTML = `
          <h3 class="text-lg font-semibold">${tarea.nombre}</h3>
          <p class="text-gray-700">${tarea.descripcion || 'Sin descripción'}</p>
          <button data-id="${tarea._id}" class="edit bg-yellow-500 text-white px-3 py-1 rounded mr-2">Editar</button>
          <button data-id="${tarea._id}" class="delete bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
        `;
        tareasList.appendChild(li);
      });

      // Añadir eventos a los botones de editar y eliminar
      document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', async (e) => {
          const id = e.target.dataset.id;
          try {
            const tarea = await getTareaById(id);
            const { value: formValues } = await Swal.fire({
              title: 'Editar Tarea',
              html:
                `<input id="swal-input1" class="swal2-input" placeholder="Título" value="${tarea.nombre}">` +
                `<textarea id="swal-input2" class="swal2-textarea" placeholder="Descripción">${tarea.descripcion || ''}</textarea>`,
              focusConfirm: false,
              showCancelButton: true,
              confirmButtonText: 'Actualizar',
              cancelButtonText: 'Cancelar',
              preConfirm: () => {
                return {
                  nombre: document.getElementById('swal-input1').value,
                  descripcion: document.getElementById('swal-input2').value
                };
              }
            });

            if (formValues) {
              await updateTarea(id, formValues);
              Swal.fire('Actualizado', 'La tarea ha sido actualizada', 'success');
              renderTareas();
            }
          } catch (error) {
            Swal.fire('Error', 'Error al obtener los detalles de la tarea', 'error');
          }
        });
      });

      document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async (e) => {
          const id = e.target.dataset.id;
          const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
          });

          if (result.isConfirmed) {
            const response = await deleteTarea(id);

            if (response.ok) {
              Swal.fire('Eliminado', 'La tarea ha sido eliminada', 'success');
              renderTareas();
            } else {
              Swal.fire('Error', 'Error al eliminar la tarea', 'error');
            }
          }

        });
      });
    } catch (error) {
      Swal.fire('Error', 'Error al obtener las tareas', 'error');
    }
  }

  // Evento para crear una nueva tarea
  tareaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;

    try {
      await createTarea({ nombre, descripcion });
      tareaForm.reset();
      Swal.fire('Creado', 'La tarea ha sido creada', 'success');
      renderTareas();
    } catch (error) {
      Swal.fire('Error', error.message || 'Error al crear la tarea', 'error');
    }
  });

  renderTareas();

  document.getElementById('logoutButton').addEventListener('click', () => {
    logout();
    Swal.fire('Sesión Cerrada', 'Has cerrado sesión exitosamente', 'success').then(() => {
      window.location.pathname = '/login';
    });
  });
}
