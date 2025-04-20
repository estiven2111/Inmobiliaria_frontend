/* eslint-disable react/prop-types */
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbMapSearch } from "react-icons/tb";

const BarraVerMapa = ({ toggleFullMap }) => {
  return (
    <div className="flex text-white w-full items-center justify-center  h-[90%] bg-gradient-to-b from-transparent dark:to-slate-950 to-white">
      <button
        onClick={toggleFullMap}
        className="flex gap-3 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 items-center justify-center px-3 py-2 "
      >
        <TbMapSearch /> Buscar en mapa
      </button>
    </div>
  );
};

export default BarraVerMapa;
