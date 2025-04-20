/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";

import { Input, initTE } from "tw-elements";
import {
  FilterData,
  filterCities,
  filterProperties,
  filterTipesProperties,
} from "../../redux/landingpage/FilterDataObj.slice";
import { pagePropiedades } from "../../redux/propiedades/propiedades.slice";
import OpcionTipoPropiedad from "./OpcionTipoPropiedad";
import OpcionHabitaciones from "./OpcionHabitaciones";
import { useGetPropertiesearchQuery } from "../../redux/RTKquery/propertyApi";
import CiudadSearch from "./CiudadSearch";

const HeroFilter = () => {
  const { filterlanding } = useSelector((state) => state.FilterDataObjSlice);
  // const { data: filterProperty = [], isLoading } =
  //   useGetPropertiesearchQuery(filterlanding);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    navigate("/propiedades");
  };

  const onChangeHandler = (e) => {
    // setFilterData({
    //   ...filterData,
    //   [e.target.name]: e.target.value,
    // });
    const { name, value } = e.target;
    // dispatch(FilterData({ ...filterlanding, [name]: value }));
    dispatch(
      FilterData({
        ...filterlanding,
        [name]: value,
      })
    );
  };
  useEffect(() => {
    dispatch(filterCities());
    dispatch(filterTipesProperties());
  }, []);

  return (
    <div className="  rounded-lg lg:pt-10 w-full pt-5 md:pt-4 ">
      <form onSubmit={onSubmitHandler}>
        <div className="  pb-5  bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white text-black p-5">
          <h1 className="text-center uppercase pb-10 md:text-2xl text-lg font-extrabold">
            Encontrar mi nuevo hogar
          </h1>

          <div className="grid grid-cols-1  ">
            <div className="pb-10">
              <CiudadSearch />

              <div>
                <OpcionHabitaciones />
              </div>

              <div>
                <OpcionTipoPropiedad branchPropiedad />
              </div>
            </div>
            <button className="dark:bg-primaryblue/80 duration-200 font-extrabold rounded-full hover:saturate-200 bg-primaryblue/70 p-2  w-full text-white md:text-1lg text-lg ">
              BUSCAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeroFilter;
