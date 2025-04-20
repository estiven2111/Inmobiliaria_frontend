/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import PropiedadCard from "./PropiedadCard";

import { pagePropiedades } from "../../redux/propiedades/propiedades.slice";

import {
  useGetPropertiesQuery,
  useGetRecentPropertiesQuery,
} from "../../redux/RTKquery/propertyApi";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PropRecientes = () => {
  // const propiedades = useSelector(
  //   (state) => state.propiedadesSlice.propiedadess
  // );

  const { data: properties = [], isLoading } = useGetRecentPropertiesQuery();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    // dispatch(pagePropiedades());
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="py-7">
      <div className="flex items-center justify-between gap-5 py-5">
        <h2 className=" text-left py-5 pb-10 items-center text-3xl font-bold">
          Propiedades más recientes
        </h2>
        <button className=" flex px-3 py-2 bg-indigo-400/20 sm:text-xs hover:bg-indigo-400/30 border border-indigo-600 rounded-full">
          <Link to="/propiedades">
            Ver más <span className="lg:block hidden">propiedades</span>
          </Link>
        </button>
      </div>
      <div className=" flex flex-row gap-5 justify-center">
        <Swiper
          spaceBetween={"5px"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1} // Show only one card on small devices
          breakpoints={{
            // Add breakpoints for responsive behavior
            640: {
              slidesPerView: 1, // Show 2 cards on devices with width >= 640px
            },
            768: {
              slidesPerView: 2, // Show 3 cards on devices with width >= 768px
            },
            1024: {
              slidesPerView: 3, // Show 4 cards on devices with width >= 1024px
            },
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[Pagination, Navigation]} // delet effectcoverflow  -> EffectCoverflow,
          className="swiper_container " //bring px to 0 to chang it to a normal slide
        >
          {properties?.map((propiedad, i) => (
            <div key={i} className="">
              <SwiperSlide key={i}>
                <PropiedadCard propiedad={propiedad} />
              </SwiperSlide>
            </div>
          ))}
          <div className="slider-controler pt-5">
            <div className="swiper-button-prev slider-arrow z-10">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination mt-5"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default PropRecientes;
