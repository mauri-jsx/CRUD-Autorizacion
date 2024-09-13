const baseURL = "http://localhost:4000";

// Obtener todas las tareas
export async function getTareas(token) {
  const response = await fetch(`${baseURL}/tarea`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

// Obtener una tarea por ID
export async function getTareaById(id, token) {
  const response = await fetch(`${baseURL}/tarea/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

// Crear una nueva tarea
export async function createTarea(data, token) {
  const response = await fetch(`${baseURL}/tarea`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Editar una tarea
export async function updateTarea(id, data, token) {
  const response = await fetch(`${baseURL}/tarea/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Eliminar una tarea
export async function deleteTarea(id, token) {
  const response = await fetch(`${baseURL}/tarea/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
