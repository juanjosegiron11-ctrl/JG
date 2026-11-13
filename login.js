const formulario = document.getElementById("formulario-login");
const mensaje = document.getElementById("mensaje-login");
const boton = document.getElementById("boton-login");

if (!window.supabaseClient) {
  mensaje.textContent = "No se pudo conectar con el servicio de autenticación.";
  boton.disabled = true;
} else {
  // Si ya existe una sesión activa, pasa directamente a Melodías.
  window.supabaseClient.auth.getSession().then(({ data, error }) => {
    if (!error && data.session) {
      window.location.replace("melodias.html");
    }
  });

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensaje.textContent = "";

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    boton.disabled = true;
    boton.textContent = "Verificando...";

    const { error } = await window.supabaseClient.auth.signInWithPassword({
      email: correo,
      password: contrasena
    });

    if (error) {
      mensaje.textContent = "Correo electrónico o contraseña incorrectos.";
      boton.disabled = false;
      boton.textContent = "Iniciar sesión";
      return;
    }

    window.location.replace("melodias.html");
  });
}
