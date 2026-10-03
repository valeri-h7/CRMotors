import Hero from '../components/Hero/Hero.jsx';
import Conocenos from '../components/Conocenos/Conocenos.jsx';
import Services from '../components/Services/Services.jsx';
import TrabajamosConTodos from '../components/TrabajamosConTodos/TrabajamosConTodos.jsx';

import AntesDespues from '../components/AntesDespues/AntesDespues.jsx';
import Resenas from '../components/Resenas/Resenas.jsx';
import UbicacionYPagos from '../components/UbicacionYPagos/UbicacionYPagos.jsx';
import ContactoFinal from '../components/ContactoFinal/ContactoFinal.jsx';
import Repuestos from '../components/Repuestos/Repuestos.jsx'


function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Repuestos/>
      <TrabajamosConTodos />
      <Conocenos />
      <AntesDespues />
      <Resenas />
      <ContactoFinal />
      <UbicacionYPagos />
    </>
  );
}

export default Home;
