/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import TestimonioCard from "./TestimonioCard";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Testimonios = () => {
  const testimonios = useSelector(
    (state) => state.testimoniosSlice.testimonios
  );

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const randomTestimonies = [...testimonios].sort(() => Math.random() - 0.5);
  let con = 1000;
  return (
    <div className="pt-20">
      <h1 className="fles text-center py-5  pb-10 items-center text-3xl font-bold">
        Lo que dicen nuestros Clientes
      </h1>
      <div className=" flex gap-5 justify-center items-center">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 5000 }}
          slidesPerView={1}
          breakpoints={{
            // Add breakpoints for responsive behavior
            640: {
              slidesPerView: 1, // Show 2 cards on devices with width >= 640px
            },
            768: {
              slidesPerView: 1, // Show 3 cards on devices with width >= 768px
            },
            1024: {
              slidesPerView: 1, // Show 4 cards on devices with width >= 1024px
            },
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[Pagination, Navigation]} // delet effectcoverflow  -> EffectCoverflow,
          className="swiper_container py-10 " //bring px to 0 to chang it to a normal slide
        >
          {randomTestimonies.map((testimonio, i) => (
            <div className="" key={i}>
              <SwiperSlide key={i}>
                <TestimonioCard testimonio={testimonio} />
              </SwiperSlide>
            </div>
          ))}
          <div className="hidden md:flex slider-controler">
            <div className="swiper-button-prev slider-arrow z-10">
              <ion-icon
                name="arrow-back-outline"
                className="text-sm"
              ></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow ">
              <ion-icon name="arrow-forward-outline" s></ion-icon>
            </div>
            <div className="swiper-pagination mt-5"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonios;
