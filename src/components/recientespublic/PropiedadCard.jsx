/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Slide from "./Slide";

import moment from "moment/moment";
moment.locale("es");

import {
  MdOutlineBathtub,
  MdOutlineTableBar,
  MdOutlineHomeWork,
} from "react-icons/md";
import { TbBed, TbPawFilled, TbRulerMeasure } from "react-icons/tb";
import { GiHomeGarage } from "react-icons/gi";
import { IoDiamondSharp, IoPawSharp, IoLocationOutline } from "react-icons/io5";
import { BsFillLampFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { SiFurrynetwork } from "react-icons/si";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";

const PropiedadCard = ({ propiedad }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavClickHandler = () => {
    setIsFavorite(!isFavorite);
  };

  const cardConditionalClass = propiedad.exclusivo
    ? "exclusive_card"
    : "normal_card";

  const takeToWhatsapp = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div
      className={`md:w-[342px] md:h-[500px] ${cardConditionalClass} hover:translate-y-[-3px]rounded-xl relative duration-200 to-90 `}
      // className={`w-full h-auto ${cardConditionalClass} hover:translate-y-[-3px] relative duration-200 to-90 `}
    >
      {/* {propiedad.exclusivo && (
        <span className="absolute flex items-center justify-center w-[100px] h-10  text-black  z-10 -top-2 duration-200  -right-2   whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 saturate-200  p-1 align-baseline  font-bold leading-none  ">
          <IoDiamondSharp className="text-sky-00 text-sky-400  text-2xl" />

          <span className="w-full items-center text-center h-full dark:bg-darkblue bg bg-slate-100 opacity/70 p-1 text-darkblue dark:text-white rounded-full text-lg ">
            Exclusiva
          </span>
        </span>
      )} */}
      {propiedad.exclusivo && (
        <span className="shine_badge absolute -top-2 -right-2 flex items-center justify-center text-xs font-semibold text-black rounded-full bg-gradient-to-l from-amber-200 to-amber-400  ">
          <IoDiamondSharp className=" text-lg" />
          <span className="ml-1 text-black  text-sm">Exclusiva</span>
        </span>
      )}

      {/* <span className="absolute flex items-center justify-center p-1  text-black  z-20 -top-0 duration-200  -left-0   whitespace-nowrap rounded-full  align-baseline  font-bold leading-none ">
        <IoDiamondSharp className="text-sky-00 text-sky-400  text-2xl" />  */}

      {/* <span
          className="w-full items-center text-center h-full dark:bg-darkblue p-1 bg-slate-300 opacity/70  text-darkblue dark:text-white rounded-full text-2xl "
          title="Pet Friendly"
        >  */}
      {/* <IoPawSharp />
        </span>
      </span> */}

      <div className="relative rounded-xl">
        {/* {isFavorite ? (
          <button
            onClick={onFavClickHandler}
            className="absolute bg-red-50 hover:bg-transparent  p-2 z-10 bottom-5 right-5 rounded-full text-lg transition-colors duration-700"
          >
            <BsHeartFill className="text-red-700  text-lg transition-colors duration-700 hover:saturate-200" />
          </button>
        ) : (
          <button
            onClick={onFavClickHandler}
            className="bg-neutral-50 absolute p-2 z-10 bottom-5 right-5 rounded-full text-lg transition-colors duration-700"
          >
            <BsHeart className="text-black text-lg hover:scale-110  font-bold transition-colors duration-700 " />
          </button>
        )} */}
        <Slide
          slide={[...propiedad.imagenes]}
          propiedad={propiedad.tipo}
          ciudad={propiedad.ciudad}
        />
      </div>
      <Link to={`/propiedades/${propiedad.codigo}`} target="_blank">
        <header className="px-3 h-18 py-2   items-center w-full  cursor-pointer">
          <div className="grid grid-cols-5 gap-4  ">
            <div className="col-span-3 ">
              <div className="col-start-1 ">
                <div className="px-3 py-2 grid grid-cols-2 bg-slate-400/40 rounded-2xl justify-items-stretch">
                  <div className="grid grid-cols-2 gap-1 items-center">
                    <TbBed className="text-lg" /> {propiedad.habitaciones}
                  </div>

                  <div className="grid grid-cols-2 gap-1 items-center">
                    <MdOutlineBathtub className="text-lg" /> {propiedad.baños}
                  </div>

                  <div className="grid grid-cols-2 gap-1 items-center">
                    <GiHomeGarage className="text-lg pb-[1px]" />
                    {propiedad.garajes}
                  </div>

                  <div className="text-md grid grid-cols-2 items-center gap-1">
                    <TbRulerMeasure className="text-lg" />
                    <div className="flex items-baseline gap-1">
                      {propiedad.metros_cuadrados}
                      {/* <span className="text-xs">m2</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2  justify-end ">
              <div className=" flex items-center text-black bg-teal-300/70 dark:bg-teal-300/80 mb-[3px] rounded-full px-1">
                <MdOutlineHomeWork className="text-lg p-" />
                <h1 className="px-2 text-xs ">{propiedad.tipo}</h1>
              </div>
              {propiedad.amoblado && (
                <div className=" flex iterm-center text-black rounded-full  bg-pink-400/70 dark:bg-pink-400/80 mb-[3px] px-1">
                  <CgSmartHomeWashMachine className="  text-lg" />
                  <h1 className="px-3 text-xs  ">Amoblado</h1>
                </div>
              )}
              {propiedad.petfriendly && (
                <div
                  className="flex items-center text-black bg-violet-400/70 dark:bg-violet-400/80  rounded-full px-1"
                  title="Pet Friendly"
                >
                  <TbPawFilled className="text-md p-" />
                  <h1 className="px-2 text-xs ">Pet Friendly</h1>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="flex px-3 border-t-2 py-2 items-center justify-between">
          <div className=" gap-2">
            <h1 className="font-bold text-md">
              {propiedad.titulo.length > 25
                ? `${propiedad.titulo.slice(0, 25)}...`
                : propiedad.titulo}
            </h1>
          </div>
          <h2 className="flex gap-1 items-center">
            <IoLocationOutline className="xl:text-lg md:text-md " />
            {propiedad.ciudad}
          </h2>
        </div>
        <div className="flex px-3 border-t-2 py-2 items-center justify-between">
          <p className="font-bold text-xl">
            {propiedad.precio_arriendo}
            <span className="font-light text-sm"> /mes</span>
          </p>
          <div className="flex px-2 gap-5 pt-3 justify-between  py-2">
            {/* <div className="flex  align-self-end text-end ">
              {propiedad.admin ? ( //! admin
                <p className="exclusive_admin">Admin Incluida</p>
              ) : (
                <p className="normal_admin">Admin Incluida</p>
              )}
            </div> */}
          </div>
        </div>
      </Link>
      <div className=" p-2">
        <div className=" overflow-hidden relative  rounded-3xl ">
          <div>
            <button
              onClick={() => takeToWhatsapp(propiedad.whatsapp)}
              // href={el.whatsapp}
              // target="_blanck"
              className={`button flex items-center justify-center gap-2 ${
                propiedad.exclusivo ? "exclusive_btn" : "normal_btn"
              }`}
            >
              <MdCalendarMonth />
              Agendar Visita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropiedadCard;
