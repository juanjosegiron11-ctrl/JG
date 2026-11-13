// Configuración pública de Supabase.
// La clave publishable puede estar en el frontend; nunca uses aquí una service_role/secret key.
const SUPABASE_URL = "https://hypxybgvxvpwfqflijty.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_x6A2XiGzM9F2Qlk9xwBUvA_UK3HoJJz";

if (!window.supabase) {
  console.error("No se pudo cargar la librería de Supabase.");
} else {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
}
