import { ThemeProvider } from "./context/themeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/navigation/NavBar";
import Ayuda from "./pages/Ayuda";
import ArriendaloFlex from "./pages/ArriendaloFlex";
import Aplicar from "./pages/Aplicar";
import DatosPropiedad from "./components/detail/DatosPropiedad";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketPlaces from "./marketplace/filtersMarketPlace/MarketPlaces";
import Footer from "./components/footer/Footer";
import PoliticaDeDatos from "./components/footer/PoliticaDeDatos";
import ScrollToTop from "./components/ScrollToTop";
import Legal from "./components/footer/Legal";
import PagarArriendo from "./pages/PagarArriendo";
import WompiPaymentWidget from "./components/Wompi/WompiPaymentWidget";
import FormTomadors from "./components/forms/FormTomadors";
import WompiStatus from "./components/Wompi/WompiStatus";
import App_Estudio from "./components/dashboard/layout/App_Estudio";
import TomadorData from "./components/dashboard/components/TomadorData";
import Dashboard from "./components/dashboard/layout/Dashboard";
import COaData from "./components/dashboard/COaData";
import DatosFormulario from "./components/dashboard/components/DatosFormulario";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 dark:text-white  min-width-screen">
        <Router>
          {!["/_admin_arrKar_2023"].some((path) =>
            location.pathname.startsWith(path)
          ) && <NavBar />}
          {/* <FloatingButton /> */}
          {/* <HeroSlider/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/aplicar" element={<Aplicar />} />
            {/* <Route path="/_admin_arrKar_2023" element={<App_Estudio />} /> */}
            <Route path="/_admin_arrKar_2023" element={<App_Estudio />}>
              <Route index element={<Dashboard />} />
              <Route path="formulario/:id" element={<DatosFormulario />} />
              <Route path="formularios" element={<TomadorData />} />
              <Route path="COa" element={<COaData />} />
            </Route>
            <Route path="/legal" element={<Legal />} />
            <Route path="/aplicar_tomador/:id?" element={<FormTomadors />} />
            <Route path="/aplicar_CoA" element={<FormTomadors />} />
            <Route path="/arriendaloflex" element={<ArriendaloFlex />} />
            <Route path="/propiedades" element={<MarketPlaces />} />
            <Route path="/pagar_arriendo" element={<PagarArriendo />} />
            <Route path="/wompi" element={<WompiPaymentWidget />} />
            <Route path="/wompi/status" element={<WompiStatus />} />
            <Route
              path="/politica_tratamiendo_de_Datos"
              element={<PoliticaDeDatos />}
            />
            <Route path="propiedades/:id" element={<DatosPropiedad />} />
            <Route path="/not_found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not_found" replace />} />
          </Routes>
          <ToastContainer />
          {!["/_admin_arrKar_2023"].some((path) =>
            location.pathname.startsWith(path)
          ) && <Footer />}
          {/* <Footer /> */}
          <ScrollToTop />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
