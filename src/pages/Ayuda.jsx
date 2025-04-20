import { BsWhatsapp } from "react-icons/bs";
import { help, support, find } from "../assets";
import HorarioAtencion from "../components/ayuda/HorarioAtencion";
import { horarioBogota, horarioIbague } from "../data";
import MapaSucursalBogota from "../components/ayuda/MapaSucursalBogota";
import MapaSucursalIbague from "../components/ayuda/MapaSucursalIbague";
import MarqueeSEO from "../components/MarqueeSEO";
import { Helmet } from "react-helmet-async";

const Ayuda = () => {
  return (
    <div className=" pt-[90px]  ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Arriendalo | Centro de ayuda</title>
        <link rel="canonical" href="https://arriendalo.com.co/ayuda" />
        <meta
          name="description"
          content="En el centro de ayuda de arriendalo estamos para asistir 24/7. comunicate con a nuestro numero de whatsapp"
        />
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
      <div className="bg-primaryblue h-48 flex  justify-evenly items-center">
        <h1 className="lg:text-4xl sm:text-lg md:text-lg text-white font-bold px-5 lg:px-20">
          ¿Nos necesitas?
          <br /> ¡Aquí estamos para ti!
        </h1>
        {/* <div className="lg:block hidden"> */}
        <div className="lg:block sm:overflow-hidden pt-5">
          <img
            loading="lazy"
            className=" lg:w-72 sm:w-52 sm:mr-10 lg:mr-5"
            src={help}
            alt="arriendalo centro de ayuda"
          />
        </div>
      </div>
      <div className="lg:px-20 px-5">
        <div className="flex items-center justify-evenly flex-wrap   bg-slate-100 dark:bg-slate-800 my-5  p-5 rounded-xl">
          <div className="flex-row ">
            <h1 className="font-semibold text-2xl mb-5">
              Visita nuestro centro de ayuda
            </h1>
            <p>
              <a href="https://ayuda.arriendalo.com.co/hc/es" target="_blanck">
                <strong className="hover:underline text-primary">
                  Ingresa aquí
                </strong>
              </a>{" "}
              para resolver dudas a preguntas frecuentes y para enviar
              solicitudes.
            </p>
          </div>
          <div className="flex justify-center pt-5">
            <a
              rel="noreferrer"
              href="https://wa.link/5jqnxe"
              target="_blank"
              className="flex cursor-pointer hover:bg-slate-800  gap-3 py-2 px-4 text-white  items-center justify-center bg-darkblue rounded-full"
            >
              <BsWhatsapp className="text-lg" />
              <h3 className=" sm:text-xs lg:text-lg">
                Escribenos por WhatsApp
              </h3>
            </a>
          </div>
        </div>
        {/* //! SUCURSAL BOGOTA */}
        <div className="grid lg:grid-cols-2 border rounded-xl border-gray-500 sm:grid-cols-1 mt-10">
          <div className="p-10">
            <h1 className="font-medium text-2xl">Correspondencia:</h1>
            <br />
            <h2 className="text-gray-700 text-xl">
              Carrera 7 #156-68 | Oficina 1804 | Edificio North Point III,
              Bogotá, Colombia
            </h2>
            <br />
            <p>
              PXB:{" "}
              <a
                className="text-primary hover:underline"
                href="tel:+57(601)357-1285"
              >
                +57(601)357-1285
              </a>
            </p>
            <br />
            <h3>
              Correo de Atención a Clientes::
              <br />
              <a
                className="text-primary hover:underline"
                href="mailto:ayuda@arriendalo.com.co"
              >
                ayuda@arriendalo.com.co
              </a>
            </h3>
            <br />

            <h3>
              Pagos a Proveedores y Aliados:
              <br />
              <a
                className="text-primary hover:underline"
                href="mailto:facturacion@arriendalo.com.co"
              >
                facturacion@arriendalo.com.co
              </a>
            </h3>
            <br />
            <p>
              Recepción de comprobantes electrónicos:
              <br />
              <a
                className="text-primary hover:underline"
                href="mailto:arriendalo@recepcion.alegra.com"
              >
                arriendalo@recepcion.alegra.com
              </a>
            </p>
            <br />
          </div>
          {/* <div className="content-center pt-10">
            <MapaSucursalBogota
              latitud={4.7317034}
              longitud={-74.028365}
              direccion={"Carrera 7 #156-68, Bogotá"}
            />
          </div>  */}
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1">
              <h1 className="font-medium text-2xl">
                Nuestros horarios de atención
              </h1>
              <div className="flex justify-start">
                <HorarioAtencion horario={horarioBogota} />
              </div>
            </div>
          </div>

          {/* //! SUCURSAL IBAGUE */}
          {/* <div className="grid lg:grid-cols-2 border rounded-xl border-gray-500 sm:grid-cols-1 mt-10"> */}
          {/* <div> */}
          {/* <MapaSucursalIbague
              latitud={4.4433695}
              longitud={-75.2431202}
              direccion={"Carrera 3 #12 36, Ibagué"}
            /> */}
          {/* <img src={find} alt="arriendalo sucursal Ibague" /> */}
          {/* </div> */}
          {/* <div className="p-10"> */}
          {/* <h1 className="font-medium text-2xl">Sucursal Ibagué</h1> */}
          {/* <br /> */}
          {/* <h3 className="text-gray-700 text-xl"> */}
          {/* Carrera 3 #12 36, Ibagué, Tolima, Colombia */}
          {/* </h3> */}
          {/* <br /> */}
          {/* <h3> */}
          {/* PXB:{" "} */}
          {/* <a */}
          {/* className="text-primary hover:underline" */}
          {/* href="tel:+57(601)357-1285" */}
          {/* > */}
          {/* +57(601)357-1285 */}
          {/* </a> */}
          {/* </h3> */}
          {/* <br /> */}

          {/* <h1 className="font-medium text-2xl"> */}
          {/* Nuestros horarios de atención */}
          {/* </h1> */}
          {/* <div className="flex justify-start"> */}
          {/* <HorarioAtencion horario={horarioIbague} /> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
      <div className="px-5">
        <MarqueeSEO />
      </div>
    </div>
  );
};

export default Ayuda;
