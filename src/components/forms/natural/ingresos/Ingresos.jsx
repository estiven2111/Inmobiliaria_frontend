import { ErrorMessage, Field, Form, Formik } from "formik";
import { actividadEconomica, tipoDeContrato } from "../../arraysFormulario";
import OpcionComp from "../../OpcionComp";
import { MdWorkOutline } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { ingresosValidationSchema } from "../../validaciones";
import { useGetPropertiesByIdQuery } from "../../../../redux/RTKquery/propertyApi";
import { useEffect, useState } from "react";
import ScrollToTop from "../../../ScrollToTop";
import { useSelector } from "react-redux";

const Ingresos = ({ siguienteHandler, atrasHandler }) => {
  const datosEstudio = useSelector(
    (state) => state.formularioEstudioSlice.datosEstudio
  );

  const [siguienteClickeado, setSiguienteClickeado] = useState(false);

  const handleSubmit = (values) => {
    setSiguienteClickeado(true);
    siguienteHandler(values);
  };

  const {
    data: propiedad,
    isLoading,
    isError,
    isSuccess,
  } = useGetPropertiesByIdQuery(datosEstudio.cod_inmueble);

  // "precio_arriendo": "$650.000",
  const minIngresoFormateado = propiedad?.precio_arriendo
    .replace("$", "")
    .replace(/\./g, "");

  const minIngreso = Number(minIngresoFormateado) * 2;

  //?  act_economica: "",
  //?  datos_act_economica: [],
  //?  ingresos: 0,
  //?  egresos: 0,
  return (
    <div className="lg:px-20 px-5 ">
      <div>
        <Formik
          initialValues={datosEstudio}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={ingresosValidationSchema}
        >
          {({ values, errors, touched, handleChange, dirty, handleSubmit }) => (
            <Form>
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
              <div className="grid grid-cols-1">

                <div>
                  <div className="grid lg:grid-cols-1 sm:grid-cols-1 gap-2 items-center justify-between">
                    <div>
                      <div className="flex items-center justify-start gap-3 ">
                        <MdWorkOutline className="text-xl" />
                        <p className=" py-2 text-lg font-semibold">
                          ¿Cuál es tu principal actividad económica?
                        </p>
                      </div>
                    </div>

                    <div className="w-full pb-2">
                      <OpcionComp
                        name={"act_economica"}
                        opciones={actividadEconomica}
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="act_economica"
                    component="div"
                    className=" text-red-500 text-xs"
                  />
                  {/* <Field as="select" name="act_economica">
                    <option value="">Selecciona tu actividad economica</option>
                    {actividadEconomica.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </Field> */}
                  {values.act_economica === "Empleado" && (
                    <div className="py-5 ring-1 rounded-xl ring-gray-300 px-3">
                      <div className="grid grid-cols-1 ">
                        <label className="flex items-center justify-start gap-2 ">
                          Tipo de contrato{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <OpcionComp
                          name={`datos_act_economica[${0}].tipo_contrato`}
                          opciones={tipoDeContrato}
                        />
                        <label className="flex pt-1 items-center justify-start gap-2 ">
                          Antigüedad en la empresa{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                          name={`datos_act_economica[${0}].tiempo_empresa`}
                          // placeholder="Antigüedad en la empresa"
                        />{" "}
                        <label className="flex items-center justify-start gap-2 ">
                          Nombre de la empresa{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                          name={`datos_act_economica[${0}].nombre_empresa`}
                          // placeholder="Nombre de la empresa"
                        />
                      </div>
                    </div>
                  )}
                  <ErrorMessage
                    name={`datos_act_economica[${0}]`}
                    component="div"
                    className="field-error text-red-500 text-xs"
                  />
                  {(values.act_economica === "Independiente" ||
                    values.act_economica === "Rentista de capital") && (
                    <div className="py-5 ring-1 rounded-xl ring-gray-300 px-3 flex justify-center items-center ">
                      <div>
                        <label className="flex items-center gap-2 ">
                          ¿Declaras renta?{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <div className="flex items-center pt-5 justify-start gap-10">
                          <div className="flex gap-2">
                            <Field
                              type="radio"
                              name={`datos_act_economica[${0}].declara_renta`}
                              value="Si"
                            />
                            <label className="flex items-center  ">Si</label>
                          </div>
                          <div className="flex gap-2">
                            <Field
                              type="radio"
                              name={`datos_act_economica[${0}].declara_renta`}
                              value="No"
                            />
                            <label className="flex items-center  ">No</label>
                          </div>
                        </div>
                      </div>
                      <ErrorMessage
                        name={`datos_act_economica[${0}]`}
                        component="div"
                        className="field-error text-red-500 text-xs"
                      />
                    </div>
                  )}
                  <ErrorMessage
                    name={`datos_act_economica`}
                    component="div"
                    className="field-error text-red-500 text-xs"
                  />
                </div>
                <div>
                  <div className="py-3">
                    <div className="flex  items-center border-l-4 border-primaryblue justify-center text-justify lg:mx-14 px-5 lg:px-5 lg:py-5 py-2 shadow-inner shadow-gray-400">
                      <p>
                        Para arrendar este inmueble debes ganar al menos
                        <strong className="pl-2">
                          <span className="text-primaryblue">
                            $ {minIngreso.toLocaleString("es-CO")}
                          </span>{" "}
                        </strong>
                        <br />
                        (dos veces el valor del canon){" "}
                      </p>
                    </div>
                    <div className="flex pt-8 items-center justify-start gap-3 ">
                      <TbReportMoney className="text-xl" />
                      <p className=" py-2 text-lg font-semibold">
                        ¿Cuál es el valor de tus ingresos?
                      </p>
                    </div>
                    <Field
                      type="text"
                      className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                      name="ingresos"
                      placeholder="ingresos"
                      onChange={handleChange}
                    />
                  </div>{" "}
                  <ErrorMessage
                    name="ingresos"
                    component="div"
                    className=" text-red-500 text-xs"
                  />
                </div>
                <div>
                  <div>
                    <div className="flex items-center justify-start gap-3 ">
                      <TbReportMoney className="text-xl" />

                      <p className=" py-2 text-lg font-semibold">
                        ¿Cuál es el valor de tus gastos mensuales?
                      </p>
                    </div>
                    <Field
                      type="text"
                      name="egresos"
                      className="w-full py-2 my-1 border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                      placeholder="Egresos"
                      onChange={handleChange}
                    />
                  </div>
                  <ErrorMessage
                    name="egresos"
                    component="div"
                    className="field-error text-red-500 text-xs"
                  />
                </div>
                <button
                  className="flex items-center mt-5 font-bold justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
                  type="submit"
                >
                  Siguiente
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Ingresos;
