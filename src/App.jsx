import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import WhatsappButton from './components/WhatsappButton/WhatsappButton.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import { TurnoProvider } from './context/TurnoContext.jsx';

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <TurnoProvider>
      <ScrollToTop />
      <Header />
      {/* En el Home el Hero va detrás del header; en el resto de las
          páginas el contenido arranca debajo de él. */}
      <main className={isHome ? undefined : 'main--offset'}>
        <AppRouter />
      </main>
      <Footer />
      <WhatsappButton />
    </TurnoProvider>
  );
}

export default App;
