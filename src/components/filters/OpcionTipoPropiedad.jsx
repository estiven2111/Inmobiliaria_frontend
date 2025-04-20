import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiBuildingHouse, BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { FilterData } from "../../redux/landingpage/FilterDataObj.slice";

const tipoPropOpciones = [
  { name: "Casa", value: "1" },
  { name: "Casa campestre", value: "11" },
  { name: "Apartamento", value: "2" },
  { name: "Apartaestudio", value: "14" },
  { name: "Oficina", value: "4" },
  { name: "Local", value: "3" },
  { name: "Edificion", value: "16" },
];

const OpcionTipoPropiedad = () => {
  const { filterLanding, tipesPropertyFiltered } = useSelector(
    (state) => state.FilterDataObjSlice
  );
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

  const handdlertipo = (opcion) => {
    dispatch(FilterData({ ...filterLanding, tipo: opcion }));
  };
  return (
    <div>
      <div className=" w-full pt-2">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full py-3 cursor-default rounded-full  border-[1.5px] pl-3 pr-10  text-left  focus-visible:ring-2 ring-gray-600 sm:text-sm">
              <span className="block  truncate">
                <div className="flex dark:text-slate-100 text-slate-900 text-lg  items-center gap-1">
                  <BiBuildingHouse className="text-xl pb-1" />
                  {!selected
                    ? " Tipo de propiedad"
                    : tipesPropertyFiltered.find(
                        (opcion) => opcion.value === selected
                      )?.opcion}
                </div>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BiChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 hide-scrollbar mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <Listbox.Option
                  name="tipo"
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-sky-100 dark:bg-sky-950/10 text-sky-900 dark:text-sky-100"
                        : "text-gray-900"
                    }`
                  }
                  value=""
                  onClick={() => {
                    handdlertipo("");
                  }}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? "font-normal text-neutral-400"
                            : "font-normal text-neutral-400"
                        }`}
                      >
                        Tipo de propiedad
                      </span>
                    </>
                  )}
                </Listbox.Option>
                {tipesPropertyFiltered.map((opcion, opcionIdx) => (
                  <Listbox.Option
                    key={`tipos_${opcionIdx}`}
                    name="tipo"
                    className={({ active }) =>
                      `relative  select-none py-2 pl-10 pr-4 cursor-pointer ${
                        active
                          ? "bg-sky-100 dark:bg-sky-950/10 text-sky-390 dark:text-sky-100"
                          : "text-gray-900"
                      }`
                    }
                    value={opcion.value}
                    onClick={() => {
                      handdlertipo(opcion.value);
                    }}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {opcion.opcion}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                            <BsCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default OpcionTipoPropiedad;
