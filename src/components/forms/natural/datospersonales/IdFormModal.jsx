import { AiOutlineCopy } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { MdOutlineSmsFailed } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const IdFormModal = ({ idFormModalHandler, resValidation }) => {
  return (
    <div
      // onClick={showModalHandler}
      className="fixed inset-0 flex items-center bg-black/80 justify-center z-50"
    >
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg sm:w-[50%] md:w-[60%] lg:w-[50%]">
        <div className="relative items-center bg-slate-50 dark:bg-slate-950 justify-center flex-row border-[0.5px] rounded-xl border-neutral-400 pb-8 p-2 w-full">
          <div className=" flex items-center justify-center pt-5">
            <div className=" px-10 pb-3 items-center justify-center ">
              <div className="flex pb-5 items-center justify-center">
                <MdOutlineSmsFailed className="text-red-400 text-5xl animate-pulse" />
              </div>
              El usuario{" "}
              <strong className="capitalize">{resValidation?.nombre}</strong> ya
              creó una solicitud de estudio a este inmueble.
              <p>
                <br />
                El estado de la solicitud es{" "}
                <strong
                  className={`${
                    resValidation?.estado === "pendiente"
                      ? "bg-amber-600"
                      : resValidation?.estado === "rechazada"
                      ? "bg-red-700"
                      : resValidation?.estado === "aceptada"
                      ? "bg-green-500"
                      : null
                  } capitalize text-white px-2 py-1 rounded-lg`}
                >
                  {resValidation?.estado}
                </strong>{" "}
              </p>
              <br />
              <p className="text-justify">
                Para más información comunicate con el agente encargado del
                inmueble, el código de la solicitud es{" "}
                <strong>{resValidation?.id_form}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 pt-5">
            <button
              className="flex items-center justify-center  bg-primaryblue/80 hover:primaryblue/70  py-2 px-3 text-white rounded-lg"
              onClick={idFormModalHandler}
            >
              <TiTick className="text-lg" /> OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdFormModal;
