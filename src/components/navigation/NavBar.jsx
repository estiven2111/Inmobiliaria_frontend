import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { logowhite } from "../../assets/index";
import { Link } from "react-router-dom";

import { MdPayment, MdOutlineLiveHelp, MdLogin } from "react-icons/md";
import { TbForms } from "react-icons/tb";
import { SlBadge } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { IoMenuSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { FilterData } from "../../redux/landingpage/FilterDataObj.slice";
import { useDispatch, useSelector } from "react-redux";
import AvisosBarra from "../AvisosBarra";

const NavBar = () => {
  const { filterLanding } = useSelector((state) => state.FilterDataObjSlice);
  let activeStyle = {
    fontWeight: "bold",
    // color: "#0055fb",
    paddingBottom: "2px", // Add padding to create space for the border
    borderBottom: "2px solid ",
  };

  // eslint-disable-next-line no-unused-vars
  let activeClassName = "underline";

  const dispatch = useDispatch();

  const onClickHandler = () => {
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

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="fixed top-0 left-0 w-full z-20">
      {/* <AvisosBarra /> */}
      <div className="lg:px-20 bg-primaryblue/80 transition-colors  duration-500 dark:bg-darkblue  ">
        <div className="lg:pt-5 px-5">
          <div className="flex justify-between items-center h-[80px] ">
            <div className="flex gap-6 sm:grid sm:grid-cols-3 w-full  text-white items-center relative">
              {/* Menu toggle button for medium and small screens */}
              {/* <div className=" md:col-span-2 text-white flex items-center"> */}
              <div className="  text-white flex items-center">
                <div className=" lg:hidden sm:block flex cursor-pointer items-center justify-start text-white">
                  <Link to="/" onClick={onClickHandler}>
                    <img
                      className=" w-[50%] h-auto   "
                      src={logowhite}
                      alt="logo"
                    />
                  </Link>
                </div>
                <div className="hidden gap-5 lg:flex lg:col-span-2 ">
                  <NavLink
                    to="/aplicar"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    <div className="cursor-pointer  hover:scale-105 duration-200 md:text-lg text-md font-medium">
                      Aplicar
                    </div>
                  </NavLink>
                  <NavLink
                    to="/ayuda"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    <div className="cursor-pointer  hover:scale-105 duration-200 md:text-lg text-md font-medium">
                      Ayuda
                    </div>
                  </NavLink>

                  {/* <NavLink
                  to="/arriendaloflex"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <div className="cursor-pointer  hover:scale-105 duration-200 md:text-lg text-md font-medium">
                    Arriendalo Flex
                  </div>
                </NavLink> */}
                </div>
              </div>

              <Link className="lg:block hidden" to="/" onClick={onClickHandler}>
                <div className=" flex cursor-pointer items-center justify-center text-white">
                  <img
                    className=" w-[40%] h-auto   "
                    src={logowhite}
                    alt="logo"
                  />
                </div>
              </Link>

              {/* <div className="flex gap-3 sm:col-span-2 sm:justify-end"> */}
              <div className="flex gap-3  sm:justify-end">
                <div className=" flex justify-end gap-5 items-center pr-4">
                  <Link to="/pagar_arriendo">
                    <button className="border-[1.5px] hidden lg:block text-white py-2 px-3  rounded-full  hover:scale-105 duration-200 md:text-lg text-md  border-white hover:border-slate-400  font-medium">
                      Pagar arriendo
                    </button>
                  </Link>
                  <a
                    href="https://mktngpropietarios.arriendalo.com.co/publicar-inmueble"
                    target="_blank"
                    rel="noreferrer"
                    className="border-[1.5px] hidden font-bold lg:block saturate-200 text-white bg-indigo-100/30 py-2 px-3  rounded-full  hover:scale-105 duration-200 md:text-lg text-md  border-indigo-100 hover:border-slate-400  "
                  >
                    Publicar inmueble
                  </a>

                  <ThemeToggle />
                </div>
              </div>
              <div className="flex justify-end pr-3">
                <button
                  className={`lg:hidden block text-white  text-xl transition-transform duration-200 ease-in-out focus:outline-none ${
                    showMenu ? "rotate-90" : "rotate-0"
                  }`}
                  onClick={toggleMenu}
                >
                  {showMenu ? (
                    <VscChromeClose className="text-3xl" />
                  ) : (
                    <IoMenuSharp className="text-4xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu content for medium and small screens */}
        {showMenu && (
          // <div className="bg-slate-50 dark:bg-slate-950 py-3 px-5 mt-3 dark:shadow-neutral-700 shadow-md text-black dark:text-white">

          <div
            className={`lg:hidden bg-slate-50 dark:bg-slate-950  py-3 px-5 mt-[0.5px] dark:shadow-neutral-700 shadow-md w-full text-black dark:text-white absolute ${
              showMenu
                ? "opacity-100 max-h-full transition-all duration-300 ease-in-out"
                : "opacity-0 max-h-0"
            }`}
            style={{
              maxHeight: showMenu ? "500px" : "0",
              visibility: showMenu ? "visible" : "hidden",
            }}
          >
            {/* <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div
              className="flex pl-5 mb-2 gap-3 pt-4 items-center hover:text-lightblueone cursor-pointer"
              onClick={toggleMenu}
            >
              <MdLogin className="" />
              Entrar
            </div>
          </NavLink> */}

            <a
              href="https://mktngpropietarios.arriendalo.com.co/publicar-inmueble"
              target="_blank"
              rel="noreferrer"
              className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer "
              onClick={toggleMenu}
            >
              <MdPayment className="" /> Publicar inmueble
            </a>

            <NavLink
              to="/aplicar"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <div
                className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer"
                onClick={toggleMenu}
              >
                <TbForms /> Aplicar
              </div>
            </NavLink>
            {/* <NavLink
            to="/arriendaloflex"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div
              className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer"
              onClick={toggleMenu}
            >
              <SlBadge />
              Arriendalo Flex
            </div>
          </NavLink> */}
            <NavLink
              to="/ayuda"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <div
                className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer"
                onClick={toggleMenu}
              >
                <MdOutlineLiveHelp />
                Ayuda
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
