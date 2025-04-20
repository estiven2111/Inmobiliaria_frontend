/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import ventana from "../../public/";
// import { MdCalendarMonth } from "react-icons/md";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import ReactDOMServer from "react-dom/server";
import { MdSchool } from "react-icons/md";
import { FaRegHospital } from "react-icons/fa";
import { BiChurch } from "react-icons/bi";
import MapSlide from "../components/Maps/MapSlide";
import ReactDOM from "react-dom";
import AgendarVisitaMap from "../components/detail/AgendarVisitaBarra";
import VerDetalle from "../components/Maps/VerDetalle";
import Maps from "../components/Maps/Maps";
import { IoIosClose } from "react-icons/io";
// AIzaSyAY3zPk-r72ELJTbepL7koVfZ6XgrE63dY
const FullMap = ({
  latitud,
  longitud,
  direccion,
  imagenes,
  ubicacion,
  propiedad,
  toggleFullMap,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-lg w-[95%] ">
      <div className="relative items-center bg-slate-50 dark:bg-slate-950 justify-center flex-row border-[0.5px]  rounded-xl border-neutral-400 p-3 w-full">
        <div
          onClick={toggleFullMap}
          className="flex absolute right-2 justify-end items-center cursor-pointer"
        >
          <IoIosClose className="text-2xl" />
        </div>
        <Maps
          latitud={latitud}
          longitu={longitud}
          direccion={direccion}
          imagenes={imagenes}
          ubicacion={ubicacion}
          propiedad={propiedad}
        />
      </div>
    </div>
  );
};
export default FullMap;
//(e)=>{setFiltro({...filtro,radio:e.target.value})}
