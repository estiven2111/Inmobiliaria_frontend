import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineOrderedList } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FilterData } from "../../redux/landingpage/FilterDataObj.slice";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
//{ handlerfilterCombi, activeFilters }
export default function DropdownMenu({ activeFilters }) {
  const { filterLanding } = useSelector((state) => state.FilterDataObjSlice);
  const dispatch = useDispatch();

  const handlleFilter = (e) => {
    const { value, name } = e.target;

    dispatch(
      FilterData({
        ...filterLanding,
        [name]: value,
      })
    );
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {/* <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:hover:bg-gray-50/10 hover:bg-gray-50"> */}
        <Menu.Button
          className={`flex dark:hover:bg-gray-50/10 dark:text-white items-center justify-center gap-x-1.5 rounded-full px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
            activeFilters ? "ring-indigo-400" : ""
          }`}
        >
          <AiOutlineOrderedList className="md:hidden block dark:text-gray-100" />
          <span className="items-center dark:text-white justify-center md:block hidden">
            Ordenar
          </span>
          <BiChevronDown
            className="md:block hidden -mr-1 h-5 w-5  text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute lg:right-0 sm:left-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 dark:bg-gray-100/10 text-gray-900"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Más nuevos
                </a>
              )}
            </Menu.Item> */}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  href="#"
                  name="priceMinMax"
                  value="-1"
                  onClick={handlleFilter}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Precio mayor a menor
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  href="#"
                  name="priceMinMax"
                  value="1"
                  onClick={handlleFilter}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Precio menor a mayor
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
