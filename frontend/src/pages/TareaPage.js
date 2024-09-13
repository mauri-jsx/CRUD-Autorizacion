import { getTareas, createTarea, deleteTarea } from "../api/tarea.js";

export async function renderTareasPage() {
  const token = localStorage.getItem("token");
  const tareas = await getTareas(token);

  document.body.innerHTML = `
    <div class="p-4">
      <h1 class="text-2xl">Tus Tareas</h1>
      <ul id="tareasList">
        ${tareas
          .map(
            (t) =>
              `<li>${t.name} <button data-id="${t._id}" class="deleteTask">Eliminar</button></li>`
          )
          .join("")}
      </ul>
      <form id="createTaskForm" class="mt-4">
        <input id="taskName" type="text" placeholder="Nueva tarea" class="border p-2 mb-4" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
      </form>
    </div>
  `;

  // Crear nueva tarea
  document
    .getElementById("createTaskForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const taskName = document.getElementById("taskName").value;
      await createTarea({ name: taskName }, token);
      renderTareasPage(); // Recargar la lista de tareas
    });

  // Eliminar tarea
  document.querySelectorAll(".deleteTask").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const taskId = e.target.dataset.id;
      await deleteTarea(taskId, token);
      renderTareasPage(); // Recargar la lista de tareas
    });
  });
}
