import { useEffect, useRef } from 'react';
import TurnoForm from '../TurnoForm/TurnoForm.jsx';
import './TurnoModal.css';

function TurnoModal({ onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const focoPrevio = document.activeElement;
    const overflowPrevio = document.body.style.overflow;

    // Mientras el formulario está abierto, la página de atrás no scrollea
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener('keydown', handleKey);
      // Devuelve el foco al botón que abrió el formulario
      focoPrevio?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="turno-modal">
      <div className="turno-modal__overlay" onClick={onClose} />

      <div
        className="turno-modal__content"
        role="dialog"
        aria-modal="true"
        aria-label="Formulario de turnos"
      >
        <button
          ref={closeRef}
          type="button"
          className="turno-modal__close"
          onClick={onClose}
          aria-label="Cerrar formulario"
        >
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>

        <TurnoForm onSent={onClose} />
      </div>
    </div>
  );
}

export default TurnoModal;
