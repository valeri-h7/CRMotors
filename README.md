# CR Motors — Plantilla React

Base de proyecto en React (Vite + React Router) para la web de CR Motors -
Mecánica Racing. 

## Cómo correrla

```bash
npm install
npm run dev
```

Abre en `http://localhost:5173`.

## Estructura

```
src/
  assets/
    logo/      -> (CR Motors)
    marcas/    -> marca del carrusel
  components/  -> un componente por carpeta, con su .jsx y su .css
  data/
    services.js  -> lista de servicios (usado por la sección "Nuestro servicio")
    brands.js    -> lista de marcas (usado por el carrusel)
  pages/       -> une los componentes en cada ruta
  router/      -> definición de rutas (React Router)
  styles/
    variables.css -> paleta de colores y tipografías del sitio
    global.css     -> estilos base compartidos
```

## Lo que ya está resuelto

- **Nuestro servicio**: grilla de tarjetas que lee de `src/data/services.js`.
  Para agregar o sacar un servicio, editá ese archivo — no hace falta tocar
  el componente.
- **Carrusel de marcas**: loop infinito hecho solo con CSS (sin librerías),
  lee de `src/data/brands.js`. 
  
  `src/assets/marcas/` y la referencies en `brands.js`, se usa sola.


## Paleta

| Uso | Color |
|---|---|
| Principal / acción | `#D71920` |
| Fondo oscuro | `#0B0B0B` |
| Superficie oscura | `#1C1C1C` |
| Texto secundario | `#8A8A8A` |
| Fondo claro | `#F5F5F5` |
| Acento puntual | `#F5C400` |


## Cómo está pensado el diseño (mobile-first)

- **Tamaños de letra y espacios** salen todos de `src/styles/variables.css`
  (`--fs-*`, `--space-section`, `--gutter`). Usan `clamp()`: se achican solos
  en el celular y crecen en la compu. Para hacer TODO el sitio más chico o más
  grande, se cambian ahí, sin tocar componente por componente.
- **Estilos compartidos** (`.container`, `.section`, `.section-head`, `.btn`)
  viven una sola vez en `src/styles/global.css`.
- Los CSS de cada componente se escriben primero para celular y usan
  `@media (min-width: ...)` para agrandar en pantallas más grandes.
- **Formulario de turnos**: se abre desde cualquier parte con
  `const { openTurno } = useTurno();` (ver `src/context/TurnoContext.jsx`).
- **Scroll al cambiar de página**: lo resuelve `components/ScrollToTop`.
- Para mostrar más o menos reseñas, cambiar `MAX_RESENAS` en
  `components/Resenas/Resenas.jsx`.

## Variables de entorno

Copiá `.env.example` como `.env` y completá los valores. El `.env` no se sube
al repositorio.


## Fotos del formulario de turnos (Supabase)

El formulario sube las fotos a Supabase Storage y manda los links por
WhatsApp. Configuración (una sola vez):

1. En Supabase: **SQL Editor → New query**, pegar todo el contenido de
   `supabase/setup.sql` y tocar **Run**. Crea el bucket `turnos-fotos`
   (público, máx. 5 MB por foto, solo imágenes) y deja que los visitantes
   SUBAN fotos, sin poder verlas en lista, reemplazarlas ni borrarlas.
2. En Supabase: **Project Settings → API Keys** (o *Data API*): copiar la
   *Project URL* y la *publishable key* (empieza con `sb_publishable_`).
   Van en `.env` (tu compu) con estos nombres exactos:
   `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`.
3. En Vercel: **Settings → Environment Variables**, cargar esas mismas dos
   variables y después **Redeploy** (el `.env` no viaja a la web publicada).

Si faltan las claves, el sitio sigue funcionando: solo se oculta el campo
de fotos. La publishable key está pensada para ser pública; lo que protege
los datos son las políticas de `setup.sql`. **Nunca** uses la `secret` /
`service_role` key en este proyecto.
