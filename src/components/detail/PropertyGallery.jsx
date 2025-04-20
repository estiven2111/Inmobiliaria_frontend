/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { TfiGallery } from "react-icons/tfi";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Slide from "../recientespublic/Slide";
import { HiArrowNarrowLeft } from "react-icons/hi";

const PropertyGallery = ({ images, property }) => {
  const [principalImage, setPrincipalImage] = useState("");

  const [openSlide, setOpenSlide] = useState(false);

  useEffect(() => {
    setPrincipalImage(images[0]);
  }, [images]);

  const handleOpenSlide = () => {
    setOpenSlide(!openSlide);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setOpenSlide(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const displayedImages = images.slice(0, 6);
  const remainingImages = images.slice(6);
  const formattedImages = images.map((image) => ({
    original: image,
    thumbnail: image,
  }));
  return (
    <div className=" bg-slate-100 dark:bg-slate-800 z-50 lg:p-4 rounded-xl ">
      <div className="lg:hidden block">
        <Slide slide={images} propiedad={property} />
      </div>
      
      <div className="relative lg:block hidden py-5">
        <div
          onClick={handleOpenSlide}
          className="absolute cursor-pointer duration-200 text-white hover:bg-neutral-500/60 bottom-14 left-3 flex items-center justify-center gap-3 rounded-xl py-2 px-3 font-semibold bg-neutral-400/60"
        >
          <TfiGallery /> Ver mas fotos
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
          <div
            onClick={handleOpenSlide}
            className="cursor-pointer rouded-xl  col-span-2 bg-slate-300 rounded-xl"
          >
            <img
              loading="lazy"
              className="w-full h-full rounded-xl"
              src={displayedImages[0]}
              alt={`imagen de ${property.tipo} en arriendo en ${property.ciudad}`}
            />
          </div>









          {/* <div className="grid grid-rows-2 gap-2">
            <div
              onClick={handleOpenSlide}
              className="cursor-pointer bg-slate-300 rounded-xl"
            >
              {" "}
              <img
                loading="lazy"
                className="w-full h-full rounded-xl"
                src={displayedImages[1]}
                alt={`imagen de ${property.tipo} en arriendo en ${property.ciudad}`}
              />{" "}
            </div>

            <div
              onClick={handleOpenSlide}
              className="cursor-pointer bg-slate-300 rounded-xl"
            >
              {" "}
              <img
                className="w-full h-full rounded-xl"
                src={displayedImages[2]}
                alt={`imagen de ${property.tipo} en arriendo en ${property.ciudad}`}
              />{" "}
            </div>
          </div> */}

          {/* <div className="grid grid-rows-2 gap-2">
            <div
              onClick={handleOpenSlide}
              className="cursor-pointer bg-slate-300 rounded-xl"
            >
              {" "}
              <img
                className="w-full h-full rounded-xl"
                src={displayedImages[3]}
                alt={`imagen de ${property.tipo} en arriendo en ${property.ciudad}`}
              />{" "}
            </div>

            <div
              onClick={handleOpenSlide}
              className="cursor-pointer bg-slate-300 rounded-xl"
            >
              {" "}
              <img
                className="w-full h-full rounded-xl"
                src={displayedImages[4]}
                alt={`imagen de ${property.tipo} en arriendo en ${property.ciudad}`}
              />{" "}
            </div>
          </div>  */}




        </div>
      </div>

      {openSlide && (
        <div className="fixed top-0 left-0 z-20 w-full py-1 flex justify-center items-center bg-zinc-900/95">
          <div className="lg:max-w-4xl md:max-w-lg rounded-xl w-full sm: p-2">
            <ImageGallery items={formattedImages} className="rounded-xl" />
            <button
              className="absolute flex gap-2 items-center justify-center bg-slate-100 rounded-xl dark:bg-slate-700 text-slate-900 cursor-pointer top-4 hover:bg-opacity-80 z-20 left-4 p-2 dark:text-white   focus:outline-none"
              onClick={() => setOpenSlide(false)}
            >
              <HiArrowNarrowLeft className=" dark:text-white  text-slate-900" />{" "}
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
