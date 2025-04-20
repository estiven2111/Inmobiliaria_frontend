import { useState, useEffect, useRef } from "react";
// import { homeSliderImages } from "../../assets";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef();
  const slideInterval = useRef(null);

  const removeAnimation = () => {
    if (sliderRef.current) {
      sliderRef.current.classList.remove("fade-anim");
    }
  };

  useEffect(() => {
    const sliderElement = sliderRef.current;

    sliderElement.addEventListener("animationend", removeAnimation);
    sliderElement.addEventListener("mouseenter", pauseSlider);
    sliderElement.addEventListener("mouseleave", startSlider);

    startSlider();

    return () => {
      clearInterval(slideInterval.current);
      if (sliderElement) {
        sliderElement.removeEventListener("animationend", removeAnimation);
        sliderElement.removeEventListener("mouseenter", pauseSlider);
        sliderElement.removeEventListener("mouseleave", startSlider);
      }
      pauseSlider();
    };
  }, []);

  const startSlider = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      nextHandler();
    }, 4000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval.current);
  };

  // const nextHandler = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % homeSliderImages.length);
  //   if (sliderRef.current) {
  //     sliderRef.current.classList.add("fade-anim");
  //   }
  // };

  // const prevHandler = () => {
  //   setCurrentIndex(
  //     (prevIndex) =>
  //       // (prevIndex + homeSliderImages.length - 1) % homeSliderImages.length
  //   );
  //   if (sliderRef.current) {
  //     sliderRef.current.classList.add("fade-anim");
  //   }
  // };

  return (
    <div ref={sliderRef} className="md:group w-full  select-none relative">
      <div className="aspect-w-16 aspect-h-9">
        <div className="h-96 overflow-hidden">
          <img
            loading="lazy"
            className="w-full h-full rounded-xl object-cover"
            // src={homeSliderImages[currentIndex]}
            alt="slide image1"
          />
        </div>
      </div>

      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3  flex justify-between items-center">
        <button
          className="md:hidden md:group-hover:block "
          // onClick={prevHandler}
        >
          <SlArrowLeft className="md:text-4xl text-lg text-white" />
        </button>
        <button
          className="md:hidden md:group-hover:block "
          // onClick={nextHandler}
        >
          <SlArrowRight className="md:text-4xl text-lg text-white" />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
