/* eslint-disable react/prop-types */
import { AiOutlineCopy } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const TimedModal = ({ closeTimedModalHandler, user, whatsapp, id }) => {
  return (
    <div
      onClick={closeTimedModalHandler}
      className="fixed inset-0 flex items-center bg-black/80 justify-center z-50"
    >
      <div className="bg-white dark:bg-slate-900 p-5 rounded-lg sm:w-[40%] md:w-[60%] lg:w-[40%]">
        {user.map((el) => (
          <div
            key={el._id}
            className="relative items-center bg-slate-50 dark:bg-slate-950 justify-center flex-row border-[0.5px]  rounded-xl border-neutral-400 p-3 w-full"
          >
            <div
              onClick={closeTimedModalHandler}
              className="flex absolute right-2 justify-end items-center cursor-pointer"
            >
              <IoIosClose className="text-2xl" />
            </div>
            <div className="">
              <h1 className="text-center font-semibold">
                ¿Te gustó esta propiedad?
              </h1>
              <h1 className="text-center font-light pt-2">
                {" "}
                Comunicate con el agente encargado y pregunta por ella!
              </h1>
              <div>
                <div>
                  <div className="flex items-center justify-center p-5">
                    <div className="h-20 rounded-full w-24 ">
                      <img
                        className="h-24 rounded-full w-24 "
                        src={el.photo}
                        alt="agente encargado de la propiedad en arriendo"
                      />
                    </div>
                  </div>
                  <div className="">
                    <h2 className="text-center font-bold capitalize">
                      {el.first_name} {el.last_name}
                    </h2>
                    <div className="flex items-center gap-3 mt-5 justify-center">
                      <HiOutlineMail className="text-black text-2xl font-bold" />
                      <h3 className="  text-primary underline">
                        <a
                          href={`mailto:${el.email}`}
                          className="hover:font-medium  "
                        >
                          {el.email}
                        </a>
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 mt-2 justify-center">
                      <RiWhatsappFill className="text-black dark:text-white text-xl font-bold" />
                      <h3 className="  text-primary underline">
                        <a
                          href={whatsapp}
                          className="hover:font-medium"
                          target="_blanck"
                        >
                          {el.cell_phone}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex flex-row items-center justify-center gap-10 pt-5">
                <a
                  href={whatsapp}
                  target="_blanck"
                  className=" flex text-white items-center justify-center  cursor-pointer gap-3 duration-300 hover:saturate-200 rounded-full px-6  bg-gradient-to-r from-indigo-400 to-indigo-600 p-2"
                >
                  <MdCalendarMonth />
                  Agendar Visita
                </a>
                <div className=" flex  items-center justify-center gap-3 mt-1  rounded-full cursor-pointer duration-500 hover:border-indigo-500 px-6 border-2 border-gradient-to-r from-indigo-400 to-indigo-600 p-2">
                  <Link className="flex gap-3" to={`/aplicar_tomador/${id}`}>
                    <FaWpforms /> Aplicar ya!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimedModal;
