import { Link } from 'react-router-dom';

import Logo from '../../assets/logo/cr-motors-logo-inclinado.png';

import './Footer.css';

const NAV_LINKS = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Trabajos', to: '/trabajos' },
  { label: 'Repuestos', to: '/repuestos' },
];

// "handle" es el @usuario: en compu se muestra completo; en celular se
// oculta (ver Footer.css) para que el nombre de la red entre en su columna.

const REDES = [
  {
    nombre: 'Instagram',
    icono: 'bi-instagram',
    handle: '@tallermecanico.cr',
    href: 'https://www.instagram.com/tallermecanico.cr/',
  },
  {
    nombre: 'Facebook',
    icono: 'bi-facebook',
    handle: '@crtaller.mecanico',
    href: 'https://www.facebook.com/Tallercrmotors/?rdid=oXk5GWxNu88C4DwX',
  },
  {
    nombre: 'TikTok',
    icono: 'bi-tiktok',
    handle: '@tallermecanico.cr',
    href: 'https://www.tiktok.com/@tallermecanico.cr',
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <Link to="/" aria-label="CR Motors - Inicio">
            <img src={Logo} alt="CR Motors" width="240" height="168" />
          </Link>
        </div>

        <nav className="footer__col footer__nav" aria-label="Navegación del pie de página">
          <h4>Navegación</h4>

          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer__col footer__contact">
          <h4>Contacto</h4>

          <p>Terrero 3147, C1417 Villa del Parque</p>

          <p>
            Lunes a viernes de 9:00 a 18:00 hs.
          </p>

          <p>
            <a href="tel:+541136843215">11 3684-3215</a>
          </p>
        </div>

        <div className="footer__col footer__social">
          <h4>Redes</h4>

          {REDES.map((red) => (
            <a key={red.nombre} href={red.href} target="_blank" rel="noreferrer">
              <i className={`bi ${red.icono}`} aria-hidden="true" />
              {red.nombre}
              <span className="footer__handle">: {red.handle}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} CR Motors. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
