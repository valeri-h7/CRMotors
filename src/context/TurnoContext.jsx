import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import TurnoModal from '../components/TurnoModal/TurnoModal.jsx';

// El formulario de turnos se abre desde varios lugares (Hero, sección
// final de contacto...). En vez de repetir el modal en cada uno, vive
// una sola vez acá y cualquier componente lo abre con:
//
//   const { openTurno } = useTurno();
//   <button onClick={openTurno}>Pedir turno</button>

const TurnoContext = createContext(null);

export function TurnoProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openTurno = useCallback(() => setOpen(true), []);
  const closeTurno = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openTurno, closeTurno }),
    [openTurno, closeTurno]
  );

  return (
    <TurnoContext.Provider value={value}>
      {children}
      {open && <TurnoModal onClose={closeTurno} />}
    </TurnoContext.Provider>
  );
}

export function useTurno() {
  const ctx = useContext(TurnoContext);

  if (!ctx) {
    throw new Error('useTurno tiene que usarse dentro de <TurnoProvider>');
  }

  return ctx;
}
