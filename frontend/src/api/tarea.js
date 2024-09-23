const API_URL = "http://localhost:4000";

// Obtener todas las tareas
export async function getTareas() {
  try {
    const response = await fetch(`${API_URL}/tarea`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al obtener las tareas");
    }

    return response.json();
  } catch (error) {
    console.error("Error en getTareas:", error);
    throw error;
  }
}

// Obtener tarea por ID
export async function getTareaById(id) {
  try {
    const response = await fetch(`${API_URL}/tarea/${id}`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al obtener la tarea");
    }

    return response.json();
  } catch (error) {
    console.error("Error en getTareaById:", error);
    throw error;
  }
}

// Crear una nueva tarea
export async function createTarea(tarea) {
  try {
    const response = await fetch(`${API_URL}/tarea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al crear la tarea");
    }

    return response.json();
  } catch (error) {
    console.error("Error en createTarea:", error);
    throw error;
  }
}

// Eliminar una tarea
export async function deleteTarea(id) {
<<<<<<< HEAD
    try {
        const response = await fetch(`${API_URL}/tarea/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        return response;
    } catch (error) {
        console.error('Error en deleteTarea:', error);
        throw error;
=======
  try {
    const response = await fetch(`${baseURL}/tarea/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
>>>>>>> 6b7e43a18298dc52ef5436235948d4ca7be1b7fa
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error al eliminar la tarea");
  }
}

// Actualizar una tarea
export async function updateTarea(id, tarea) {
  try {
    const response = await fetch(`${API_URL}/tarea/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(tarea),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Error al actualizar la tarea");
    }

    return response.json();
  } catch (error) {
    console.error("Error en updateTarea:", error);
    throw error;
  }
}
