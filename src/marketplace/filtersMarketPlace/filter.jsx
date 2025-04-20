//!SIRVE
// /* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { TbMapSearch } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { Dropdown, Ripple, initTE } from "tw-elements";
import DropdownMenu from "../../components/ui/DropdownMenu";
// import { TbPawFilled } from "react-icons/tb";
import { IoDiamondSharp } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";
import FiltersModal from "./FiltersModal";
import { FilterData } from "../../redux/landingpage/FilterDataObj.slice";
import { useDispatch, useSelector } from "react-redux";
const Filter = ({
  toggleMap,
  // searchFuntion,
  // searchsMain,
  activeFilters,
  // ban,
}) => {
  const [exclusiveSwitch, setExclusiveSwitch] = useState(false);
  // const [petFriendlySwitch, setPetFriendlySwitch] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const { filterLanding } = useSelector((state) => state.FilterDataObjSlice);
  const dispatch = useDispatch();

  const limpiarFiltrosMP = () => {
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
    if (exclusiveSwitch) {
      setExclusiveSwitch(!exclusiveSwitch);
    }
  };

  const exclusiveHandler = () => {
    setExclusiveSwitch(!exclusiveSwitch);
    if (filterLanding.exclusive === "") {
      dispatch(
        FilterData({
          ...filterLanding,
          exclusive: "Outstanding",
        })
      );
    } else {
      dispatch(
        FilterData({
          ...filterLanding,
          exclusive: "",
        })
      );
    }
  };
  useEffect(() => {
    setExclusiveSwitch(exclusiveSwitch);
    // searchFuntion(searchs);
  }, [exclusiveSwitch, filterLanding]);

  // const petFriendlyHandler = () => {
  //   setPetFriendlySwitch(!petFriendlySwitch);
  // };
  const filterModalHandler = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setOpenFilter(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // const { data, isLoading } = useLazyGetPropertiesearchQuery(search);

  const handlerSearch = async (e) => {
    e.preventDefault();
  };

  const handlerfilter = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(
      FilterData({
        ...filterLanding,
        [name]: value,
      })
    );
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 py-5 border-[1px]  pt-5 mb-5 rounded-xl px-3">
        <div className="">
          <div className="md:flex flex-row  items-center gap-3 justify-between">
            <div className="flex items-baseline gap-5 justify-between lg:w-[500px] sm:w-[300px]">
              <form className="w-full" onSubmit={handlerSearch}>
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Bogota, Casa"
                    name="search"
                    value={filterLanding.search}
                    className="w-full py-2 pl-10 pr-5 bg-transparent rounded-full border-[1px] ring-gray-300"
                    // onChange={(event) => setSearchs(event.target.value)}
                    onChange={handlerfilter}
                    onBlur={handlerfilter}
                  />
                  <BiSearchAlt
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                    aria-hidden="true"
                  />
                </div>
              </form>
              <div className="flex items-center justify-center gap-2 text-sm font-semibold dark:text-gray-200  text-gray-900">
                <div className="flex p-[1px]  w-[45px] items-center justify-center gap-3 primaryblue/80 ring-2 rounded-full focus:ring-transparent  md:focus:ring-primaryblue focus:ring-2">
                  <Switch
                    disabled={
                      filterLanding.ciudad !== "" ||
                      filterLanding.habitaciones !== "" ||
                      filterLanding.tipo !== ""
                    }
                    name="exclusive"
                    checked={exclusiveSwitch}
                    onClick={exclusiveHandler}
                    className={`${
                      filterLanding.ciudad !== "" ||
                      filterLanding.habitaciones !== "" ||
                      filterLanding.tipo !== ""
                        ? "bg-gray-500"
                        : exclusiveSwitch
                        ? "bg-primaryblue/80"
                        : "bg-primaryblue/30"
                    }  relative inline-flex h-[23px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only"></span>
                    <span
                      aria-hidden="true"
                      className={`${
                        exclusiveSwitch ? "translate-x-5" : "translate-x-0"
                      } pointer-events-none  h-[19px] w-[20px] transform  items-center justify-center flex rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    >
                      <IoDiamondSharp className="text-neutral-800" />
                    </span>
                  </Switch>{" "}
                  {/* <span className="md:text-sm sm:text-xs">Pet friendly</span> */}
                </div>
                <span
                  className={`${
                    filterLanding.ciudad !== "" ||
                    filterLanding.habitaciones !== "" ||
                    filterLanding.tipo !== ""
                      ? "text-gray-400"
                      : ""
                  } md:block hidden`}
                >
                  Exclusivo
                </span>
              </div>
            </div>
            <div className="flex gap-5 pt-3 items-center justify-between">
              {/* <div className="flex gap-4"> */}
              {/* <div className="flex items-center justify-center gap-2 text-sm font-semibold dark:text-gray-200 text-gray-900">
                <div className=" flex p-[1px]  w-[45px] items-center justify-center gap-3 primaryblue/80 ring-2 rounded-full focus:ring-transparent  md:focus:ring-primaryblue focus:ring-2">
                  <Switch
                    checked={petFriendlySwitch}
                    onChange={petFriendlyHandler}
                    className={`${
                      petFriendlySwitch
                        ? "bg-primaryblue/80"
                        : "bg-primaryblue/30"
                    } relative inline-flex h-[23px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-primaryblue focus-visible:ring-opacity`}
                  >
                    <span className="sr-only">Use Settings</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        petFriendlySwitch ? "translate-x-5" : "translate-x-0"
                      } pointer-events-none flex items-center justify-center h-[19px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    >
                      <TbPawFilled className="text-neutral-800" />
                    </span>
                  </Switch>
                </div>
                <span className="md:block hidden">Pet friendly </span>
              </div> */}
              {/* </div> */}
              {activeFilters !== 0 && (
                <div
                  onClick={limpiarFiltrosMP}
                  className={`flex dark:text-white dark:hover:bg-gray-50/10 items-center justify-center gap-x-1.5 rounded-full px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                    activeFilters ? "ring-indigo-400" : ""
                  }`}
                >
                  Limpiar filtros
                </div>
              )}
              <div>
                <DropdownMenu
                  activeFilters={activeFilters}
                  // handlerfilterCombi={handlerfilterCombi}
                />
              </div>

              <button
                disabled={
                  filterLanding.ciudad !== "" ||
                  filterLanding.habitaciones !== "" ||
                  filterLanding.tipo !== ""
                }
                onClick={filterModalHandler}
                className={`flex dark:hover:bg-gray-50/10 dark:text-white items-center justify-center gap-x-1.5 rounded-full px-3 py-2 text-sm font-semibold  shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                  filterLanding.ciudad !== "" ||
                  filterLanding.habitaciones !== "" ||
                  filterLanding.tipo !== ""
                    ? "ring-gray-400 text-gray-400"
                    : activeFilters
                    ? "ring-indigo-400 text-gray-900"
                    : ""
                }`}
              >
                <span className="md:block hidden">Filtrar</span>
                {activeFilters ? (
                  <div
                    className={`text-xs text-white rounded-full ${
                      filterLanding.ciudad !== "" ||
                      filterLanding.habitaciones !== "" ||
                      filterLanding.tipo !== ""
                        ? "bg-gray-300"
                        : "bg-indigo-400 "
                    } px-[6px] py-[2px]`}
                  >
                    {activeFilters}
                  </div>
                ) : (
                  <BsFilter className="dark:text-gray-100" />
                )}
              </button>
              <div className="lg:block hidden">
                <div
                  onClick={toggleMap}
                  className="flex items-center dark:hover:bg-gray-50/10  justify-center gap-2    rounded-full  px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="dark:text-white text-gray-900 ">
                    Buscar en mapa
                  </span>
                  <TbMapSearch className="text-lg dark:text-gray-100 text-gray-400 font-thin" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {openFilter && (
          <FiltersModal
            // limpiarFiltrosMP={limpiarFiltrosMP}
            // searchsMain={searchsMain}
            filterModalHandler={filterModalHandler}
            // handlerfilterCombi={handlerfilterCombi}
          />
        )}
      </div>
    </div>
  );
};

export default Filter;
