import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Los estilos globales van PRIMERO: así los CSS de cada componente
// (que se cargan al importar App) pueden pisar los valores base.
import './styles/global.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
