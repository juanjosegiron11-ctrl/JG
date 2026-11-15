/* ===== CONEXIÓN A SUPABASE ===== */
const SUPABASE_URL = "https://hypxybgvxvpwfqflijty.supabase.co";
const SUPABASE_KEY = "sb_publishable_x6A2XiGzM9F2Qlk9xwBUvA_UK3HoJJz";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ===== VISTAS: LOGIN <-> MÚSICA ===== */
const vistaLogin  = document.getElementById('vista-login');
const vistaMusica = document.getElementById('vista-musica');
const saludo      = document.getElementById('saludo');

function mostrarVista() {
    const usuarioGuardado = sessionStorage.getItem('usuarioAunar');

    if (usuarioGuardado) {
        saludo.textContent = 'Hola, ' + usuarioGuardado;
        vistaLogin.hidden = true;
        vistaMusica.hidden = false;
        window.scrollTo(0, 0);
    } else {
        vistaMusica.hidden = true;
        vistaLogin.hidden = false;
    }
}

/* ===== LOGIN ===== */
const btnLogin      = document.getElementById('btn-login');
const inputUsuario  = document.getElementById('login-usuario');
const inputPassword = document.getElementById('login-password');
const mensaje       = document.getElementById('login-mensaje');

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = 'mensaje ' + (tipo || '');
}

async function iniciarSesion() {
    const usuario  = inputUsuario.value.trim();
    const password = inputPassword.value;

    if (!usuario || !password) {
        mostrarMensaje('Escribe tu usuario y tu contraseña.', 'error');
        return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = 'Entrando...';
    mostrarMensaje('');

    try {
        const { data, error } = await sb.functions.invoke(
            "login-aunar",
            {
                body: {
                    usuario: usuario,
                    password: password
                }
            }
        );

        if (error) {
            console.error('Error de la función:', error);
            let texto = 'No se pudo iniciar sesión. Inténtalo de nuevo.';
            try {
                const cuerpo = await error.context.json();
                if (cuerpo && cuerpo.error) texto = cuerpo.error;
            } catch (e) { /* se queda el mensaje genérico */ }

            mostrarMensaje(texto, 'error');
            return;
        }

        console.log('Respuesta de login-aunar:', data);

        if (data && data.success) {
            sessionStorage.setItem('usuarioAunar', data.usuario || usuario);
            inputPassword.value = '';
            mostrarMensaje('');
            mostrarVista();
        } else {
            mostrarMensaje((data && data.error) || 'Usuario o contraseña incorrectos.', 'error');
        }
    } catch (err) {
        console.error('Error de login:', err);
        mostrarMensaje('Error de conexión. Revisa tu internet.', 'error');
    } finally {
        btnLogin.disabled = false;
        btnLogin.textContent = 'Entrar';
    }
}

btnLogin.addEventListener('click', iniciarSesion);

[inputUsuario, inputPassword].forEach(function(campo) {
    campo.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') iniciarSesion();
    });
});

document.getElementById('btn-cerrar-sesion').addEventListener('click', function() {
    sessionStorage.removeItem('usuarioAunar');
    inputUsuario.value = '';
    mostrarVista();
});

/* ===== EFECTOS ORIGINALES ===== */
const titulo = document.querySelector('header h1');

titulo.addEventListener('mouseenter', function() {
    titulo.style.color = '#ffd700';
    titulo.style.transition = 'color 0.3s';
});

titulo.addEventListener('mouseleave', function() {
    titulo.style.color = '#ff4081';
});

const tarjetas = document.querySelectorAll('.tarjeta');

tarjetas.forEach(function(tarjeta) {
    tarjeta.addEventListener('mouseenter', function() {
        tarjeta.style.transform = 'scale(1.02)';
        tarjeta.style.transition = 'transform 0.3s';
        tarjeta.style.boxShadow = '0 5px 15px rgba(255,64,129,0.4)';
    });

    tarjeta.addEventListener('mouseleave', function() {
        tarjeta.style.transform = 'scale(1)';
        tarjeta.style.boxShadow = 'none';
    });
});

const imagenes = document.querySelectorAll('.tarjeta img, .fotos img');

imagenes.forEach(function(img) {
    img.addEventListener('mouseenter', function() {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.3s';
        img.style.cursor = 'pointer';
    });

    img.addEventListener('mouseleave', function() {
        img.style.transform = 'scale(1)';
    });
});

/* ===== INICIO ===== */
mostrarVista();
