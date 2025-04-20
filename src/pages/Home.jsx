import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import SobreArriendalo from "../components/SobreArriendalo";
import HomeFilter from "../components/filters/HomeFilter";
import PropRecientes from "../components/recientespublic/PropRecientes";
import HeroSlider from "../components/slider/HeroSlider";
import Testimonios from "../components/testimonios/Testimonios";
import MarqueeSEO from "../components/MarqueeSEO";
import CiudadesGallery from "../components/CiudadesGallery";
import HeroSection from "../components/slider/HeroSection";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  // Si estás en un entorno de Node.js
  // O si estás en un navegador, simplemente usa 'fetch'

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial window width

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallScreen = windowWidth <= 768;

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>
          Apartamentos y Casas en Arriendo en Bogotá - Arriendos en Bogotá -
          Arriendalo.com.co
        </title>
        <meta
          name="description"
          content="Arrienda tu apartamento con garantías y protección de pago y daños. Encuentra tu casa en arriendo sin papeleo y sin fiador. apartamentos en arriendo bogotá."
        />

        <meta
          property="og:description"
          content="Arrienda tu apartamento con garantías y protección de pago y daños. Encuentra tu casa en arriendo sin papeleo y sin fiador. apartamentos en arriendo bogotá."
        />
        <meta
          property="og:title"
          content="Apartamentos y Casas en Arriendo en Bogotá - Arriendos en Bogotá - Arriendalo.com.co"
        />
        <meta property="og:url" content="https://arriendalo.com.co" />
        <link rel="canonical" href="https://arriendalo.com.co" />
        <meta
          name="og:site_name"
          property="og:site_name"
          content="Arriendalo"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/arriendalo/"
        />
        <meta property="og:type" content="website" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-65YKMC7CT1"
        ></script>
        <script>
          {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
     
       gtag('config', 'G-65YKMC7CT1');
    `}
        </script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BCXH8TFTD5"
        ></script>
        <script>
          {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
     
       gtag('config', 'G-BCXH8TFTD5');
    `}
        </script>
      </Helmet>
      <div className="lg:flex lg:justify-center">
        <div className="w-full  ">
          {/* <div className=" bg-gradient-to-br from-transparent via-indigo-100 to-transparent "> */}
          {/* {!isSmallScreen && (
            <div className="pt-5">
              <HeroSlider />
            </div>
          )} */}
          <HeroSection />
          {/* </div> */}

          {/* <HomeFilter /> */}
          <SobreArriendalo />
          <PropRecientes />
          <CiudadesGallery />
          <Testimonios />
          <MarqueeSEO />
        </div>
      </div>
    </div>
  );
};

export default Home;
