import MarqueeSEO from "../components/MarqueeSEO";
import { pay } from "../assets";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import { useEffect, useState } from "react";

const PagarArriendo = () => {
  const [showButton, setShowButton] = useState(false);

  const pageReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 20000);

    return () => clearTimeout;
  }, []);

  return (
    <div className="pt-20 bg-slate-100">
      <div className="bg-primaryblue h-48 mt-2  grid grid-cols-2 items-center">
        <div>
          <h1 className="lg:text-4xl sm:text-3xl md:text-lg text-white font-bold px-5 lg:px-20">
            Paga tu arriendo facil y seguro
          </h1>
        </div>
        {/* <div className="lg:block hidden"> */}
        <div className="lg:block  sm:px-20 sm:overflow-hidden pt-5">
          <div className="flex lg:justify-end sm:justify-center">
            <img
              loading="lazy"
              className=" lg:w-[80%] sm:w-[100%]  sm:mr-5 lg:mr-5"
              src={pay}
              alt="paga tu arriendo facil y seguro"
            />
          </div>
        </div>
      </div>
      <div className="px-20 ">
        {showButton && (
          <button
            onClick={pageReload}
            className="flex items-center w-full bg-slate-400/20 cursor-pointer mt-2 rounded-xl px-2 justify-center py-3 gap-3"
          >
            <IoMdRefresh className=" dark:text-white  text-slate-900" /> Volver
            a inicio
          </button>
        )}
      </div>
      <div
        style={{
          position: "relative",
          marginTop: "40px",
          height: "1000px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            // top: "-200px",
            top: "-100px",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        >
          <iframe
            src="https://mispropiedades.co/tenant?id=26619933"
            title="Pagar arriendo"
            width="100%"
            height="1500"
            frameBorder="0"
          />
        </div>
      </div>
      <div className="px-5 ">
        <MarqueeSEO />
      </div>
    </div>
  );
};

export default PagarArriendo;

// const styles = StyleSheet.create({
//   iframe: {
//     fontSize: "1rem",
//   },
// });
