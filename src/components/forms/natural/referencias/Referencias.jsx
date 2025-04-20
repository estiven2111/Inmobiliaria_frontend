import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { BsPersonAdd, BsPersonDash } from "react-icons/bs";
import { TbFriends } from "react-icons/tb";
import { updateDatosEstudio } from "../../../../redux/formularioestudio/formularioEstudio.slice";
import { referenciasValidationSchema } from "../../validaciones";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "../../../ScrollToTop";

const Referencias = ({ siguienteHandler }) => {
  const dispatch = useDispatch();

  const datosEstudio = useSelector(
    (state) => state.formularioEstudioSlice.datosEstudio
  );

  const handleSubmit = (values) => {
    // dispatch(updateDatosEstudio(values));
    siguienteHandler(values);
  };

  //   datos_referencias: [{ nombre: "", contacto: "", parentesco: "" }],

  return (
    <div className="lg:px-20 px-5">
      <div>
        <Formik
          initialValues={datosEstudio}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={referenciasValidationSchema}
        >
          {({ values, handleChange, error, touched }) => (
            <Form>
              <div>
                <div>
                  <FieldArray name="datos_referencias">
                    {(props) => {
                      const { push, remove, form } = props;
                      const { values } = form;

                      return (
                        <div>
                          <div className="flex items-center justify-start gap-3 ">
                            <TbFriends className="text-xl" />
                            <p className=" py-2 text-lg font-semibold">
                              Referecia personal o familiar
                            </p>
                          </div>

                          {values.datos_referencias.map((el, i) => (
                            <div key={i} className="pt-5">
                              <div>
                                <p>{`Referencia ${i + 1}`}</p>
                              </div>
                              <div className="grid grid-cols-1 w-full">
                                <Field
                                  placeholder="Nombre completo"
                                  type="text"
                                  className="w-full py-2 my-1 border-gray-300 px-3  bg-transparent rounded-lg border-[1px] ring-gray-800"
                                  name={`datos_referencias.${i}.nombre`}
                                />
                                <ErrorMessage
                                  name={`datos_referencias.${i}.nombre`}
                                  component="div"
                                  className="field-error text-red-500 text-xs"
                                />
                                <div className="flex gap-3 w-full">
                                  <div className="w-full">
                                    <Field
                                      placeholder="Numero de contacto"
                                      type="text"
                                      className="w-full py-2 my-1 border-gray-300 px-3  bg-transparent rounded-lg border-[1px] ring-gray-800"
                                      name={`datos_referencias.${i}.contacto`}
                                    />
                                    <ErrorMessage
                                      name={`datos_referencias.${i}.contacto`}
                                      component="div"
                                      className="field-error text-red-500 text-xs"
                                    />
                                  </div>
                                  <div className="w-full">
                                    <Field
                                      placeholder="Parentesco"
                                      type="text"
                                      className="w-full py-2 my-1 border-gray-300 px-3  bg-transparent rounded-lg border-[1px] ring-gray-800"
                                      name={`datos_referencias.${i}.parentesco`}
                                    />
                                    <ErrorMessage
                                      name={`datos_referencias.${i}.parentesco`}
                                      component="div"
                                      className="field-error text-red-500 text-xs"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-3  justify-end items-center">
                                  <button
                                    type="button"
                                    className="flex items-center justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
                                    onClick={() =>
                                      push({
                                        nombre: "",
                                        contacto: "",
                                        parentesco: "",
                                      })
                                    }
                                  >
                                    <BsPersonAdd />
                                  </button>

                                  {i > 0 && (
                                    <button
                                      className="flex items-center justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
                                      type="button"
                                      onClick={() => remove(i)}
                                    >
                                      <BsPersonDash />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
              </div>
              <button
                className="flex  w-full items-center mt-10 font-bold justify-center py-2 px-3 gap-2 bg-primaryblue/70 hover:bg-indigo-300/30 rounded-lg text-white"
                type="submit"
              >
                Siguiente
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Referencias;
