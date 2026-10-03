import { createClient } from '@supabase/supabase-js';

// Las claves salen del archivo .env (en tu compu) o de las Environment
// Variables de Vercel (en la web publicada). Los nombres TIENEN que empezar
// con VITE_ para que Vite las deje usar acá.
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Si faltan las claves, el sitio sigue funcionando: simplemente no ofrece
// subir fotos en el formulario (en vez de romperse).
export const supabaseConfigurado = Boolean(url && key);

export const supabase = supabaseConfigurado ? createClient(url, key) : null;
