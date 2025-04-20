import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Tab, initTE } from "tw-elements";
import Aplicacion from "./aplicacion/Aplicacion";
import DatosPersonales from "./natural/datospersonales/DatosPersonales";
import Ingresos from "./natural/ingresos/Ingresos";
import Referencias from "./natural/referencias/Referencias";
import Documentos from "./natural/documentos/Documentos";
import Acordion from "./acordionpreguntas/Acordion";
import MarqueeSEO from "../MarqueeSEO";
import WompiPaymentWidget from "../Wompi/WompiPaymentWidget";
import { updateDatosEstudio } from "../../redux/formularioestudio/formularioEstudio.slice";
import { useDispatch } from "react-redux";
import ConfirmModal from "./ConfirmModal";

const FormTomadors = () => {
  const dispatch = useDispatch();
  const [pasoVisitado, setPasoVisitado] = useState([0]);
  const pasosVisitadosHandler = (i) => {
    if (!pasoVisitado.includes(i)) {
      setPasoVisitado((prev) => {
        const updated = [...prev, i];

        return updated;
      });
    }
    setPasoActual(i);
  };

  const [pasoActual, setPasoActual] = useState(0);
  const [confirmarModal, setConfirmarModal] = useState(false);

  const confirmarModalHandler = () => {
    setConfirmarModal(!confirmarModal);
  };

  const cancelarHandler = () => {
    window.location.reload();
  };

  const aplicarCambiosHandler = (newData) => {
    dispatch(updateDatosEstudio(newData));
  };

  const siguienteHandler = (newData) => {
    dispatch(updateDatosEstudio(newData));
    localStorage.setItem("datosEstudio", JSON.stringify(newData));

    pasosVisitadosHandler(pasoActual + 1);
  };

  const pasos = [
    {
      name: "Aplicación",
      component: <Aplicacion siguienteHandler={siguienteHandler} />,
      tag: "aplicacion",
    },
    {
      name: "Datos Personales",
      component: <DatosPersonales siguienteHandler={siguienteHandler} />,
      tag: "datospersonales",
    },
    {
      name: "Ingresos",
      component: <Ingresos siguienteHandler={siguienteHandler} />,
      tag: "ingresos",
    },
    {
      name: "Referencias",
      component: <Referencias siguienteHandler={siguienteHandler} />,
      tag: "referencias",
    },
    {
      name: "Documentos",
      component: <Documentos siguienteHandler={siguienteHandler} />,
      tag: "documentos",
    },
    {
      name: "Pago y confirmación",
      component: <WompiPaymentWidget siguienteHandler={siguienteHandler} />,
      tag: "pagoconfirmacion",
    },
  ];
  useEffect(() => {
    initTE({ Tab });
  }, []);

  return (
    <div className="pt-28 lg:px-20 px-5">
      <div>
        <ul
          className="mb-5 flex list-none flex-row border-b-0 pl-0 overflow-x-auto whitespace-nowrap hide-scrollbar"
          role="tablist"
          data-te-nav-ref
        >
          {pasos.map((paso, i) => (
            <li
              key={i}
              role="presentation"
              className="flex-grow basis-0 text-center"
            >
              <a
                href={`#tabs-${paso.tag}02`}
                className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 lg:text-sm sm:text-md font-bold  lg:leading-none sm:leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent ${
                  pasoActual === i
                    ? "data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    : ` ${
                        pasoVisitado.includes(i) || i < pasoActual === i
                          ? "text-primary-400"
                          : "text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent pointer-events-none"
                      }`
                }`}
                data-te-toggle="pill"
                data-te-target={`#tabs-${paso.tag}02`}
                data-te-nav-active
                role="tab"
                aria-controls={`tabs-${paso.tag}02`}
                aria-selected={pasoActual === i ? "true" : "false"}
                onClick={(e) => {
                  e.preventDefault();
                  if (i <= pasoActual || pasoVisitado.includes(i)) {
                    pasosVisitadosHandler(i);
                  }
                }}
              >
                {paso.name}
              </a>
            </li>
          ))}
        </ul>
        {/*  */}

        <div className="mb-6 grid lg:grid-cols-3 sm:grid-cols-1 lg:gap-10 sm:gap-0">
          <div className="col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center py-2 justify-end">
                <button
                  onClick={confirmarModalHandler}
                  className="flex gap-2 text-gray-500 text-md py-2 px-3"
                >
                  Cancelar aplicación
                </button>
              </div>
            </div>
            <div
              className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id={`tabs-${pasos[pasoActual].tag}02`}
              role="tabpanel"
              aria-labelledby={`tabs-${pasos[pasoActual].tag}-tab02`}
              data-te-tab-active
            >
              {pasos[pasoActual].component}
            </div>
          </div>
          <div className="pt-5 ">
            <Acordion />
          </div>
        </div>
      </div>
      <MarqueeSEO />
      {confirmarModal && (
        <ConfirmModal
          confirmarModalHandler={confirmarModalHandler}
          cancelarHandler={cancelarHandler}
        />
      )}
    </div>
  );
};

export default FormTomadors;
