import axios from "axios";
import { useSelector } from "react-redux";
import { useGetPropertiesByIdQuery } from "../../../../redux/RTKquery/propertyApi";
import InmueblePreview from "../datospersonales/InmueblePreview";
import ScrollToTop from "../../../ScrollToTop";
import { useLocation } from "react-router-dom";

const PagoConfirmacion = () => {
  const file = useSelector((state) => state.formularioEstudioSlice.files);
  const { datosEstudio } = useSelector((state) => state.formularioEstudioSlice);

  const { pathname } = useLocation();
  const { data: propiedad } = useGetPropertiesByIdQuery(
    datosEstudio.cod_inmueble
  );

  const minIngresoFormateado = propiedad?.precio_arriendo
    .replace("$", "")
    .replace(/\./g, "");

  const minIngreso = Number(minIngresoFormateado) * 2;


  return (
    <div className="px-5">
      <div className="flex items-center justify-center lg:w-[60%] mb-3">
        <InmueblePreview propiedad={propiedad} />
      </div>

      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <div className="flex mb-2 items-center border-r-4 border-l-4 border-indigo-500 justify-center text-justify  px-5 lg:px-5 lg:py-1 py-2 shadow-inner shadow-gray-400 text-lg">
        <p>
          <strong className="pl-2">
            Aplicas como:{" "}
            <span className="text-primaryblue">{datosEstudio.aplica_como}</span>
          </strong>
        </p>
      </div>
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 pt-5">
        <div>
          <div>
            <p>
              <strong>Persona:</strong>
              <br /> {datosEstudio.persona}
            </p>
            <p>
              <strong>Activida Económica:</strong> <br />
              {datosEstudio.act_economica}
            </p>
            {datosEstudio.act_economica === "Independiente" ||
            datosEstudio.act_economica === "Rentista de capital" ? (
              datosEstudio.datos_act_economica?.map((el, i) => (
                <div key={i}>
                  <p>
                    <strong>Declaras renta:</strong>
                    <br />
                    {el.declara_renta}
                  </p>
                </div>
              ))
            ) : datosEstudio.act_economica === "Empleado" ? (
              <div>
                <p>
                  <strong>Tipo de contrato:</strong> <br />
                  {datosEstudio.datos_act_economica[0].tipo_contrato}
                </p>
                <p>
                  <strong>Antigüedad en la empresa:</strong> <br />
                  {datosEstudio.datos_act_economica[0].tiempo_empresa}
                </p>
                <p>
                  <strong>Nombre de la empresa:</strong> <br />
                  {datosEstudio.datos_act_economica[0].nombre_empresa}
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <div>
            <div>
              <div className="flex mb-2 items-center border-l-4 border-primaryblue justify-center text-justify  px-5 lg:px-5 lg:py-1 py-2 shadow-inner shadow-gray-400 text-sm">
                <p>
                  Recuerda que para arrendar este inmueble debes ganar al menos{" "}
                  <strong className="pl-2">
                    <span className="text-primaryblue">
                      $ {minIngreso.toLocaleString("es-CO")}
                    </span>{" "}
                  </strong>
                </p>
              </div>
              <p>
                <strong>Ingresos mensuales:</strong> <br />${" "}
                {Number(datosEstudio.ingresos).toLocaleString("es-CO")}
              </p>
              <p>
                <strong>Egresos mensuales:</strong> <br />${" "}
                {Number(datosEstudio.egresos).toLocaleString("es-CO")}
              </p>
            </div>
          </div>
        </div>
        {/* <button onClick={submitForm}>Pagar Estudio</button> */}
      </div>
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <div>
        <strong>Tus Referencias:</strong> <br />
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10">
          {datosEstudio.datos_referencias?.map((el, i) => (
            <div key={i}>
              <p className="font-semibold">{`Referencia ${i + 1}`}</p>
              <p className="capitalize">{`Nombre: ${el.nombre}`}</p>
              <p>{`Teléfono: ${el.contacto}`}</p>
              <p>{`Parentesco: ${el.parentesco}`}</p>
            </div>
          ))}
        </div>
      </div>

      {pathname.includes("CoA") ? null : (
        <div className="">
          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          <div>
            <strong className="pb-3">Vivirán contigo:</strong>
            <h3 className="font-semibold">Personas:</h3>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              {datosEstudio.datos_personas?.length === 0 ? (
                <div>No has agregado personas</div>
              ) : (
                datosEstudio.datos_personas?.map((el, i) => (
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
              {datosEstudio.datos_mascotas?.length === 0 ? (
                <div>No has agregado mascotas</div>
              ) : (
                datosEstudio.datos_mascotas?.map((el, i) => (
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
      )}
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <ScrollToTop />
    </div>
  );
};

export default PagoConfirmacion;
