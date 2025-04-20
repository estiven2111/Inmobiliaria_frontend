/* eslint-disable react/prop-types */
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PagoConfirmacion from "../forms/natural/pagoconfirmacion/PagoConfirmacion";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillSendFill } from "react-icons/bs";
const WompiPaymentForm = () => {
  const datosEstudio = useSelector(
    (state) => state.formularioEstudioSlice.datosEstudio
  );
  const file = useSelector((state) => state.formularioEstudioSlice.files);
  let funcionEjecutada = false;

  const location = useLocation();
  const navigate = useNavigate();

  // localStorage.setItem("file",JSON.stringify(file[0]));
  useEffect(() => {
    const execute = async () => {
     
      const { id_form, num_doc, nom_completo, email, num_whatsapp, tipo_doc } =
        datosEstudio;

        // const respuesta = await axios.post(
        //   "/function/wompi",
        //   id_form
        // )
  

        const encondedText = new TextEncoder().encode(`${id_form}5000000COPpub_test_CLLhAh7A9XLYm8W7PGM7JrorcvCdID3F`);
        const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 

      const divContainer = document.createElement("div");
      divContainer.id = "wompi-container";

      const formElement = document.createElement("form");
      const scriptElement = document.createElement("script");

      scriptElement.src = "https://checkout.wompi.co/widget.js";
      scriptElement.dataset.render = "button";
      scriptElement.dataset.publicKey = "pub_test_CLLhAh7A9XLYm8W7PGM7JrorcvCdID3F";
      // scriptElement.dataset.publicKey = "pub_test_4NOb7GzWnKpJ0rKepgfa8JPmL8VZQcr3";

      scriptElement.dataset.currency = "COP";
      scriptElement.dataset.amountInCents = 5000000;
      scriptElement.dataset.reference = id_form;
      scriptElement.dataset.signatureIntegrity = hashHex;
      scriptElement.dataset.redirectUrl = `http://localhost:5173/wompi/status`;
      //  scriptElement.setAttribute("data-redirect-url", "https://transaction-redirect.wompi.co/check");
      scriptElement.setAttribute("data-customer-data:email", email);
      scriptElement.setAttribute("data-customer-data:full-name", nom_completo);
      scriptElement.setAttribute(
        "data-customer-data:phone-number",
        num_whatsapp
      );
      scriptElement.setAttribute(
        "data-customer-data:phone-number-prefix",
        "+57"
      );
      scriptElement.setAttribute("data-customer-data:legal-id", num_doc);
      scriptElement.setAttribute("data-customer-data:legal-id-type", tipo_doc);

      // Agrega el script al formulario
      formElement.appendChild(scriptElement);

      // Agrega el formulario al final del body del DOM
      divContainer.appendChild(formElement);

      const mapDiv = document.getElementById("wompi");
      // Check if the container already exists, if not then append
      if (!document.getElementById("wompi-container")) {
        mapDiv.appendChild(divContainer);
      }

      scriptElement.addEventListener("load", () => {
        scriptElement.dataset.publicKey = "";
        // scriptElement.dataset.redirectUrl = ""
        const wompiButton = document.querySelector(".waybox-button");
        wompiButton.addEventListener("click", function () {
          // Código a ejecutar cuando se hace clic en el botón
          // enviarform();
          // Puedes llamar a otros métodos o realizar otras acciones aquí
        });
      });
    };
    funcionEjecutada = funcionEjecutada || execute();
  }, []);
  //? Funcion para enviar el formulario del COA

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
      for (const fileData of files){
        const { name, type, data,index } = fileData;
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
  
    
    formData.append(index, restoredFile);
      }







      // await Promise.all(
      //   files.map(async (file, index) => {
      //     const response = await fetch(file.data);
      //     const blobData = await response.blob();
      //     const file_send = new File([blobData], file.name, {
      //       type: file.type,
      //     });
      //     formData.append(`file${index}`, file_send);
      //   })
      // );
      await axios
        .post("/formulario/aplica-tomador", formData)
        .then((res) => {
          toast.success(`Aplicación enviada exitosamente`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al enviar el formulario");
        });
    }
  };


  return (
    <div>
      <div className="flex justify-center">
        <PagoConfirmacion />
      </div>
      <div className=" flex justify-center">
        {location.pathname.includes("CoA") ? (
          <div
            className="flex items-center cursor-pointer lg:w-[30%] w-full text-white py-2 px-3 hover:scale-105 duration-200 justify-center gap-3 rounded-xl bg-primaryblue/80 hover:primaryblue/70 "
            onClick={enviarform}
          >
            <BsFillSendFill />
            Enviar
          </div>
        ) : (
          <div className=" bg-slate-100 rounded-xl sm:w-full  lg:w-[70%]  lg:m-5 p-5 lg:p-10">
            <p className="text-4xl font-bold text-center">
              <p>
                $ 50.000 <span className="text-lg">COP</span>
              </p>
            </p>
            <p className="text-sm text-center">
              <strong>Valor a pagar</strong>
            </p>

            <div className="pt-10">
              <div>
                <p>
                  <strong>Código del Inmueble:</strong>
                </p>{" "}
                {datosEstudio.cod_inmueble}
                <p className="pt-2">
                  <strong>Nombre completo:</strong>{" "}
                </p>{" "}
                <p className="capitalize">{datosEstudio.nom_completo}</p>
              </div>
              <p className="pt-2">
                <strong>Documento de identidad:</strong>{" "}
              </p>{" "}
              {datosEstudio.tipo_doc}. {datosEstudio.num_doc}
              <p className="pt-2">
                <strong>Número de contacto:</strong>{" "}
              </p>{" "}
              {datosEstudio.num_whatsapp}
              <p className="pt-2">
                <strong>Correo electrónico:</strong>
              </p>{" "}
              <p>{datosEstudio.email}</p>
            </div>

            <div
              className=" pt-5 cursor-pointer w-full hover:scale-105 duration-200 flex justify-center "
              id="wompi"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WompiPaymentForm;
