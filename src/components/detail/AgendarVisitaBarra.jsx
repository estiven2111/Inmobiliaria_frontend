/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { MdCalendarMonth } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { Link } from "react-router-dom";

const AgendarVisitaBarra = ({ property }) => {
  return (
    <div className="h-[85px] flex-row items-center justify-center">
      <div className="flex items-center justify-start ml-5 gap-3 text-primaryblue dark:text-lightblueone font-bold text-xl">
        <div className="py- flex gap-3">
          {property.precio_arriendo} /mes
          <span className=" flex items-center">
            {property.admin && ( //! admin
              <p className="bg-neutral-300/80  text-black font-light px-2 text-xs rounded-full  ">
                Admin Incluida
              </p>
            )}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between px-10 gap-3 py-2">
        {property.user.map((el, i) => (
          <a
            key={i}
            href={el.whatsapp}
            target="_blanck"
            className=" flex text-xs text-white w-full items-center justify-center  cursor-pointer gap-3 duration-300 hover:saturate-200 rounded-full px-6  bg-gradient-to-r from-indigo-400 to-indigo-600 p-2"
          >
            <MdCalendarMonth />
            Agendar Visita
          </a>
        ))}
        <div className=" flex items-center w-full text-xs justify-center gap-2 rounded-full cursor-pointer duration-500 hover:border-indigo-500 px-6 border-2 border-gradient-to-r from-indigo-400 to-indigo-600 py-2">
          <Link
            className="flex gap-3"
            to={`/aplicar_tomador/${property.codigo}`}
          >
            <FaWpforms /> Aplicar ya!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgendarVisitaBarra;
