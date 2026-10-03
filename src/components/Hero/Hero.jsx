import Reveal from '../Reveal/Reveal.jsx';
import PaymentMethods from '../PaymentMethods/PaymentMethods.jsx';
import { useTurno } from '../../context/TurnoContext.jsx';
import { whatsappUrl } from '../../utils/whatsapp.js';
import videoFondo from '../../assets/Img-vd/video.hero1.mp4';
import './Hero.css';

const WHATSAPP_HREF = whatsappUrl('Hola, quiero pedir un turno en CR Motors');

function Hero() {
  const { openTurno } = useTurno();

  return (
    <section className="hero" aria-label="Presentación">
      {/* Video de fondo */}
      <video
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={videoFondo} type="video/mp4" />
      </video>

      {/* Capa oscura para asegurar la lectura del texto */}
      <div className="hero__overlay" />

      <div className="container hero__content">
        <Reveal as="span" className="hero__eyebrow">
          CR Motors
        </Reveal>

        <Reveal as="h1" delay={80}>
          Mecánica Integral en Argentina
        </Reveal>

        <Reveal as="p" className="hero__lead" delay={160}>
          Más de 10 años dejando tu auto como nuevo. Especialistas en Audi y Volkswagen.
        </Reveal>

        {/* Dos caminos para pedir turno: formulario o WhatsApp directo */}
        <Reveal className="hero__actions" delay={240}>
          <button type="button" className="btn btn--primary" onClick={openTurno}>
            Pedir turno
          </button>

          <a
            className="btn btn--outline"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-whatsapp" aria-hidden="true" />
            WhatsApp
          </a>
        </Reveal>

        <Reveal as="ul" className="hero__badges" delay={300}>
          <li className="hero__badge">+10 años de experiencia</li>
          <li className="hero__badge">Calidad y garantía</li>
          <li className="hero__badge">Atención personalizada</li>
        </Reveal>

        <Reveal className="hero__payment" delay={360}>
          <PaymentMethods />
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
