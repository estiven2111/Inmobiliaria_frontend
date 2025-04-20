import Lottie from "lottie-react";
import { notfound } from "../assets";

const NotFound = () => {
  return (
    <div className="h-screen flex justify-center">
      <div className="w-96 self-center  ">
        <Lottie animationData={notfound} loop={true} />
      </div>
    </div>
  );
};

export default NotFound;
