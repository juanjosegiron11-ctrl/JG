// Comprobación de sesión para la página Melodías.
(async function protegerPagina() {
  const cliente = window.supabaseClient;
  if (!cliente) {
    window.location.replace("index.html");
    return;
  }

  const { data, error } = await cliente.auth.getSession();
  if (error || !data.session) {
    window.location.replace("index.html");
    return;
  }

  const botonSalir = document.getElementById("cerrar-sesion");
  if (botonSalir) {
    botonSalir.addEventListener("click", async () => {
      botonSalir.disabled = true;
      const { error: errorSalida } = await cliente.auth.signOut();
      if (errorSalida) {
        alert("No se pudo cerrar la sesión. Intenta de nuevo.");
        botonSalir.disabled = false;
        return;
      }
      window.location.replace("index.html");
    });
  }
})();
