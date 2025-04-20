/* eslint-disable no-unused-vars */
import { loading_bar, loadcircle, logo, loading, loading3 } from "../assets";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="w-48 h-48 flex items-center justify-center">
        <Lottie animationData={loadcircle} loop={true} className="w-22" />
      </div>

      <div className="absolute  w-48 h-48 flex items-center justify-center">
        <img className="h-16" src={logo} alt="logo de arriendalo" />
      </div>
    </div>
  );
};

export default Loading;
