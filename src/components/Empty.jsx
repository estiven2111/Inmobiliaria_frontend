import Lottie from "lottie-react";
import { empty } from "../assets";

const Empty = () => {
  return (
    <div className="flex-row items-center justify-center">
      <Lottie animationData={empty} loop={true} />

      <h1 className="text-center font-medium">No se encontraron resultados</h1>
    </div>
  );
};

export default Empty;
