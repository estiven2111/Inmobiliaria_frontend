import { useSelector, useDispatch } from "react-redux";
import {
  addFile,
  removeFile,
  cancelAllFiles,
} from "../../../../redux/formularioestudio/formularioEstudio.slice";
import { MdRemoveCircle } from "react-icons/md";
import { BiCloudUpload } from "react-icons/bi";
import { useEffect, useState } from "react";

const Documentos = ({ siguienteHandler }) => {
  let cont = 0;
  let fil;
  let fil2;

  const datosEstudio = useSelector(
    (state) => state.formularioEstudioSlice.datosEstudio
  );
  const [filldata, setFilldata] = useState(true);
  const [filldata2, setFilldata2] = useState(true);
  const [updatestado, setUpdatestado] = useState(true);
  const [imgs, setImgs] = useState([]);
  const [imgs64, setImgs64] = useState([]);
  let ejecute = false;
  const execute = () => {
    fil = JSON.parse(localStorage.getItem("imagenesArray"));
    fil2 = JSON.parse(localStorage.getItem("imagenesArray2"));
    setImgs(fil);
    setImgs64(fil2)
  };
  useEffect(() => {
    ejecute = ejecute || execute();
    if (fil === null || fil2 === null) {
      setFilldata(true);
      setFilldata2(true);
    } else {
      setFilldata(false);
      setFilldata2(false);
    }
    if (fil || fil2) {
      if (fil.length === 0 || fil2 === 0) {
        setFilldata(true);
        setFilldata2(true);
      } else {
        setFilldata(false);
        setFilldata2(false);
      }
    }
  }, [updatestado]);

  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const imagesArray = [];
    const array2 = []
    const files = e.target.files;

    if (imgs || imgs64 ) {
      cont++
      imgs.map((img) => {
        imagesArray.push({
          name: img.name,
          type: img.type,
          data: img.data,
          index: cont,
        });
      });

      imgs64.map((img) => {
        array2.push({
          name: img.name,
          type: img.type,
          data: img.data,
          index: cont,
        });
      });
     
    }
   
    for (let file of files) {
      if (file) {

        const reader = new FileReader();
reader.onload = function(event) {
  const base64Data = event.target.result.split(',')[1];
  
  const imageUrls = base64Data;

  cont++
  const imageUrl = URL.createObjectURL(file);
    imagesArray.push({
      name: file.name,
      type: file.type,
      data: imageUrl,
      index: cont,
    });
   
    setImgs(imagesArray);
    array2.push({
      name: file.name,
      type: file.type,
      data: imageUrls,
      index: cont,
    })
    
    setImgs64(array2)
    localStorage.setItem("imagenesArray", JSON.stringify(imagesArray));
    localStorage.setItem("imagenesArray2", JSON.stringify(array2));

    setUpdatestado(!updatestado);





};
reader.readAsDataURL(file);






    
      }
    }
  };

  const handleSubmit = () => {
    setUpdatestado(!updatestado);
    siguienteHandler(datosEstudio);
  };
  const removeFileHandler = (i) => {
    const fil = JSON.parse(localStorage.getItem("imagenesArray"));
    const fil2 = JSON.parse(localStorage.getItem("imagenesArray2"));
    const nuevoArray = fil.filter((dato) => dato.index !== i);
    const nuevoArray2 = fil2.filter((dato) => dato.index !== i);
    localStorage.setItem("imagenesArray", JSON.stringify(nuevoArray));
    localStorage.setItem("imagenesArray2", JSON.stringify(nuevoArray2));
    setUpdatestado(!updatestado);
  };

  const clearFiles = () => {
    setUpdatestado(!updatestado);
    dispatch(cancelAllFiles());
  };

  return (
    <div>
      <div>
        <div className="flex  items-center border-l-4 border-primaryblue justify-center text-justify lg:mx-14 px-5 lg:px-5 lg:py-5 py-2 shadow-inner shadow-gray-400">
          {datosEstudio.act_economica === "Empleado" ? (
            <p>{`Como eres ${datosEstudio.act_economica}, Ingresa imagen de tu documento de identidad por ambos lados.`}</p>
          ) : datosEstudio.act_economica === "Independiente" ||
            datosEstudio.act_economica === "Rentista de capital" ? (
            <div>
              <p className="font-semibold">
                {`Como eres ${datosEstudio.act_economica}, ingresa los siguientes documentos: `}
              </p>

              <ul className="list-disc list-inside ml-2 py-2">
                <li>Imagen de tu documento de identidad por ambos lados.</li>
                <li>Última Declaración de renta (si aplica).</li>
                <li>RUT</li>
                <li>Extractos bancarios de los últimos 3 meses.</li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="my-10">
        {/* <label
          htmlFor="formFileMultiple"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        >
          Multiple files input example
        </label>

        <input
          className="file_input"
          type="file"
          id="formFileMultiple"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        /> */}
        <div className="flex items-center gap-5 rounded-lg justify-start w-full ring-1 ring-gray-400 p-3 mt-5">
          {filldata ? (
            <p className="text-gray-400 text-center">
              No hay archivos seleccionados
            </p>
          ) : (
            imgs.map((file, i) => (
              <div key={i} className="relative">
                <img
                   src={file.data}
                  //  src={URL.createObjectURL(file)}
                  alt={`Preview ${i}`}
                  className="mb-2 rounded-lg w-[100px] h-[100px] object-cover"
                />
                <button
                  onClick={() => removeFileHandler(file.index)}
                  className="absolute cursor-pointer -top-2 -right-2 dark:text-slate-300 text-slate-900"
                >
                  <MdRemoveCircle className="text-xl text-red-600 dark:bg-zinc-900 bg-zinc-100 rounded-full" />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="w-full mt-1">
          <input
            className="hidden"
            type="file"
            id="formFileMultiple"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          <label
            htmlFor="formFileMultiple"
            className=" flex justify-center gap-3 items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
          >
            <BiCloudUpload className="text-2xl" /> Subir archivos
          </label>
        </div>

        <button
          disabled={filldata}
          className="flex w-full items-center mt-10 font-bold justify-center py-2 px-3 gap-2 bg-indigo-300/20 hover:bg-indigo-300/30 rounded-lg"
          onClick={handleSubmit}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Documentos;
