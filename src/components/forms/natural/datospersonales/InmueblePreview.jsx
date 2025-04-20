import React from "react";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { IoDiamondSharp } from "react-icons/io5";
import { MdOutlineBathtub } from "react-icons/md";
import { TbBed, TbPawFilled, TbRulerMeasure } from "react-icons/tb";

const InmueblePreview = ({ propiedad }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <img
            className="w-[100px] h-[115px] object-cover rounded-xl ring-1 "
            src={propiedad?.imagenes[0]}
            alt={`${propiedad?.tipo} en arriendo`}
          />
        </div>
        <div className="col-span-2">
          <h1 className="font-bold text-sm">{`${propiedad?.tipo} en ${propiedad?.titulo}, ${propiedad?.ciudad}`}</h1>
          <div className="lg:flex-wrap grid grid-cols-3   gap-2 items-center justify-start mt-1 ">
            <div className="flex w-full  text-xs  gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40">
              <TbBed className="text-sm text-primaryblue font-bold" />
              {propiedad?.habitaciones}
              {/* <span className="md:block hidden"> habitaciones</span> */}
            </div>
            <div className="flex w-full  text-xs  gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
              <MdOutlineBathtub className="text-sm text-primaryblue font-bold" />
              {propiedad?.baños}
              {/* <span className="md:block hidden"> baños</span> */}
            </div>
            {/* <div className="flex w-full text-xs gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
            <GiHomeGarage className="text-sm text-primaryblue font-bold" />
            {propiedad.garajes}
            {/* <span className="md:block hidden"> garajes</span> */}
            {/* </div>  */}
            <div className="flex w-full  text-xs gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
              <TbRulerMeasure className="text-2lg text-primaryblue" />
              {propiedad?.metros_cuadrados}
              {/* <span className="md:block hidden"> m2</span> */}
            </div>
            {/* <div className="flex w-full text-xs gap-1 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
            <GiLevelEndFlag className="text-sm text-primaryblue font-bold" /> */}
            {/* <span className="md:block hidden"> estrato </span> */}
            {/* {propiedad.estrato}
          </div> */}
          </div>

          <div className="flex items-center justify-evenly py-2 gap-3 px-3">
            {propiedad?.amoblada && (
              // {propiedad?.exclusivo && (
              <div className=" flex iterm-center text-black rounded-full  bg-pink-400/70 dark:bg-pink-400/80  p-[2px]">
                <CgSmartHomeWashMachine className=" font-light  text-md" />
                {/* <h1 className="px-3 text-xs  ">Amoblado</h1> */}
              </div>
            )}
            {propiedad?.petfriendly && (
              // {propiedad?.exclusivo && (
              <div
                className="flex items-center text-black bg-violet-400/70 dark:bg-violet-400/80  rounded-full p-[2px]"
                title="Pet Friendly"
              >
                <TbPawFilled className="text-md p-" />
                {/* <h1 className="px-2 text-xs ">Pet Friendly</h1> */}
              </div>
            )}
            {propiedad?.exclusivo && (
              <div className=" flex iterm-center text-black rounded-full  bg-amber-400/70 dark:bg-amber-400/80  p-[2px]">
                <IoDiamondSharp className=" text-md" />
                {/* <span className="ml-1 text-black  text-sm">Exclusiva</span> */}
              </div>
            )}
          </div>
          <div className="flex justify-between  items-center mb-[1px] font-bold text-primaryblue ">
            {propiedad?.precio_arriendo} /mes
            <span className="text-black text-xs font-medium ">
              {propiedad?.admin && ( //! admin
                // {propiedad?.exclusivo && ( //! admin */}
                <h2 className="bg-neutral-300/80 dark:text-black px-2 text-[10px] rounded-full  ">
                  Admin incl
                </h2>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InmueblePreview;
