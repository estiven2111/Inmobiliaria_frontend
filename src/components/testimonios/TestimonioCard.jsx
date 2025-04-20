/* eslint-disable react/prop-types */

import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { IoDiamondSharp } from "react-icons/io5";

const TestimonioCard = ({ testimonio }) => {
  return (
    <div className="md:w-1/2 w-2/2 mx-auto ">
      <div className="relative">
        <span className="text-3xl hidden md:flex  text-primaryblue -left-20 -top-4 absolute">
          <ImQuotesLeft />
        </span>
        <h1 className="flex items-center md:text-xl sm:text-sm  gap-4 justify-centers  text-justify">
          {testimonio.content}
        </h1>
        <span className="hidden md:flex  text-3xl  text-primaryblue absolute bottom-0 -right-14">
          <ImQuotesRight />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3  pt-10">
        <div className="justify-end mr-5 flex">
          <img
            className="rounded-full w-20"
            src={testimonio.avatar}
            alt="imagen de usuario que da testimonio"
          />
        </div>
        <div className="col-span-2 ">
          <h2 className="flex items-center font-bold text-lg justify-between">
            {testimonio.name}
          </h2>
          <h2>{testimonio.occupation}</h2>
          <div>
            {testimonio.exclusivo && (
              <div className="flex justify-start font-bold items-center  text-center gap-1">
                <IoDiamondSharp className="text-3xl text-sky-800 bg-amarilloone p-1 rounded-full" />
                Exclusivo
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonioCard;
