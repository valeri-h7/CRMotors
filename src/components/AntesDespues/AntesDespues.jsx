import './AntesDespues.css';

function AntesDespues() {
  return (
    <section className="antes-despues section section--dark">
      <div className="container">

        <div className="section-head">
          <h2>Antes y después</h2>
          <p>No te lo contamos, te lo mostramos: resultados reales.</p>
        </div>

        <div className="antes-despues__comparador">
          <div className="antes-despues__lado">
            <span>ANTES</span>
          </div>
          <div className="antes-despues__lado">
            <span>DESPUÉS</span>  
          </div>
        </div>

      </div>
    </section>
  );
}

export default AntesDespues;
