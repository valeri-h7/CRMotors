import { useTurno } from '../../context/TurnoContext.jsx';
import { whatsappUrl } from '../../utils/whatsapp.js';
import './ContactoFinal.css';

const WHATSAPP_HREF = whatsappUrl('Hola, quiero consultar por un turno en CR Motors');

function ContactoFinal() {
  const { openTurno } = useTurno();

  return (
    <section className="contacto-final section">
      <div className="container contacto-final__inner">
        <h2>¿Listo para dejar tu auto en manos expertas?</h2>

        <div className="contacto-final__actions">
          <button
            type="button"
            className="btn btn--primary btn--grande"
            onClick={openTurno}
          >
            Formulario de turnos
          </button>

          <a
            className="btn btn--outline btn--grande"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactoFinal;
