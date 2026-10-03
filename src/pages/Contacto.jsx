import UbicacionYPagos from '../components/UbicacionYPagos/UbicacionYPagos.jsx';
import TurnoForm from '../components/TurnoForm/TurnoForm.jsx';

function Contacto() {
  return (
    <>
      {/* El título del formulario es blanco: necesita fondo oscuro.
          Antes quedaba blanco sobre blanco y no se veía. */}
      <section className="section section--dark">
        <TurnoForm />
      </section>

      <UbicacionYPagos />
    </>
  );
}

export default Contacto;
