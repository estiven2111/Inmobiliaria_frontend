/* eslint-disable no-unused-vars */
import Lottie from "lottie-react";
import {
  heroanimation,
  movingcolors,
  dots,
  bg3d,
  herobg,
  home,
  casa,
  find,
} from "../../assets";
import HeroFilter from "../filters/HeroFilter";

const HeroSection = () => {
  return (
    <div>
      <div className="relative mt-32  sm:pt-0 h-screen  overflow-hidden">
        <Lottie animationData={movingcolors} loop={true} />
        <Lottie
          className="rotate-180"
          animationData={movingcolors}
          loop={true}
        />
      </div>

      <div className="absolute inset-0 grid lg:grid-cols-7 grid-cols-1  mt-52 lg:mt-0   gap-5 h-screen content-center  ">
        <div className="lg:col-span-2  lg:block hidden">
          <img src={find} alt="arriendos en mi ciudad" loading="lazy" />
          {/* <Lottie animationData={heroanimation} loop={true} /> */}
        </div>
        <div className="lg:col-span-3   rounded-2xl">
          <HeroFilter />
        </div>

        <div className="lg:col-span-2 md: ">
          {/* <Lottie animationData={heroanimation} loop={true} /> */}
          <img
            className="w-full"
            src={casa}
            alt="arrendar casa"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

// {/* <div className=" flex items-center justify-center">
//   {/* <Lottie
//     animationData={dots}
//     loop={true}
//     className=" rotate-90 h-3/2  w-1/2"
//     // className="    w-3/2"
//   /> */}
// {/* </div>  */}
