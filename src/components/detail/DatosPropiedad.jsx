import { Link, useParams } from "react-router-dom";
import PropertyGallery from "./PropertyGallery";

import { logo } from "../../assets";

import {
  MdCalendarMonth,
  MdOutlineBathtub,
  MdOutlineHomeWork,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { TbPawFilled } from "react-icons/tb";
import { FaWpforms, FaPhone } from "react-icons/fa";
import { AiOutlineCopy } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineShareAlt } from "react-icons/ai";

import { useGetPropertiesByIdQuery } from "../../redux/RTKquery/propertyApi";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { TbBed, TbRulerMeasure } from "react-icons/tb";
import { GiHomeGarage, GiLevelEndFlag } from "react-icons/gi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import TimedModal from "./TimedModal";
import ShareModal from "./ShareModal";
import AgendarVisitaBarra from "./AgendarVisitaBarra";
import Amenidades from "./Amenidades";
import Maps from "../Maps/Mapss";
import { RiWhatsappFill } from "react-icons/ri";
import MarqueeSEO from "../MarqueeSEO";
import { Helmet } from "react-helmet-async";

const DatosPropiedad = () => {
  const { id } = useParams();
  const shareUrl = `https://arriendalo.com.co/propiedades/${id}`;

  const { data: property, isLoading } = useGetPropertiesByIdQuery(id);

  const [isFavorite, setIsFavorite] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const expand = () => setIsExpanded(!isExpanded);

  const descripcion = () => {
    if (isExpanded) {
      return property.observaciones;
    } else {
      const largoMaximo = 500;
      if (property.observaciones.length > largoMaximo) {
        return `${property.observaciones.substring(0, largoMaximo)}...`;
      } else {
        return property.observaciones;
      }
    }
  };

  const [openTimedModal, setOpenTimedModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  //const [text, setText] = useState("Copiar");

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenTimedModal(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const closeTimedModalHandler = () => setOpenTimedModal(!openTimedModal);
  const closeShareModalHandler = () => setOpenShareModal(!openShareModal);

  const onFavClickHandler = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="md:px-32 md:py-28 pt-28 lg:pb-10 sm:pb-20 px-5 ">
      {isLoading ? (
        <div>{<Loading />}</div>
      ) : (
        <div className="">
       {console.log(property)}
          <div>
            <div className="flex gap-1 items-center mb-5 justify-start px-1 py-2 bg-slate-100 dark:bg-slate-100/20 rounded-xl border-[1px] border-neutral-300">
              <Link to="/">
                <div className="dark:bg-slate-100 hover:scale-105 duration-300 rounded-full">
                  <img
                    src={logo}
                    alt="logo arriendalo colombia"
                    className="h-6"
                  />
                </div>
              </Link>
              <MdOutlineKeyboardArrowLeft />
              <div className="hover:font-medium duration-200">
                <Link to="/propiedades">Propiedades</Link>
              </div>
              <MdOutlineKeyboardArrowLeft />
              <h1>
                {property.titulo.length > 18
                  ? `${property.titulo.slice(0, 18)}...`
                  : property.titulo}
              </h1>
            </div>
            <div>
              <div className="flex dark:text-white text-neutral-500 justify-between md:text-2xl text-xl font-bold py-2">
                {property.tipo === "Local" ||
                property.tipo === "Edificio" ||
                property.tipo === "Oficina" ? (
                  <h1>
                    {property.tipo} en arriendo en {property.titulo},{" "}
                    <span className="text-neutral-600">{property.ciudad}</span>
                  </h1>
                ) : (
                  <h1>
                    {property.tipo} en arriendo de {property.habitaciones}{" "}
                    habitaciones en {property.titulo},{" "}
                    <span className="text-neutral-600">{property.ciudad}</span>
                  </h1>
                )}
                <div>
                  {property.exclusivo && (
                    <div className="hidden py-2 text-slate-950 lg:block z-10 right-32 text-sm  bg-gradient-to-l from-amber-200 to-amber-400   px-4 rounded-full">
                      Exclusivo
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex items-center lg:justify-start justify-between gap-3 mb-2">
                <div className="flex">
                  <h1 className="text-primaryblue dark:text-lightblueone font-bold text-xl">
                    {" "}
                    {property.precio_arriendo}{" "}
                    <span className="font-light text-neutral-500 lg:text-md text-sm">
                      /mes
                    </span>{" "}
                  </h1>
                  <div className=" flex items-center">
                    {property.admin && ( //! admin
                      <h2 className="bg-neutral-300/80 dark:text-black  px-2 text-xs rounded-full  ">
                        Admin incluida
                      </h2>
                    )}
                  </div>
                </div>
                <div>
                  {property.exclusivo && (
                    <div className="block text-slate-950 font-bold lg:hidden z-10 py-2 right-32 text-sm bg-gradient-to-l from-amber-200 to-amber-400  px-4 rounded-full">
                      Exclusivo
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <PropertyGallery images={property.imagenes} property={property} />

            <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-10 py-5">
              <div className="col-span-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-medium text-neutral-500 dark:text-neutral-50 bg-neutral-200/70 rounded-full px-3">
                      Código: {property.codigo}{" "}
                    </h1>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={closeShareModalHandler}
                      className="bg-neutral-200/70  transition-colors duration-700 rounded-full p-2"
                    >
                      <AiOutlineShareAlt className="text-xl text-neutral-600 hover:scale-110" />
                    </button>
                    {isFavorite ? (
                      <button
                        onClick={onFavClickHandler}
                        className=" bg-neutral-200/70  z-10 p-2  rounded-full text-lg transition-colors duration-700"
                      >
                        <BsHeartFill className="text-red-700  text-xl transition-colors duration-700 hover:scale-105 saturate-200" />
                      </button>
                    ) : (
                      <button
                        onClick={onFavClickHandler}
                        className="bg-neutral-200/70  p-2 z-10 rounded-full text-lg transition-colors duration-700"
                      >
                        <BsHeart className="text-black text-xl hover:scale-110  font-bold transition-colors duration-700 " />
                      </button>
                    )}
                  </div>
                </div>
                <hr className="border-[0.2] mt-3" />

                {/*  */}

                <div className="lg:flex flex-wrap sm:grid md:grid-cols-3 gap-5 dark:text-black items-center justify-start mt-5">
                  <div className=" flex lg:mb-0 mb-1 items-center justify-center text-black bg-teal-300/70 dark:bg-teal-300/80  rounded-full px-2 py-1">
                    <MdOutlineHomeWork className="text-lg p-" />
                    <h1 className="px-2 text-lg ">{property.tipo}</h1>
                  </div>
                  {property.petfriendly && ( //!petfriendly
                    <div
                      className="flex lg:mb-0 mb-1 items-center justify-center text-black bg-violet-400/70 dark:bg-violet-400/80  rounded-full px-2 py-1"
                      title="Pet Friendly"
                    >
                      <TbPawFilled className="text-lg " />
                      <h1 className="px-2 text-lg ">Pet friendly</h1>
                    </div>
                  )}
                  {property.amoblada && ( //!amoblada
                    <div className=" flex lg:mb-0 mb-1 items-center justify-center text-black rounded-full  bg-pink-400/70 dark:bg-pink-400/80  px-2 py-1">
                      <CgSmartHomeWashMachine className="  text-xl text-center " />
                      <h1 className="px-2 text-lg  ">Amoblado</h1>
                    </div>
                  )}
                </div>

                <div className="lg:flex-wrap grid grid-cols-3   md:gap-5 gap-2 items-center justify-start mt-5">
                  <div className="flex w-full  text-lg  md:w-auto md:flex-initial gap-3 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40">
                    <TbBed className="text-lg text-primaryblue font-bold" />{" "}
                    {property.habitaciones}{" "}
                    <span className="md:block hidden"> habitaciones</span>
                  </div>
                  <div className="flex w-full md:w-auto lg:text-xl text-lg md:flex-initial gap-3 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
                    <MdOutlineBathtub className="text-lg text-primaryblue font-bold" />{" "}
                    {property.baños}{" "}
                    <span className="md:block hidden"> baños</span>{" "}
                  </div>
                  <div className="flex w-full md:w-auto md:flex-initial lg:text-xl text-lg gap-3 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
                    <GiHomeGarage className="text-lg text-primaryblue font-bold" />{" "}
                    {property.garajes}{" "}
                    <span className="md:block hidden"> garajes</span>{" "}
                  </div>
                  <div className="flex w-full md:w-auto md:flex-initial lg:text-xl text-lg gap-3 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
                    <TbRulerMeasure className="text-lg text-primaryblue font-bold" />{" "}
                    {property.metros_cuadrados}{" "}
                    <span className="md:block hidden"> m2</span>{" "}
                  </div>
                  <div className="flex w-full md:w-auto md:flex-initial lg:text-xl text-lg gap-3 dark:text-black items-center justify-center rounded-full px-2 bg-neutral-200 dark:bg-neutral-200/40 mt-1 md:mt-0">
                    <GiLevelEndFlag className="text-lg text-primaryblue font-bold" />{" "}
                    <span className="md:block hidden"> estrato </span>
                    {property.estrato}
                  </div>
                </div>
                <hr className="border-[0.2] mt-5" />

                <div className="lg:mt-10 mt-3 ">
                  <h1 className="font-bold dark:text-white text-xl text-neutral-500">
                    Descripción de la propiedad
                  </h1>
                  <p className="text-justify pt-4 dark:text-white text-neutral-500">
                    {descripcion()}

                    {property.observaciones.length > 500 && (
                      <span
                        className="bg-neutral-300/60 cursor-pointer ml-4 rounded-full px-2"
                        onClick={expand}
                      >
                        {isExpanded ? "Leer menos" : "Leer más"}
                      </span>
                    )}
                  </p>
                </div>

                <hr className="border-[0.2] mt-5" />

                <div>
                  <Amenidades amenidades={property.features} />
                </div>
              </div>

              {/*  */}

              <div className="lg:block hidden col-span-2">
                <div className=" items-center bg-slate-50 dark:bg-slate-900 justify-center flex-row border-[0.5px]  rounded-xl border-neutral-400 p-4 w-full">
                  {property.user.map((el) => (
                    <div key={el._id} className="">
                      <h1 className="text-center font-semibold">
                        {" "}
                        ¿Te gustó esta propiedad?{" "}
                      </h1>
                      <div>
                        <div>
                          <div className="flex items-center justify-center p-5">
                            <div className="h-20 rounded-full w-24 ">
                              <img
                                className="h-24 rounded-full w-24 "
                                src={el.photo}
                                alt={`agente encargado de ${property.tipo} en arriendo en ${property.ciudad}`}
                              />
                            </div>
                          </div>
                          <div className="">
                            <h2 className="text-center font-bold capitalize">
                              {el.first_name} {el.last_name}
                            </h2>
                            <div className="flex items-center gap-3 mt-5 justify-center">
                              <HiOutlineMail className="text-black dark:text-white text-2xl font-bold" />
                              <h3 className="  text-primary underline">
                                <a
                                  href={`mailto:${el.email}`}
                                  className="hover:font-medium  "
                                >
                                  {el.email}
                                </a>
                              </h3>
                            </div>
                            <div className="flex items-center gap-3 mt-2 justify-center">
                              <RiWhatsappFill className="text-black dark:text-white text-xl font-bold" />
                              <h3 className="  text-primary underline">
                                <a
                                  className="hover:font-medium"
                                  href={property.whatsapp}
                                  target="_blanck"
                                >
                                  {el.cell_phone}
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center  justify-center gap-10 pt-5">
                        <a
                          href={property.whatsapp}
                          target="_blanck"
                          className=" flex text-white items-center justify-center  cursor-pointer gap-3 duration-300 hover:saturate-200 rounded-full px-6  bg-gradient-to-r from-indigo-400 to-indigo-600 p-2"
                        >
                          <MdCalendarMonth />
                          Agendar Visita
                        </a>
                        <Link to={`/aplicar_tomador/${property.codigo}`}>
                          <div className=" flex items-center justify-center gap-3 rounded-full cursor-pointer duration-500 hover:border-indigo-500 px-6 border-2 border-gradient-to-r from-indigo-400 to-indigo-600 p-2">
                            <FaWpforms /> Aplicar ya!
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

























            </div>
            <div className="h-22 ">
              <h1 className="md:text-2xl text-lg font-bold py-5">
                Conoce más de tu nuevo arriendo en {property.ciudad}
              </h1>
              <Maps
                latitud={property.latitud}
                longitud={property.longitud}
                direccion={property.direccion}
              />
            </div>
            <div className="md:hidden fixed bottom-0 left-0 z-10 bg-white dark:bg-slate-950 w-full py-5">
              <AgendarVisitaBarra property={property} />
            </div>
          </div>
          <MarqueeSEO />
        </div>
      )}
      {openTimedModal && (
        <TimedModal
          closeTimedModalHandler={closeTimedModalHandler}
          user={property.user}
          id={id}
          whatsapp={property.whatsapp}
        />
      )}
      {openShareModal && (
        <ShareModal closeShareModalHandler={closeShareModalHandler} id={id} />
      )} 
    </div>
  );
};

export default DatosPropiedad;
