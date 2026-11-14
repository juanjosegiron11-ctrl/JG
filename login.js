
const formulario = document.getElementById("login-form");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("login-button");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    mensaje.textContent = "";
    boton.disabled = true;
    boton.textContent = "Verificando...";

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    try {
        const respuesta = await fetch(
            `${window.SUPABASE_URL}/functions/v1/validar-login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": window.SUPABASE_PUBLISHABLE_KEY
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contrasena: contrasena
                })
            }
        );

        const resultado = await respuesta.json();

        if (!respuesta.ok || !resultado.autenticado) {
            mensaje.textContent = resultado.error || "Usuario o contraseña incorrectos.";
            return;
        }

        sessionStorage.setItem("melodias_acceso", "autorizado");
        window.location.replace("melodias.html");

    } catch (error) {
        mensaje.textContent = "No se pudo conectar con el servidor.";
        console.error(error);

    } finally {
        boton.disabled = false;
        boton.textContent = "Iniciar sesión";
    }
});
