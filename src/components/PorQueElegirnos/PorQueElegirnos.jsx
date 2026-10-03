import './PorQueElegirnos.css';

const ITEMS = [
  { title: 'Experiencia', text: 'Años de trabajo especializado en Volkswagen y Audi.' },
  { title: 'Diagnóstico preciso', text: 'Escaneo computarizado antes de cualquier intervención.' },
  { title: 'Transparencia', text: 'Presupuesto claro antes de empezar, sin sorpresas.' },
  { title: 'Calidad', text: 'Repuestos y procesos pensados para durar.' },
  { title: 'Atención personalizada', text: 'Seguimiento directo del estado de tu vehículo.' },
];

function PorQueElegirnos() {
  return (
    <section className="porque section">
      <div className="container">
        <div className="section-head">
          <h2>Por qué elegirnos</h2>
        </div>
        <div className="porque__grid">
          {ITEMS.map((item) => (
            <div className="porque__item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PorQueElegirnos;
