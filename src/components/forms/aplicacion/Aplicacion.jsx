import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import { TbBuilding } from "react-icons/tb";
import { VscPerson } from "react-icons/vsc";

import { Tooltip, initTE } from "tw-elements";
// import { FaPersonHalfDress } from "react-icons/fa";

// import { updateDatosEstudio } from "../../../redux/formularioestudio/formularioEstudio.slice";

const Aplicacion = ({ siguienteHandler }) => {
  const datosEstudio = useSelector((state) => state.formularioEstudioSlice);

  initTE({ Tooltip });

  return (
    <div className=" ">
      <div className="flex items-center border-l-4 border-primaryblue justify-center text-justify lg:mx-14 px-5 lg:px-5 lg:py-5 py-2 shadow-inner shadow-gray-400">
        <p className="text-sm font-semibold text-gray-600">
          Esta aplicación tiene un costo de{" "}
          <strong className=" text-primaryblue">$50.000 IVA incluido</strong>,
          los cuales son abonables al pago de la reserva del inmueble. En caso
          de no aprobar la aplicación, este valor no es reembolsable.
        </p>
      </div>

      <div className="py-10">
        <Formik initialValues={datosEstudio} onSubmit={() => {}}>
          {({ values }) => (
            <Form>
              <h1 className="text-center font-medium mb-10">Aplicar como:</h1>
              <div className="flex items-center justify-center gap-10">
                <label>
                  <Field type="hidden" name="persona" value="Persona Natural" />
                  <button
                    className={`${
                      values.persona === "Persona Natural"
                        ? "bg-slate-300 ring-1 ring-slate-200"
                        : ""
                    } flex flex-row gap-3 shadow-lg shadow-gray-300 hover:bg-slate-200 text-gray-500 items-center ring-1 ring-gray-200 py-3 px-3 rounded-xl justify-center`}
                    type="button"
                    onClick={() => {
                      siguienteHandler({ persona: "Persona Natural" });
                    }}
                  >
                    <VscPerson className="text-5xl " />
                    <p className="text-xs font-bold">Persona Natural</p>
                  </button>
                </label>
                <label>
                  <Field
                    type="hidden"
                    name="persona"
                    value="Persona Jurídica"
                  />
                  <button
                    data-te-toggle="tooltip"
                    title="Esta opción no esta disponible"
                    // className={`${
                    //   !values.persona ? "bg-gray-200 ring-1 ring-gray-200" : ""
                    // } flex transition duration-150 ease-in-out transititext-primary flex-row gap-3 shadow-lg shadow-gray-300 text-gray-500 items-center ring-1 ring-gray-800 py-3 px-3 rounded-xl justify-center `}
                    className="bg-gray-200 ring-1 ring-gray-200 flex transition duration-150 ease-in-out transititext-primary flex-row gap-3 shadow-lg shadow-gray-300 text-gray-500 items-center  py-3 px-3 rounded-xl justify-center"
                    type="button"
                    disabled
                    onClick={() => {
                      siguienteHandler({ persona: "Persona Jurídica" });
                    }}
                  >
                    <TbBuilding className="text-5xl " />

                    <p className="text-xs font-bold">Persona Jurídica</p>
                  </button>
                </label>
              </div>
              {/* Add more radio buttons or form fields here */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Aplicacion;
