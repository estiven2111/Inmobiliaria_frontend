import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FilterData } from "../../redux/landingpage/FilterDataObj.slice";

const habitacionOpciones = [
  { name: "1", value: "1" },
  { name: "2", value: "2" },
  { name: "3", value: "3" },
  { name: "4", value: "4" },
  { name: "5+", value: "5" },
];

const OpcionHabitaciones = () => {
  const filterLanding = useSelector(
    (state) => state.FilterDataObjSlice.filterLanding
  );

  const dispatch = useDispatch();
  const handlerbedrooms = (bedrooms) => {
    const isSelected = filterLanding.habitaciones === bedrooms;

    const newBedrooms = isSelected ? "" : bedrooms;
    dispatch(FilterData({ ...filterLanding, habitaciones: newBedrooms }));
  };

  return (
    <div>
      <Menu as="div" className="relative w-full text-left">
        <div>
          {/* <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:hover:bg-gray-50/10 hover:bg-gray-50"> */}
          <Menu.Button
            className={`flex dark:hover:bg-gray-50/10 w-full  py-3 justify-between dark:text-white items-center gap-x-1.5 rounded-full px-3 text-md  text-gray-900 shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}
          >
            <div className="flex text-lg items-center gap-2">
              <MdOutlineBedroomParent className="text-xl pb-1" />
              {filterLanding.habitaciones === ""
                ? "Habitaciones"
                : filterLanding.habitaciones}
            </div>

            <BiChevronDown
              className="md:block hidden -mr-1 h-5 w-5  text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform  scale-95"
          enterTo="transform  scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform  scale-100"
          leaveTo="transform  scale-95"
        >
          <Menu.Items className="absolute cursor-pointer right-0 z-10 mt-2 w-full  rounded-xl bg-white  dark:text-white dark:bg-slate-800 shadow-lg ring-1 ring-neutral-300 ">
            <div className="flex gap-5  items-center justify-center py-1">
              {habitacionOpciones.map((el, i) => (
                <div key={i}>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        key={i}
                        name="habitaciones"
                        value={el.value}
                        onClick={() => {
                          handlerbedrooms(el.value);
                        }}
                        className={`${
                          filterLanding.habitaciones === el.name
                            ? "bg-blue-500"
                            : "bg-white dark:hover:bg-slate-600 dark:bg-slate-700 hover:bg-gray-300/30"
                        } rounded-full px-3 py-2 border-[1px]  `}
                      >
                        {el.name}
                      </div>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default OpcionHabitaciones;
