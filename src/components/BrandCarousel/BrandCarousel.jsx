import brands from '../../data/brands.js';

import './BrandCarousel.css';

function BrandCarousel() {
  // Duplicamos las marcas para que el carrusel haga un movimiento
  // continuo. La segunda copia se oculta a lectores de pantalla para
  // que no lean cada marca dos veces.
  const loopBrands = [...brands, ...brands];

  return (
    <div className="brand-carousel">
      <div className="brand-carousel__viewport">
        <ul className="brand-carousel__track">
          {loopBrands.map((brand, index) => (
            <li
              className="brand-carousel__item"
              key={`${brand.id}-${index}`}
              aria-hidden={index >= brands.length ? 'true' : undefined}
            >
              {/* Antes se usaba dangerouslySetInnerHTML con un campo "svg"
                  que ni existía. Ahora, si la marca tiene logo, se muestra
                  como imagen normal (más seguro y simple). */}
              {brand.logo && (
                <div className="brand-carousel__logo">
                  <img src={brand.logo} alt="" loading="lazy" />
                </div>
              )}

              <span className="brand-carousel__name">{brand.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BrandCarousel;
