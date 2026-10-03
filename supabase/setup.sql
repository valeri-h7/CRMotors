-- ============================================================
-- CR Motors — configuración de Supabase para las fotos del
-- formulario de turnos.
--
-- Cómo usarlo: Supabase → SQL Editor → New query → pegar TODO
-- esto → Run. Se puede correr más de una vez sin romper nada.
-- ============================================================

-- 1) El "bucket" (carpeta) donde se guardan las fotos.
--    - public: cualquiera con el link puede VER una foto
--      (necesario para que el taller la abra desde WhatsApp).
--    - file_size_limit: máximo 5 MB por foto (5242880 bytes).
--    - allowed_mime_types: solo imágenes.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'turnos-fotos',
  'turnos-fotos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 2) Permiso: cualquier visitante de la web puede SUBIR fotos a este
--    bucket, y nada más. No puede listar, reemplazar ni borrar
--    (no existen políticas para eso, y Supabase las bloquea por defecto).
drop policy if exists "Visitantes pueden subir fotos de turnos" on storage.objects;

create policy "Visitantes pueden subir fotos de turnos"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'turnos-fotos');
