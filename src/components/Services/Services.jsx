import './Services.css';
import services from '../../data/services';
import Reveal from '../Reveal/Reveal.jsx';

// Dibujo de cada ícono, por "tipo" (el campo `tipo` de data/services.js).
// El <svg> exterior es el mismo para todos; acá solo está lo que cambia.
const ICONS = {
  mecanica: (
    <>
      <path d="M42.5 12.5a13 13 0 0 0-15.8 16.8L12.4 43.6a5.7 5.7 0 0 0 8 8l14.3-14.3A13 13 0 0 0 51.5 21l-8.2 8.2-7-2-2-7 8.2-7.7Z" />
      <path d="m14.5 49.5 5-5" />
    </>
  ),
  electromecanica: (
    <>
      <path d="M37 7 18 35h12l-3 22 19-29H34l3-21Z" />
      <path d="M8 20h8M48 20h8M10 44h8M46 44h8" />
    </>
  ),
  chapa: (
    <>
      <path d="M9 48h46" />
      <path d="M16 43V27l18-9 14 7v18" />
      <path d="M24 25v18M32 22v21M40 25v18" strokeWidth="3" />
      <path d="M21 13c0-3 2-5 5-5s5 2 5 5" />
      <path d="M39 13c0-3 2-5 5-5s5 2 5 5" />
    </>
  ),
  diagnostico: (
    <>
      <rect x="10" y="8" width="44" height="34" rx="4" />
      <path d="M18 30h7l4-12 6 18 4-10h7" />
      <path d="M24 54h16M32 42v12" />
    </>
  ),
  revision: (
    <>
      <rect x="10" y="8" width="44" height="48" rx="5" />
      <path d="M23 18h18" />
      <path d="m19 29 3 3 6-7" />
      <path d="M32 30h12" />
      <path d="m19 42 3 3 6-7" />
      <path d="M32 43h12" />
    </>
  ),
  repuestos: (
    <>
      <path d="M35 9a15 15 0 0 0-16.8 19L9 37.2a6 6 0 0 0 8.5 8.5l9.2-9.2A15 15 0 0 0 45 20l-8.8 8.8-7-2-2-7L35 9Z" />
      <circle cx="45" cy="45" r="10" />
      <path d="M45 39v12M39 45h12" />
    </>
  ),
};

// Ícono de respaldo por si un servicio tiene un `tipo` que no existe
const ICONO_DEFAULT = <circle cx="32" cy="32" r="20" />;

function ServiceIcon({ type }) {
  return (
    <svg
      className="service-icon"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[type] ?? ICONO_DEFAULT}
    </svg>
  );
}

function Services() {
  return (
    <section className="services-section" id="servicios">
      <Reveal className="services-header" as="div">
        <h2>Nuestros Servicios</h2>

        <p>Hacemos todo integral para que no te muevas de acá.</p>
      </Reveal>

      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal
            as="article"
            className="service-card"
            delay={(index % 2) * 60}
            key={service.titulo}
          >
            <div className="service-icon-container">
              <ServiceIcon type={service.tipo} />
            </div>

            <h3>{service.titulo}</h3>

            <p>{service.descripcion}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Services;
