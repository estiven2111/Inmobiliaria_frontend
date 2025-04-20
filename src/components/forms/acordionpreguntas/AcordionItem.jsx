import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import { Collapse } from "react-collapse";

const AcordionItem = ({ toggle, open, title, description, index }) => {
  return (
    <div className="">
      <div
        className="  transition duration-200 flex gap-3 justify-between items-center cursor-pointer px-8 py-1  "
        onClick={() => toggle(index)}
      >
        <h1 className="sm:text-md text-sm font-semibold py-1 ">{title} </h1>
        <div className="text-bold ">
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <Collapse isOpened={open} className="transition duration-150 ease-in-out">
        <p className=" py-1 text-xs px-8   text-justify">{description}</p>
      </Collapse>

      <hr className=" h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
    </div>
  );
};
export default AcordionItem;
