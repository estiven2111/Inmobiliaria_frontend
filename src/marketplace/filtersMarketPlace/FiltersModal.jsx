//!SIRVE========>
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { IoIosClose } from "react-icons/io";
import RangeSlider from "./RangeSlider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterData } from "../../redux/landingpage/FilterDataObj.slice";
import {
  tiposPropiedad,
  habitaciones,
  banos,
  estrato,
  garajes,
} from "../../data";

const FiltersModal = ({
  filterModalHandler,
  // handlerfilterCombi,
  // limpiarFiltrosMP,
  // searchsMain,
}) => {
  const { filterLanding, tipesPropertyFiltered, minmaxPropertyFiltered } =
    useSelector((state) => state.FilterDataObjSlice);
  const [searchs, setSearchs] = useState(filterLanding);

  const dispatch = useDispatch();
  //!TRACKING IF ACTIVE

  const [isActive, setIsActive] = useState("");

  const handlerfilterLocal = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setSearchs((prevState) => {
      const updatedState = { ...prevState };
      if (updatedState[name] === value) {
        updatedState[name] = getDefaultPropertyValue(name);
        setIsActive("");
      } else {
        updatedState[name] = value;
        setIsActive(value);
      }
      return updatedState;
    });
  };

  const getDefaultPropertyValue = (property) => {
    // Trae el valor por default the cada propiedad
    const defaultValues = {
      search: "",
      petfriendly: false,
      exclusive: "",
      bathrooms: "",
      garages: "",
      bedrooms: "",
      stratum: "",
      pricemin: "",
      pricemax: "",
      areamin: "",
      areamax: "",
      priceMinMax: "",
      tipeproperty: "",
      ciudad: "",
      habitaciones: "",
      tipo: "",
    };
    return defaultValues[property];
  };

  //!==============================================

  // const handlerfilterLocal = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setSearchs({
  //     ...searchs,
  //     [name]: value,
  //   });
  // };

  const aplicarFiltro = () => {
    // handlerfilterCombi(searchs);
    dispatch(FilterData(searchs));
    filterModalHandler();
  };

  useEffect(() => {
    setSearchs(filterLanding);
  }, [filterLanding]);

  const limpiarTodosFiltros = () => {
    // limpiarFiltrosMP();

    dispatch(
      FilterData({
        search: "",
        petfriendly: false,
        exclusive: "",
        bathrooms: "",
        garages: "",
        bedrooms: "",
        stratum: "",
        pricemin: "",
        pricemax: "",
        areamin: "",
        areamax: "",
        priceMinMax: "",
        tipeproperty: "",
        ciudad: "",
        habitaciones: "",
        tipo: "",
      })
    );
  };
  const handlerRangePrice = (value) => {
    setSearchs({
      ...searchs,
      pricemin: value[0],
      pricemax: value[1],
    });
  };

  return (
    <div
      // onClick={filterModalHandler}
      className="fixed inset-0 flex items-center bg-black/80 justify-center z-50"
    >
      <div className="bg-white dark:bg-slate-900 p-5 z-10 rounded-xl sm:w-[40%] md:w-[80%] lg:w-[40%] h-[80%]">
        <div className="relative items-center bg-slate-50 dark:bg-slate-950 border-transparent justify-center flex-row  rounded-xl  p-3 w-full h-[100%] overflow-hidden overflow-y-scroll hide-scrollbar ">
          <div className="absolute">
            <div
              onClick={filterModalHandler}
              className="flex sm:absolute bg-slate-200 dark:bg-slate-700 rounded-full lg:fixed lg:right-96 lg:top-20  right-10 justify-end items-center cursor-pointer "
            >
              <IoIosClose className="text-2xl" />
            </div>
          </div>
          <div className="flex-row items-center lg:justify-start  ">
            <div>
              <h1 className="font-bold text-center">Filtros</h1>
            </div>
            <hr className="border-[0.2] mt-2" />
            <div className="flex py-8 px-5">
              <RangeSlider
                // titulo={"Precio de arriendo"}
                // min={500000}
                // max={331300000}
                handlerRangeL={handlerRangePrice}
                isActive={isActive}
              />
            </div>
            <hr className="border-[0.2] mt-2" />
            <h1 className="font-bold mt-2">Tipo de propiedad</h1>
            <div className="">
              <div className="grid grid-cols-3 items-center justify-start gap-3 mt-3">
                {tiposPropiedad.map((el, i) => (
                  <button
                    key={i}
                    // tipo propiedad Casa valor 1
                    name={el.name}
                    value={el.value}
                    onClick={handlerfilterLocal}
                    // className="p-2 border-[1px] rounded-full"
                    className={`p-2 px-3 border-[1px] md:text-lg text-xs rounded-full ${
                      searchs.tipeproperty === el.value
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-white/20 hover:bg-white/30 text-black"
                    }`}
                  >
                    {el.opcion}
                  </button>
                ))}
              </div>
            </div>
            <hr className="border-[0.2] mt-2" />
            <h1 className="font-bold mt-2">Numero de habitaciones</h1>
            <div className="flex items-center justify-start gap-3 mt-3">
              {habitaciones.map((el, i) => (
                <button
                  key={i}
                  // className="p-2 px-3 border-[1px] rounded-full"
                  className={`p-2 px-3 border-[1px] rounded-full ${
                    searchs.bedrooms === el.value
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-white/20 hover:bg-white/30 text-black"
                  }`}
                  onClick={handlerfilterLocal}
                  name={el.name}
                  value={el.value}
                >
                  {el.opcion}
                </button>
              ))}
            </div>
            <hr className="border-[0.2] mt-2" />
            <h1 className="font-bold mt-2">Numero de baños</h1>
            <div className="flex items-center justify-start gap-3 mt-3">
              {banos.map((el, i) => (
                <button
                  key={i}
                  // className="p-2 px-3 border-[1px] rounded-full"
                  className={`p-2 px-3 border-[1px] rounded-full ${
                    searchs.bathrooms === el.value
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-white/20 hover:bg-white/30 text-black"
                  }`}
                  onClick={handlerfilterLocal}
                  name={el.name}
                  value={el.value}
                >
                  {el.opcion}
                </button>
              ))}
            </div>
            <hr className="border-[0.2] mt-2" />
            <h1 className="font-bold mt-2">Numero de garajes </h1>
            <div className="flex items-center justify-start gap-3 mt-3">
              {garajes.map((el, i) => (
                <button
                  key={i}
                  // className="p-2 px-3 border-[1px] rounded-full"
                  className={`p-2 px-3 border-[1px] rounded-full ${
                    searchs.garages === el.value
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-white/20 hover:bg-white/30 text-black"
                  }`}
                  onClick={handlerfilterLocal}
                  name={el.name}
                  value={el.value}
                >
                  {el.opcion}
                </button>
              ))}
            </div>
            <hr className="border-[0.2] mt-2" />
            <h1 className="font-bold mt-2">Estrato </h1>
            <div className="flex items-center justify-start gap-3 mt-3">
              {estrato.map((el, i) => (
                <button
                  key={i}
                  // className="p-2 px-3 px-3 border-[1px] rounded-full"
                  className={`p-2 px-3 border-[1px] rounded-full ${
                    searchs.stratum === el.value
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-white/20 hover:bg-white text-black"
                  }`}
                  onClick={handlerfilterLocal}
                  name={el.name}
                  value={el.value}
                >
                  {el.opcion}
                </button>
              ))}
            </div>
            <hr className="border-[0.2] mt-2" />
            {/* <div className="flex items-center justify-start gap-3 mt-3">
              <button
                // className="p-2 border-[1px] rounded-full"
                className={`p-2 border-[1px] rounded-full ${
                  searchs.amoblado === "true"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={handlerfilterLocal}
                name="amoblado"
                value={!searchs.amoblado}
              >
                Amoblado
              </button>
            </div> */}
            {/* //? filtro de area  */}
            {/* <hr className="border-[0.2] mt-2" />
            <div className="py-8 px-5">
              <RangeSlider
                titulo={"Area"}
                min={0}
                max={5000}
                handlerRangeL={handlerRangeArea}
              />
            </div> */}
          </div>
          <hr className="border-[0.2] mt-2" />
          <div className="flex mt-5 justify-between items-center">
            <button
              className="p-2 px-4 hover:bg-slate-300/30 duration-200 border-[1px] rounded-full"
              onClick={limpiarTodosFiltros}
            >
              Limpiar filtros
            </button>
            <button
              className="py-2 text-lg font-medium hover:saturate-150 duration-200 px-5 bg-gradient-to-r from-indigo-400 to-indigo-600  text-white rounded-full"
              onClick={aplicarFiltro}
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
