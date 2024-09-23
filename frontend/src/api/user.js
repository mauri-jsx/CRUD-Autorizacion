const baseURL = "http://localhost:4000";

export async function register(data) {
  try {
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        success: false,
        message: errorResponse.message || "Error en el registro",
      };
    }

    const result = await response.json();
    return { success: true, token: result.token };
  } catch (error) {
    return { success: false, message: error.message || "Error en el registro" };
  }
}

export async function login(data) {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
    return { success: true, token: result.token, name: result.name };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error en el inicio de sesión",
    };
  }
}

export async function getProfile() {
  try {
    const response = await fetch(`${baseURL}/profile`, {
      credentials: "include", // Incluir credenciales (cookies)
    });

    if (!response.ok) {
      throw new Error("Error al obtener perfil");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function logout() {
  try {
    const response = await fetch(`${baseURL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al cerrar sesión");
    }

    window.location.pathname = "/login";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}
