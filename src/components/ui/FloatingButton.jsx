import { useEffect } from "react";
import { Ripple, initTE } from "tw-elements";

import { MdOutlineSupportAgent, MdWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  useEffect(() => {
    initTE({ Ripple });
  });

  return (
    <div className="fixed group md:bottom-10 bottom-6 md:right-10 right-6 lg:z-10 z-30  flex md:h-14 h-10 md:w-14 w-10 items-center justify-center rounded-full bg-green-600 leading-normal text-white">
      <a
        href="https://wa.link/5jqnxe"
        target="_blank"
        rel="noreferrer"
        data-te-ripple-init
        data-te-ripple-color="light"
        className="cursor-pointer md:text-3xl text-lg rounded-full "
      >
        <MdWhatsapp />
      </a>
      <ul className=" absolute z-0 flex translate-y-6 flex-col items-center justify-center opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[90%] group-hover:opacity-100">
        <div className="lg:block hidden">
          <li>
            <Link to="/ayuda" target="_blank">
              <div
                // rel="noreferrer"
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-ripple-centered="true"
                className="mx-5 mb-3 flex md:h-14 h-10 md:w-14 w-10 cursor-pointer items-center justify-center rounded-full bg-secondaryblue shadow-md hover:shadow-lg"
              >
                <MdOutlineSupportAgent className="text-3xl" />
              </div>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default FloatingButton;
