import './UbicacionYPagos.css';

const DIRECCION =
  'Terrero 3147, C1417 Cdad. Autónoma de Buenos Aires';

function UbicacionYPagos() {
  return (
    <section className="ubicacion section--dark">

      <div className="container">

        <div className="ubicacion__grid">

          <div className="ubicacion__item">
            <h3>Dirección</h3>
            <p>{DIRECCION}</p>
          </div>

          <div className="ubicacion__item">
            <h3>Horarios de atención</h3>
            <p>De lunes a viernes de 9:00 a 18:00</p>
          </div>

          <div className="ubicacion__item">
            <h3>Medios de pago</h3>
            <p>Aceptamos todos los medios de pago.</p>
          </div>

        </div>

      </div>

      <div className="ubicacion__mapa">

        <iframe
          title="Ubicación de CR Motors"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            DIRECCION
          )}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>

    </section>
  );
}

export default UbicacionYPagos;
