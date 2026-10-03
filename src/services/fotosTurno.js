import { supabase } from '../lib/supabase.js';

// Nombre del "bucket" (la carpeta de Supabase Storage) donde se guardan
// las fotos. Tiene que coincidir con el de supabase/setup.sql.
const BUCKET = 'turnos-fotos';

export const MAX_FOTOS = 5;
const MAX_MB_ORIGINAL = 15;     // lo que se acepta que elija la persona
const MAX_LADO_PX = 1600;       // se achican las fotos a este tamaño antes de subirlas
const CALIDAD_JPEG = 0.82;
const TIPOS_PARA_ACHICAR = ['image/jpeg', 'image/png', 'image/webp'];

// Devuelve un texto de error si el archivo no sirve, o null si está bien.
export function validarFoto(file) {
  if (!file.type.startsWith('image/')) {
    return `"${file.name}" no es una imagen.`;
  }

  if (file.size > MAX_MB_ORIGINAL * 1024 * 1024) {
    return `"${file.name}" pesa más de ${MAX_MB_ORIGINAL} MB.`;
  }

  return null;
}

// Las fotos de celular pesan 3-8 MB. Achicarlas antes de subirlas ahorra
// datos móviles, sube más rápido y cuida el espacio gratis de Supabase.
async function achicar(file) {
  if (!TIPOS_PARA_ACHICAR.includes(file.type)) return file;

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const escala = Math.min(1, MAX_LADO_PX / Math.max(bitmap.width, bitmap.height));
    const ancho = Math.round(bitmap.width * escala);
    const alto = Math.round(bitmap.height * escala);

    const canvas = document.createElement('canvas');
    canvas.width = ancho;
    canvas.height = alto;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';            // por si un PNG tiene fondo transparente
    ctx.fillRect(0, 0, ancho, alto);
    ctx.drawImage(bitmap, 0, 0, ancho, alto);
    bitmap.close?.();

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', CALIDAD_JPEG)
    );

    // Si por algún motivo quedó más pesada, se usa la original
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], 'foto.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

const EXTENSIONES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
  'image/heif': 'heif',
};

function extension(file) {
  return EXTENSIONES[file.type] ?? 'jpg';
}

// Sube las fotos y devuelve la lista de links públicos.
// Cada pedido va en su propia carpeta con un nombre al azar (UUID), así
// nadie puede adivinar el link de las fotos de otra persona.
export async function subirFotos(files) {
  const carpeta = crypto.randomUUID();

  const subidas = files.map(async (original, i) => {
    const archivo = await achicar(original);
    const ruta = `${carpeta}/foto-${i + 1}.${extension(archivo)}`;

    const { error } = await supabase.storage.from(BUCKET).upload(ruta, archivo, {
      contentType: archivo.type,
      cacheControl: '31536000',
      upsert: false,
    });

    if (error) throw error;

    return supabase.storage.from(BUCKET).getPublicUrl(ruta).data.publicUrl;
  });

  // Si una falla, falla todo el envío: así nunca se manda un pedido con
  // fotos "a medias" sin que la persona se entere.
  return Promise.all(subidas);
}
