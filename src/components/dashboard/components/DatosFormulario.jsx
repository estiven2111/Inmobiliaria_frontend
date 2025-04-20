import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  selectFormulariosById,
  updateEstadoFormulario,
} from "../../../redux/admin_dashboard/estudioDatacredito.slice";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect } from "react";
import OpcionesDashboard from "./OpcionesDashboard";
import { estados } from "../lib/data/arrays";
import { useDispatch } from "react-redux";
import { HiArrowNarrowLeft, HiOutlineIdentification } from "react-icons/hi";
import InmueblePreview from "../../forms/natural/datospersonales/InmueblePreview";
import { useGetPropertiesByIdQuery } from "../../../redux/RTKquery/propertyApi";
import axios from "axios";
import { BiImageAlt, BiMoneyWithdraw } from "react-icons/bi";
import { IoDocumentAttachOutline } from "react-icons/io5";

const DatosFormulario = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [openSlide, setOpenSlide] = useState(false);

  const handleOpenSlide = () => {
    setOpenSlide(!openSlide);
  };

  
  const [selected, setSelected] = useState("");
  const [formulario, setFormulario] = useState({});
  const [propiedad, setPropiedad] = useState({});



  const executeForm = async () => {
    const response = await axios.get(
      `/formulario/search-tomador/dashboard?id_form=${id}`
    );
    const formulario = response.data[0];
    setFormulario(formulario);
    setSelected(estados.find((el) => el.name === formulario.estado));
    const res = await axios.get(
      `/property/details?id=${formulario.cod_inmueble}`
    );
    setPropiedad(res.data);
  };

  useEffect(() => {
    executeForm();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setOpenSlide(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  //   useEffect(() => {
  //  setSelected(estados.find((el) => el.name === formulario.estado));
  //   }, [selected]);
  // const searchPrperty = () =>{

  //   const { data: propiedad } = useGetPropertiesByIdQuery(
  //     formulario.cod_inmueble
  //   );
  // }
  const cambiarEstado = (el) => {
    axios
      .put(
        `/formulario/validation-tomador/dashboard?id_form=${id}&estado=${el.name}`
      )
      .then((res) => {
        toast.success(`Estado actualizado a ${el.name}`);
     
      })
      .catch((err) => toast.error("Error al actualizar estado"));
    // dispatch(updateEstadoFormulario(payload));

    //?  ENVIAR CORREO CONFIRMACION CAMBIO ESTADO

    const correoObj = {
      ...formulario,
      estado: el.name,
    };


    axios
      .post("/mensajes/email", correoObj)
      .then((res) => {
        toast.success(
          `Un correo de confirmación se ha enviado a ${correoObj.email}.`
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al enviar el correo");
      });
  };

  const formattedImages = formulario?.urls_img?.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="text-white  h-screen overflow-y-scroll hide-scrollbar py-10">
      <div>
        <h2 className="uppercase text-2xl text-center text-white font-bold">
          Formulario N. {id}
        </h2>
      </div>
      <div className="grid grid-cols-3 pt-10 gap-10">
        <div className="flex items-center justify-end">
          <p className="text-white text-lg  font-thin">
            Inmueble <strong>{formulario.cod_inmueble}</strong>
          </p>
        </div>
        <div className=" justify-center items-center">
          {propiedad.titulo ? (
            <InmueblePreview propiedad={propiedad} />
          ) : (
            <div></div>
          )}
        </div>
        <div className="gap-10 w-[50%] flex-row items-center">
          <p className="text-white text-lg font-thin pl-1 ">
            Estado de formulario:
          </p>

          <OpcionesDashboard
            selected={selected}
            setSelected={setSelected}
            array={estados}
            cambiarEstado={cambiarEstado}
          />
        </div>
      </div>
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <div className="flex mb-2 items-center border-r-4 border-l-4 border-indigo-500 justify-center text-justify  px-5 lg:px-5 lg:py-3 py-2 shadow-inner shadow-gray-900 text-lg">
        <p>
          <strong className="pl-2">
            Aplica como:{" "}
            <span className="text-lightblueone">{formulario.aplica_como}</span>
            <span className="">
              {formulario.aplica_como === "Co-arrendatario"
                ? ` del formulario N. ${formulario.id_form_coa}`
                : ""}
            </span>
          </strong>
        </p>
      </div>
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <div className="flex items-center justify-center">
        <div>
          <div className="flex py-2 items-center gap-3 justify-center">
            <HiOutlineIdentification className="text-xl" />
            <p className=" py-2 text-lg font-semibold">DATOS PERSONALES</p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-white text-lg capitalize font-thin">
                <strong>Nombre:</strong> <br />
                {formulario.nom_completo}
              </p>
            </div>
            <div>
              <p className="text-white text-lg font-thin ">
                <strong>Doc. identidad:</strong>
                <br /> {formulario.tipo_doc}. {formulario.num_doc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-white text-lg  font-thin">
                <span className="capitalize">{formulario.persona}</span>
              </p>
            </div>
            <div>
              <p className="text-white text-lg font-thin ">
                <strong>Fecha expedición:</strong> {formulario.fechaexp_doc}
              </p>
            </div>
          </div>

          {/* DATOS DE CONTACTOOOO-------------------------------------- */}

          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-white text-lg  font-thin">
                <strong>Correo electrónico:</strong>
                <br /> <span className="">{formulario.email}</span>
              </p>
            </div>
            <div>
              <p className="text-white text-lg font-thin ">
                <strong>Número de contacto:</strong>
                <br /> {formulario.num_whatsapp}
              </p>
            </div>
          </div>

          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

          {/* PERSONAS Y MASOTAS PARA TOMADOR -------------------------- */}

          {formulario.aplica_como === "Tomador" ? (
            <div>
              <div>
                <strong className="pb-3">
                  Personas y/o mascotas que también vivirán en{" "}
                  {propiedad.titulo}:
                </strong>

                <div className="grid lg:grid-cols-2 sm:grid-cols-1">
                  {formulario.datos_personas?.length === 0 ? (
                    <div>No se agregaron personas</div>
                  ) : (
                    formulario.datos_personas?.map((el, i) => (
                      <div key={i}>
                        <p className="font-semibold">{`Persona ${i + 1}`}</p>
                        <p className="capitalize">{`Nombre: ${el.nombre}`}</p>
                        <p>{`Edad: ${el.edad}`}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="pt-1">
                <h3 className="font-semibold">Mascotas:</h3>
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10">
                  {formulario.datos_mascotas?.length === 0 ? (
                    <div>No se agregaron mascotas</div>
                  ) : (
                    formulario.datos_mascotas?.map((el, i) => (
                      <div key={i}>
                      
                        <p className="font-semibold">{`Mascota ${i + 1}`}</p>
                        <p>{` ${el.nombre} - ${el.tipo}`}</p>
                        {/* <p>{`Edad: ${el.tipo}`}</p> */}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : null}

          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

          {/* DATOS FINANCIEROS -------------------------------------- */}

          <div className="flex py-2 items-center gap-3 justify-center">
            <BiMoneyWithdraw className="text-xl" />
            <p className=" py-2 text-lg font-semibold">DATOS FINANCIEROS</p>
          </div>

          {/*  */}
          <div>
            <div>
              <p>
                <strong>Activida Económica:</strong> <br />
                {formulario.act_economica}
              </p>
              {formulario.act_economica === "Independiente" ||
              formulario.act_economica === "Rentista de capital" ? (
                formulario.datos_act_economica?.map((el, i) => (
                  <div key={i}>
                    <p>
                      <strong>Declara renta:</strong>
                      <br />
                      {el.declara_renta}
                    </p>
                  </div>
                ))
              ) : formulario.act_economica === "Empleado" ? (
                <div>
                
                  <p>
                    <strong>Tipo de contrato:</strong> <br />
                    {formulario.datos_act_economica[0].tipo_contrato}
                  </p>
                  <p>
                    <strong>Antigüedad en la empresa:</strong> <br />
                    {formulario.datos_act_economica[0].tiempo_empresa}
                  </p>
                  <p>
                    <strong>Nombre de la empresa:</strong> <br />
                    {formulario.datos_act_economica[0].nombre_empresa}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-white text-lg  font-thin">
                <strong>Ingresos:</strong>{" "}
                <span className="capitalize">
                  $ {Number(formulario.ingresos).toLocaleString("es-CO")}
                </span>
              </p>
            </div>
            <div>
              <p className="text-white text-lg  font-thin">
                <strong>Egresos:</strong>{" "}
                <span className="capitalize">
                  $ {Number(formulario.egresos).toLocaleString("es-CO")}
                </span>
              </p>
            </div>
          </div>

          {/* REFERENCIAS ------------------------ */}

          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          <div>
            <strong>REFERENCIAS</strong> <br />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10">
              {formulario.datos_referencias?.map((el, i) => (
                <div key={i}>
                  <p className="font-semibold">{`Referencia ${i + 1}`}</p>
                  <p className="capitalize">{`Nombre: ${el.nombre}`}</p>
                  <p>{`Teléfono: ${el.contacto}`}</p>
                  <p>{`Parentesco: ${el.parentesco}`}</p>
                </div>
              ))}
            </div>
          </div>

          {/*  */}
          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

          {/* IMAGENESSSSSS ---------------- */}

          <div className="flex py-2 items-center gap-3 justify-center">
            <IoDocumentAttachOutline className="text-xl" />
            <p className=" py-2 text-lg font-semibold">DOCUMENTOS</p>
          </div>

          <div className="flex items-center justify-center gap-10">
            <div className="flex items-center gap-5 rounded-lg justify-start w-full ring-1 ring-gray-400 p-3 mt-5">
              {formulario.urls_img?.length === 0 ? (
                <p className="text-gray-400 text-center">
                  No se encontraron archivos
                </p>
              ) : (
                formulario.urls_img?.map((file, i) => (
                  <div key={i} className="relative">
                    <img
                      src={file}
                      // src={URL.createObjectURL(file)}
                      alt={`Preview ${i}`}
                      className="mb-2 rounded-lg w-[100px] h-[100px] object-cover"
                    />
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-start">
              <div
                onClick={handleOpenSlide}
                className="py-2 px-3 cursor-pointer flex font-semibold gap-2 items-center justify-center bg-slate-600/80 hover:bg-slate-600/70 text-lg rounded-xl"
              >
                <BiImageAlt className="text-white text-xl" /> Ver
              </div>
            </div>
          </div>
          {openSlide && (
            <div className="fixed top-0 left-0 z-20 w-full py-1 flex justify-center items-center bg-zinc-900/95">
              <div className="lg:max-w-4xl md:max-w-lg rounded-xl w-full sm: p-2">
                <ImageGallery items={formattedImages} className="rounded-xl" />
                <button
                  className="absolute flex gap-2 items-center justify-center bg-slate-100 rounded-xl dark:bg-slate-700 text-slate-900 cursor-pointer top-4 hover:bg-opacity-80 z-20 left-4 p-2 dark:text-white   focus:outline-none"
                  onClick={() => setOpenSlide(false)}
                >
                  <HiArrowNarrowLeft className=" dark:text-white  text-slate-900" />{" "}
                  Volver
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatosFormulario;
