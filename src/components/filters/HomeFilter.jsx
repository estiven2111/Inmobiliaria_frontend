import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SlLocationPin } from "react-icons/sl";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";

import { Input, initTE } from "tw-elements";

const HomeFilter = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    ciudad: "",
    habitaciones: "",
    tipo: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!filterData.ciudad && !filterData.habitaciones && !filterData.tipo) {
      navigate("/propiedades");
    } else {
      setFilterData({
        ciudad: "",
        habitaciones: "",
        tipo: "",
      });
    }
  };

  const onChangeHandler = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    initTE({ Input });
  }, []);
  return (
    <div className="md:absolute shadow-lg rounded-md shadow-neutral-500 dark:shadow-black w-full mt-5 md:mt-4 lg:top-80 md:top-80 lg:left-86 md:left-64 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-10 lg:max-w-[30%] lg:w-[30%] md:max-w-[50%] md:w-[50%]">
      <form onSubmit={onSubmitHandler}>
        <div className=" bg-white dark:bg-slate-200 pb-5  rounded-xl text-black p-5">
          <h1 className="text-center uppercase pb-5 md:text-2xl text-lg font-extrabold">
            Encontrar mi nuevo hogar
          </h1>

          <div className="grid grid-cols-1  ">
            <div>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="text"
                  name="ciudad"
                  onChange={onChangeHandler}
                  value={filterData.ciudad}
                  className="peer input_class"
                />
                <label className="label_class flex items-center gap-1">
                  <SlLocationPin className="text-xl pb-1" />
                  Ciudad
                </label>
              </div>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="text"
                  name="habitaciones"
                  onChange={onChangeHandler}
                  value={filterData.habitaciones}
                  className="peer input_class"
                />
                <label className="label_class flex items-center gap-1">
                  <MdOutlineBedroomParent className="text-xl pb-1" />
                  Habitaciones
                </label>
              </div>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="text"
                  name="tipo"
                  onChange={onChangeHandler}
                  value={filterData.tipo}
                  className="peer input_class"
                />
                <label className="label_class flex items-center gap-1">
                  <BiBuildingHouse className="text-xl pb-1" />
                  Tipo de propiedad
                </label>
              </div>
            </div>
            <button
              className="dark:bg-orange-600 duration-200 rounded-full hover:saturate-200 bg-orange-600 p-3 w-full text-white md:text-1lg text-sm shadow-md shadow-neutral-500"
              type="submit"
            >
              BUSCAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomeFilter;
