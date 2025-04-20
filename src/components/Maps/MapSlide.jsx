/* eslint-disable react/prop-types */
import { useState } from "react";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { GiHomeGarage, GiLevelEndFlag } from "react-icons/gi";
import { IoDiamondSharp } from "react-icons/io5";
import {
  MdCalendarMonth,
  MdOutlineBathtub,
  MdOutlineHomeWork,
} from "react-icons/md";
import { SiFurrynetwork } from "react-icons/si";
import { TbBed, TbPawFilled, TbRulerMeasure } from "react-icons/tb";
import { TiChevronRight, TiChevronLeft } from "react-icons/ti";
import { Link } from "react-router-dom";

// export const SlideDots = ({ slideLength, activeIndex }) => {
//   return (
//     <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-2 mb-1">
//       {Array.from({ length: slideLength }).map((_, index) => (
//         <div
//           key={index}
//           className={`h-1 w-1 rounded-full ${
//             activeIndex === index ? "bg-white" : "bg-white/60"
//           }`}
//         ></div>
//       ))}fff
//     </div>
//   );
// };

const MapSlide = ({ slide, propiedad }) => {
  const [currImage, setCurrImage] = useState(0);

  const prev = () => {
    setCurrImage((prevImage) =>
      prevImage === 0 ? slide.length - 1 : prevImage - 1
    );
  };

  const next = () => {
    setCurrImage((prevImage) =>
      prevImage === slide.length - 1 ? 0 : prevImage + 1
    );
  };

  return (
    <div>
      <div className="relative overflow-hidden group rounded-xl ">
        <div
          className="flex  w-full transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${currImage * 100}%)` }}
        >
          {slide?.map((el, i) => (
            <img
              key={i}
              src={el}
              alt={`${propiedad.tipo} en arriendo`}
              className="w-full h-auto rounded-xl object-cover"
            />
          ))}
        </div>
        {/* <SlideDots slideLength={slide.length} activeIndex={currImage} /> */}
        <div className="absolute inset-0  flex items-center justify-between text-white  ">
          <button onClick={prev} className="  group-hover:block ">
            <TiChevronLeft className="lg:hidden  text-xl group-hover:block p-[0.5] bg-neutral-300/90 py-1 rounded-md" />
          </button>
          <button onClick={next} className=" group-hover:block ">
            <TiChevronRight className="lg:hidden text-xl  group-hover:block p-[0.5] bg-neutral-300/90 py-1 rounded-md" />
          </button>
        </div>
      </div>
      {/* //! TERMINA SLIDE DE IMAGENES  */}
      <div className="flex-row justify-center px-4 items-center mt-[1px] py-1 gap-1 border-neutral-400 rounded-xl border-[0.5px] ">
        <div className=" flex items-center justify-center text-black bg-teal-300/70 dark:bg-teal-300/80 mb-[3px] rounded-full px-[2px]">
          <MdOutlineHomeWork className="text-md p-" />
          <h1 className="px-2 text-xs ">{propiedad.tipo}</h1>
        </div>
        <div className="flex items-center justify-start gap-3 px-3">
          {propiedad.amoblada && (
            <div className=" flex iterm-center text-black rounded-full  bg-pink-400/70 dark:bg-pink-400/80  p-[2px]">
              <CgSmartHomeWashMachine className=" font-light  text-md" />
              {/* <h1 className="px-3 text-xs  ">Amoblado</h1> */}
            </div>
          )}
          {propiedad.petfriendly && (
            <div
              className="flex items-center text-black bg-violet-400/70 dark:bg-violet-400/80  rounded-full p-[2px]"
              title="Pet Friendly"
            >
              <TbPawFilled className="text-md p-" />
              {/* <h1 className="px-2 text-xs ">Pet Friendly</h1> */}
            </div>
          )}
          {propiedad.exclusivo && (
            <div className=" flex iterm-center text-black rounded-full  bg-amber-400/70 dark:bg-amber-400/80  p-[2px]">
              <IoDiamondSharp className=" text-sm" />
              {/* <span className="ml-1 text-black  text-sm">Exclusiva</span> */}
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="lg:flex-wrap grid grid-cols-3   gap-2 items-center justify-start mt-1 ">
          <div className="flex w-full  text-xs  gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40">
            <TbBed className="text-sm text-primaryblue font-bold" />
            {propiedad.habitaciones}
            {/* <span className="md:block hidden"> habitaciones</span> */}
          </div>
          <div className="flex w-full  text-xs  gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
            <MdOutlineBathtub className="text-sm text-primaryblue font-bold" />
            {propiedad.baños}
            {/* <span className="md:block hidden"> baños</span> */}
          </div>
          {/* <div className="flex w-full text-xs gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
            <GiHomeGarage className="text-sm text-primaryblue font-bold" />
            {propiedad.garajes}
            {/* <span className="md:block hidden"> garajes</span> */}
          {/* </div>  */}
          <div className="flex w-full  text-xs gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
            <TbRulerMeasure className="text-2lg text-primaryblue" />
            {propiedad.metros_cuadrados}
            {/* <span className="md:block hidden"> m2</span> */}
          </div>
          {/* <div className="flex w-full text-xs gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
            <GiLevelEndFlag className="text-sm text-primaryblue font-bold" /> */}
          {/* <span className="md:block hidden"> estrato </span> */}
          {/* {propiedad.estrato}
          </div> */}
        </div>
        <hr className="border-[0.2] mt-1 " />
        <div className="flex items-center text-black justify-start">
          <h1 className="font-bold pt-[1.5px]">
            {" "}
            {propiedad.titulo.length > 20
              ? `${propiedad.titulo.slice(0, 20)}...`
              : propiedad.titulo}{" "}
          </h1>
        </div>
        <hr className="border-[0.2]  mt-[1px] " />
        <div className="flex justify-between items-center mb-[1px] font-bold text-primaryblue ">
          {propiedad.precio_pesos} /mes
          <span className="text-black text-xs font-medium ">
            {propiedad.admin && ( //! admin */}
              <h2 className="bg-neutral-300/80 dark:text-black px-2 text-[10px] rounded-full  ">
                Admin incl
              </h2>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapSlide;
