import { getProfile } from "../api/user.js";

export async function renderProfilePage() {
  const token = localStorage.getItem("token");
  const profile = await getProfile(token);

  document.body.innerHTML = `
    <div class="p-4">
      <h1 class="text-2xl">Perfil de ${profile.name}</h1>
      <p>Email: ${profile.email}</p>
      <button id="logout" class="bg-red-500 text-white px-4 py-2 mt-4 rounded">Cerrar sesión</button>
    </div>
  `;

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.pathname = "/login";
  });
}
