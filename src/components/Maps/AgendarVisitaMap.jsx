import { MdCalendarMonth } from "react-icons/md";

const AgendarVisitaMap = () => {
  return (
    <div className="flex items-center mt-[0.5px] justify-center">
      <button className=" font-medium  flex py-[2px] px-2 border-[1px] rounded-full w-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-xs text-white items-center justify-center gap-1 ">
        <MdCalendarMonth className="text-sm" />
        Agendar
      </button>
    </div>
  );
};

export default AgendarVisitaMap;
