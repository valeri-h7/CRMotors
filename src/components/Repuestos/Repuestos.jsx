import { Link } from 'react-router-dom';
import Reveal from '../Reveal/Reveal.jsx';
import { whatsappUrl } from '../../utils/whatsapp.js';
import './Repuestos.css';

// TODO: reemplazar por las categorías/repuestos reales que tienen en stock.
const CATEGORIAS = [
  'Frenos',
  'Filtros',
  'Correas y distribución',
  'Amortiguadores',
  'Baterías',
  'Repuestos de motor',
];


function Repuestos() {
  return (
    <section className="repuestos section">
      <div className="container repuestos__inner">
        <div className="section-head">
          <Reveal as="h2">Repuestos con stock propio</Reveal>
          <Reveal as="p" delay={90}>
            {/* TODO: reemplazar por el detalle real del catálogo/stock que venden */}
            Además del servicio de taller, vendemos repuestos con stock
            disponible en el local, para que tu reparación no dependa de
            tiempos de terceros.
          </Reveal>
        </div>

        <Reveal className="repuestos__categorias" as="div" delay={120}>
          {CATEGORIAS.map((cat) => (
            <span className="repuestos__chip" key={cat}>{cat}</span>
          ))}
        </Reveal>

        <Reveal className="repuestos__cta" as="div" delay={200}>
          <p>¿Buscás un repuesto puntual? Consultanos disponibilidad y precio.</p>
          <div className="repuestos__cta-botones">
            <Link to="/repuestos" className="btn btn--outline">Ver repuestos</Link>
            <a
              href={whatsappUrl('Hola, quiero consultar el stock de un repuesto')}
              className="btn btn--primary"
              target="_blank"
              rel="noreferrer"
            >
              Consultar stock
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Repuestos;
