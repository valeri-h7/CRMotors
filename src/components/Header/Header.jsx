import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo/cr-motors-logo-header.png';
import { whatsappUrl } from '../../utils/whatsapp.js';
import './Header.css';

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Trabajos', to: '/trabajos' },
  { label: 'Repuestos', to: '/repuestos' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
];

const WHATSAPP_HREF = whatsappUrl('Hola, quiero consultar por un turno en CR Motors');

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();

  // El header es transparente solamente en el Home
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Al cambiar de página se cierra el menú del celular
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape cierra el menú
  useEffect(() => {
    if (!open) return undefined;

    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const classes = [
    'header',
    isHome ? 'header--home' : 'header--inner-page',
    scrolled ? 'header--scrolled' : '',
    open ? 'header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="CR Motors - Inicio">
          <img src={Logo} alt="CR Motors" width="175" height="108" />
        </Link>

        <nav
          id="menu-principal"
          className={`header__nav ${open ? 'is-open' : ''}`}
          aria-label="Principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}

          {/* Solo se ve dentro del menú del celular */}
          <a
            className="btn btn--primary header__nav-cta"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-whatsapp" aria-hidden="true" />
            Escribinos por WhatsApp
          </a>
        </nav>

        <div className="header__actions">
          {/* Solo se ve en pantallas grandes */}
          <a
            className="btn btn--primary header__cta"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <button
            type="button"
            className={`header__toggle ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-principal"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
