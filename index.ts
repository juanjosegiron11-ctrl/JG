import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return Response.json({ error: "Método no permitido" }, { status: 405, headers: corsHeaders });
  }

  try {
    const { usuario, contrasena } = await req.json();
    if (typeof usuario !== "string" || typeof contrasena !== "string" || !usuario.trim() || !contrasena) {
      return Response.json({ error: "Completa el usuario y la contraseña." }, { status: 400, headers: corsHeaders });
    }

    // La clave service_role solo existe como secreto del servidor; nunca se publica.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("usuariosAunar")
      .select("usuario")
      .eq("usuario", usuario.trim())
      .eq("contrasena", contrasena)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return Response.json({ autenticado: false, error: "Usuario o contraseña incorrectos." }, { status: 401, headers: corsHeaders });
    }
    return Response.json({ autenticado: true }, { status: 200, headers: corsHeaders });
  } catch (_error) {
    return Response.json({ error: "No fue posible validar el acceso. Revisa la configuración del proyecto." }, { status: 500, headers: corsHeaders });
  }
});
