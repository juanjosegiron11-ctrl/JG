// Si ya hay una sesión activa, redirige directo a melodias.html
if (localStorage.getItem("melodias_usuario")) {
  window.location.href = "melodias.html";
}

// Inicializar cliente de Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("login-form");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("btn-login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuarioInput = document.getElementById("usuario").value.trim();
  const contrasenaInput = document.getElementById("contrasena").value.trim();

  if (!usuarioInput || !contrasenaInput) {
    mensaje.textContent = "Por favor, completa todos los campos.";
    return;
  }

  boton.disabled = true;
  mensaje.textContent = "Verificando credenciales...";

  try {
    const { data, error } = await supabaseClient
      .from("usuariosAunar")
      .select("usuario")
      .eq("usuario", usuarioInput)
      .eq("contrasena", contrasenaInput)
      .maybeSingle();

    if (error) {
      console.error("Error de Supabase:", error);
      mensaje.textContent = "Error al conectar con la base de datos.";
      boton.disabled = false;
      return;
    }

    if (data) {
      localStorage.setItem("melodias_usuario", data.usuario);
      mensaje.textContent = "¡Bienvenido! Redirigiendo...";
      window.location.href = "melodias.html";
    } else {
      mensaje.textContent = "Usuario o contraseña incorrectos.";
      boton.disabled = false;
    }
  } catch (err) {
    console.error("Error inesperado:", err);
    mensaje.textContent = "Ocurrió un error al intentar iniciar sesión.";
    boton.disabled = false;
  }
});
