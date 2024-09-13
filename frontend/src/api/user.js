const baseURL = "http://localhost:4000";

// Registro de usuario
export async function register(userData) {
  // Cambié 'data' a 'userData' para coincidir con el cuerpo del request
  try {
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Asegúrate de que 'userData' esté correctamente definido
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        success: false,
        message: errorResponse.message || "Error en el registro",
      };
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    return { success: false, message: error.message || "Error en el registro" };
  }
}

// Iniciar sesión
export async function login(data) {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        success: false,
        message: errorResponse.message || "Error en el inicio de sesión",
      };
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error en el inicio de sesión",
    };
  }
}

// Obtener perfil de usuario
export async function getProfile(token) {
  try {
    const response = await fetch(`${baseURL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        success: false,
        message: errorResponse.message || "Error al obtener el perfil",
      };
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error al obtener el perfil",
    };
  }
}

// Cerrar sesión
export async function logout(token) {
  try {
    const response = await fetch(`${baseURL}/logout`, {
      // Cambié '/cierre' a '/logout' para coincidir con tu ruta de backend
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        success: false,
        message: errorResponse.message || "Error al cerrar sesión",
      };
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error al cerrar sesión",
    };
  }
}
