// Número de WhatsApp único del taller.
// Cambialo acá y se actualiza en todo el sitio (Header, Hero, botón
// flotante, Contacto y Repuestos), en vez de tener que buscarlo componente
// por componente.
const WHATSAPP_NUMBER_DISPLAY = '011 3684-3215';

const WHATSAPP_NUMBER =
  '54' + WHATSAPP_NUMBER_DISPLAY.replace(/\D/g, '').replace(/^0/, '');

export function whatsappUrl(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export default WHATSAPP_NUMBER;
