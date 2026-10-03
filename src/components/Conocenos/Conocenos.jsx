import conoceme from '../../assets/Img-vd/conoceme.jpg';
import Reveal from '../Reveal/Reveal.jsx';
import './Conocenos.css';

function Conocenos() {
  return (
    <section className="conocenos section" id="conocenos">
      <div className="container conocenos__inner">

        <Reveal className="conocenos__heading">
          <div className="section-head">
            <h2>Conocenos</h2>

            <p>
              Hace casi 10 años decidimos convertir nuestra pasión por los
              autos en un proyecto propio. Así nació CR Motors, un taller
              donde el conocimiento, la atención y la confianza son parte
              de cada trabajo.
            </p>
          </div>
        </Reveal>

        <div className="conocenos__content">

          <Reveal className="conocenos__image-wrapper" delay={100}>
            <div className="conocenos__image">
              <img
                src={conoceme}
                alt="CR Motors - nuestro taller"
              />

              <div className="conocenos__image-label">
                <span>CR MOTORS</span>
                <small>Pasión por los autos</small>
              </div>
            </div>
          </Reveal>

          <Reveal className="conocenos__text" delay={200}>

            <span className="conocenos__small-title">
              UN TALLER HECHO CON PASIÓN
            </span>

            <h3>
              Más que reparar autos,
              <span> cuidamos cada detalle.</span>
            </h3>

            <p>
              Somos una pareja apasionada por el mundo automotor y desde hace
              casi 10 años trabajamos para brindar un servicio mecánico
              integral, profesional y de confianza.
            </p>

            <p>
              Nos gusta involucrarnos en cada trabajo, escuchar al cliente y
              explicar de forma clara qué necesita su vehículo. Para nosotros,
              hacer bien un trabajo no es solamente solucionar una falla, sino
              encontrar una solución que te deje tranquilo.
            </p>

            <p>
              Trabajamos con todas las marcas y contamos con experiencia
              especializada en Volkswagen y Audi. También trabajamos con todas
              las compañías de seguros.
            </p>

            <div className="conocenos__highlights">

              <Reveal className="conocenos__highlight" delay={300}>
                <strong>10+</strong>
                <span>Años de experiencia</span>
              </Reveal>

              <Reveal className="conocenos__highlight" delay={400}>
                <strong>Multimarca</strong>
                <span>Trabajamos con todas las marcas</span>
              </Reveal>

              <Reveal className="conocenos__highlight" delay={500}>
                <strong>Seguros</strong>
                <span>Todas las compañías</span>
              </Reveal>

            </div>

          </Reveal>

        </div>

      </div>
    </section>
  );
}

export default Conocenos;