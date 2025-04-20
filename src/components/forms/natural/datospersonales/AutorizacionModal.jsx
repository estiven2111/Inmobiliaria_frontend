import { Field, useField } from "formik";
import { FaThumbsUp } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const AutorizacionModal = ({ showModalHandler, name }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <div
      // onClick={showModalHandler}
      className="fixed inset-0 flex items-center bg-black/80 justify-center z-50"
    >
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg sm:w-[50%] md:w-[60%] lg:w-[50%]">
        <div className="relative items-center bg-slate-50 dark:bg-slate-950 justify-center flex-row border-[0.5px] rounded-xl border-neutral-400 p-2 w-full">
          <div
            onClick={showModalHandler}
            className="flex bg-white rounded-full p-2 absolute right-2 justify-end items-center  cursor-pointer"
          >
            <IoIosClose className="text-3xl" />
          </div>
          <div className="flex-row hide-scrollbar items-center overflow-y-auto max-h-[70vh]">
            <div>
              <h4 className="text-center font-semibold py-5">
                {" "}
                Autorización de consulta y reporte a centrales de riesgo.
              </h4>
            </div>

            <div className="flex pb-3 items-center justify-center gap-3">
              <p className="text-justify px-2">
                Autorizo de manera expresa e irrevocable a{" "}
                <strong>ARRIENDALO S.A.S.</strong> o a quien represente sus
                derechos u ostente en el futuro a cualquier título la calidad de
                acreedor, a consultar, solicitar, suministrar, reportar,
                procesar y divulgar toda la información que se refiere a mi
                comportamiento crediticio, financiero y comercial a las
                Centrales de Riesgo que administra la Asociación Bancaria y de
                Entidades Financieras de Colombia o a quien represente sus
                derechos.
                <br /> Conozco que el alcance de esta autorización implica que
                el comportamiento frente a mis obligaciones será registrado con
                el objeto de suministrar información suficiente y adecuada al
                mercado sobre el estado de mis obligaciones financieras,
                comerciales, crediticias, de servicios y la proveniente de
                terceros países de la misma naturaleza. En consecuencia, quienes
                se encuentren afiliados y/o tengan acceso a la Central de
                Información – TRANSUNION y/o DATACREDITO podrán conocer esta
                información, de conformidad con la legislación y jurisprudencia
                aplicable.
                <br /> La información podrá ser igualmente utilizada para
                efectos estadísticos. Mis derechos y obligaciones así como la
                permanencia de mi información en las bases de datos corresponden
                a lo determinado por el ordenamiento jurídico aplicable del
                cual, por ser de carácter público, estoy enterado. Así mismo,
                manifiesto que conozco el contenido del reglamento de la
                TRANSUNION y/o DATACRÉDITO. En caso de que, en el futuro, el
                autorizado en este documento efectúe, a favor de un tercero, una
                venta de cartera o una cesión a cualquier título de las
                obligaciones a mi cargo, los efectos de la presente autorización
                se extenderán a éste en los mismos términos y condiciones.
                <br /> Así mismo, autorizo a la Central de Información a que, en
                su calidad de operador, ponga mi información a disposición de
                otros operadores nacionales o extranjeros, en los términos que
                establece la ley, siempre y cuando su objeto sea similar al aquí
                establecido.
              </p>
            </div>
            <div className="flex   items-center justify-center gap-3 py-5">
              <input
                onClick={showModalHandler}
                id="autorizacion"
                className="cursor-pointer hidden"
                type="checkbox"
                {...field}
              />
              <label
                htmlFor="autorizacion"
                className="text-lg bg-primaryblue/90  hover:bg-primaryblue/80 text-white py-2 px-3 rounded-xl  cursor-pointer  flex gap-3 items-center justify-center font-semibold"
              >
                <FaThumbsUp className="text-white" /> Aceptar
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutorizacionModal;
