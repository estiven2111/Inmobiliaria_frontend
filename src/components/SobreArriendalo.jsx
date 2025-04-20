import { money, homemoney, weight } from "../assets";

const SobreArriendalo = () => {
  return (
    <div className="md:pt-5 py-5 lg:px-5 px-5 ">
      <h1 className="lg:text-3xl text-2xl text-center md:pb-10 pt-5 ">
        <strong>¿Qué es Arriendalo?</strong>
      </h1>
      <div className="grid lg:grid-cols-3 grid-cols-1 pt-10 lg:gap-10 lg:px-10  :px-5 gap-5 ">
        <div className="p-5 bg-gradient-to-b from-transparent dark:via-slate-900 dark:to-slate-700 via-indigo-50  to-indigo-300 dark:bg-slate-800 rounded-xl shadow-lg">
          <div className=" h-48 flex justify-center items-center  ">
            <img
              loading="lazy"
              className="w-50"
              src={money}
              alt="arriendalo te adelanta hasta 11 meses de canon"
            />
          </div>

          <h1 className="text-center lg:text-xl text-lg font-bold">
            Te adelantamos hasta 11 meses de arriendo
          </h1>

          <p className="lg:text-justify md:text-center  pt-5  lg:text-lg sm:text-md pb-5">
            ¿Necesitas liquidéz? Te adelantamos hasta 11 meses de arriendo. ¡Sin
            letra pequeña! Directo a tu cuenta en 24 horas o menos.
          </p>
        </div>

        <div className="p- bg-gradient-to-b from-transparent dark:via-slate-900 dark:to-slate-700 via-indigo-50  to-indigo-300 dark:bg-slate-800 rounded-xl shadow-lg">
          <div className=" h-48 flex justify-center items-center  ">
            <img
              loading="lazy"
              className="w-56 h-38"
              src={homemoney}
              alt="arriendos en tiempo record"
            />
          </div>

          <h1 className="text-center lg:text-xl text-lg font-bold">
            Arrendamos en tiempo récord
          </h1>

          <p className="lg:text-justify md:text-center px-5 pt-5  lg:text-lg sm:text-md pb-5">
            Publica tu inmueble con nosotros y recibe <strong>GRATIS</strong> la
            republicación en <strong>más de 15 portales aliados</strong> para
            mayor visibilidad y aumentar las visitas un 300%
          </p>
        </div>
        <div className="p-5 bg-gradient-to-b from-transparent dark:via-slate-900 dark:to-slate-700 via-indigo-50  to-indigo-300 dark:bg-slate-800 rounded-xl shadow-lg">
          <div className=" h-48 flex justify-center items-center  ">
            <img
              loading="lazy"
              className="w-56"
              src={weight}
              alt="en arriendalo todo es seguro y online"
            />
          </div>

          <h1 className="text-center lg:text-xl text-lg font-bold">
            100% Online y Seguro
          </h1>

          <p className="lg:text-justify md:text-center  pt-5  lg:text-lg sm:text-md pb-5">
            Desde donde estés, estarás tranquilo y recibiendo puntualmente el
            pago de tu arriendo. ¡Sin mover un dedo!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobreArriendalo;
