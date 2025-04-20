/* eslint-disable react/prop-types */
import { Field, Formik, Form, FieldArray, ErrorMessage } from "formik";
import { tipoDeDocumento, countrycodes } from "../../arraysFormulario";
import { useEffect, useState } from "react";
import { IoAddCircle, IoLogoWhatsapp, IoRemoveCircle } from "react-icons/io5";
import { MdOutlineAdd, MdOutlineRemove, MdPets } from "react-icons/md";
import AutorizacionModal from "./AutorizacionModal";
import OpcionComp from "../../OpcionComp";
import { HiOutlineIdentification, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineContactPhone } from "react-icons/md";
import { TbCat, TbHomeHand } from "react-icons/tb";
import {
  BsFillCheckSquareFill,
  BsFillHandThumbsUpFill,
  BsPersonAdd,
  BsPersonDash,
} from "react-icons/bs";
import { useGetPropertiesByIdQuery } from "../../../../redux/RTKquery/propertyApi";
import { dotsload } from "../../../../assets";
import Lottie from "lottie-react";
import InmueblePreview from "./InmueblePreview";
import axios from "axios";
import { datosPersonalesValidationSchema } from "../../validaciones";
import ScrollToTop from "../../../ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { updateDatosEstudio } from "../../../../redux/formularioestudio/formularioEstudio.slice";
import { useLocation, useParams } from "react-router-dom";
import IdFormModal from "./IdFormModal";
import { toast } from "react-toastify";
import { FaWpforms } from "react-icons/fa";

const DatosPersonales = ({ siguienteHandler }) => {
  const datosEstudio = useSelector(
    (state) => state.formularioEstudioSlice.datosEstudio
  );
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { id } = useParams();

  // const aplicaComo = pathname.split("_")[1];

  //? Validar que el codigo sea un numero -----------------------

  const codigoValido = (codigo) => {
    return codigo && !isNaN(codigo);
  };

  useEffect(() => {
    if (id && codigoValido(id)) {
      dispatch(updateDatosEstudio({ cod_inmueble: id }));
    }
  }, [id, dispatch]);

  const [skipQuery, setSkipQuery] = useState(true);

  const {
    data: propiedad,
    isLoading,
    isError,
    isSuccess,
  } = useGetPropertiesByIdQuery(datosEstudio.cod_inmueble, {
    skip: skipQuery,
  });

  useEffect(() => {
    if (codigoValido(datosEstudio.cod_inmueble)) {
      setSkipQuery(false);
    } else {
      setSkipQuery(true);
    }
  }, [datosEstudio.cod_inmueble]);

  useEffect(() => {
    if (codigoValido(datosEstudio.cod_inmueble)) {
      dispatch(
        updateDatosEstudio({
          cod_inmueble: datosEstudio.cod_inmueble,
        })
      );
    }
  }, [datosEstudio.cod_inmueble, propiedad]);

  const handleBlur = (e) => {
    const codigoInmueble = e.target.value;
    if (codigoValido(codigoInmueble)) {
      dispatch(
        updateDatosEstudio({
          cod_inmueble: codigoInmueble,
        })
      );
    }
  };

  //? -----------------------------------------------------

  const [siguienteClickeado, setSiguienteClickeado] = useState(false);



  const [showModal, setShowModal] = useState(false);
  const [idFormModal, setIdFormModal] = useState(false);

  const [resValidation, setResValidation] = useState({});

  const idFormModalHandler = () => {
    setIdFormModal(!idFormModal);
  };

  const showModalHandler = () => setShowModal(!showModal);

  useEffect(() => {
  }, [siguienteClickeado]);

  const handleSubmit = async (values) => {
    setSiguienteClickeado(true);
    const randomNum = Math.floor(Math.random() * 900) + 1000;
    let idForm = `${values.cod_inmueble}_${values.num_doc}`;
    //? ID FORM IGUAL AL DEL TOMADOR
    // let idForm = values.id_form || "";
    // if (!pathname.includes("CoA")) {
    //   idForm = `${values.cod_inmueble}_${values.num_doc}`;
    // }
    //?---------------------------
    const idFormCoa = `${values.id_form_coa}`;

    try {
      const res = await axios(`/formulario/validation?id_form=${idForm}`);
      if (res.status === 200) {
        if (
          typeof res.data === "string" ||
          (typeof res.data === "object" && pathname.includes("CoA"))
        ) {
          const datosAgregados = {
            ...values,
            aplica_como: pathname.includes("tomador")
              ? "Tomador"
              : pathname.includes("CoA")
              ? "Co-arrendatario"
              : null,
            id_form: idForm,
            id_form_coa: pathname.includes("CoA") ? idFormCoa : "",
            ref_pago: `${values.cod_inmueble}_${values.num_doc}_${randomNum}`,
          };

          if (!values.mascotas && values.datos_mascotas.length > 0) {
            datosAgregados.datos_mascotas = [];
          }

          if (!values.otras_personas && values.datos_personas.length > 0) {
            datosAgregados.datos_personas = [];
          }

          siguienteHandler(datosAgregados);
        } else {
          setResValidation(res.data);
          idFormModalHandler();
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 500) {
        // Handle 500 error specifically
        toast.error(
          "Oops! Hubo un problema interno. Prueba de nuevo más tarde."
        );
      } else {
        // Handle other errors
        toast.error("Revisa la información que ingresaste e intenta de nuevo.");
      }
    }
  };

  return (
    <div className="lg:px-20 px-5 ">
      <div className="flex items-center mb-10 justify-center">
        <p className="text-xl font-bold">Verifica tus datos</p>
      </div>
      <div>
        <Formik
          initialValues={datosEstudio}
          enableReinitialize={true}
          validationSchema={datosPersonalesValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur: formikHandleBlur,
            errors,
            touched,
            dirty,
            handleSubmit,
          }) => (
            <Form>
              {console.log(errors)}
              <div className=" flex h-8 justify-end items-center pb-14">
                {!siguienteClickeado && dirty && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="my-3 py-1 px-2 rounded-full text-white font-semibold bg-primaryblue/80 hover:primaryblue/70"
                  >
                    Aplicar cambios
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 ">
                {location.pathname.includes("CoA") ? (
                  <div>
                    <div className="flex items-center justify-start gap-3 ">
                      <FaWpforms className="text-xl" />
                      <p className=" py-2 text-lg font-semibold">
                        Número de Formulario al que aplicas como
                        Co-Arrendatario.
                      </p>
                    </div>
                    <Field
                      disabled
                      className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                      type="text"
                      name="id_form_coa"
                    />
                    {/* {touched.cod_inmueble && errors.cod_inmueble ? (
                      <div className="text-red-500">{errors.cod_inmueble}</div>
                    ) : null} */}
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 ">
                    <div>
                      <div className="flex items-center justify-start gap-3 ">
                        <TbHomeHand className="text-xl" />
                        <p className=" py-2 text-lg font-semibold">
                          Código del inmueble
                        </p>
                      </div>
                      <Field
                        className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                        type="text"
                        name="cod_inmueble"
                        placeholder="Código del inmueble"
                        onChange={handleChange}
                        onBlur={(e) => {
                          formikHandleBlur(e);
                          handleBlur(e);
                        }}
                      />
                      {touched.cod_inmueble && errors.cod_inmueble ? (
                        <div className="text-red-500">
                          {errors.cod_inmueble}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <div>
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-3">
                            <Lottie
                              animationData={dotsload}
                              loop={true}
                              className="w-22 pt-20"
                            />
                          </div>
                        ) : !datosEstudio.cod_inmueble ||
                          !codigoValido(
                            datosEstudio.cod_inmueble
                          ) ? null : propiedad === false ? (
                          <div className="flex relative items-center gap-">
                            <span className="relative left-8 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <p className="text-red-600 px-10 text-center font-semibold p-3">{`No existe inmueble con código ${datosEstudio.cod_inmueble}. Ingresa un código válido para poder continuar con el formulario.`}</p>
                          </div>
                        ) : (
                          propiedad && <InmueblePreview propiedad={propiedad} /> // Show property details when API call returns a property
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="py-2 mt-2">
                  <div className="flex items-center gap-3 justify-start">
                    <HiOutlineIdentification className="text-xl" />
                    <p className=" py-2 text-lg font-semibold">
                      Datos personales
                    </p>
                  </div>
                  <label className="flex items-center ">Nombre completo</label>
                  <Field
                    disabled={propiedad === false}
                    className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                    name="nom_completo"
                    placeholder=""
                    onChange={handleChange}
                  />
                  {touched.nom_completo && errors.nom_completo ? (
                    <div className="text-red-500">{errors.nom_completo}</div>
                  ) : null}
                  <label className="flex items-center pb-1 justify-start">
                    Tipo de documento
                  </label>
                  <OpcionComp name="tipo_doc" opciones={tipoDeDocumento} />
                  <ErrorMessage
                    name="tipo_doc"
                    component="div"
                    className="text-red-500"
                  />
                  {/* <OpcionComp
                    datosEstudio={datosEstudio}
                    prop={"tipo_doc"}
                    setDatosEstudio={setDatosEstudio}
                    opciones={tipoDeDocumento}
                    updateField={updateField}
                  /> */}
                  {/* <Field
                    as="select"
                    onChange={handleChange}
                    name="tipo_doc"
                    className="block rounded-lg appearance-none w-full border border-gray-400 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Tipo de documento</option>
                    <option value="Cédula de ciudadanía">
                      Cédula de ciudadanía
                    </option>
                    <option value="Cédula de extranjería">
                      Cédula de extranjería
                    </option>
                    <option value="PPT">PPT</option>
                  </Field> */}
                  <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
                    <div>
                      <label className="flex pt-1 items-center justify-between ">
                        Número de documento
                      </label>
                      <Field
                        disabled={propiedad === false}
                        type="text"
                        className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                        onChange={handleChange}
                        name="num_doc"
                        // placeholder="Número de documento "
                      />
                      {touched.num_doc && errors.num_doc ? (
                        <div className="text-red-500">{errors.num_doc}</div>
                      ) : null}
                    </div>
                    {/*  */}
                    <div className="mb-4">
                      <label
                        className="flex pt-1 items-center "
                        htmlFor="selectedDate"
                      >
                        Fecha de expedición de tu documento
                      </label>
                      <Field
                        disabled={propiedad === false}
                        onChange={handleChange}
                        type="date"
                        name="fechaexp_doc"
                        className="block appearance-none w-full leading-tight focus:outline-none focus:border-blue-500  py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                      />
                      {touched.fechaexp_doc && errors.fechaexp_doc ? (
                        <div className="text-red-500">
                          {errors.fechaexp_doc}
                        </div>
                      ) : null}
                    </div>
                    {/* <Field
                    onChange={handleChange}
                    as="select"
                    name="pais"
                    className="block appearance-none w-full border border-gray-400 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                  >
                    {departamentosColombia.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </Field> */}
                  </div>
                </div>
                <div className="py-1">
                  <div className="flex items-center justify-start gap-3">
                    <MdOutlineContactPhone className="text-xl" />
                    <h2 className="py-2 text-lg font-semibold">
                      Información de contacto
                    </h2>
                  </div>
                  <label className="flex pt-1 items-center justify-between ">
                    Correo electrónico
                  </label>
                  <Field
                    disabled={propiedad === false}
                    onChange={handleChange}
                    className="w-full py-2 my-1 border-gray-300 px-3  bg-transparent rounded-lg border-[1px] ring-gray-800"
                    type="email"
                    name="email"
                    // placeholder="Correo electrónico"
                  />
                  {touched.email && errors.email ? (
                    <div className="text-red-500">{errors.email}</div>
                  ) : null}
                  <label className="flex pt-1 items-center  ">
                    Número de WhatsApp
                  </label>
                  <div className="flex items-center gap-2">
                    <OpcionComp name="num_whatsapp" opciones={countrycodes} />

                    <Field
                      disabled={propiedad === false}
                      type="text"
                      className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                      name="num_whatsapp"
                      value={values.num_whatsapp}
                      onChange={handleChange}
                      placeholder="Phone number"
                    />
                  </div>
                  {touched.num_whatsapp && errors.num_whatsapp ? (
                    <div className="text-red-500">{errors.num_whatsapp}</div>
                  ) : null}
                </div>

                {pathname.includes("CoA") ? null : (
                  <div>
                    {/* PERSONAS */}
                    <div className="py-3">
                      <label className="flex items-center justify-between ">
                        <div className="flex items-center justify-start gap-3">
                          <HiOutlineUserGroup className="text-xl" />
                          <p className="py-2 text-lg font-semibold">
                            ¿Vivirás con mas personas?
                          </p>
                        </div>

                        <Field
                          disabled={propiedad === false}
                          type="checkbox"
                          className=" cursor-pointer relative appearance-none md:w-4 md:h-4 w-3 h-3 border rounded-sm focus:outline-none checked:bg-primaryblue checked:text-primaryblue checked:ring-1 checked:ring-primaryblue  hover:ring hover:ring-primaryblue"
                          name="otras_personas"
                        />
                        {touched.otras_personas && errors.otras_personas ? (
                          <div className="text-red-500">
                            {errors.otras_personas}
                          </div>
                        ) : null}
                      </label>
                      {values.otras_personas && (
                        <div>
                          <FieldArray name="datos_personas">
                            {(props) => {
                              const { push, remove, form } = props;
                              const { values } = form;

                              return (
                                <div>
                                  {values.datos_personas.map((el, i) => (
                                    <div key={i}>
                                      <div>
                                        <p>{`Persona ${i + 1}`}</p>
                                      </div>
                                      <label className="flex pt-1 items-center ">
                                        Nombre completo y edad
                                      </label>
                                      <div className="flex lg:gap-5 sm:gap-1 items-center justify-start w-full">
                                        <div className="flex w-[80%] gap-1">
                                          <Field
                                            placeholder="Nombre completo"
                                            type="text"
                                            className="w-[80%] py-2 my-1 border-gray-300 px-3  bg-transparent rounded-lg border-[1px] ring-gray-800"
                                            name={`datos_personas.${i}.nombre`}
                                          />

                                          <Field
                                            placeholder="Edad"
                                            type="text"
                                            className="w-[20%]  py-2 my-1 border-gray-300 px-3  bg-transparent rounded-lg border-[1px] ring-gray-800"
                                            name={`datos_personas.${i}.edad`}
                                          />
                                        </div>

                                        <div className="flex lg:gap-3 sm:gap-2 justify-start items-center">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              push({ nombre: "", edad: "" })
                                            }
                                            className="flex items-center justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
                                          >
                                            <BsPersonAdd />
                                          </button>

                                          {i > 0 && (
                                            <button
                                              type="button"
                                              onClick={() => remove(i)}
                                              className="flex items-center justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
                                            >
                                              <BsPersonDash />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>
                                          <ErrorMessage
                                            name={`datos_personas.${i}.nombre`}
                                            component="div"
                                            className="text-red-500"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            }}
                          </FieldArray>
                        </div>
                      )}
                    </div>
                    {/* MASCOTAS */}
                    <div>
                      <label className="flex items-center justify-between ">
                        <div className="flex items-center justify-start gap-3">
                          <TbCat className="text-xl" />
                          <p className="py-2 text-lg font-semibold">
                            ¿Tienes mascotas?
                          </p>
                        </div>

                        <Field
                          disabled={propiedad === false}
                          className=" cursor-pointer relative appearance-none md:w-4 md:h-4 w-3 h-3 border rounded-sm focus:outline-none checked:bg-primaryblue checked:text-primaryblue checked:ring-1 checked:ring-primaryblue  hover:ring hover:ring-primaryblue"
                          type="checkbox"
                          name="mascotas"
                        />
                      </label>
                      {values.mascotas && (
                        <div>
                          <FieldArray name="datos_mascotas">
                            {(props) => {
                              const { push, remove, form } = props;
                              const { values } = form;

                              return (
                                <div>
                                  {values.datos_mascotas.map((el, i) => (
                                    <div key={i}>
                                      <div>
                                        <p>{`Mascota ${i + 1}`}</p>
                                      </div>
                                      <label className="flex pt-1 items-center ">
                                        Nombre de tu mascota y tipo
                                      </label>
                                      <div className="flex lg:gap-5 sm:gap-1 items-center justify-start w-full">
                                        <div className="flex w-[80%] gap-1">
                                          <Field
                                            placeholder="Nombre de tu mascota"
                                            type="text"
                                            className="w-[50%] py-2 my-1 border-gray-300 px-3  bg-transparent rounded-lg border-[1px] ring-gray-800"
                                            name={`datos_mascotas.${i}.nombre`}
                                          />

                                          <Field
                                            placeholder="Gato, perro, hamster..."
                                            type="text"
                                            className="w-[50%] py-2 my-1 border-gray-300 px-3  bg-transparent rounded-lg border-[1px] ring-gray-800"
                                            name={`datos_mascotas.${i}.tipo`}
                                          />
                                        </div>
                                        <div className="flex lg:gap-3 sm:gap-2 justify-start items-center">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              push({ nombre: "", tipo: "" })
                                            }
                                            className="flex items-center justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
                                          >
                                            <MdOutlineAdd />
                                          </button>

                                          {i > 0 && (
                                            <button
                                              type="button"
                                              className="flex items-center justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
                                              onClick={() => remove(i)}
                                            >
                                              <MdOutlineRemove />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                      <div>
                                        <ErrorMessage
                                          name={`datos_mascotas.${i}.nombre`}
                                          component="div"
                                          className="text-red-500"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            }}
                          </FieldArray>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="py-5 ">
                  <div className="flex justify-between items-center">
                    {/* <Field type="checkbox" name="autorizacion_datos" /> */}
                    <p className="">
                      Autorización de consulta y reporte a centrales de riesgo
                    </p>
                    {values.autorizacion_datos === true ? (
                      <div
                        className="flex items-center cursor-pointer relative appearance-none md:w-4 md:h-4 w-3 h-3 border rounded-sm focus:outline-none checked:bg-primaryblue checked:text-primaryblue ring-2   hover:ring ring-primaryblue"
                        onClick={showModalHandler}
                      >
                        <BsFillCheckSquareFill className=" text-green-500" />
                      </div>
                    ) : (
                      <div
                        onClick={showModalHandler}
                        className=" cursor-pointer relative appearance-none md:w-4 md:h-4 w-3 h-3 border rounded-sm focus:outline-none checked:bg-primaryblue checked:text-primaryblue checked:ring-1 checked:ring-primaryblue  hover:ring hover:ring-primaryblue"
                      ></div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <ErrorMessage
                      name="autorizacion_datos"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <button
                  disabled={propiedad === false}
                  className="flex items-center mt-5 font-bold justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
                  type="submit"
                >
                  Siguiente
                </button>
              </div>
              {showModal && (
                <AutorizacionModal
                  name={"autorizacion_datos"}
                  showModalHandler={showModalHandler}
                />
              )}
              {idFormModal && (
                <IdFormModal
                  resValidation={resValidation}
                  idFormModalHandler={idFormModalHandler}
                />
              )}
            </Form>
          )}
        </Formik>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default DatosPersonales;
