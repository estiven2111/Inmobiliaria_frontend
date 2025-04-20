import { ImDownload3 } from "react-icons/im";
import MarqueeSEO from "../MarqueeSEO";
import { politicadereservas } from "../../assets";

const Legal = () => {
  return (
    <div>
      <div className="container mx-auto py-10 sm:px-5 lg:px-20 pt-28 ">
        <div className="flex items-center pt-10 justify-center">
          <h1 className="lg:text-5xl text-2xl text-center font-bold dark:text-white text-primaryblue">
            Términos y Condiciones - PROMOS
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-20  mt-14 dark:text-gray-400 text-gray-700">
          <div>
            <h1 className="text-center lg:text-2xl text-xl font-medium">
              100% de descuento en tarifa mensual en el Plan Ligero
            </h1>
            <p className="text-justify mt-10">
              <strong>
                Promoción vigente desde el 22 de febrero de 2023 hasta el 28 de
                febrero de 2023.
              </strong>{" "}
              El propietario que adquiera el "Plan Ligero" obtendrá un 100% de
              descuento en la comisión de manejo equivalente al 4.5% mensual IVA
              incluído desde el Mes 2 del Contrato y hasta el Mes 12. En caso de
              renovarse el contrato de arrendamiento con el mismo inquilino,
              Arriendalo a partir del "Mes 13" equivalente al primer mes de la
              renovación, cobrará el equivalente al 4.5% mensual IVA incluído
              mes a mes y así sucesivamente hasta que se finalice el contrato de
              arrendamiento. Válido 1 vez por propietario y por propiedad.
              Descuento no es acumulable con otro tipo de ofertas o descuentos.
            </p>
          </div>
          <div>
            <h1 className="text-center lg:text-2xl text-xl font-medium">
              20% de descuento en la comisión de cierre y en la comisión de
              manejo por firmar exclusividad
            </h1>
            <p className="text-justify mt-10">
              <strong>
                Promoción vigente desde el 01 de enero de 2023 hasta el 31 de
                marzo de 2023. Aplica únicamente para el Plan Clásico y para el
                Plan Ultra Protracción.
              </strong>{" "}
              El propietario que publique su inmueble y firme con Arriendalo el
              contrato de exclusividad, disfrutará del 20% de descuento de la
              comisión de cierre la cual equivale al 100% del primer canon de
              arrendamiento IVA incluído una vez se formalice el contrato de
              arrendamiento con un inquilino y el 20% de descuento sobre la
              comisión de manejo mensual la cual equivale al 6% o 9% mensual IVA
              incluído según el plan elegido por el propietario. El descuento
              del 20% sobre la comisión de cierre es válido por una única vez
              por propiedad, en caso de que el propietario tenga más propiedades
              con Arriendalo, las mismas podrán disfrutar el beneficio una vez
              cada una. El descuento del 20% sobre la comisión de manejo mensual
              aplica desde el mes 2 y hasta la finalización del contrato de
              arrendamiento.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-900/50 py-10">
        <div className="flex items-center px-5 justify-center">
          <h1 className="lg:text-5xl text-2xl text-center  font-bold dark:text-white text-primaryblue">
            Términos y Condiciones - Servicios adicionales
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-20  mt-14 dark:text-gray-400 text-gray-700 mx-5 lg:mx-40">
          <div>
            <h1 className="text-center lg:text-2xl text-xl font-medium">
              Adelanta hasta 11 meses de canon
            </h1>
            <p className="text-justify mt-10">
              Arriendalo SAS ofrece a través de un aliado el servicio de
              adelanto de hasta 11 cánones de arrendamiento. Arriendalo no se
              hace responsable por los costos asociados que el aliado pueda
              cobrar por este servicio. Arriendalo incluye este beneficio con
              costo extra, únicamente en planes Clásico y Ultra Protección. El
              servicio de adelanto tiene un costo transaccional adicional por
              única vez y Arriendalo no fija este valor, el aliado es quien fija
              esta tarifa.
            </p>
          </div>
          {/*  */}
          <div>
            <h1 className="text-center lg:text-2xl text-xl font-medium">
              Asistencias 24/7
            </h1>
            <p className="text-justify mt-10">
              Arriendalo SAS ofrece a través de un aliado el servicio de
              asistencias al hogar que incluye plomería, cerrajería,
              electricidad y reemplazo de vidrios rotos. Este beneficio se
              incluye únicamente en Planes Clásico y Ultra Protección. En el
              plan Clásico se incluyen hasta 5 asistencias por vigencia de
              contrato (12 meses) y en el plan Ultra Protección se incluyen
              hasta 10 asistencias por vigencia de contrato (12 meses).
              Arriendalo cobrará una tarifa de $39,900 pesos por asistencia
              adicional IVA incluido, una vez superadas las asistencias
              incluidas en el contrato, más los gastos de los materiales, mano
              de obra y demás costos asociados que el aliado cobre a Arriendalo.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className=" px-5  py-10">
          <h1 className="lg:text-5xl text-2xl text-center  font-bold text-primaryblue">
            Avisos Legales
          </h1>
          <div className="flex items-center my-10 justify-center">
            <a
              href={politicadereservas}
              download="Politica de reservas"
              className="flex cursor-pointer lg:px-5 px-3 py-4 rounded-full items-center lg:w-[60%] w-full bg-slate-200 hover:bg-slate-300/40 dark:hover:bg-slate-700/70 duration-200 dark:bg-slate-800/70 justify-between"
            >
              <div>
                <h2>Politica de reservas (pdf)</h2>
              </div>
              <div className="flex items-center gap-2 justify-center text-primary">
                <ImDownload3 />
                Descargar
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="px-5">
        <MarqueeSEO />
      </div>
    </div>
  );
};

export default Legal;
