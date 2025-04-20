/* eslint-disable react/prop-types */
import { useState } from "react";
import { TiChevronRight, TiChevronLeft } from "react-icons/ti";

export const SlideDots = ({ slideLength, activeIndex }) => {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-2 mb-1">
      {Array.from({ length: slideLength }).map((_, index) => (
        <div
          key={index}
          className={`h-1 w-1 rounded-full ${
            activeIndex === index ? "bg-white" : "bg-white/60"
          }`}
        ></div>
      ))}
    </div>
  );
};

const Slide = ({ slide, propiedad, ciudad }) => {
  const [currImage, setCurrImage] = useState(0);

  const prev = () =>
    setCurrImage((currImage) =>
      currImage === 0 ? slide.length - 1 : currImage - 1
    );
  const next = () =>
    setCurrImage((currImage) =>
      currImage === slide.length - 1 ? 0 : currImage + 1
    );

  return (
    <div className="relative overflow-hidden group">
      <div
        className="flex object-cover rounded-xl w-full transition-transform ease-out duration-500"
        style={{ transform: `translate(-${currImage * 100}%)` }}
      >
        {slide?.map((el, i) => (
          <img
            loading="lazy"
            key={i}
            src={el}
            alt={`${propiedad} en arriendo en ${ciudad}`}
            className="  rounded-xl bg-white border-2 border-b-neutral-100   object-cover "
          />
        ))}
      </div>
      <SlideDots slideLength={slide.length} activeIndex={currImage} />
      <div className="absolute inset-0 flex items-center justify-between text-white p-2">
        <button
          onClick={prev}
          className="lg:hidden   group-hover:block p-[0.5] bg-neutral-300/90 py-2 rounded-md"
        >
          <TiChevronLeft size={20} />
        </button>
        <button
          className="lg:hidden  group-hover:block p-[0.5] bg-neutral-300/90 py-2 rounded-md"
          onClick={next}
        >
          <TiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Slide;
