import { BiChevronDown } from "react-icons/bi";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { useField } from "formik";
import { Listbox } from "@headlessui/react";

const OpcionComp = ({ name, opciones }) => {
  const [field, meta, helpers] = useField(name);

  const [selected, setSelected] = useState(opciones[0]?.show);

  return (
    <div>
      <div className="w-full">
        <Listbox
          value={field.value}
          onChange={(value) => {
            helpers.setValue(value);
            const selectedOption = opciones.find(
              (opcion) => opcion.value === value
            );
            if (selectedOption) {
              setSelected(selectedOption.show);
            }
          }}
        >
          <div className="relative">
            <Listbox.Button className="relative w-full py-1 cursor-default rounded-lg border-[1.5px] pl-3 pr-10 text-left focus-visible:ring-2 ring-gray-600">
              <span className="block truncate">
                <div className="flex dark:text-slate-100 text-slate-900 py-1 items-center">
                  {/* {!field.value
                    ? opciones[0]?.show
                    : opciones.find((opcion) => opcion.value === field.value)
                        ?.show} */}
                  {selected}
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
                {opciones.map((opcion, opcionIdx) => (
                  <Listbox.Option
                    key={`tipos_${opcionIdx}`}
                    className={({ active }) =>
                      `relative  select-none py-2 pl-8 pr-4 cursor-pointer ${
                        active
                          ? "bg-sky-100 dark:bg-sky-950/10 text-sky-390 dark:text-sky-100"
                          : "text-gray-900"
                      }`
                    }
                    value={opcion.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {opcion.show}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                            <BsCheck className="text-lg" aria-hidden="true" />
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

export default OpcionComp;
