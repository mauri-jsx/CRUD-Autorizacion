const API_URL = 'http://localhost:4000';


export async function getTareas() {
    const response = await fetch(`${API_URL}/tarea`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}


export async function getTareaById(id) {
    const response = await fetch(`${API_URL}/tarea/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}


export async function createTarea(tarea) {
    const response = await fetch(`${API_URL}/tarea`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tarea)
    });
    return response.json();
}


export async function deleteTarea(id) {
    const response = await fetch(`${API_URL}/tarea/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}


export async function updateTarea(id, tarea) {
    const response = await fetch(`${API_URL}/tarea/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tarea)
    });
    return response.json();
}
