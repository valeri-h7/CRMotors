import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Reveal from '../Reveal/Reveal.jsx';
import todasLasResenas from '../../data/resenas.js';
import './Resenas.css';

const AUTOPLAY_MS = 8000;

// En compu se muestran TODAS las reseñas de data/resenas.js (de a 3 por
// página). En celular se muestran solo las primeras, para que el carrusel
// no se haga larguísimo. Para cambiar esa cantidad, se edita este número.
const MAX_RESENAS_CELULAR = 5;

const POR_PAGINA_CELULAR = 1;
const POR_PAGINA_COMPU = 3;

const QUERY_CELULAR = '(max-width: 768px)';
const QUERY_SIN_MOVIMIENTO = '(prefers-reduced-motion: reduce)';

// Cantidad de caracteres que se ven antes de "Ver más"
const PREVIEW_CHARS = 150;

function inicial(nombre) {
  return nombre.trim().charAt(0).toUpperCase();
}

// Corta el texto sin partir una palabra por la mitad
function recortar(texto, max) {
  if (texto.length <= max) return texto;

  const corte = texto.slice(0, max);
  const ultimoEspacio = corte.lastIndexOf(' ');

  return ultimoEspacio > 0 ? corte.slice(0, ultimoEspacio) : corte;
}

// Agrupa las reseñas según la cantidad que se muestra por página
function agruparEnPaginas(lista, porPagina) {
  const paginas = [];

  for (let i = 0; i < lista.length; i += porPagina) {
    paginas.push(lista.slice(i, i + porPagina));
  }

  return paginas;
}

function ResenaCard({ resena, globalIndex, expandido, onToggle }) {
  const esLarga = resena.texto.length > PREVIEW_CHARS;

  return (
    <article className="resena-card">
      <span className="card-quote" aria-hidden="true">
        &rdquo;
      </span>

      <div className="card-stars" role="img" aria-label="5 de 5 estrellas">
        {'★★★★★'}
      </div>

      <div className="card-text">
        {resena.titulo && (
          <strong className="card-text__titulo">{resena.titulo}</strong>
        )}

        <p className="review-content">
          “{expandido || !esLarga ? resena.texto : `${recortar(resena.texto, PREVIEW_CHARS)}...`}”

          {esLarga && (
            <button
              type="button"
              className="view-more"
              onClick={() => onToggle(globalIndex)}
              aria-expanded={expandido}
            >
              {expandido ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </p>
      </div>

      <div className="card-footer">
        <div className="card-author">
          <span className="card-avatar-text" aria-hidden="true">
            {inicial(resena.nombre)}
          </span>

          <div className="card-meta">
            <span className="card-name">{resena.nombre}</span>
            <span className="card-date">Cliente de Google</span>
          </div>
        </div>

        <span className="google-icon-link" aria-hidden="true">
          <i className="bi bi-google" />
        </span>
      </div>
    </article>
  );
}

function Resenas() {
  const [pagina, setPagina] = useState(0);
  const [expandidas, setExpandidas] = useState(() => new Set());
  const [esCelular, setEsCelular] = useState(() => window.matchMedia(QUERY_CELULAR).matches);

  const timerRef = useRef(null);

  /* ========================================
     CAMBIO DE CANTIDAD SEGÚN PANTALLA
     (matchMedia avisa solo cuando se cruza el
     límite; es mejor que escuchar cada "resize")
  ======================================== */

  useEffect(() => {
    const mq = window.matchMedia(QUERY_CELULAR);

    const handleChange = (e) => {
      setEsCelular(e.matches);
      setPagina(0);
    };

    mq.addEventListener('change', handleChange);

    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const porPagina = esCelular ? POR_PAGINA_CELULAR : POR_PAGINA_COMPU;

  const paginas = useMemo(() => {
    const lista = esCelular
      ? todasLasResenas.slice(0, MAX_RESENAS_CELULAR)
      : todasLasResenas;

    return agruparEnPaginas(lista, porPagina);
  }, [esCelular, porPagina]);

  const totalPaginas = paginas.length;

  const goTo = useCallback(
    (i) => {
      if (totalPaginas === 0) return;

      setPagina(((i % totalPaginas) + totalPaginas) % totalPaginas);
    },
    [totalPaginas]
  );

  const next = useCallback(() => goTo(pagina + 1), [goTo, pagina]);
  const prev = useCallback(() => goTo(pagina - 1), [goTo, pagina]);

  /* ========================================
     AUTOPLAY
     No arranca si la persona pidió reducir movimiento.
  ======================================== */

  const restartTimer = useCallback(
    (paused) => {
      clearInterval(timerRef.current);

      if (window.matchMedia(QUERY_SIN_MOVIMIENTO).matches) return;

      if (!paused && totalPaginas > 1) {
        timerRef.current = setInterval(() => {
          setPagina((p) => (p + 1) % totalPaginas);
        }, AUTOPLAY_MS);
      }
    },
    [totalPaginas]
  );

  useEffect(() => {
    restartTimer(false);

    return () => clearInterval(timerRef.current);
  }, [restartTimer]);

  /* ========================================
     VER MÁS / VER MENOS
  ======================================== */

  const toggleExpandida = useCallback((globalIndex) => {
    setExpandidas((prev) => {
      const nuevoSet = new Set(prev);

      if (nuevoSet.has(globalIndex)) {
        nuevoSet.delete(globalIndex);
      } else {
        nuevoSet.add(globalIndex);
      }

      return nuevoSet;
    });
  }, []);

  const itemsPagina = paginas[pagina] || [];

  return (
    <section className="resenas-section" id="testimonios">
      <div className="container">
        {/* ENCABEZADO */}
        <div className="resenas-header">
          <Reveal as="span" className="resenas-subtitle">
            Testimonios
          </Reveal>

          <Reveal as="h2">
            Lo que dicen nuestros{' '}
            <span className="resenas-heading-accent">clientes</span>
          </Reveal>

          <div className="resenas-google-stars" aria-hidden="true">
            <span className="stars">★★★★★</span>
          </div>
        </div>

        {/* CARRUSEL: se pausa con mouse, dedo o teclado */}
        <div
          className="resenas-carousel-wrapper"
          onMouseEnter={() => restartTimer(true)}
          onMouseLeave={() => restartTimer(false)}
          onTouchStart={() => restartTimer(true)}
          onTouchEnd={() => restartTimer(false)}
          onFocus={() => restartTimer(true)}
          onBlur={() => restartTimer(false)}
        >
          <button
            type="button"
            className="carousel-arrow arrow-left"
            onClick={prev}
            aria-label="Reseñas anteriores"
          >
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </button>

          <div className="resenas-grid" key={`${pagina}-${porPagina}`}>
            {itemsPagina.map((resena, i) => {
              const globalIndex = pagina * porPagina + i;

              return (
                <ResenaCard
                  key={globalIndex}
                  resena={resena}
                  globalIndex={globalIndex}
                  expandido={expandidas.has(globalIndex)}
                  onToggle={toggleExpandida}
                />
              );
            })}
          </div>

          <button
            type="button"
            className="carousel-arrow arrow-right"
            onClick={next}
            aria-label="Siguientes reseñas"
          >
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </button>
        </div>

        {/* PUNTOS */}
        <div className="resenas__dots">
          {paginas.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`resenas__dot ${i === pagina ? 'resenas__dot--activo' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ir a la página ${i + 1} de reseñas`}
              aria-current={i === pagina ? 'true' : undefined}
            />
          ))}
        </div>

        {/* BOTÓN GOOGLE */}
        <div className="resenas-footer-action">
          <a
            href="https://share.google/RsRt4V57juG4KMaWs"
            target="_blank"
            rel="noreferrer"
            className="btn-google-reviews"
          >
            Dejar opiniones en Google
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resenas;
