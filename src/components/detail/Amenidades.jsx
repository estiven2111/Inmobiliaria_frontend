/* eslint-disable no-unused-vars */

import { TiStarFullOutline } from "react-icons/ti";

/* eslint-disable react/prop-types */
const Amenidades = ({ amenidades }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 lg:mt-10 mt-5 ">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Amenidades interiores
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {amenidades.internal.map((el, i) => (
                    <tr
                      key={i}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <TiStarFullOutline className="text-yellow-600" />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {el.nombre}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Amenidades exteriores
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {amenidades.external.map((el, i) => (
                    <tr
                      key={i}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <TiStarFullOutline className="text-yellow-600" />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {el.nombre}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenidades;
