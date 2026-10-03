import trabajos from '../../data/trabajos.js';
import './TrabajosCarousel.css';

// Carrusel infinito de "nuestros clientes / trabajos reales", con el
// mismo truco CSS que BrandCarousel. Duplicamos la lista una vez para
// que el loop sea continuo.
function TrabajosCarousel() {
  const loopTrabajos = [...trabajos, ...trabajos];

  return (
    <section className="trabajos-carousel section" id="trabajos">
      <div className="container">
        <div className="section-head">
          <h2>Nuestros clientes</h2>
          <p>
            Ellos ya confiaron en nosotros. Motos, autos negros, grises,
            blancos, amarillos... todos salen como nuevos.
          </p>
        </div>
      </div>

      <div className="trabajos-carousel__viewport">
        <div className="trabajos-carousel__track">
          {loopTrabajos.map((trabajo, index) => (
            <div className="trabajos-carousel__item" key={`${trabajo.id}-${index}`}>
              {trabajo.foto ? (
                <img src={trabajo.foto} alt={trabajo.alt} />
              ) : (
                // Placeholder: reemplazar por la foto real apenas la tengas.
                <span className="trabajos-carousel__placeholder">Foto pendiente</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrabajosCarousel;
