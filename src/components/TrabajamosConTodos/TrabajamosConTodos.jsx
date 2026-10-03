import Reveal from '../Reveal/Reveal.jsx';
import BrandCarousel from '../BrandCarousel/BrandCarousel.jsx';
import './TrabajamosConTodos.css';

// Antes esta sección tenía su propio IntersectionObserver para animarse.
// Ahora reutiliza <Reveal>, igual que el resto del sitio.
function TrabajamosConTodos() {
  return (
    <section className="trabajamos-todos section section--dark">
      <div className="container">
        <Reveal className="trabajamos-todos__head">
          <h2>Marcas con las que trabajamos</h2>

          <p>Especialista en Volkswagen y Audi, con experiencia en todas las marcas.</p>
        </Reveal>
      </div>

      <BrandCarousel />

      <div className="container">
        <Reveal className="trabajamos-todos__grid" delay={120}>
          <div className="trabajamos-todos__item">
            <h3>Todas las marcas</h3>

            <p>Aunque nos destacamos en Audi y Volkswagen, atendemos todas.</p>
          </div>

          <div className="trabajamos-todos__item">
            <h3>Todos los seguros</h3>

            <p>Te asesoramos y te ayudamos con todos los trámites.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default TrabajamosConTodos;
