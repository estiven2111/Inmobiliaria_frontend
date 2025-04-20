import { FaWpforms } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import MarqueeSEO from "../components/MarqueeSEO";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { updateDatosEstudio } from "../redux/formularioestudio/formularioEstudio.slice";
import { useState } from "react";
import LogInModal from "../components/LogInModal";
import axios from "axios";
import { toast } from "react-toastify";
import { HiOutlineIdentification } from "react-icons/hi";
import { TbHomeHand } from "react-icons/tb";

const Aplicar = () => {
  const [coaModal, setCoaModal] = useState(false);

  const datosEstudio = useSelector(
    (state) => state.formularioEstudioSlice.datosEstudio
  );

  const coaModalHandler = () => {
    setCoaModal(!coaModal);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const siguienteHandler = async (newData) => {
    const idformCoa = `${newData.codigo}_${newData.cedula}`;
    try {
      const res = await axios(`/formulario/validation?id_form=${idformCoa}`);
      if (
        res.status === 200 &&
        typeof res.data === "object" &&
        res.data !== null
      ) {
        const newDataCoa = {
          ...newData,
          cod_inmueble: newData.codigo,
          id_form_coa: idformCoa,
          // id_form: `${newData.codigo}_${newData.cedula}`,
        };

        dispatch(updateDatosEstudio(newDataCoa));
        localStorage.setItem("datosEstudio", JSON.stringify(newDataCoa));
        navigate("/aplicar_CoA");
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" lg:px-20 px-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Arriendalo | Aplica como Tomador o CoA</title>
        <link rel="canonical" href="https://arriendalo.com.co/aplicar" />
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
      <div className=" lg:px-44 pt-20  grid md:grid-cols-2 grid-cols-1 gap-20 ">
        <div className="flex-wrap pt-20 align-middle justify-center">
          <h1 className="text-center font-bold text-3xl">
            Aplica como tomador
          </h1>
          <h2 className="font-medium text-center text-xl pt-10">
            ¿Quién es el tomador?
          </h2>
          <p className="text-justify py-5">
            el tomador es la persona que toma en arriendo una propiedad y se
            compromete a cumplir con las condiciones del contrato durante el
            período establecido, garantizando una convivencia armoniosa y un
            arrendamiento exitoso.
          </p>
          <Link to="/aplicar_tomador">
            <div className="flex items-center  pt-10  justify-center">
              <button className=" flex w-full text-white items-center justify-center  cursor-pointer gap-3 duration-300 hover:saturate-200 rounded-full px-6  bg-gradient-to-r from-indigo-400 to-indigo-600 p-2">
                <FaWpforms className="text-white" />
                Aplicar
              </button>
            </div>
          </Link>
        </div>
        <div className="flex-row pt-10 lg:pt-20 items-center justify-center">
          <h1 className="text-center font-bold text-3xl">Aplica como CoA</h1>
          <h2 className="font-medium text-center text-xl pt-10">
            ¿Quién es el Co-arrendatario?
          </h2>
          <p className="text-justify py-5">
            El Co-arrendatario es una persona que se compromete a asumir la
            responsabilidad si el tomador no cumple con las obligaciones del
            contrato de arrendamiento, brindando seguridad al arrendador.
          </p>
          {/* <p className="text-justify py-5">
            el COA arrendatario es aquel que, voluntariamente, se compromete a
            asumir la responsabilidad en caso de que el tomador no cumpla con
            sus obligaciones en el contrato de arrendamiento, brindando una
            mayor seguridad al arrendador y mitigando los riesgos asociados con
            el arrendamiento.
          </p> */}

          <div className="flex items-center pt-10 justify-center">
            <div
              onClick={coaModalHandler}
              className=" flex w-full  text-white items-center justify-center  cursor-pointer gap-3 duration-300 hover:saturate-200 rounded-full px-6  bg-gradient-to-r from-indigo-400 to-indigo-600 p-2"
            >
              <FaWpforms /> Aplicar
            </div>
          </div>
        </div>
      </div>
      <MarqueeSEO />
      {coaModal && (
        <LogInModal
          buttonName="Continuar"
          label1="Código del inmueble"
          label2="Identificación del tomador"
          initialValue={{ codigo: "", cedula: "" }}
          closeModal={coaModalHandler}
          submithandler={siguienteHandler}
          icon1={<TbHomeHand className="text-xl" />}
          icon2={<HiOutlineIdentification className="text-xl" />}
          name1="codigo"
          name2="cedula"
          input1="text"
          input2="text"
          schema={null}
        />
      )}
    </div>
  );
};

export default Aplicar;
