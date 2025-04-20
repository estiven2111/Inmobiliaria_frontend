import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  deleteFormulario,
  fetchFormularios,
  selectAllFormularios,
  selectAllSearchFormularios,
} from "../../../redux/admin_dashboard/estudioDatacredito.slice";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import ModalAlert from "../../ui/ModalAlert";

const TomadorData = () => {
  const dispatch = useDispatch();
  const formularios = useSelector(selectAllFormularios);
  const searchFormularios = useSelector(selectAllSearchFormularios);

  const [openModal, setOpenModal] = useState(false);

  const modalHandeler = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);


  const mostrarFormularios =
    searchFormularios.length > 0 ? searchFormularios : formularios;

  const deleteHandler = (id) => {
    dispatch(deleteFormulario(id)).then(() => {
      toast.success("Formulario eliminado con exito");
      dispatch(fetchFormularios());
    });
  };

  useEffect(() => {
    dispatch(fetchFormularios());
  }, [formularios.length]);

  return (
    <div>
      <div className="flex flex-col  sm:overflow-x-auto hide-scrollbar h-screen">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-white text-sm font-light">
                <thead className="border-b font-medium border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4"></th>
                    <th scope="col" className="px-6 py-4">
                      N. FORMULARIO
                    </th>
                    <th scope="col" className="px-6 py-4">
                      NOMBRE
                    </th>
                    <th scope="col" className="px-6 py-4">
                      IDENTIFICACIÓN
                    </th>
                    <th scope="col" className="px-6 py-4">
                      APLICA
                    </th>
                    <th scope="col" className="px-6 py-4">
                      ESTADO
                    </th>
                    <th scope="col" className=" text-center px-6 py-4">
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mostrarFormularios.map((el) => {
                    return (
                      <tr
                        key={el.id_form}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100/20 border-neutral-500 hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-3 py-4 font-medium">
                          <Link
                            to={`/_admin_arrKar_2023/formulario/${el.id_form}`}
                          >
                            <BsFillEyeFill className="text-lg" />
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 font-medium">
                          {el.id_form}
                        </td>
                        <td className="whitespace-nowrap capitalize px-6 py-4">
                          {el.nom_completo}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {el.tipo_doc}. {el.num_doc}
                        </td>
                        <td className="whitespace-nowrap capitalize px-6 py-4">
                          {" "}
                          {el.aplica_como}
                        </td>
                        <td className="whitespace-nowrap capitalize px-6 py-4">
                          {" "}
                          {el.estado}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex gap-2 justify-center items-center">
                          <button className="bg-blue-400 p-1 rounded-md">
                            <Link
                              to={`/_admin_arrKar_2023/formulario/${el.id_form}`}
                            >
                              <BiEdit className="text-lg font-semibold" />
                            </Link>
                          </button>
                          <button
                            onClick={modalHandeler}
                            className="bg-red-400 p-1 rounded-md"
                          >
                            <MdDeleteOutline className="text-lg font-semibold" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {openModal && (
          <ModalAlert
            openModal={modalHandeler}
            mensaje={"¿Seguro que quieres borrar el formulario?"}
            boton={"Borrar"}
            accion={deleteHandler}
          />
        )}
      </div>
    </div>
  );
};

export default TomadorData;
