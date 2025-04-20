import { BsFacebook } from "react-icons/bs";
import { logoblue, logowhite, wompi } from "../../assets";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

const Footer = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="py-2 lg:pb-0 md:pb-20 mt-10">
      <div className="flex-row items-center justify-center dark:from-transparent dark:to-slate-900 bg-gradient-to-b from-transparent to-slate-100">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mb-4 items-center justify-center">
          <div className="px-5 lg:order-first text-center lg:text-md text-sm sm:order-last">
            <h1>
              <strong>Arriendalo:</strong> la inmobiliaria de arriendos en línea
            </h1>
          </div>
          <div className="order-first">
            <Link to="/">
              <div className="flex justify-center">
                {theme === "dark" ? (
                  <img
                    className="w-36"
                    src={logowhite}
                    alt="Arriendalo Colombia"
                  />
                ) : (
                  <img
                    className="w-36"
                    src={logoblue}
                    alt="Arriendalo Colombia"
                  />
                )}
              </div>
            </Link>
          </div>

          <div className="flex justify-center">
            <a href="https://www.facebook.com/arriendalo/" target="_blanck">
              <BsFacebook className="text-2xl" />
            </a>
            {/* <a href="https://www.facebook.com/arriendalo/" target="_blanck">
              <BsFacebook className="text-2xl" />
            </a> */}
          </div>
        </div>
        <hr className="text-neutral-400 py-4   px-5" />
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="flex gap-5 items-center justify-evenly w-full px-20 ">
            <li className="text-sm ">
              Correspondencia:
              <br /> Carrera 7 N° 156 - 68 | Oficina 1804 | North Point III,
              Bogotá D.C.
            </li>
            {/* <li className="text-sm ">
              Sucursal Ibagué: Carrera 3 N° 12 - 36 | Local 212 | C.C. Pasaje
              Real
            </li> */}
          </div>
          <div>
            <div className="flex items-center justify-center">
              <img src={wompi} alt="pagos con wompi" className="w-24" />
            </div>
          </div>
        </div>
        <div className="md:flex flex-row gap-5 py-3 justify-center font-medium">
          <div className="hover:font-bold text-center cursor-pointer">
            <NavLink to="/ayuda">AYUDA</NavLink>
          </div>
          {/* <div className="hover:font-bold text-center cursor-pointer">
            PAGOS
          </div> */}

          <div className="hover:font-bold text-center cursor-pointer">
            <NavLink to="/aplicar">APLICAR</NavLink>
          </div>
          <NavLink to="/politica_tratamiendo_de_Datos" target="_blanck">
            <div className="hover:font-bold text-center cursor-pointer">
              POLITICA DE DATOS
            </div>
          </NavLink>
          <div className="hover:font-bold text-center cursor-pointer">
            <NavLink to="/legal">LEGAL</NavLink>
          </div>
        </div>
      </div>
      <div className=" flex pt-2 pb-1 items-center text-center justify-center dark:text-neutral-500 text-neutral-500">
        Copyright © 2023 Arriendalo S.A.S. | Todos los derechos reservados.
      </div>
    </div>
  );
};

export default Footer;
