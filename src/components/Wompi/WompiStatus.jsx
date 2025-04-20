import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

import { toast } from "react-toastify";

import axios from "axios";
import { useSelector } from "react-redux";
function WompiStatus() {
  const navigate = useNavigate();
  // const datosEstudio = useSelector(
  //   (state) => state.formularioEstudioSlice.datosEstudio
  // );
  // const file = useSelector((state) => state.formularioEstudioSlice.files);

  const filess = JSON.parse(localStorage.getItem("imagenesArray"));

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [estado, setEstado] = useState({
    fecha_pago: "",
    precio: "",
    id_pago: "",
    ref_pago: "",
    estado_pago: "",
    tipo_pago: "",
    merch_legal_name: "",
    merch_legal_id: "",
    merch_legal_id_tipo: "",
  });
  let data = {};
  let ejecutafuncion = false;
  moment.locale("es");
  useEffect(() => {
    const execute = async () => {
      try {
        const status = await axios.get(
          `https://sandbox.wompi.co/v1/transactions/${id}`
        );
        const response = status.data.data;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        data = {
          fecha_pago: response.created_at,
          precio: response.amount_in_cents,
          id_pago: response.id,
          ref_pago: response.reference,
          estado_pago: response.status,
          tipo_pago: response.payment_method.extra.name,
          merch_legal_name: response.merchant.legal_name,
          merch_legal_id: response.merchant.legal_id,
          merch_legal_id_tipo: response.merchant.legal_id_type,
        };
        setEstado(data);
        if (data.estado_pago === "APPROVED") {
          ejecutafuncion = ejecutafuncion || enviarform();
        }
      } catch (error) {
        console.log(error);
      }
    };
    execute();
  }, [id]);

  const enviarform = async () => {
    const datosEstudios = JSON.parse(localStorage.getItem("datosEstudio"));
    const files = JSON.parse(localStorage.getItem("imagenesArray2"));
    if (datosEstudios && files) {
      const formData = new FormData();
      for (const key in datosEstudios) {
        if (Array.isArray(datosEstudios[key])) {
          // Si es un array, convertirlo a JSON y agregarlo al FormData
          formData.append(key, JSON.stringify(datosEstudios[key]));
        } else {
          // Si no es un array, agregar directamente al FormData
          formData.append(key, datosEstudios[key]);
        }
      }


      files.forEach(fileData => {
        const { name, type, data } = fileData;
        const byteCharacters = atob(data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, { type: type });
        const restoredFile = new File([blob], name, { type: type });
        formData.append("files", restoredFile); // Agregar el archivo restaurado al FormData
      });

      await axios
        .post("/formulario/aplica-tomador", formData)
        .then((res) => {
          // toast.success(`Datos guardados exitosamente`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al enviar el formulario");
        });
      for (const key in estado) {
        formData.append(key, estado[key]);
      }

      await axios
        .post("/mensajes/email", formData)
        .then((res) => {
          // toast.success(
          //   `Al correo ${datosEstudios.email} se envió el detalle de la compra.`
          // );
        })
        .catch((err) => {
          console.log(err);
          // toast.error("Error al enviar el correo");
        });

    }
  };



  const precioInCents = estado.precio; // e.g., 5000000 for 50.000,00

  const formattedPrecio = (precioInCents / 100).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const fecha = estado.fecha_pago;
  const formattedfecha = moment(fecha).format("DD-MM-YYYY HH:mm");

  return (
    <div className="flex py-20 justify-center">
      {estado.estado_pago === "APPROVED" && (
        // estado.estado_pago === "ERROR" && (
        <div className="mt-32">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-lg font-semibold tracking-wide text-center text-white uppercase bg-primaryblue/90">
                  <th className="px-4 py-3" colSpan="2">
                    TRANSACCIÓN APROBADA
                  </th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                  <th className="px-4 py-3">Valor pagado</th>
                  <th className="px-4 py-3">$ {formattedPrecio}</th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                  <th className="px-4 py-3">método de pago</th>
                  <th className="px-4 py-3">{estado.tipo_pago}</th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                  <th className="px-4 py-3">Estado del pago</th>
                  <th className="px-4 py-3">Aprobado</th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                  <th className="px-4 py-3">Referencia de pago</th>
                  <th className="px-4 py-3">{estado.ref_pago}</th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                  <th className="px-4 py-3">Número de transacción </th>
                  <th className="px-4 py-3">{estado.id_pago}</th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                  <th className="px-4 py-3">fecha de pago</th>
                  <th className="px-4 py-3">{formattedfecha}</th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                  <th className="px-4 py-3">pago a</th>
                  <th className="px-4 py-3">{estado.merch_legal_name}</th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                  <th className="px-4 py-3">identificación</th>
                  <th className="px-4 py-3">
                    {estado.merch_legal_id_tipo} {estado.merch_legal_id}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y"></tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => navigate("/propiedades")}
              className="py-2 px-3 rounded-xl text-white bg-primaryblue/80 hover:bg-primaryblue/70 flex items-center justify-center "
            >
              Volver a Arriendalo
            </button>
          </div>
        </div>
      )}
      {estado.estado_pago === "DECLINED" && (
        <div>
          <div className="mt-32">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-lg font-semibold tracking-wide text-center text-white uppercase bg-primaryblue/90">
                    <th className="px-4 py-3" colSpan="2">
                      TRANSACCIÓN RECHAZADA
                    </th>
                  </tr>
                  {/* <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                <th className="px-4 py-3">Valor </th>
                <th className="px-4 py-3">$ {formattedPrecio}</th>
              </tr> */}
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                    <th className="px-4 py-3">método de pago</th>
                    <th className="px-4 py-3">{estado.tipo_pago}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                    <th className="px-4 py-3">Estado del pago</th>
                    <th className="px-4 py-3 text-red-500">RECHAZADO</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                    <th className="px-4 py-3">Referencia de pago</th>
                    <th className="px-4 py-3">{estado.ref_pago}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                    <th className="px-4 py-3">Número de transacción </th>
                    <th className="px-4 py-3 text-red-500">{estado.id_pago}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                    <th className="px-4 py-3">fecha de pago</th>
                    <th className="px-4 py-3">{formattedfecha}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                    <th className="px-4 py-3">pago a</th>
                    <th className="px-4 py-3">{estado.merch_legal_name}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                    <th className="px-4 py-3">identificación</th>
                    <th className="px-4 py-3">
                      {estado.merch_legal_id_tipo} {estado.merch_legal_id}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y"></tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => navigate("/propiedades")}
              className="py-2 px-3 rounded-xl text-white bg-primaryblue/80 hover:bg-primaryblue/70 flex items-center justify-center "
            >
              Volver a Arriendalo
            </button>
          </div>
        </div>
      )}
      {estado.estado_pago === "VOIDED" && (
        <div>
          <div className="mt-32">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-lg font-semibold tracking-wide text-center text-white uppercase bg-primaryblue/90">
                    <th className="px-4 py-3" colSpan="2">
                      TRANSACCIÓN ANULADA
                    </th>
                  </tr>
                  {/* <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
            <th className="px-4 py-3">Valor </th>
            <th className="px-4 py-3">$ {formattedPrecio}</th>
          </tr> */}
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                    <th className="px-4 py-3">método de pago</th>
                    <th className="px-4 py-3">{estado.tipo_pago}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                    <th className="px-4 py-3">Estado del pago</th>
                    <th className="px-4 py-3 text-red-500">ANULADO</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                    <th className="px-4 py-3">Referencia de pago</th>
                    <th className="px-4 py-3">{estado.ref_pago}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                    <th className="px-4 py-3">Número de transacción </th>
                    <th className="px-4 py-3 text-red-500">{estado.id_pago}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                    <th className="px-4 py-3">fecha de pago</th>
                    <th className="px-4 py-3">{formattedfecha}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-200">
                    <th className="px-4 py-3">pago a</th>
                    <th className="px-4 py-3">{estado.merch_legal_name}</th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-slate-100">
                    <th className="px-4 py-3">identificación</th>
                    <th className="px-4 py-3">
                      {estado.merch_legal_id_tipo} {estado.merch_legal_id}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y"></tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => navigate("/propiedades")}
              className="py-2 px-3 rounded-xl text-white bg-primaryblue/80 hover:bg-primaryblue/70 flex items-center justify-center "
            >
              Volver a Arriendalo
            </button>
          </div>
        </div>
      )}
      {estado.estado_pago === "ERROR" && (
        <div className="mt-32">
          <h1 className="text-red-500 text-xl">
            Error interno del método de pago respectivo
          </h1>
        </div>
      )}
    </div>
  );
}

export default WompiStatus;
