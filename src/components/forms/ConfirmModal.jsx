import { BsExclamationCircle } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

const ConfirmModal = ({ confirmarModalHandler, cancelarHandler }) => {
  return (
    <div
      // onClick={showModalHandler}
      className="fixed inset-0 flex items-center bg-black/80 justify-center z-50"
    >
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg sm:w-[50%] md:w-[60%] lg:w-[50%]">
        <div className="relative items-center bg-slate-50 dark:bg-slate-950 justify-center flex-row border-[0.5px] rounded-xl border-neutral-400 p-2 w-full">
          <div
            onClick={confirmarModalHandler}
            className="flex bg-white rounded-full p-1 absolute right-2 justify-end items-center  cursor-pointer"
          >
            <IoIosClose className="text-3xl" />
          </div>
          <div className="flex-row hide-scrollbar py-3 items-center overflow-y-auto max-h-[70vh]">
            <p className="text-xl text-center pb-2 px-10">
              Al cancelar la aplicación perderás todos los datos que ya
              ingresaste
            </p>
            <div className="flex items-center justify-center py-5">
              <BsExclamationCircle className="animate-pulse text-red-500 text-7xl" />
            </div>

            <p className="text-center text-lg py-5">
              ¿Estás seguro que quieres cancelar?{" "}
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="cursor-pointer py-2 px-10 text-center   rounded-full text-gray-500 font-bold flex justify-center ring-2"
                onClick={cancelarHandler}
              >
                Cancelar
              </button>
              <button
                className="cursor-pointer py-2 px-10 text-center   rounded-full text-white font-bold flex justify-center bg-primaryblue/80 hover:bg-primaryblue/70"
                onClick={confirmarModalHandler}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
