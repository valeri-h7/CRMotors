import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router cambia de página pero NO mueve el scroll: si estabas
// abajo de una página, llegabas abajo de la siguiente. Este componente
// (sin diseño, solo lógica) sube al principio en cada cambio de ruta.
// Si el link trae un #ancla, baja a esa sección en vez de subir.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const destino = document.getElementById(hash.slice(1));
      if (destino) {
        destino.scrollIntoView();
        return;
      }
    }

    // "instant" evita que el scroll-behavior: smooth del CSS haga
    // que se vea un viaje larguísimo hacia arriba.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
