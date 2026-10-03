import './PaymentMethods.css';

// Los medios de pago están definidos como datos: para agregar uno
// nuevo se suma un objeto a esta lista, no hay que repetir markup.
//
// variant "card": ícono 48x32 con el nombre dibujado adentro.
// variant "icon": ícono simple + el texto al lado.
const METHODS = [
  {
    id: 'visa',
    label: 'Visa',
    variant: 'card',
    svg: (
      <>
        <rect width="48" height="32" rx="4" fill="#ffffff" />
        <text x="24" y="21" textAnchor="middle" fill="#1a1f71" fontSize="12" fontWeight="700" fontStyle="italic">
          VISA
        </text>
      </>
    ),
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    variant: 'card',
    svg: (
      <>
        <rect width="48" height="32" rx="4" fill="#ffffff" />
        <circle cx="20" cy="16" r="9" fill="#eb001b" />
        <circle cx="28" cy="16" r="9" fill="#f79e1b" fillOpacity="0.95" />
      </>
    ),
  },
  {
    id: 'amex',
    label: 'American Express',
    variant: 'card',
    svg: (
      <>
        <rect width="48" height="32" rx="4" fill="#2e77bc" />
        <text x="24" y="14" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="700">
          AMERICAN
        </text>
        <text x="24" y="21" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="700">
          EXPRESS
        </text>
      </>
    ),
  },
  {
    id: 'cabal',
    label: 'Cabal',
    variant: 'card',
    svg: (
      <>
        <rect width="48" height="32" rx="4" fill="#ffffff" />
        <text x="24" y="21" textAnchor="middle" fill="#1b4f8a" fontSize="9" fontWeight="700">
          CABAL
        </text>
      </>
    ),
  },
  {
    id: 'mercadopago',
    label: 'Mercado Pago',
    variant: 'card',
    svg: (
      <>
        <rect width="48" height="32" rx="4" fill="#ffffff" />
        <circle cx="24" cy="16" r="11" fill="#009ee3" />
        <path d="M16 15c2.2-3 4.8-4.5 8-4.5s5.8 1.5 8 4.5" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 18c1.7-2 3.7-3 6-3s4.3 1 6 3" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'modo',
    label: 'MODO',
    variant: 'card',
    svg: (
      <>
        <rect width="48" height="32" rx="4" fill="#ffffff" />
        <text x="24" y="21" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="700">
          MODO
        </text>
      </>
    ),
  },
  {
    id: 'qr',
    label: 'QR',
    variant: 'icon',
    svg: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="10" height="10" />
        <rect x="19" y="3" width="10" height="10" />
        <rect x="3" y="19" width="10" height="10" />
        <g fill="currentColor" stroke="none">
          <rect x="20" y="20" width="4" height="4" />
          <rect x="26" y="20" width="3" height="3" />
          <rect x="20" y="26" width="3" height="3" />
          <rect x="26" y="26" width="3" height="3" />
        </g>
      </g>
    ),
  },
  {
    id: 'transferencia',
    label: 'Transferencia',
    variant: 'icon',
    svg: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 3L3 10v3h26v-3L16 3z" strokeLinejoin="round" />
        <path d="M6 13v10M12 13v10M20 13v10M26 13v10" />
        <path d="M3 23h26v5H3z" />
      </g>
    ),
  },
  {
    id: 'efectivo',
    label: 'Efectivo',
    variant: 'icon',
    svg: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="8" width="26" height="16" rx="2" />
        <circle cx="16" cy="16" r="4" />
        <path d="M8 13h1M23 19h1" strokeLinecap="round" />
      </g>
    ),
  },
];

function PaymentMethods({ title = 'Medios de pago' }) {
  return (
    <div className="payments">
      <span className="payments__title">{title}</span>

      <ul className="payments__list">
        {METHODS.map(({ id, label, variant, svg }) => (
          <li key={id} className={`payments__item payments__item--${variant}`}>
            {variant === 'card' ? (
              <svg viewBox="0 0 48 32" role="img" aria-label={label}>
                {svg}
              </svg>
            ) : (
              <>
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  {svg}
                </svg>
                <span>{label}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentMethods;
