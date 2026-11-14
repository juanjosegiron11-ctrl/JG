/// Verificar si existe la sesión guardada por login.js
const usuarioActivo = localStorage.getItem("melodias_usuario");

if (!usuarioActivo) {
  window.location.href = "index.html";
}

// Configurar el botón de cerrar sesión cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
  const btnLogout = document.querySelector(".logout-btn");
  
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("melodias_usuario");
      window.location.href = "index.html";
    });
  }
});
