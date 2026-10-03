import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Servicios from '../pages/Servicios.jsx';
import Trabajos from '../pages/Trabajos.jsx';
import Nosotros from '../pages/Nosotros.jsx';
import Contacto from '../pages/Contacto.jsx';
import Repuestos from '../pages/Repuestos.jsx';


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/trabajos" element={<Trabajos />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/repuestos" element={<Repuestos />} />
    </Routes>
  );
}

export default AppRouter;
