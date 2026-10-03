import Reveal from '../components/Reveal/Reveal.jsx';
import { whatsappUrl } from '../utils/whatsapp.js';
import './Repuestos.css';

// TODO: reemplazar por el catálogo real (categorías, marcas de repuestos,
// precios si aplica). Por ahora son categorías de ejemplo con stock genérico.
const CATEGORIAS = [
  { nombre: 'Frenos', detalle: 'Pastillas, discos y cintas para todas las marcas.' },
  { nombre: 'Filtros', detalle: 'Aceite, aire, combustible y habitáculo.' },
  { nombre: 'Correas y distribución', detalle: 'Kits completos con bomba de agua.' },
  { nombre: 'Amortiguadores', detalle: 'Delanteros y traseros, originales y alternativos.' },
  { nombre: 'Baterías', detalle: 'Distintas capacidades, con instalación incluida.' },
  { nombre: 'Repuestos de motor', detalle: 'Juntas, bombas, sensores y más.' },
];


function RepuestosPage() {
  return (
    <>
      <section className="repuestos-page section">
        <div className="container">
          <Reveal className="section-head" as="div">
            <h1>Repuestos</h1>
            <p>
              Vendemos repuestos con stock propio, disponibles para tu auto o
              para el trabajo que estemos haciendo en el taller. Estas son
              las categorías principales — si buscás algo puntual, consultanos.
            </p>
          </Reveal>

          <div className="repuestos-page__grid">
            {CATEGORIAS.map((cat, index) => (
              <Reveal as="article" className="repuestos-page__card" delay={index * 60} key={cat.nombre}>
                <h3>{cat.nombre}</h3>
                <p>{cat.detalle}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="repuestos-page__cta" as="div" delay={120}>
            <p>¿No encontrás lo que buscás en la lista? Preguntanos, seguro lo tenemos o te lo conseguimos.</p>
            <a
              className="btn btn--primary"
              href={whatsappUrl('Hola, quiero consultar por un repuesto')}
              target="_blank"
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default RepuestosPage;
