import { useRef, useState } from 'react';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { supabaseConfigurado } from '../../lib/supabase.js';
import { MAX_FOTOS, subirFotos, validarFoto } from '../../services/fotosTurno.js';
import './TurnoForm.css';

const initialState = {
  nombre: '',
  whatsapp: '',
  vehiculo: '',
  patente: '',
  servicio: '',
  problema: '',
};

// Arma el mensaje que le llega al taller por WhatsApp.
// Solo incluye los campos que la persona completó.
function armarMensaje(form, urlsFotos) {
  return [
    'Hola, quiero pedir un turno en CR Motors.',
    `Nombre: ${form.nombre}`,
    form.vehiculo && `Vehículo: ${form.vehiculo}`,
    form.patente && `Patente: ${form.patente}`,
    form.servicio && `Servicio: ${form.servicio}`,
    form.problema && `Problema: ${form.problema}`,
    `Mi WhatsApp: ${form.whatsapp}`,
    urlsFotos.length > 0 &&
      `Fotos:\n${urlsFotos.map((url, i) => `${i + 1}) ${url}`).join('\n')}`,
  ]
    .filter(Boolean)
    .join('\n');
}

function TurnoForm({ onSent }) {
  const [form, setForm] = useState(initialState);
  const [fotos, setFotos] = useState([]);
  const [errorFotos, setErrorFotos] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');
  // Cuando las fotos ya se subieron, guardamos el link de WhatsApp listo
  const [linkListo, setLinkListo] = useState(null);

  const inputFotosRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ========================================
     FOTOS: se van sumando hasta MAX_FOTOS
  ======================================== */

  const handleFotos = (e) => {
    const elegidas = Array.from(e.target.files);

    // Se limpia el input para poder volver a elegir la misma foto
    e.target.value = '';

    const errores = [];
    const validas = [];

    elegidas.forEach((file) => {
      const error = validarFoto(file);

      if (error) errores.push(error);
      else validas.push(file);
    });

    const disponibles = MAX_FOTOS - fotos.length;

    if (validas.length > disponibles) {
      errores.push(`Podés adjuntar hasta ${MAX_FOTOS} fotos.`);
    }

    setFotos((prev) => [...prev, ...validas.slice(0, disponibles)]);
    setErrorFotos(errores.join(' '));
  };

  const quitarFoto = (indice) => {
    setFotos((prev) => prev.filter((_, i) => i !== indice));
    setErrorFotos('');
  };

  /* ========================================
     ENVÍO
  ======================================== */

  const terminar = () => {
    setForm(initialState);
    setFotos([]);
    onSent?.();
  };

  const enviar = async ({ conFotos }) => {
    setErrorEnvio('');

    // Sin fotos: se abre WhatsApp directo (es un clic de la persona, así
    // que los navegadores no lo bloquean).
    if (!conFotos || fotos.length === 0) {
      window.open(whatsappUrl(armarMensaje(form, [])), '_blank', 'noopener,noreferrer');
      terminar();
      return;
    }

    // Con fotos: primero se suben. Como es un proceso que tarda, los
    // celulares bloquearían abrir WhatsApp "solo" después de esperar,
    // así que al terminar se muestra un botón para abrirlo con un toque.
    setEnviando(true);

    try {
      const urls = await subirFotos(fotos);

      setLinkListo(whatsappUrl(armarMensaje(form, urls)));
    } catch (error) {
      console.error('No se pudieron subir las fotos:', error);
      setErrorEnvio(
        'No pudimos subir las fotos. Revisá tu conexión y probá de nuevo, o enviá el pedido sin fotos.'
      );
    } finally {
      setEnviando(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviar({ conFotos: true });
  };

  /* ========================================
     PANTALLA "LISTO" (después de subir fotos)
  ======================================== */

  if (linkListo) {
    return (
      <div className="turno" id="contacto">
        <div className="container turno__inner">
          <div className="turno__card turno__listo" role="status">
            <i className="bi bi-check-circle-fill turno__listo-icono" aria-hidden="true" />

            <h2>¡Tu pedido está listo!</h2>

            <p>Tocá el botón para abrir WhatsApp y enviarnos tu solicitud con las fotos.</p>

            <a
              className="btn btn--primary btn--grande"
              href={linkListo}
              target="_blank"
              rel="noreferrer"
              onClick={terminar}
            >
              <i className="bi bi-whatsapp" aria-hidden="true" />
              Continuar en WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="turno" id="contacto">
      <div className="container turno__inner">
        <div className="turno__intro">
          <h2>Solicitá tu turno</h2>

          <p>Contanos qué le pasa a tu auto y te confirmamos por WhatsApp.</p>
        </div>

        <form className="turno__card" onSubmit={handleSubmit}>
          <div className="turno__ticket">
            <span>ORDEN DE TRABAJO</span>
            <span>N.º 00284</span>
          </div>

          <label>
            Nombre
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

          <label>
            WhatsApp
            <input
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
          </label>

          <div className="turno__row">
            <label>
              Vehículo
              <input name="vehiculo" value={form.vehiculo} onChange={handleChange} />
            </label>

            <label>
              Patente
              <input
                name="patente"
                value={form.patente}
                onChange={handleChange}
                autoCapitalize="characters"
              />
            </label>
          </div>

          <label>
            Servicio
            <input name="servicio" value={form.servicio} onChange={handleChange} />
          </label>

          <label>
            Contanos el problema
            <textarea
              name="problema"
              rows={4}
              value={form.problema}
              onChange={handleChange}
            />
          </label>

          {/* Las fotos solo se ofrecen si Supabase está configurado */}
          {supabaseConfigurado && (
            <div className="turno__fotos">
              <span className="turno__fotos-titulo">Fotos del vehículo (opcional)</span>

              <input
                ref={inputFotosRef}
                id="turno-fotos"
                className="turno__fotos-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFotos}
                disabled={enviando || fotos.length >= MAX_FOTOS}
              />

              <label
                htmlFor="turno-fotos"
                className={`turno__fotos-boton ${
                  fotos.length >= MAX_FOTOS ? 'is-disabled' : ''
                }`}
              >
                <i className="bi bi-camera" aria-hidden="true" />
                {fotos.length === 0 ? 'Elegir fotos' : 'Agregar más fotos'}
              </label>

              <small className="turno__hint">
                Hasta {MAX_FOTOS} fotos. Se achican solas para que suban rápido.
              </small>

              {fotos.length > 0 && (
                <ul className="turno__fotos-lista">
                  {fotos.map((foto, i) => (
                    <li key={`${foto.name}-${i}`}>
                      <span>{foto.name}</span>

                      <button
                        type="button"
                        onClick={() => quitarFoto(i)}
                        disabled={enviando}
                        aria-label={`Quitar ${foto.name}`}
                      >
                        <i className="bi bi-x-lg" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {errorFotos && (
                <p className="turno__error" role="alert">
                  {errorFotos}
                </p>
              )}
            </div>
          )}

          {errorEnvio && (
            <p className="turno__error" role="alert">
              {errorEnvio}
            </p>
          )}

          <button type="submit" className="btn btn--primary" disabled={enviando}>
            {enviando ? 'Subiendo fotos...' : 'Enviar solicitud'}
          </button>

          {/* Si falló la subida, se puede mandar el pedido igual, sin fotos */}
          {errorEnvio && (
            <button
              type="button"
              className="btn btn--outline turno__sin-fotos"
              onClick={() => enviar({ conFotos: false })}
            >
              Enviar sin fotos
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default TurnoForm;
